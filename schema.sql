-- Drop tables in reverse order of creation to handle foreign key dependencies
DROP TABLE IF EXISTS guard_rounds CASCADE;
DROP TABLE IF EXISTS reports CASCADE;
DROP TABLE IF EXISTS alerts CASCADE;
DROP TABLE IF EXISTS guards CASCADE;
DROP TABLE IF EXISTS rounds CASCADE;

-- Users table for guards
CREATE TABLE guards (
    id UUID PRIMARY KEY,
    username TEXT UNIQUE,
    password_hash TEXT,
    full_name TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Rounds table
CREATE TABLE rounds (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Guard-Rounds linking table
CREATE TABLE guard_rounds (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    guard_id UUID REFERENCES guards(id),
    round_id UUID REFERENCES rounds(id),
    start_time TIMESTAMPTZ NOT NULL DEFAULT now(),
    end_time TIMESTAMPTZ,
    status TEXT NOT NULL DEFAULT 'active' -- e.g., 'active', 'completed'
);

-- Reports table for Novedades
CREATE TABLE reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    guard_id UUID REFERENCES guards(id),
    round_id UUID, -- Can be null if report is not associated with a specific round
    report_type TEXT NOT NULL,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    description TEXT,
    media_url TEXT, -- URL to the uploaded photo/video in Supabase Storage
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Alerts table
CREATE TABLE alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    alert_type TEXT NOT NULL,
    location_address TEXT,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    description TEXT,
    status TEXT NOT NULL DEFAULT 'pending', -- e.g., 'pending', 'in_progress', 'resolved'
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Comments to guide the user:
-- 1. Go to your Supabase project's SQL Editor.
-- 2. Copy and paste the content of this file into the editor.
-- 3. Click "Run" to create (or re-create) the tables in your database.
--
-- For user authentication, you can use Supabase's built-in `auth.users` table
-- or this custom `guards` table if you need more specific fields.
-- For simplicity, this schema uses a custom `guards` table.
--
-- For file uploads (photos/videos), you'll need to create a Supabase Storage bucket.
-- The `media_url` in the `reports` table will store the public URL of the uploaded file.