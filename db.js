// ─── Supabase Client ────────────────────────────────────────────
// Shared Supabase client for the Physical Security Dashboard.
// Include this script BEFORE app.js in every HTML page.
// Usage anywhere in JS: window.supabaseClient.from('table').select('*')

(function () {
    const SUPABASE_URL  = 'https://nlrgewdmabepiktnbafz.supabase.co';
    const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5scmdld2RtYWJlcGlrdG5iYWZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxMDg0NjksImV4cCI6MjA5MzY4NDQ2OX0.EOLLeH_we7ufqI1YA7rBsL4KmVaeXSbWbWYXGlUcq_c';

    // Wait for the CDN library to load then initialise
    function tryInit() {
        if (window.supabase && window.supabase.createClient) {
            window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON);
            console.info('[DB] Supabase client ready.');
            document.dispatchEvent(new Event('supabase:ready'));
        } else {
            setTimeout(tryInit, 50);
        }
    }
    tryInit();
})();
