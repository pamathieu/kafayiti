-- Add user_id column to link members to authenticated users
ALTER TABLE public.kafa_members 
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- Add membership status column
ALTER TABLE public.kafa_members 
ADD COLUMN IF NOT EXISTS membership_status TEXT NOT NULL DEFAULT 'pending' 
CHECK (membership_status IN ('active', 'pending', 'suspended'));

-- Add plan-related columns
ALTER TABLE public.kafa_members 
ADD COLUMN IF NOT EXISTS selected_plan TEXT DEFAULT NULL;

ALTER TABLE public.kafa_members 
ADD COLUMN IF NOT EXISTS coverage_amount DECIMAL(12,2) DEFAULT NULL;

ALTER TABLE public.kafa_members 
ADD COLUMN IF NOT EXISTS plan_start_date DATE DEFAULT NULL;

-- Add payment-related columns
ALTER TABLE public.kafa_members 
ADD COLUMN IF NOT EXISTS payment_frequency TEXT DEFAULT 'monthly'
CHECK (payment_frequency IN ('monthly', 'quarterly', 'yearly'));

ALTER TABLE public.kafa_members 
ADD COLUMN IF NOT EXISTS next_payment_date DATE DEFAULT NULL;

ALTER TABLE public.kafa_members 
ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'pending'
CHECK (payment_status IN ('paid', 'pending', 'late'));

-- Create index for user_id lookups
CREATE INDEX IF NOT EXISTS idx_kafa_members_user_id ON public.kafa_members(user_id);

-- Create index for member_number lookups (for login by reference number)
CREATE INDEX IF NOT EXISTS idx_kafa_members_member_number ON public.kafa_members(member_number);

-- RLS policy for members to view their own data
CREATE POLICY "Members can view their own data"
ON public.kafa_members
FOR SELECT
USING (auth.uid() = user_id);

-- RLS policy for members to update their own data
CREATE POLICY "Members can update their own data"
ON public.kafa_members
FOR UPDATE
USING (auth.uid() = user_id);

-- Create member_payments table for payment history
CREATE TABLE IF NOT EXISTS public.member_payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    member_id UUID REFERENCES public.kafa_members(id) ON DELETE CASCADE NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    payment_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    payment_type TEXT NOT NULL DEFAULT 'contribution',
    payment_method TEXT,
    status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('completed', 'pending', 'failed')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on member_payments
ALTER TABLE public.member_payments ENABLE ROW LEVEL SECURITY;

-- RLS policies for member_payments
CREATE POLICY "Members can view their own payments"
ON public.member_payments
FOR SELECT
USING (
    member_id IN (SELECT id FROM public.kafa_members WHERE user_id = auth.uid())
);

CREATE POLICY "Admins can view all payments"
ON public.member_payments
FOR SELECT
USING (is_admin(auth.uid()));

CREATE POLICY "Admins can manage all payments"
ON public.member_payments
FOR ALL
USING (is_admin(auth.uid()));

-- Create member_documents table
CREATE TABLE IF NOT EXISTS public.member_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    member_id UUID REFERENCES public.kafa_members(id) ON DELETE CASCADE NOT NULL,
    document_name TEXT NOT NULL,
    document_type TEXT NOT NULL,
    document_url TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('approved', 'pending', 'rejected')),
    uploaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    reviewed_at TIMESTAMP WITH TIME ZONE,
    notes TEXT
);

-- Enable RLS on member_documents
ALTER TABLE public.member_documents ENABLE ROW LEVEL SECURITY;

-- RLS policies for member_documents
CREATE POLICY "Members can view their own documents"
ON public.member_documents
FOR SELECT
USING (
    member_id IN (SELECT id FROM public.kafa_members WHERE user_id = auth.uid())
);

CREATE POLICY "Admins can view all documents"
ON public.member_documents
FOR SELECT
USING (is_admin(auth.uid()));

CREATE POLICY "Admins can manage all documents"
ON public.member_documents
FOR ALL
USING (is_admin(auth.uid()));

-- Create member_notifications table
CREATE TABLE IF NOT EXISTS public.member_notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    member_id UUID REFERENCES public.kafa_members(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    notification_type TEXT NOT NULL DEFAULT 'announcement' CHECK (notification_type IN ('announcement', 'payment_reminder', 'plan_update', 'system')),
    is_read BOOLEAN NOT NULL DEFAULT false,
    is_global BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on member_notifications
ALTER TABLE public.member_notifications ENABLE ROW LEVEL SECURITY;

-- RLS policies for member_notifications
CREATE POLICY "Members can view their own notifications"
ON public.member_notifications
FOR SELECT
USING (
    is_global = true OR 
    member_id IN (SELECT id FROM public.kafa_members WHERE user_id = auth.uid())
);

CREATE POLICY "Members can update their own notifications"
ON public.member_notifications
FOR UPDATE
USING (
    member_id IN (SELECT id FROM public.kafa_members WHERE user_id = auth.uid())
);

CREATE POLICY "Admins can manage all notifications"
ON public.member_notifications
FOR ALL
USING (is_admin(auth.uid()));