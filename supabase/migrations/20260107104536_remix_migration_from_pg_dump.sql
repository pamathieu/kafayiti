CREATE EXTENSION IF NOT EXISTS "pg_graphql";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";
CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";
CREATE EXTENSION IF NOT EXISTS "plpgsql";
CREATE EXTENSION IF NOT EXISTS "supabase_vault";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";
BEGIN;

--
-- PostgreSQL database dump
--


-- Dumped from database version 17.6
-- Dumped by pg_dump version 18.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--



--
-- Name: app_role; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.app_role AS ENUM (
    'admin',
    'moderator',
    'user'
);


--
-- Name: generate_kafa_member_number(text, text, text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.generate_kafa_member_number(p_last_name text, p_first_name text, p_commune text) RETURNS text
    LANGUAGE plpgsql
    SET search_path TO 'public'
    AS $$
DECLARE
    v_commune_code TEXT;
    v_name_code TEXT;
    v_base_number TEXT;
    v_full_number TEXT;
    v_seq INTEGER;
    v_counter INTEGER := 0;
BEGIN
    -- Get first 3 letters of commune (uppercase, remove accents/special chars)
    v_commune_code := UPPER(SUBSTRING(
        REGEXP_REPLACE(
            TRANSLATE(p_commune, 'àâäéèêëïîôùûüç-'' ', 'aaaeeeeiioouuc'),
            '[^A-Za-z]', '', 'g'
        ), 1, 3
    ));
    
    -- Get first 2 letters of last name + first 2 letters of first name
    v_name_code := UPPER(SUBSTRING(
        REGEXP_REPLACE(
            TRANSLATE(p_last_name, 'àâäéèêëïîôùûüç-'' ', 'aaaeeeeiioouuc'),
            '[^A-Za-z]', '', 'g'
        ), 1, 2
    )) || UPPER(SUBSTRING(
        REGEXP_REPLACE(
            TRANSLATE(p_first_name, 'àâäéèêëïîôùûüç-'' ', 'aaaeeeeiioouuc'),
            '[^A-Za-z]', '', 'g'
        ), 1, 2
    ));
    
    -- Get next sequential number
    SELECT COALESCE(MAX(sequential_number), 0) + 1 INTO v_seq FROM public.kafa_members;
    
    -- Build base member number
    v_base_number := 'KAFA-' || v_commune_code || '-' || v_name_code || '-';
    
    -- Build full number with 4-digit padding
    v_full_number := v_base_number || LPAD(v_seq::TEXT, 4, '0');
    
    -- Check for uniqueness and increment if collision
    WHILE EXISTS (SELECT 1 FROM public.kafa_members WHERE member_number = v_full_number) LOOP
        v_counter := v_counter + 1;
        v_full_number := v_base_number || LPAD((v_seq + v_counter)::TEXT, 4, '0');
    END LOOP;
    
    RETURN v_full_number;
END;
$$;


--
-- Name: handle_new_user(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.handle_new_user() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
BEGIN
    INSERT INTO public.profiles (user_id, full_name, email)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.raw_user_meta_data ->> 'name'),
        NEW.email
    );
    RETURN NEW;
END;
$$;


--
-- Name: has_role(uuid, public.app_role); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.has_role(_user_id uuid, _role public.app_role) RETURNS boolean
    LANGUAGE sql STABLE SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;


--
-- Name: is_admin(uuid); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.is_admin(_user_id uuid) RETURNS boolean
    LANGUAGE sql STABLE SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = 'admin'
  )
$$;


