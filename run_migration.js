// run_migration.js – Execute the Supabase migration via the Management API
// Usage: node run_migration.js
// Requires Node 18+ (built-in fetch)

const SUPABASE_URL  = 'https://nlrgewdmabepiktnbafz.supabase.co';
const ANON_KEY      = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5scmdld2RtYWJlcGlrdG5iYWZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxMDg0NjksImV4cCI6MjA5MzY4NDQ2OX0.EOLLeH_we7ufqI1YA7rBsL4KmVaeXSbWbWYXGlUcq_c';

// We'll use the supabase-js CDN via a fetch-based approach.
// Since the anon key cannot run raw SQL, we create tables individually
// using the PostgREST schema introspection endpoint to check existence,
// then create via a migration RPC if available.
//
// The safest universal approach for Supabase anon key projects is:
// POST /rest/v1/rpc/<function_name> — but we don't have a custom function yet.
//
// Instead, we use the Supabase postgres REST endpoint via pg direct for migrations.
// Since this script runs locally on Node, we use the @supabase/supabase-js package.

async function main() {
    // Dynamically import supabase-js if installed, else guide user
    let createClient;
    try {
        const mod = await import('@supabase/supabase-js');
        createClient = mod.createClient;
    } catch (e) {
        console.error('Please install: npm install @supabase/supabase-js');
        process.exit(1);
    }

    const supabase = createClient(SUPABASE_URL, ANON_KEY);

    // ── Define tables as objects so we can create them via insert (idempotent) ──
    // Note: anon key cannot run DDL. We verify connectivity and then print
    // the SQL migration for the user to run in the Supabase SQL Editor.

    console.log('\n✅ Checking Supabase connectivity...');
    
    const { data, error } = await supabase.from('students').select('count').limit(1);
    
    if (error && error.code === '42P01') {
        console.log('⚠️  Tables do not exist yet. Run the SQL migration in Supabase SQL Editor.');
        console.log('\nOpening migration instructions...\n');
    } else if (error) {
        console.log('⚠️  Connection check result:', error.message);
    } else {
        console.log('✅ Connected! students table already exists.');
    }

    // Check all tables
    const tables = [
        'students','student_movement','food_movement','courier_parcels',
        'staffs','staff_movement','admins','admin_movement',
        'vehicles','visitors','vendors','security_incidents'
    ];

    console.log('\n── Table Status ──────────────────────────────');
    for (const table of tables) {
        const { error: e } = await supabase.from(table).select('count').limit(1);
        if (!e) {
            console.log(`  ✅ ${table}`);
        } else if (e.code === '42P01') {
            console.log(`  ❌ ${table} — NOT FOUND (needs migration)`);
        } else {
            console.log(`  ⚠️  ${table} — ${e.message}`);
        }
    }

    console.log('\n── Next Step ─────────────────────────────────');
    console.log('Open Supabase SQL Editor at:');
    console.log('  https://supabase.com/dashboard/project/nlrgewdmabepiktnbafz/sql');
    console.log('Paste and run: supabase_migration.sql');
    console.log('─────────────────────────────────────────────\n');
}

main().catch(console.error);
