-- ============================================================
-- Physical Security Dashboard — Full Schema (Clean Rebuild)
-- Run this in Supabase SQL Editor
-- ============================================================

-- ── DROP ALL TABLES (order matters — children before parents) ──
DROP TABLE IF EXISTS security_incidents  CASCADE;
DROP TABLE IF EXISTS vendors             CASCADE;
DROP TABLE IF EXISTS visitors            CASCADE;
DROP TABLE IF EXISTS vehicles            CASCADE;
DROP TABLE IF EXISTS admin_movement      CASCADE;
DROP TABLE IF EXISTS staff_movement      CASCADE;
DROP TABLE IF EXISTS food_movement       CASCADE;
DROP TABLE IF EXISTS courier_parcels     CASCADE;
DROP TABLE IF EXISTS student_movement    CASCADE;
DROP TABLE IF EXISTS admins              CASCADE;
DROP TABLE IF EXISTS staffs              CASCADE;
DROP TABLE IF EXISTS students            CASCADE;

-- ── 1. STUDENTS ───────────────────────────────────────────────
CREATE TABLE students (
    id             uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id     text        UNIQUE NOT NULL,   -- Enrolment Number
    name           text,
    program        text,
    room_number    text,
    hostel_type    text,                           -- 'boys' | 'girls' | 'day-scholar'
    phone          text,
    created_at     timestamptz DEFAULT now()
);

-- ── 2. STUDENT MOVEMENT ───────────────────────────────────────
-- Used for Boys Hostel, Girls Hostel, AND Day Scholars.
-- Fields differ per context; unused columns stay NULL.
CREATE TABLE student_movement (
    id             uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    hostel_type    text        NOT NULL,           -- 'boys' | 'girls' | 'day-scholar'

    -- Day Scholar specific
    student_id     text,                           -- Enrolment Number (DS only)
    student_name   text,                           -- Name
    program        text,                           -- Program (DS only)
    permitted_by   text,                           -- Permitted By (DS only)

    -- Boys / Girls Hostel specific
    room_number    text,                           -- Room Number (BH/GH only)

    -- Common
    purpose        text,                           -- Reason
    time_out       timestamptz,                    -- Check-Out
    time_in        timestamptz,                    -- Check-In
    logged_by      text,                           -- Incharge
    created_at     timestamptz DEFAULT now()
);

-- ── 3. STAFFS ─────────────────────────────────────────────────
CREATE TABLE staffs (
    id             uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    staff_id       text        UNIQUE NOT NULL,
    name           text,
    department     text,
    designation    text,
    phone          text,
    created_at     timestamptz DEFAULT now()
);

-- ── 4. STAFF MOVEMENT ─────────────────────────────────────────
CREATE TABLE staff_movement (
    id             uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    staff_id       text        REFERENCES staffs(staff_id) ON DELETE SET NULL,
    purpose        text,
    time_out       timestamptz,
    time_in        timestamptz,
    logged_by      text,
    created_at     timestamptz DEFAULT now()
);

-- ── 5. ADMINS ─────────────────────────────────────────────────
CREATE TABLE admins (
    id             uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id       text        UNIQUE NOT NULL,
    name           text,
    role           text,
    phone          text,
    created_at     timestamptz DEFAULT now()
);

-- ── 6. ADMIN MOVEMENT ─────────────────────────────────────────
CREATE TABLE admin_movement (
    id             uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id       text        REFERENCES admins(admin_id) ON DELETE SET NULL,
    purpose        text,
    time_out       timestamptz,
    time_in        timestamptz,
    logged_by      text,
    created_at     timestamptz DEFAULT now()
);

-- ── 7. FOOD MOVEMENT ──────────────────────────────────────────
CREATE TABLE food_movement (
    id             uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    member_id      text,                           -- Enrolment / Staff / Admin ID
    member_type    text        NOT NULL,           -- 'student' | 'staff' | 'admin'
    hostel_type    text,                           -- 'boys' | 'girls' | 'day-scholar' | NULL
    meal_type      text,                           -- 'Breakfast' | 'Lunch' | 'Dinner'
    items          text,
    arrival_time   timestamptz,
    status         text        DEFAULT 'Pending',
    created_at     timestamptz DEFAULT now()
);

-- ── 8. COURIER / PARCELS ──────────────────────────────────────
CREATE TABLE courier_parcels (
    id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    recipient_id    text,                          -- Enrolment / Staff / Admin ID
    recipient_type  text        NOT NULL,          -- 'student' | 'staff' | 'admin'
    hostel_type     text,                          -- 'boys' | 'girls' | 'day-scholar' | NULL
    courier_service text,
    tracking_no     text,
    received_time   timestamptz,
    status          text        DEFAULT 'Waiting',
    created_at      timestamptz DEFAULT now()
);

-- ── 9. VEHICLES ───────────────────────────────────────────────
CREATE TABLE vehicles (
    id             uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    vehicle_number text,
    owner_name     text,
    phone          text,
    designation    text,
    vehicle_type   text,                           -- '2-Wheeler' | '4-Wheeler'
    reason         text,
    check_in       timestamptz,
    check_out      timestamptz,
    incharge       text,
    created_at     timestamptz DEFAULT now()
);

-- ── 10. VISITORS ──────────────────────────────────────────────
CREATE TABLE visitors (
    id             uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    visitor_name   text,
    phone          text,
    purpose        text,
    whom_to_meet   text,
    check_in       timestamptz,
    check_out      timestamptz,
    created_at     timestamptz DEFAULT now()
);

-- ── 11. VENDORS ───────────────────────────────────────────────
CREATE TABLE vendors (
    id             uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    vendor_name    text,
    company        text,
    phone          text,
    purpose        text,
    check_in       timestamptz,
    check_out      timestamptz,
    created_at     timestamptz DEFAULT now()
);

-- ── 12. SECURITY INCIDENTS ────────────────────────────────────
CREATE TABLE security_incidents (
    id             uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    incident_type  text,
    location       text,
    description    text,
    reported_by    text,
    severity       text        DEFAULT 'Low',     -- 'Low' | 'Medium' | 'High'
    status         text        DEFAULT 'Open',    -- 'Open' | 'Resolved'
    incident_time  timestamptz,
    created_at     timestamptz DEFAULT now()
);

-- ── ROW LEVEL SECURITY ────────────────────────────────────────
ALTER TABLE students           ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_movement   ENABLE ROW LEVEL SECURITY;
ALTER TABLE staffs             ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_movement     ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins             ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_movement     ENABLE ROW LEVEL SECURITY;
ALTER TABLE food_movement      ENABLE ROW LEVEL SECURITY;
ALTER TABLE courier_parcels    ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicles           ENABLE ROW LEVEL SECURITY;
ALTER TABLE visitors           ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendors            ENABLE ROW LEVEL SECURITY;
ALTER TABLE security_incidents ENABLE ROW LEVEL SECURITY;

-- Allow full anon access (internal dashboard — no auth yet)
DO $$
DECLARE t text;
BEGIN
    FOREACH t IN ARRAY ARRAY[
        'students','student_movement',
        'staffs','staff_movement',
        'admins','admin_movement',
        'food_movement','courier_parcels',
        'vehicles','visitors','vendors','security_incidents'
    ]
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS "allow_all_anon_%s" ON %I', t, t);
        EXECUTE format(
            'CREATE POLICY "allow_all_anon_%s" ON %I FOR ALL TO anon USING (true) WITH CHECK (true)',
            t, t
        );
    END LOOP;
END $$;