--
-- Name: update_kafa_members_updated_at(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.update_kafa_members_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    SET search_path TO 'public'
    AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;


SET default_table_access_method = heap;

--
-- Name: kafa_members; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.kafa_members (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    sequential_number integer NOT NULL,
    member_number text NOT NULL,
    full_name text NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    commune text NOT NULL,
    birth_date_place text,
    gender text,
    profession text,
    id_number text,
    id_type text,
    id_issue_details text,
    id_expiration_date text,
    address text,
    phone text,
    email text,
    join_date text,
    social_shares text,
    total_amount text,
    insurance_products text[],
    other_insurance text,
    beneficiaries jsonb,
    declaration boolean DEFAULT false,
    commitment boolean DEFAULT false,
    data_authorization boolean DEFAULT false,
    signature_place text,
    signature_date text,
    signature text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    user_id uuid,
    membership_status text DEFAULT 'pending'::text NOT NULL,
    selected_plan text,
    coverage_amount numeric(12,2) DEFAULT NULL::numeric,
    plan_start_date date,
    payment_frequency text DEFAULT 'monthly'::text,
    next_payment_date date,
    payment_status text DEFAULT 'pending'::text,
    CONSTRAINT kafa_members_membership_status_check CHECK ((membership_status = ANY (ARRAY['active'::text, 'pending'::text, 'suspended'::text]))),
    CONSTRAINT kafa_members_payment_frequency_check CHECK ((payment_frequency = ANY (ARRAY['monthly'::text, 'quarterly'::text, 'yearly'::text]))),
    CONSTRAINT kafa_members_payment_status_check CHECK ((payment_status = ANY (ARRAY['paid'::text, 'pending'::text, 'late'::text])))
);


--
-- Name: kafa_members_sequential_number_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.kafa_members_sequential_number_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: kafa_members_sequential_number_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.kafa_members_sequential_number_seq OWNED BY public.kafa_members.sequential_number;


--
-- Name: member_documents; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.member_documents (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    member_id uuid NOT NULL,
    document_name text NOT NULL,
    document_type text NOT NULL,
    document_url text,
    status text DEFAULT 'pending'::text NOT NULL,
    uploaded_at timestamp with time zone DEFAULT now() NOT NULL,
    reviewed_at timestamp with time zone,
    notes text,
    CONSTRAINT member_documents_status_check CHECK ((status = ANY (ARRAY['approved'::text, 'pending'::text, 'rejected'::text])))
);


--
-- Name: member_notifications; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.member_notifications (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    member_id uuid,
    title text NOT NULL,
    message text NOT NULL,
    notification_type text DEFAULT 'announcement'::text NOT NULL,
    is_read boolean DEFAULT false NOT NULL,
    is_global boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT member_notifications_notification_type_check CHECK ((notification_type = ANY (ARRAY['announcement'::text, 'payment_reminder'::text, 'plan_update'::text, 'system'::text])))
);


--
-- Name: member_payments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.member_payments (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    member_id uuid NOT NULL,
    amount numeric(12,2) NOT NULL,
    payment_date timestamp with time zone DEFAULT now() NOT NULL,
    payment_type text DEFAULT 'contribution'::text NOT NULL,
    payment_method text,
    status text DEFAULT 'completed'::text NOT NULL,
    notes text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT member_payments_status_check CHECK ((status = ANY (ARRAY['completed'::text, 'pending'::text, 'failed'::text])))
);


--
-- Name: profiles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.profiles (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    full_name text,
    email text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: user_roles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_roles (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    role public.app_role NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: kafa_members sequential_number; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.kafa_members ALTER COLUMN sequential_number SET DEFAULT nextval('public.kafa_members_sequential_number_seq'::regclass);


--
-- Name: kafa_members kafa_members_member_number_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.kafa_members
    ADD CONSTRAINT kafa_members_member_number_key UNIQUE (member_number);


--
-- Name: kafa_members kafa_members_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.kafa_members
    ADD CONSTRAINT kafa_members_pkey PRIMARY KEY (id);


--
-- Name: kafa_members kafa_members_sequential_number_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.kafa_members
    ADD CONSTRAINT kafa_members_sequential_number_key UNIQUE (sequential_number);


--
-- Name: member_documents member_documents_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.member_documents
    ADD CONSTRAINT member_documents_pkey PRIMARY KEY (id);


--
-- Name: member_notifications member_notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.member_notifications
    ADD CONSTRAINT member_notifications_pkey PRIMARY KEY (id);


--
-- Name: member_payments member_payments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.member_payments
    ADD CONSTRAINT member_payments_pkey PRIMARY KEY (id);


--
-- Name: profiles profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);


--
-- Name: profiles profiles_user_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_user_id_key UNIQUE (user_id);


--
-- Name: user_roles user_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (id);


--
-- Name: user_roles user_roles_user_id_role_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_user_id_role_key UNIQUE (user_id, role);


--
-- Name: idx_kafa_members_member_number; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_kafa_members_member_number ON public.kafa_members USING btree (member_number);


--
-- Name: idx_kafa_members_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_kafa_members_user_id ON public.kafa_members USING btree (user_id);


--
-- Name: kafa_members update_kafa_members_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_kafa_members_updated_at BEFORE UPDATE ON public.kafa_members FOR EACH ROW EXECUTE FUNCTION public.update_kafa_members_updated_at();


--
-- Name: profiles update_profiles_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_kafa_members_updated_at();


--
-- Name: kafa_members kafa_members_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.kafa_members
    ADD CONSTRAINT kafa_members_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE SET NULL;


--
-- Name: member_documents member_documents_member_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.member_documents
    ADD CONSTRAINT member_documents_member_id_fkey FOREIGN KEY (member_id) REFERENCES public.kafa_members(id) ON DELETE CASCADE;


--
-- Name: member_notifications member_notifications_member_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.member_notifications
    ADD CONSTRAINT member_notifications_member_id_fkey FOREIGN KEY (member_id) REFERENCES public.kafa_members(id) ON DELETE CASCADE;


--
-- Name: member_payments member_payments_member_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.member_payments
    ADD CONSTRAINT member_payments_member_id_fkey FOREIGN KEY (member_id) REFERENCES public.kafa_members(id) ON DELETE CASCADE;


--
-- Name: profiles profiles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: user_roles user_roles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: member_documents Admins can manage all documents; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage all documents" ON public.member_documents USING (public.is_admin(auth.uid()));


--
-- Name: member_notifications Admins can manage all notifications; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage all notifications" ON public.member_notifications USING (public.is_admin(auth.uid()));


--
-- Name: member_payments Admins can manage all payments; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage all payments" ON public.member_payments USING (public.is_admin(auth.uid()));


--
-- Name: user_roles Admins can manage all roles; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage all roles" ON public.user_roles USING (public.is_admin(auth.uid()));


--
-- Name: member_documents Admins can view all documents; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can view all documents" ON public.member_documents FOR SELECT USING (public.is_admin(auth.uid()));


--
-- Name: kafa_members Admins can view all members; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can view all members" ON public.kafa_members FOR SELECT USING (public.is_admin(auth.uid()));


--
-- Name: member_payments Admins can view all payments; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can view all payments" ON public.member_payments FOR SELECT USING (public.is_admin(auth.uid()));


--
-- Name: kafa_members Anyone can submit membership application; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can submit membership application" ON public.kafa_members FOR INSERT WITH CHECK (true);


--
-- Name: kafa_members Members can update their own data; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Members can update their own data" ON public.kafa_members FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: member_notifications Members can update their own notifications; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Members can update their own notifications" ON public.member_notifications FOR UPDATE USING ((member_id IN ( SELECT kafa_members.id
   FROM public.kafa_members
  WHERE (kafa_members.user_id = auth.uid()))));


--
-- Name: kafa_members Members can view their own data; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Members can view their own data" ON public.kafa_members FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: member_documents Members can view their own documents; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Members can view their own documents" ON public.member_documents FOR SELECT USING ((member_id IN ( SELECT kafa_members.id
   FROM public.kafa_members
  WHERE (kafa_members.user_id = auth.uid()))));


--
-- Name: member_notifications Members can view their own notifications; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Members can view their own notifications" ON public.member_notifications FOR SELECT USING (((is_global = true) OR (member_id IN ( SELECT kafa_members.id
   FROM public.kafa_members
  WHERE (kafa_members.user_id = auth.uid())))));


--
-- Name: member_payments Members can view their own payments; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Members can view their own payments" ON public.member_payments FOR SELECT USING ((member_id IN ( SELECT kafa_members.id
   FROM public.kafa_members
  WHERE (kafa_members.user_id = auth.uid()))));


--
-- Name: profiles Users can insert their own profile; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: profiles Users can update their own profile; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: profiles Users can view their own profile; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: user_roles Users can view their own roles; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own roles" ON public.user_roles FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: kafa_members; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.kafa_members ENABLE ROW LEVEL SECURITY;

--
-- Name: member_documents; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.member_documents ENABLE ROW LEVEL SECURITY;

--
-- Name: member_notifications; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.member_notifications ENABLE ROW LEVEL SECURITY;

--
-- Name: member_payments; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.member_payments ENABLE ROW LEVEL SECURITY;

--
-- Name: profiles; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

--
-- Name: user_roles; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

--
-- PostgreSQL database dump complete
--




COMMIT;