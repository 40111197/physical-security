-- ============================================================
-- RASHTRIYA RAKSHA UNIVERSITY COMMAND CENTER
-- Granular Schema: 29 Dedicated Tables
-- ============================================================

-- [1-4] DAY SCHOLARS MODULE
CREATE TABLE ds_students (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    enrolment_no text UNIQUE NOT NULL,
    full_name text,
    program_name text,
    phone_number text,
    created_at timestamptz DEFAULT now()
);
CREATE TABLE ds_movement (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    enrolment_no text,
    reason_for_exit text,
    time_out timestamptz,
    time_in timestamptz,
    incharge_guard text
);
CREATE TABLE ds_food (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    enrolment_no text,
    meal_category text, -- Breakfast/Lunch/Dinner
    food_items text,
    delivery_timestamp timestamptz,
    collection_status text DEFAULT 'Pending'
);
CREATE TABLE ds_courier (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    enrolment_no text,
    courier_company text,
    tracking_id text,
    received_at timestamptz,
    delivery_status text DEFAULT 'Waiting'
);

-- [5-8] BOYS HOSTEL MODULE
CREATE TABLE bh_students (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    enrolment_no text UNIQUE NOT NULL,
    student_name text,
    room_number text,
    contact_no text,
    created_at timestamptz DEFAULT now()
);
CREATE TABLE bh_movement (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    room_number text,
    student_name text,
    purpose text,
    out_time timestamptz,
    in_time timestamptz,
    logged_by text
);
CREATE TABLE bh_food (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    enrolment_no text,
    meal_type text,
    description text,
    arrival_time timestamptz,
    is_collected boolean DEFAULT false
);
CREATE TABLE bh_courier (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    enrolment_no text,
    service_provider text,
    awb_number text,
    reception_time timestamptz,
    status text DEFAULT 'In Locker'
);

-- [9-12] GIRLS HOSTEL MODULE
CREATE TABLE gh_students (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    enrolment_no text UNIQUE NOT NULL,
    name text,
    wing_room text,
    emergency_phone text,
    created_at timestamptz DEFAULT now()
);
CREATE TABLE gh_movement (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    wing_room text,
    student_name text,
    reason text,
    time_out timestamptz,
    time_in timestamptz,
    duty_officer text
);
CREATE TABLE gh_food (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id text,
    meal_period text,
    item_list text,
    timestamp timestamptz,
    status text DEFAULT 'Arrived'
);
CREATE TABLE gh_courier (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id text,
    carrier text,
    tracking_code text,
    received_on timestamptz,
    current_status text DEFAULT 'Pending'
);

-- [13-16] STAFFS MODULE
CREATE TABLE st_details (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    staff_id text UNIQUE NOT NULL,
    name text,
    dept text,
    designation text,
    phone text
);
CREATE TABLE st_movement (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    staff_id text,
    destination text,
    departure timestamptz,
    return_time timestamptz,
    authorized_by text
);
CREATE TABLE st_food (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    staff_id text,
    meal_type text,
    order_details text,
    arrival timestamptz,
    status text
);
CREATE TABLE st_courier (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    staff_id text,
    courier_name text,
    ref_no text,
    received_at timestamptz,
    disposition text
);

-- [17-20] ADMIN MODULE
CREATE TABLE ad_details (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id text UNIQUE NOT NULL,
    name text,
    office_ext text,
    mobile text
);
CREATE TABLE ad_movement (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id text,
    purpose text,
    exit_time timestamptz,
    entry_time timestamptz,
    remarks text
);
CREATE TABLE ad_food (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id text,
    meal text,
    source text,
    received_time timestamptz,
    status text
);
CREATE TABLE ad_courier (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id text,
    sender text,
    parcel_id text,
    logged_time timestamptz,
    status text
);

-- [21-23] LOGISTICS & VISITORS
CREATE TABLE vehicles_log (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    plate_number text,
    owner_name text,
    vehicle_type text,
    check_in timestamptz,
    check_out timestamptz,
    gate_no text
);
CREATE TABLE visitors_log (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    visitor_name text,
    id_proof_type text,
    whom_to_meet text,
    entry_time timestamptz,
    exit_time timestamptz,
    pass_id text
);
CREATE TABLE vendors_log (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    vendor_company text,
    delivery_type text,
    vehicle_no text,
    entry_time timestamptz,
    exit_time timestamptz,
    authorized_by text
);

-- [24-25] SECURITY MODULE
CREATE TABLE security_incidents_siss (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    incident_type text,
    location_code text,
    severity_level text,
    description text,
    status text DEFAULT 'Open'
);
CREATE TABLE security_incidents_students (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id text,
    violation_type text,
    action_taken text,
    reported_by text,
    timestamp timestamptz DEFAULT now()
);

-- [26-29] OPERATIONS & INVENTORY
CREATE TABLE gate_access_logs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    gate_id text,
    person_type text,
    access_card_no text,
    timestamp timestamptz DEFAULT now(),
    direction text -- IN/OUT
);
CREATE TABLE key_management_logs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    key_id text,
    room_name text,
    issued_to text,
    issued_at timestamptz,
    returned_at timestamptz
);
CREATE TABLE asset_inventory (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    asset_tag text UNIQUE,
    item_name text,
    assigned_to text,
    condition text,
    last_audit_date date
);
CREATE TABLE guard_deployment_logs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    guard_name text,
    shift_time text,
    post_location text,
    supervisor_name text,
    is_present boolean DEFAULT true
);

-- ENABLE RLS ON ALL TABLES
DO $$ 
DECLARE 
    t text;
BEGIN
    FOR t IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') 
    LOOP
        EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', t);
        EXECUTE format('CREATE POLICY "Allow All Access" ON %I FOR ALL TO anon USING (true) WITH CHECK (true)', t, t);
    END LOOP;
END $$;
