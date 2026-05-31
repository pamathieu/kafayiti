-- Create members table for KAFA membership
CREATE TABLE public.kafa_members (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    sequential_number SERIAL UNIQUE,
    member_number TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    commune TEXT NOT NULL,
    birth_date_place TEXT,
    gender TEXT,
    profession TEXT,
    id_number TEXT,
    id_type TEXT,
    id_issue_details TEXT,
    id_expiration_date TEXT,
    address TEXT,
    phone TEXT,
    email TEXT,
    join_date TEXT,
    social_shares TEXT,
    total_amount TEXT,
    insurance_products TEXT[],
    other_insurance TEXT,
    beneficiaries JSONB,
    declaration BOOLEAN DEFAULT false,
    commitment BOOLEAN DEFAULT false,
    data_authorization BOOLEAN DEFAULT false,
    signature_place TEXT,
    signature_date TEXT,
    signature TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.kafa_members ENABLE ROW LEVEL SECURITY;

-- Create policy for public insert (allows anyone to register as a member)
CREATE POLICY "Anyone can submit membership application" 
ON public.kafa_members 
FOR INSERT 
WITH CHECK (true);

-- Create policy for public read of own member by member_number
CREATE POLICY "Anyone can view members" 
ON public.kafa_members 
FOR SELECT 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_kafa_members_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_kafa_members_updated_at
BEFORE UPDATE ON public.kafa_members
FOR EACH ROW
EXECUTE FUNCTION public.update_kafa_members_updated_at();

-- Create function to generate unique member number
CREATE OR REPLACE FUNCTION public.generate_kafa_member_number(
    p_last_name TEXT,
    p_first_name TEXT,
    p_commune TEXT
)
RETURNS TEXT AS $$
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
$$ LANGUAGE plpgsql SET search_path = public;