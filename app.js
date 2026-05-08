// ─── Supabase Initialization ─────────────────────────────────
(function initSupabase() {
    if (!window.supabase) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js';
        script.onload = () => {
            const SUPABASE_URL = 'https://ffyqrursrfvbxeftuzaf.supabase.co';
            const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmeXFydXJzcmZ2YnhlZnR1emFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxMjE2ODQsImV4cCI6MjA5MzY5NzY4NH0.4DFaHG4NlqetI9NYoTDyRlwxzlXtNf1o_5zJexgNj1g';
            window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON);
            document.dispatchEvent(new Event('supabase:ready'));
        };
        document.head.appendChild(script);
    }
})();

// ─── Configuration ───────────────────────────────────────────
const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'layout-dashboard', file: 'index.html' },
    { id: 'day-scholars', label: 'Day Scholars', icon: 'graduation-cap', file: 'modules/day-scholars/ds-students.html' },
    {
        id: 'hostel',
        label: 'Hostel',
        icon: 'building',
        dropdown: [
            { id: 'boys-hostel', label: 'Boys Hostel', icon: 'building-2', file: 'modules/boys-hostel/bh-students.html' },
            { id: 'girls-hostel', label: 'Girls Hostel', icon: 'building', file: 'modules/girls-hostel/gh-students.html' }
        ]
    },
    { id: 'staffs', label: 'Staffs', icon: 'briefcase', file: 'modules/staffs/st-details.html' },
    { id: 'admin', label: 'Admin', icon: 'user-cog', file: 'modules/admin/ad-details.html' },
    { id: 'vehicle', label: 'Vehicle', icon: 'car', file: 'modules/vehicle/vehicle.html' },
    {
        id: 'more',
        label: 'More',
        icon: 'more-horizontal',
        dropdown: [
            { id: 'security', label: 'Security', icon: 'shield-alert', file: 'modules/more/security/sec-siss.html' },
            { id: 'vendors', label: 'Vendors', icon: 'store', file: 'modules/more/vendors.html' },
            { id: 'visitor', label: 'Visitor', icon: 'user-plus', file: 'modules/more/visitor.html' }
        ]
    },
    { id: 'settings', label: 'Settings', icon: 'settings', file: 'modules/settings/settings.html' }
];

const allNavItems = navItems.flatMap(n => n.dropdown ? n.dropdown : [n]);

const subPages = {
    'boys-hostel': [
        { id: 'bh-students', label: 'Student Details', icon: 'users', file: 'modules/boys-hostel/bh-students.html' },
        { id: 'bh-movement', label: 'Student Movement', icon: 'arrow-right-left', file: 'modules/boys-hostel/bh-movement.html' },
        { id: 'bh-food', label: 'Food Movement', icon: 'utensils', file: 'modules/boys-hostel/bh-food.html' },
        { id: 'bh-courier', label: 'Parcel Details', icon: 'package', file: 'modules/boys-hostel/bh-courier.html' }
    ],
    'girls-hostel': [
        { id: 'gh-students', label: 'Student Details', icon: 'users', file: 'modules/girls-hostel/gh-students.html' },
        { id: 'gh-movement', label: 'Student Movement', icon: 'arrow-right-left', file: 'modules/girls-hostel/gh-movement.html' },
        { id: 'gh-food', label: 'Food Movement', icon: 'utensils', file: 'modules/girls-hostel/gh-food.html' },
        { id: 'gh-courier', label: 'Parcel Details', icon: 'package', file: 'modules/girls-hostel/gh-courier.html' }
    ],
    'day-scholars': [
        { id: 'ds-students', label: 'Student Details', icon: 'users', file: 'modules/day-scholars/ds-students.html' },
        { id: 'ds-movement', label: 'Student Movement', icon: 'arrow-right-left', file: 'modules/day-scholars/ds-movement.html' },
        { id: 'ds-food', label: 'Food Movement', icon: 'utensils', file: 'modules/day-scholars/ds-food.html' },
        { id: 'ds-courier', label: 'Parcel Details', icon: 'package', file: 'modules/day-scholars/ds-courier.html' }
    ],
    'staffs': [
        { id: 'st-details', label: 'Staff Details', icon: 'users', file: 'modules/staffs/st-details.html' },
        { id: 'st-movement', label: 'Staff Movement', icon: 'arrow-right-left', file: 'modules/staffs/st-movement.html' },
        { id: 'st-food', label: 'Food Movement', icon: 'utensils', file: 'modules/staffs/st-food.html' },
        { id: 'st-courier', label: 'Parcel Details', icon: 'package', file: 'modules/staffs/st-courier.html' }
    ],
    'admin': [
        { id: 'ad-details', label: 'Admin Details', icon: 'users', file: 'modules/admin/ad-details.html' },
        { id: 'ad-movement', label: 'Admin Movement', icon: 'arrow-right-left', file: 'modules/admin/ad-movement.html' },
        { id: 'ad-food', label: 'Food Movement', icon: 'utensils', file: 'modules/admin/ad-food.html' },
        { id: 'ad-courier', label: 'Parcel Details', icon: 'package', file: 'modules/admin/ad-courier.html' }
    ],
    'security': [
        { id: 'sec-siss', label: 'SISS Security', icon: 'shield', file: 'modules/more/security/sec-siss.html' },
        { id: 'sec-students', label: 'Student Security', icon: 'user-check', file: 'modules/more/security/sec-students.html' }
    ]
};

function getUrl(file) {
    const parts = window.location.pathname.split('/modules/');
    if (parts.length > 1) {
        const depth = parts[1].split('/').length;
        return '../'.repeat(depth) + file;
    }
    return file;
}

// ─── State ───────────────────────────────────────────────────
const path = window.location.pathname;
const filename = path.split('/').pop().replace('.html', '');

let activeNav = 'dashboard';
let activeSubNav = null;

if (filename && filename !== 'index') {
    for (const [topId, subs] of Object.entries(subPages)) {
        const found = subs.find(s => s.id === filename);
        if (found) {
            activeNav = topId;
            activeSubNav = found.id;
            break;
        }
    }
    if (!activeSubNav) {
        const foundTop = allNavItems.find(n => n.id === filename);
        if (foundTop) activeNav = foundTop.id;
    }
}

const state = { activeNav, activeSubNav, isDarkMode: true, charts: [], settingsTab: 'profile' };

window.switchSettingsTab = function(tabId) {
    state.settingsTab = tabId;
    renderContent();
};

// ─── DOM Refs ─────────────────────────────────────────────────
const els = {
    topNav: () => document.getElementById('topNav'),
    sidebarMenu: () => document.getElementById('sidebarMenu'),
    mainContent: () => document.getElementById('mainContent'),
    themeToggle: () => document.getElementById('themeToggle'),
};

// ─── Init ─────────────────────────────────────────────────────
function init() {
    const saved = localStorage.getItem('sc-theme');
    if (saved === 'light') { state.isDarkMode = false; document.documentElement.classList.remove('dark'); }
    renderTopNav();
    renderSidebar();
    renderContent();
    setupEvents();
    lucide.createIcons();
}

// ─── Top Nav ─────────────────────────────────────────────────
function renderTopNav() {
    els.topNav().innerHTML = navItems.map(item => {
        let isActive = state.activeNav === item.id;

        if (item.dropdown) {
            const childActive = item.dropdown.some(d => d.id === state.activeNav || d.id === filename);
            isActive = isActive || childActive;

            const dropHTML = item.dropdown.map(d => `
                <a href="${getUrl(d.file)}" class="block px-4 py-2 hover:bg-white/5 text-sm flex items-center gap-2 ${state.activeNav === d.id ? 'text-brand-blue font-medium' : 'text-slate-300'}">
                    <i data-lucide="${d.icon}" style="width:13px;height:13px;"></i> ${d.label}
                </a>
            `).join('');

            return `<div class="relative group">
                <button class="nav-pill ${isActive ? 'nav-pill-active' : ''} flex items-center gap-1.5 transition-colors">
                    <i data-lucide="${item.icon}" style="width:13px;height:13px;"></i>
                    ${item.label}
                    <i data-lucide="chevron-down" style="width:12px;height:12px;margin-left:2px;opacity:0.7"></i>
                </button>
                <div class="absolute top-full left-0 mt-1 hidden group-hover:block bg-navy-800 border border-white/10 rounded-lg shadow-xl min-w-[160px] z-50 py-1 overflow-hidden">
                    ${dropHTML}
                </div>
            </div>`;
        }

        return `<button class="nav-pill ${isActive ? 'nav-pill-active' : ''}" onclick="window.location.href='${getUrl(item.file)}'">
            <i data-lucide="${item.icon}" style="width:13px;height:13px;"></i>
            ${item.label}
        </button>`;
    }).join('');
    lucide.createIcons({ nodes: els.topNav().querySelectorAll('[data-lucide]') });
}

// ─── Sidebar ─────────────────────────────────────────────────
function renderSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;

    // Remove separator line from body content and match background
    sidebar.classList.remove('border-r', 'border-white/5', 'bg-navy-800');
    sidebar.classList.add('bg-transparent');

    const subs = subPages[state.activeNav] || [];

    let html = `<div class="flex-1 flex flex-col items-center gap-0.5 w-full overflow-y-auto custom-scrollbar" id="sidebarMenu">`;
    html += subs.map(item => {
        const active = state.activeSubNav === item.id;
        return `<button class="sidebar-icon-btn ${active ? 'active' : ''}" title="${item.label}" onclick="window.location.href='${getUrl(item.file)}'">
            <i data-lucide="${item.icon}" style="width:16px;height:16px;"></i>
        </button>`;
    }).join('');
    html += `</div>`;

    // Theme Toggles
    html += `
    <div class="flex flex-col items-center gap-3 w-full pt-4 pb-2">
        <button id="themeLight" class="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-colors" title="Light Mode">
            <i data-lucide="sun" class="w-4 h-4"></i>
        </button>
        <button id="themeDark" class="w-8 h-8 rounded-full bg-brand-blue flex items-center justify-center text-white shadow-lg shadow-brand-blue/20" title="Dark Mode">
            <i data-lucide="moon" class="w-4 h-4"></i>
        </button>
    </div>
    `;

    sidebar.innerHTML = html;
    lucide.createIcons({ nodes: sidebar.querySelectorAll('[data-lucide]') });
}

// ─── Content Router ──────────────────────────────────────────
function renderGlobalPageHeader() {
    let headerContainer = document.getElementById('pageHeaderContainer');
    if (!headerContainer) {
        const workspace = document.querySelector('.flex.flex-1.overflow-hidden');
        if (workspace) {
            headerContainer = document.createElement('div');
            headerContainer.id = 'pageHeaderContainer';
            // Match padding with top nav (px-5)
            headerContainer.className = 'px-5 pt-5 pb-2 shrink-0 z-10 relative';
            workspace.parentNode.insertBefore(headerContainer, workspace);
        }
    }
    if (headerContainer) {
        headerContainer.innerHTML = getPageHeaderHTML();
        lucide.createIcons({ nodes: headerContainer.querySelectorAll('[data-lucide]') });
    }
}

function renderContent() {
    state.charts.forEach(c => c.destroy());
    state.charts = [];

    renderGlobalPageHeader();
    const main = els.mainContent();
    if (!main) return;

    // Inject HTML dynamically
    if (filename === 'index' || filename === 'dashboard') {
        main.innerHTML = getDashboardHTML();
        setTimeout(initCharts, 50);
    } else if (filename.includes('-movement')) {
        main.innerHTML = getMovementHTML();
        fetchDataForCurrentPage();
    } else if (filename.includes('-food')) {
        main.innerHTML = getFoodHTML();
        fetchDataForCurrentPage();
    } else if (filename.includes('-courier')) {
        main.innerHTML = getCourierHTML();
        fetchDataForCurrentPage();
    } else if (filename.includes('-students')) {
        main.innerHTML = getStudentsHTML();
        fetchDataForCurrentPage();
    } else if (filename.includes('-details')) {
        main.innerHTML = getDetailsHTML();
        fetchDataForCurrentPage();
    } else if (filename === 'vendors') {
        main.innerHTML = getVendorsHTML();
        fetchDataForCurrentPage();
    } else if (filename === 'visitor') {
        main.innerHTML = getVisitorHTML();
        fetchDataForCurrentPage();
    } else if (filename === 'sec-siss') {
        main.innerHTML = getSecSissHTML();
        fetchDataForCurrentPage();
    } else if (filename === 'sec-students') {
        main.innerHTML = getSecStudentsHTML();
        fetchDataForCurrentPage();
    } else if (filename.includes('-students')) {
        main.innerHTML = getStudentsHTML();
        fetchDataForCurrentPage();
    } else if (filename.includes('-details')) {
        main.innerHTML = getDetailsHTML();
        fetchDataForCurrentPage();
    } else if (filename === 'vendors') {
        main.innerHTML = getVendorsHTML();
        fetchDataForCurrentPage();
    } else if (filename === 'visitor') {
        main.innerHTML = getVisitorHTML();
        fetchDataForCurrentPage();
    } else if (filename === 'sec-siss') {
        main.innerHTML = getSecSissHTML();
        fetchDataForCurrentPage();
    } else if (filename === 'sec-students') {
        main.innerHTML = getSecStudentsHTML();
        fetchDataForCurrentPage();
    } else if (filename === 'vehicle') {
        main.innerHTML = getVehicleHTML();
        fetchDataForCurrentPage();
    } else if (filename === 'settings') {
        main.innerHTML = getSettingsHTML();
    } else {
        main.innerHTML = getPlaceholderHTML({ label: filename.replace(/-/g, ' ').toUpperCase(), icon: 'box' });
    }

    // Append universal footer to all pages
    main.insertAdjacentHTML('beforeend', renderFooter());

    lucide.createIcons({ nodes: main.querySelectorAll('[data-lucide]') });
}

async function fetchDataForCurrentPage() {
    if (!window.supabaseClient) {
        document.addEventListener('supabase:ready', fetchDataForCurrentPage, { once: true });
        return;
    }
    
    const db = window.supabaseClient;
    const tbody = document.getElementById('tableBody');
    if (!tbody) return;

    try {
        let table = '';
        let htmlMapper = null;
        let colspan = 5;

        // Routing logic to map activeNav and filename to table names and mappers
        if (state.activeNav === 'day-scholars') {
            if (filename.includes('-students')) {
                table = 'ds_students'; colspan = 6;
                htmlMapper = (r, i) => `<tr>
                    <td>${i + 1}</td>
                    <td>${r.enrolment_no || '-'}</td>
                    <td>${r.full_name || '-'}</td>
                    <td>${r.program_name || '-'}</td>
                    <td>${r.phone_number || '-'}</td>
                    <td>${formatDateTime(r.created_at)}</td>
                </tr>`;
            } else if (filename.includes('-movement')) {
                table = 'ds_movement'; colspan = 9;
                htmlMapper = (r, i) => `<tr>
                    <td>${i + 1}</td>
                    <td>${r.enrolment_no || '-'}</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>${r.reason_for_exit || '-'}</td>
                    <td>${formatDateTime(r.time_out)}</td>
                    <td>${formatDateTime(r.time_in)}</td>
                    <td>${r.incharge_guard || '-'}</td>
                </tr>`;
            } else if (filename.includes('-food')) {
                table = 'ds_food'; colspan = 5;
                htmlMapper = (r) => `<tr>
                    <td>${r.enrolment_no || '-'}</td>
                    <td>${r.meal_category || '-'}</td>
                    <td>${r.food_items || '-'}</td>
                    <td>${formatTime(r.delivery_timestamp)}</td>
                    <td><span class="status-badge ${r.collection_status === 'Collected' ? 's-resolved' : 's-pending'}">${r.collection_status || 'Pending'}</span></td>
                </tr>`;
            } else if (filename.includes('-courier')) {
                table = 'ds_courier'; colspan = 5;
                htmlMapper = (r) => `<tr>
                    <td>${r.enrolment_no || '-'}</td>
                    <td>${r.courier_company || '-'}</td>
                    <td>${r.tracking_id || '-'}</td>
                    <td>${formatTime(r.received_at)}</td>
                    <td><span class="status-badge ${r.delivery_status === 'Waiting' ? 's-pending' : 's-resolved'}">${r.delivery_status || 'Waiting'}</span></td>
                </tr>`;
            }
        } else if (state.activeNav === 'boys-hostel') {
            if (filename.includes('-students')) {
                table = 'bh_students'; colspan = 6;
                htmlMapper = (r, i) => `<tr>
                    <td>${i + 1}</td>
                    <td>${r.enrolment_no || '-'}</td>
                    <td>${r.student_name || '-'}</td>
                    <td>${r.room_number || '-'}</td>
                    <td>${r.contact_no || '-'}</td>
                    <td>${formatDateTime(r.created_at)}</td>
                </tr>`;
            } else if (filename.includes('-movement')) {
                table = 'bh_movement'; colspan = 7;
                htmlMapper = (r, i) => `<tr>
                    <td>${i + 1}</td>
                    <td>${r.room_number || '-'}</td>
                    <td>${r.student_name || '-'}</td>
                    <td>${r.purpose || '-'}</td>
                    <td>${formatDateTime(r.out_time)}</td>
                    <td>${formatDateTime(r.in_time)}</td>
                    <td>${r.logged_by || '-'}</td>
                </tr>`;
            } else if (filename.includes('-food')) {
                table = 'bh_food'; colspan = 5;
                htmlMapper = (r) => `<tr>
                    <td>${r.enrolment_no || '-'}</td>
                    <td>${r.meal_type || '-'}</td>
                    <td>${r.description || '-'}</td>
                    <td>${formatTime(r.arrival_time)}</td>
                    <td><span class="status-badge ${r.is_collected ? 's-resolved' : 's-pending'}">${r.is_collected ? 'Collected' : 'Pending'}</span></td>
                </tr>`;
            } else if (filename.includes('-courier')) {
                table = 'bh_courier'; colspan = 5;
                htmlMapper = (r) => `<tr>
                    <td>${r.enrolment_no || '-'}</td>
                    <td>${r.service_provider || '-'}</td>
                    <td>${r.awb_number || '-'}</td>
                    <td>${formatTime(r.reception_time)}</td>
                    <td><span class="status-badge ${r.status === 'Waiting' ? 's-pending' : 's-resolved'}">${r.status || 'Waiting'}</span></td>
                </tr>`;
            }
        } else if (state.activeNav === 'girls-hostel') {
             if (filename.includes('-students')) {
                table = 'gh_students'; colspan = 6;
                htmlMapper = (r, i) => `<tr>
                    <td>${i + 1}</td>
                    <td>${r.enrolment_no || '-'}</td>
                    <td>${r.name || '-'}</td>
                    <td>${r.wing_room || '-'}</td>
                    <td>${r.emergency_phone || '-'}</td>
                    <td>${formatDateTime(r.created_at)}</td>
                </tr>`;
            } else if (filename.includes('-movement')) {
                table = 'gh_movement'; colspan = 7;
                htmlMapper = (r, i) => `<tr>
                    <td>${i + 1}</td>
                    <td>${r.wing_room || '-'}</td>
                    <td>${r.student_name || '-'}</td>
                    <td>${r.reason || '-'}</td>
                    <td>${formatDateTime(r.time_out)}</td>
                    <td>${formatDateTime(r.time_in)}</td>
                    <td>${r.duty_officer || '-'}</td>
                </tr>`;
            } else if (filename.includes('-food')) {
                table = 'gh_food'; colspan = 5;
                htmlMapper = (r) => `<tr>
                    <td>${r.student_id || '-'}</td>
                    <td>${r.meal_period || '-'}</td>
                    <td>${r.item_list || '-'}</td>
                    <td>${formatTime(r.timestamp)}</td>
                    <td><span class="status-badge ${r.status === 'Arrived' ? 's-resolved' : 's-pending'}">${r.status || 'Pending'}</span></td>
                </tr>`;
            } else if (filename.includes('-courier')) {
                table = 'gh_courier'; colspan = 5;
                htmlMapper = (r) => `<tr>
                    <td>${r.student_id || '-'}</td>
                    <td>${r.carrier || '-'}</td>
                    <td>${r.tracking_code || '-'}</td>
                    <td>${formatTime(r.received_on)}</td>
                    <td><span class="status-badge ${r.current_status === 'Waiting' ? 's-pending' : 's-resolved'}">${r.current_status || 'Waiting'}</span></td>
                </tr>`;
            }
        } else if (state.activeNav === 'staffs') {
            if (filename.includes('-details')) {
                table = 'st_details'; colspan = 6;
                htmlMapper = (r, i) => `<tr>
                    <td>${i + 1}</td>
                    <td>${r.staff_id || '-'}</td>
                    <td>${r.name || '-'}</td>
                    <td>${r.dept || '-'}</td>
                    <td>${r.designation || '-'}</td>
                    <td>${r.phone || '-'}</td>
                </tr>`;
            } else if (filename.includes('-movement')) {
                table = 'st_movement'; colspan = 6;
                htmlMapper = (r, i) => `<tr>
                    <td>${i + 1}</td>
                    <td>${r.staff_id || '-'}</td>
                    <td>${formatDateTime(r.departure)}</td>
                    <td>${formatDateTime(r.return_time)}</td>
                    <td>${r.destination || '-'}</td>
                    <td>${r.authorized_by || '-'}</td>
                </tr>`;
            } else if (filename.includes('-food')) {
                table = 'st_food'; colspan = 5;
                htmlMapper = (r) => `<tr>
                    <td>${r.staff_id || '-'}</td>
                    <td>${r.meal_type || '-'}</td>
                    <td>${r.order_details || '-'}</td>
                    <td>${formatTime(r.arrival)}</td>
                    <td><span class="status-badge s-pending">${r.status || 'Pending'}</span></td>
                </tr>`;
            } else if (filename.includes('-courier')) {
                table = 'st_courier'; colspan = 5;
                htmlMapper = (r) => `<tr>
                    <td>${r.staff_id || '-'}</td>
                    <td>${r.courier_name || '-'}</td>
                    <td>${r.ref_no || '-'}</td>
                    <td>${formatTime(r.received_at)}</td>
                    <td><span class="status-badge s-pending">${r.disposition || 'Waiting'}</span></td>
                </tr>`;
            }
        } else if (state.activeNav === 'admin') {
            if (filename.includes('-details')) {
                table = 'ad_details'; colspan = 5;
                htmlMapper = (r, i) => `<tr>
                    <td>${i + 1}</td>
                    <td>${r.admin_id || '-'}</td>
                    <td>${r.name || '-'}</td>
                    <td>${r.office_ext || '-'}</td>
                    <td>${r.mobile || '-'}</td>
                </tr>`;
            } else if (filename.includes('-movement')) {
                table = 'ad_movement'; colspan = 6;
                htmlMapper = (r, i) => `<tr>
                    <td>${i + 1}</td>
                    <td>${r.admin_id || '-'}</td>
                    <td>${formatDateTime(r.exit_time)}</td>
                    <td>${formatDateTime(r.entry_time)}</td>
                    <td>${r.purpose || '-'}</td>
                    <td>${r.remarks || '-'}</td>
                </tr>`;
            } else if (filename.includes('-food')) {
                table = 'ad_food'; colspan = 5;
                htmlMapper = (r) => `<tr>
                    <td>${r.admin_id || '-'}</td>
                    <td>${r.meal || '-'}</td>
                    <td>${r.source || '-'}</td>
                    <td>${formatTime(r.received_time)}</td>
                    <td><span class="status-badge s-pending">${r.status || 'Pending'}</span></td>
                </tr>`;
            } else if (filename.includes('-courier')) {
                table = 'ad_courier'; colspan = 5;
                htmlMapper = (r) => `<tr>
                    <td>${r.admin_id || '-'}</td>
                    <td>${r.sender || '-'}</td>
                    <td>${r.parcel_id || '-'}</td>
                    <td>${formatTime(r.logged_time)}</td>
                    <td><span class="status-badge s-pending">${r.status || 'Waiting'}</span></td>
                </tr>`;
            }
        } else if (filename === 'vehicle') {
            table = 'vehicles_log'; colspan = 10;
            htmlMapper = (r, i) => `<tr>
                <td>${i + 1}</td>
                <td>${r.plate_number || '-'}</td>
                <td>${r.owner_name || '-'}</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>${r.vehicle_type || '-'}</td>
                <td>${formatTime(r.check_in)}</td>
                <td>${formatTime(r.check_out)}</td>
                <td>${r.gate_no || '-'}</td>
            </tr>`;
        } else if (filename === 'vendors') {
            table = 'vendors_log'; colspan = 6;
            htmlMapper = (r, i) => `<tr>
                <td>${i + 1}</td>
                <td>${r.vendor_company || '-'}</td>
                <td>${r.delivery_type || '-'}</td>
                <td>${r.vehicle_no || '-'}</td>
                <td>${formatTime(r.entry_time)}</td>
                <td>${formatTime(r.exit_time)}</td>
            </tr>`;
        } else if (filename === 'visitor') {
            table = 'visitors_log'; colspan = 6;
            htmlMapper = (r, i) => `<tr>
                <td>${i + 1}</td>
                <td>${r.visitor_name || '-'}</td>
                <td>${r.id_proof_type || '-'}</td>
                <td>${r.whom_to_meet || '-'}</td>
                <td>${formatTime(r.entry_time)}</td>
                <td>${formatTime(r.exit_time)}</td>
            </tr>`;
        } else if (filename === 'sec-siss') {
            table = 'security_incidents_siss'; colspan = 6;
            htmlMapper = (r, i) => `<tr>
                <td>${i + 1}</td>
                <td>${r.incident_type || '-'}</td>
                <td>${r.location_code || '-'}</td>
                <td>${r.severity_level || '-'}</td>
                <td>${r.description || '-'}</td>
                <td><span class="status-badge s-pending">${r.status || 'Open'}</span></td>
            </tr>`;
        } else if (filename === 'sec-students') {
            table = 'security_incidents_students'; colspan = 6;
            htmlMapper = (r, i) => `<tr>
                <td>${i + 1}</td>
                <td>${r.student_id || '-'}</td>
                <td>${r.violation_type || '-'}</td>
                <td>${r.action_taken || '-'}</td>
                <td>${r.reported_by || '-'}</td>
                <td>${formatDateTime(r.timestamp)}</td>
            </tr>`;
        }

        if (!table) {
            tbody.innerHTML = `<tr><td colspan="${colspan}" class="empty-message">Module data source not mapped or still in development.</td></tr>`;
            return;
        }

        const { data: records, error } = await db.from(table).select('*');
        if (error) throw error;
        
        const recordsData = records || [];

        if (recordsData.length === 0) {
            tbody.innerHTML = `<tr><td colspan="${colspan}" class="empty-message">No records found.</td></tr>`;
        } else {
            tbody.innerHTML = recordsData.map(htmlMapper).join('');
        }

    } catch (err) {
        console.error('Data fetch error:', err);
        tbody.innerHTML = `<tr><td colspan="10" class="empty-message text-red-400">Error loading data. ${err.message}</td></tr>`;
    }
}

function formatTime(isoString) {
    if (!isoString) return '--:--';
    const d = new Date(isoString);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function formatDateTime(isoString) {
    if (!isoString) return '--';
    const d = new Date(isoString);
    return d.toLocaleDateString([], { day: '2-digit', month: 'short' }) + ' ' +
           d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function renderFooter() {
    return `
    <footer class="mt-auto border-t border-white/5 pt-8 pb-4 w-full text-xs text-slate-400 font-sans z-20">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="flex flex-col gap-2">
                <h3 class="text-[#0ea5e9] font-bold text-sm mb-1">Rashtriya Raksha University</h3>
                <p>Puducherry Campus, Pondicherry Institute of Hotel Management & Catering Technology [PIHMCT]</p>
                <p>Opp To Mahalakshmi Nagar, Murungapakkam, Puducherry – 605004</p>
            </div>
            <div class="flex flex-col gap-2">
                <h3 class="text-[#0ea5e9] font-bold text-sm mb-1">Contact</h3>
                <p>Email: ro1.py@rru.ac.in</p>
                <p>Phone: 7305522199</p>
            </div>
            <div class="flex flex-col gap-2">
                <h3 class="text-[#0ea5e9] font-bold text-sm mb-1">Follow</h3>
                <a href="https://www.instagram.com/rru.puducherrycampus/" target="_blank" class="hover:text-white transition-colors w-fit">Instagram</a>
                <a href="https://www.linkedin.com/company/rashtriya-raksha-university-puducherry-campus/posts/?feedView=all" target="_blank" class="hover:text-white transition-colors w-fit">LinkedIn</a>
            </div>
        </div>
    </footer>`;
}

function getPageHeaderHTML() {
    return `
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-5 fade-up">
        <div>
            <h1 class="text-xl font-bold text-slate-100 tracking-tight">Rashtriya Raksha University Command Center</h1>
            <p class="text-xs text-slate-500 mt-1">Real-time insights into campus security, incidents, and access activity.</p>
        </div>
    </div>`;
}

function getPlaceholderHTML(item) {
    return `<div class="flex-1 flex flex-col items-center justify-center text-center py-20">
        <div class="w-16 h-16 rounded-2xl flex items-center justify-center mb-5" style="background:rgba(59,111,247,0.1);">
            <i data-lucide="${item.icon}" style="width:32px;height:32px;color:#3b6ff7;"></i>
        </div>
        <h2 class="text-xl font-bold text-slate-100 mb-2">${item.label}</h2>
        <p class="text-slate-500 text-sm">This module is under development.</p>
    </div>`;
}

// ─── Table Toolbar Component ──────────────────────────────────────────────
window.downloadTemplate = function(type) {
    alert("Downloading CSV template for " + type + "...");
};
window.triggerImport = function(type) {
    alert("Triggering bulk CSV import for " + type + "...");
};
window.exportData = function(type) {
    alert("Exporting current " + type + " records to CSV...");
};

function getTableToolbarHTML(modalType, addLabel) {
    return `
    <div class="flex flex-wrap items-center justify-end gap-2 md:gap-3">
        <div class="relative hidden lg:block mr-2">
            <i data-lucide="search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"></i>
            <input type="text" placeholder="Search records..." class="bg-navy-900 border border-white/10 rounded-lg pl-9 pr-4 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-brand-blue transition-colors w-48 shadow-inner">
        </div>
        <button onclick="downloadTemplate('${modalType}')" class="bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-xs font-semibold py-1.5 px-2.5 md:px-3 rounded flex items-center gap-1.5 transition-colors" title="Download Template">
            <i data-lucide="download-cloud" style="width:14px;height:14px;"></i> <span class="hidden md:inline">Template</span>
        </button>
        <button onclick="triggerImport('${modalType}')" class="bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-xs font-semibold py-1.5 px-2.5 md:px-3 rounded flex items-center gap-1.5 transition-colors" title="Import CSV">
            <i data-lucide="file-up" style="width:14px;height:14px;"></i> <span class="hidden md:inline">Import</span>
        </button>
        <button onclick="exportData('${modalType}')" class="bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-xs font-semibold py-1.5 px-2.5 md:px-3 rounded flex items-center gap-1.5 transition-colors" title="Export CSV">
            <i data-lucide="file-down" style="width:14px;height:14px;"></i> <span class="hidden md:inline">Export</span>
        </button>
        <button onclick="openModal('${modalType}')" class="bg-brand-blue hover:bg-blue-600 text-white text-xs font-semibold py-1.5 px-3 rounded flex items-center gap-1.5 transition-colors shadow-lg shadow-brand-blue/20 shrink-0">
            <i data-lucide="plus" style="width:14px;height:14px;"></i> ${addLabel}
        </button>
    </div>
    `;
}

function getMovementHTML() {
    const isDS  = state.activeNav === 'day-scholars';
    const isBH  = state.activeNav === 'boys-hostel';
    const isGH  = state.activeNav === 'girls-hostel';
    const isHostel = isBH || isGH;
    const isStaff  = state.activeNav === 'staffs';
    const isAdmin  = state.activeNav === 'admin';

    let title = 'Student Movement Log';
    if (isStaff) title = 'Staff Movement Log';
    else if (isAdmin) title = 'Admin Movement Log';
    else if (isDS)  title = 'Day Scholar Movement Log';
    else if (isBH)  title = 'Boys Hostel Movement Log';
    else if (isGH)  title = 'Girls Hostel Movement Log';

    let headersHTML = '';
    let defaultColspan = '5';

    if (isDS) {
        defaultColspan = '9';
        headersHTML = `
            <th class="text-left">S.No</th>
            <th class="text-left">Enrolment No.</th>
            <th class="text-left">Name</th>
            <th class="text-left">Program</th>
            <th class="text-left">Permitted By</th>
            <th class="text-left">Reason</th>
            <th class="text-left">Check-Out</th>
            <th class="text-left">Check-In</th>
            <th class="text-left">Incharge</th>`;
    } else if (isHostel) {
        defaultColspan = '7';
        headersHTML = `
            <th class="text-left">S.No</th>
            <th class="text-left">Room No.</th>
            <th class="text-left">Name</th>
            <th class="text-left">Reason</th>
            <th class="text-left">Check-Out</th>
            <th class="text-left">Check-In</th>
            <th class="text-left">Incharge</th>`;
    } else if (isStaff) {
        headersHTML = `
            <th class="text-left">S.No</th>
            <th class="text-left">Staff ID</th>
            <th class="text-left">Time Out</th>
            <th class="text-left">Time In</th>
            <th class="text-left">Purpose</th>`;
    } else if (isAdmin) {
        headersHTML = `
            <th class="text-left">S.No</th>
            <th class="text-left">Admin ID</th>
            <th class="text-left">Time Out</th>
            <th class="text-left">Time In</th>
            <th class="text-left">Purpose</th>`;
    } else {
        headersHTML = `
            <th class="text-left">S.No</th>
            <th class="text-left">Student ID</th>
            <th class="text-left">Time Out</th>
            <th class="text-left">Time In</th>
            <th class="text-left">Purpose</th>`;
    }

    return `<div class="dash-card p-5 fade-up">
        <div class="flex justify-between items-center mb-5">
            <h2 class="text-lg font-bold text-slate-100">${title}</h2>
            ${getTableToolbarHTML('movement', 'Log Movement')}
        </div>
        <div class="overflow-x-auto">
            <table class="inc-table w-full whitespace-nowrap">
                <thead><tr>${headersHTML}</tr></thead>
                <tbody id="tableBody">
                    <tr><td colspan="${defaultColspan}" class="text-center text-slate-500 py-4">Loading data...</td></tr>
                </tbody>
            </table>
        </div>
    </div>`;
}

function getVehicleHTML() {
    return `<div class="dash-card p-5 fade-up">
        <div class="flex justify-between items-center mb-5">
            <h2 class="text-lg font-bold text-slate-100">Vehicle Log</h2>
            ${getTableToolbarHTML('vehicle', 'Log Vehicle')}
        </div>
        <div class="overflow-x-auto">
            <table class="inc-table w-full whitespace-nowrap">
                <thead style="color: white;">
                    <tr>
                        <th class="text-left" style="color: white;">S.No</th>
                        <th class="text-left" style="color: white;">Vehicle Number</th>
                        <th class="text-left" style="color: white;">Name</th>
                        <th class="text-left" style="color: white;">Phone Number</th>
                        <th class="text-left" style="color: white;">Designation</th>
                        <th class="text-left" style="color: white;">Reason</th>
                        <th class="text-left" style="color: white;">Vehicle Type</th>
                        <th class="text-left" style="color: white;">Check-in</th>
                        <th class="text-left" style="color: white;">Check-out</th>
                        <th class="text-left" style="color: white;">Incharge</th>
                    </tr>
                </thead>
                <tbody id="tableBody">
                    <tr><td colspan="10" class="text-center text-slate-500 py-4">Loading data...</td></tr>
                </tbody>
            </table>
        </div>
    </div>`;
}

function getFoodHTML() {
    const isStaff = state.activeNav === 'staffs';
    const isAdmin = state.activeNav === 'admin';
    const idLabel = isStaff ? 'Staff ID' : (isAdmin ? 'Admin ID' : 'Student ID');

    return `<div class="dash-card p-5 fade-up">
        <div class="flex justify-between items-center mb-5">
            <h2 class="text-lg font-bold text-slate-100">Food Movement</h2>
            ${getTableToolbarHTML('food', 'Add Entry')}
        </div>
        <div class="overflow-x-auto">
            <table class="inc-table w-full">
                <thead>
                    <tr>
                        <th class="text-left">${idLabel}</th>
                        <th class="text-left">Meal Type</th>
                        <th class="text-left">Items</th>
                        <th class="text-left">Arrival Time</th>
                        <th class="text-left">Status</th>
                    </tr>
                </thead>
                <tbody id="tableBody">
                    <tr><td colspan="5" class="text-center text-slate-500 py-4">Loading data...</td></tr>
                </tbody>
            </table>
        </div>
    </div>`;
}

function getCourierHTML() {
    const isStaff = state.activeNav === 'staffs';
    const isAdmin = state.activeNav === 'admin';
    const idLabel = isStaff ? 'Staff ID' : (isAdmin ? 'Admin ID' : 'Student ID');

    return `<div class="dash-card p-5 fade-up">
        <div class="flex justify-between items-center mb-5">
            <h2 class="text-lg font-bold text-slate-100">Parcel Details</h2>
            ${getTableToolbarHTML('courier', 'Log Parcel')}
        </div>
        <div class="overflow-x-auto">
            <table class="inc-table w-full">
                <thead>
                    <tr>
                        <th class="text-left">${idLabel}</th>
                        <th class="text-left">Courier Service</th>
                        <th class="text-left">Tracking No.</th>
                        <th class="text-left">Received Time</th>
                        <th class="text-left">Status</th>
                    </tr>
                </thead>
                <tbody id="tableBody">
                    <tr><td colspan="5" class="text-center text-slate-500 py-4">Loading data...</td></tr>
                </tbody>
            </table>
        </div>
    </div>`;
}
function getStudentsHTML() {
    let typeLabel = "Program";
    if (state.activeNav === 'boys-hostel') typeLabel = "Room Number";
    if (state.activeNav === 'girls-hostel') typeLabel = "Wing/Room";
    
    return `<div class="dash-card p-5 fade-up">
        <div class="flex justify-between items-center mb-5">
            <h2 class="text-lg font-bold text-slate-100">Student Directory</h2>
            ${getTableToolbarHTML('student', 'Add Student')}
        </div>
        <div class="overflow-x-auto">
            <table class="inc-table w-full">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Enrolment No</th>
                        <th>Name</th>
                        <th>${typeLabel}</th>
                        <th>Contact No</th>
                        <th>Registered On</th>
                    </tr>
                </thead>
                <tbody id="tableBody"></tbody>
            </table>
        </div>
    </div>`;
}

function getDetailsHTML() {
    const isStaff = state.activeNav === 'staffs';
    const idLabel = isStaff ? 'Staff ID' : 'Admin ID';
    
    return `<div class="dash-card p-5 fade-up">
        <div class="flex justify-between items-center mb-5">
            <h2 class="text-lg font-bold text-slate-100">${isStaff ? 'Staff' : 'Admin'} Details</h2>
            ${getTableToolbarHTML('details', 'Add Entry')}
        </div>
        <div class="overflow-x-auto">
            <table class="inc-table w-full">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>${idLabel}</th>
                        <th>Name</th>
                        <th>${isStaff ? 'Department' : 'Office Ext'}</th>
                        <th>${isStaff ? 'Designation' : 'Mobile'}</th>
                        ${isStaff ? '<th>Phone</th>' : ''}
                    </tr>
                </thead>
                <tbody id="tableBody"></tbody>
            </table>
        </div>
    </div>`;
}

function getVendorsHTML() {
    return `<div class="dash-card p-5 fade-up">
        <div class="flex justify-between items-center mb-5">
            <h2 class="text-lg font-bold text-slate-100">Vendor Logs</h2>
            ${getTableToolbarHTML('vendor', 'Add Vendor')}
        </div>
        <div class="overflow-x-auto">
            <table class="inc-table w-full">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Vendor Company</th>
                        <th>Delivery Type</th>
                        <th>Vehicle No</th>
                        <th>Entry Time</th>
                        <th>Exit Time</th>
                    </tr>
                </thead>
                <tbody id="tableBody"></tbody>
            </table>
        </div>
    </div>`;
}

function getVisitorHTML() {
    return `<div class="dash-card p-5 fade-up">
        <div class="flex justify-between items-center mb-5">
            <h2 class="text-lg font-bold text-slate-100">Visitor Logs</h2>
            ${getTableToolbarHTML('visitor', 'Add Visitor')}
        </div>
        <div class="overflow-x-auto">
            <table class="inc-table w-full">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Visitor Name</th>
                        <th>ID Proof Type</th>
                        <th>Whom To Meet</th>
                        <th>Entry Time</th>
                        <th>Exit Time</th>
                    </tr>
                </thead>
                <tbody id="tableBody"></tbody>
            </table>
        </div>
    </div>`;
}

function getSecSissHTML() {
    return `<div class="dash-card p-5 fade-up">
        <div class="flex justify-between items-center mb-5">
            <h2 class="text-lg font-bold text-slate-100">SISS Security Incidents</h2>
            ${getTableToolbarHTML('incident', 'Report Incident')}
        </div>
        <div class="overflow-x-auto">
            <table class="inc-table w-full">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Incident Type</th>
                        <th>Location Code</th>
                        <th>Severity</th>
                        <th>Description</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody id="tableBody"></tbody>
            </table>
        </div>
    </div>`;
}

function getSecStudentsHTML() {
    return `<div class="dash-card p-5 fade-up">
        <div class="flex justify-between items-center mb-5">
            <h2 class="text-lg font-bold text-slate-100">Student Violations</h2>
            ${getTableToolbarHTML('violation', 'Report Violation')}
        </div>
        <div class="overflow-x-auto">
            <table class="inc-table w-full">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Student ID</th>
                        <th>Violation Type</th>
                        <th>Action Taken</th>
                        <th>Reported By</th>
                        <th>Timestamp</th>
                    </tr>
                </thead>
                <tbody id="tableBody"></tbody>
            </table>
        </div>
    </div>`;
}

function getSettingsHTML() {
    const tabs = [
        { id: 'profile', label: 'Admin Profile', icon: 'user' },
        { id: 'password', label: 'Change Password', icon: 'lock' },
        { id: 'application', label: 'Application Settings', icon: 'settings' },
        { id: 'security', label: 'Security Settings', icon: 'shield' }
    ];

    const tabListHTML = tabs.map(t => {
        const isActive = state.settingsTab === t.id;
        const activeClass = isActive ? 'bg-white/5 text-brand-blue font-medium border-l-2 border-brand-blue' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border-l-2 border-transparent';
        const iconClass = isActive ? 'text-brand-blue' : 'text-slate-500';
        return `
            <button onclick="switchSettingsTab('${t.id}')" class="w-full text-left flex items-center gap-3 px-4 py-3 text-sm transition-colors ${activeClass}">
                <i data-lucide="${t.icon}" class="w-4 h-4 ${iconClass}"></i>
                ${t.label}
            </button>
        `;
    }).join('');

    let contentHTML = '';
    if (state.settingsTab === 'profile') contentHTML = getSettingsProfileHTML();
    else if (state.settingsTab === 'password') contentHTML = getSettingsPasswordHTML();
    else if (state.settingsTab === 'application') contentHTML = getSettingsApplicationHTML();
    else if (state.settingsTab === 'security') contentHTML = getSettingsSecurityHTML();
    else contentHTML = `<div class="dash-card p-8 flex flex-col items-center justify-center fade-up"><i data-lucide="wrench" class="w-12 h-12 text-slate-500 mb-4"></i><p class="text-slate-400">This settings module is under development.</p></div>`;

    return `
    <div class="flex items-center gap-3 mb-6 fade-up">
        <h2 class="text-2xl font-bold text-brand-blue">System Settings</h2>
    </div>
    
    <div class="flex flex-col md:flex-row gap-6">
        <!-- Settings Sidebar -->
        <div class="w-full md:w-64 shrink-0 fade-up">
            <div class="dash-card py-2 overflow-hidden shadow-lg shadow-black/20">
                ${tabListHTML}
            </div>
        </div>
        
        <!-- Settings Content -->
        <div class="flex-1 w-full min-w-0">
            ${contentHTML}
        </div>
    </div>
    </div>`;
}

function getSettingsProfileHTML() {
    return `<div class="dash-card p-6 md:p-8 fade-up shadow-lg shadow-black/20">
        <div class="flex items-center gap-4 mb-8">
            <div class="w-16 h-16 rounded-full bg-brand-blue flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-brand-blue/20 shrink-0">C</div>
            <div>
                <h3 class="text-xl font-bold text-slate-100">CD PY</h3>
                <p class="text-sm text-slate-400">Campus Director User</p>
                <p class="text-sm text-slate-400">cdpy@rru.ac.in</p>
            </div>
        </div>

        <h4 class="text-brand-blue font-semibold mb-6 border-b border-white/5 pb-2">Personal Information</h4>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div>
                <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">First Name</label>
                <input type="text" value="CD" class="w-full bg-navy-900 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-brand-blue transition-colors">
            </div>
            <div>
                <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Last Name</label>
                <input type="text" value="PY" class="w-full bg-navy-900 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-brand-blue transition-colors">
            </div>
            <div>
                <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Email Address</label>
                <input type="email" value="cdpy@rru.ac.in" class="w-full bg-navy-900 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-brand-blue transition-colors">
            </div>
            <div>
                <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Phone Number</label>
                <input type="text" placeholder="Enter phone number" class="w-full bg-navy-900 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-brand-blue transition-colors">
            </div>
        </div>
        
        <div class="mb-5">
            <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Department</label>
            <input type="text" value="Academic Affairs" class="w-full bg-slate-100 border border-transparent rounded-lg px-4 py-2.5 text-sm text-slate-800 font-medium focus:outline-none transition-colors" readonly>
        </div>
        
        <div class="mb-8">
            <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Role</label>
            <input type="text" value="Campus Director" class="w-full bg-slate-100 border border-transparent rounded-lg px-4 py-2.5 text-sm text-slate-800 font-medium focus:outline-none transition-colors" readonly>
        </div>
        
        <div class="flex items-center gap-3">
            <button class="bg-brand-blue hover:bg-blue-600 text-white text-sm font-semibold py-2 px-5 rounded-lg transition-colors shadow-lg shadow-brand-blue/20">Save Changes</button>
            <button class="bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-medium py-2 px-5 rounded-lg transition-colors border border-white/10">Cancel</button>
        </div>
    </div>`;
}

function getSettingsPasswordHTML() {
    return `<div class="dash-card p-6 md:p-8 fade-up shadow-lg shadow-black/20">
        <h3 class="text-brand-blue font-bold text-lg mb-6 border-b border-white/5 pb-3">Change Your Password</h3>
        
        <div class="mb-5">
            <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Current Password</label>
            <input type="password" placeholder="Enter current password" class="w-full bg-navy-900 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-brand-blue transition-colors">
        </div>
        
        <div class="mb-2">
            <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">New Password</label>
            <input type="password" placeholder="Enter new password" class="w-full bg-navy-900 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-brand-blue transition-colors">
        </div>
        <p class="text-xs text-slate-400 mb-5">Password strength: <span class="text-slate-300">Weak</span></p>
        
        <div class="mb-6">
            <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Confirm Password</label>
            <input type="password" placeholder="Confirm new password" class="w-full bg-navy-900 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-brand-blue transition-colors">
        </div>
        
        <div class="bg-navy-900/80 border border-white/5 rounded-lg p-5 mb-8">
            <p class="text-sm font-bold text-slate-200 mb-3">Password Requirements:</p>
            <ul class="text-sm text-slate-400 space-y-2">
                <li class="flex items-center gap-2"><i data-lucide="check" class="w-4 h-4 text-slate-500"></i> Minimum 8 characters</li>
                <li class="flex items-center gap-2"><i data-lucide="check" class="w-4 h-4 text-slate-500"></i> At least one uppercase letter</li>
                <li class="flex items-center gap-2"><i data-lucide="check" class="w-4 h-4 text-slate-500"></i> At least one number</li>
                <li class="flex items-center gap-2"><i data-lucide="check" class="w-4 h-4 text-slate-500"></i> At least one special character (!@#$%^&*)</li>
            </ul>
        </div>
        
        <div class="flex items-center gap-3">
            <button class="bg-brand-blue hover:bg-blue-600 text-white text-sm font-semibold py-2 px-5 rounded-lg transition-colors shadow-lg shadow-brand-blue/20">Change Password</button>
            <button class="bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-medium py-2 px-5 rounded-lg transition-colors border border-white/10">Cancel</button>
        </div>
    </div>`;
}

function getSettingsApplicationHTML() {
    return `<div class="dash-card p-6 md:p-8 fade-up shadow-lg shadow-black/20">
        <h3 class="text-brand-blue font-bold text-lg mb-6 border-b border-white/5 pb-3">Application Settings</h3>
        <p class="text-sm text-slate-400 mb-8">Manage your application preferences and system configurations here.</p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Appearance Settings -->
            <div class="bg-navy-900/50 border border-white/5 rounded-xl p-5">
                <h4 class="text-white font-semibold mb-4 border-b border-white/10 pb-2">Appearance</h4>
                
                <div class="flex items-center justify-between py-2">
                    <div>
                        <p class="text-sm text-slate-200">Dark Theme</p>
                        <p class="text-xs text-slate-400">Toggle dark mode for the application.</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" class="sr-only peer" checked>
                        <div class="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-blue"></div>
                    </label>
                </div>

                <div class="flex items-center justify-between py-2 mt-2">
                    <div>
                        <p class="text-sm text-slate-200">Compact Table View</p>
                        <p class="text-xs text-slate-400">Reduce padding in data tables.</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" class="sr-only peer">
                        <div class="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-blue"></div>
                    </label>
                </div>
            </div>

            <!-- Account Settings -->
            <div class="bg-navy-900/50 border border-white/5 rounded-xl p-5">
                <h4 class="text-white font-semibold mb-4 border-b border-white/10 pb-2">Account Preferences</h4>
                
                <div class="flex items-center justify-between py-2">
                    <div>
                        <p class="text-sm text-slate-200">Email Notifications</p>
                        <p class="text-xs text-slate-400">Receive incident reports via email.</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" class="sr-only peer" checked>
                        <div class="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-blue"></div>
                    </label>
                </div>

                <div class="mt-6">
                    <button class="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg py-2 text-sm font-medium transition-colors shadow-none">Sign Out All Sessions</button>
                </div>
            </div>
        </div>
    </div>`;
}

function getSettingsSecurityHTML() {
    return `<div class="dash-card p-6 md:p-8 fade-up shadow-lg shadow-black/20">
        <h3 class="text-brand-blue font-bold text-lg mb-6 border-b border-white/5 pb-3">Security Settings</h3>
        
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-white/5">
            <div>
                <h4 class="text-sm font-bold text-slate-200">Two-Factor Authentication</h4>
                <p class="text-xs text-slate-400 mt-1">Add an extra layer of security to your account</p>
            </div>
            <button class="bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-sm font-medium py-1.5 px-6 rounded-lg transition-colors shrink-0">Enable</button>
        </div>
        
        <div class="mb-10 pb-6 border-b border-white/5">
            <h4 class="text-sm font-bold text-slate-200 mb-4">Active Sessions</h4>
            
            <div class="bg-navy-900/50 border-l-2 border-emerald-500 rounded-r-xl p-5 mb-4">
                <div class="flex flex-col sm:flex-row justify-between items-start gap-3 mb-4">
                    <div class="flex items-center gap-3">
                        <i data-lucide="monitor" class="w-5 h-5 text-brand-blue"></i>
                        <span class="text-sm font-bold text-slate-200">Safari 26 on macOS 10.15.7</span>
                    </div>
                    <span class="bg-emerald-500/10 text-emerald-500 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider border border-emerald-500/20">CURRENT SESSION</span>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 text-xs">
                    <div class="flex items-center gap-4">
                        <span class="text-slate-500 w-24 shrink-0">IP Address</span>
                        <span class="text-slate-300 font-medium">47.15.216.253</span>
                    </div>
                    <div class="flex items-center gap-4">
                        <span class="text-slate-500 w-24 shrink-0">Machine ID</span>
                        <span class="text-brand-blue font-medium">9F67-1B76-36F6</span>
                    </div>
                    <div class="flex items-center gap-4">
                        <span class="text-slate-500 w-24 shrink-0">Last Active</span>
                        <span class="text-slate-300 font-medium">Just now</span>
                    </div>
                    <div class="flex items-center gap-4">
                        <span class="text-slate-500 w-24 shrink-0">Last Page</span>
                        <span class="text-slate-300 font-medium">system-config</span>
                    </div>
                </div>
            </div>
            
            <p class="text-[11px] text-slate-500 italic text-center mt-6">No other devices recorded yet — visit the dashboard from another device or browser to see them here.</p>
        </div>
        
        <div>
            <h4 class="text-sm font-bold text-slate-200 mb-4">Danger Zone</h4>
            <button class="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-2 px-5 rounded-lg transition-colors shadow-lg shadow-red-500/20">Delete Account</button>
        </div>
    </div>`;
}

function getDashboardHTML() {
    return `
    <!-- Row 1: KPI Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        ${kpiCard('Active Cameras', '142', '+3 online', 'up', 'video', 'AI Insight: Coverage optimal in high-traffic zones.')}
        ${kpiCard('Current Incidents', '3', '-1 resolved', 'down', 'alert-triangle', 'Priority: 1 High, 2 Medium.')}
        ${kpiCard('Guard Deployment', '45', 'Optimal', 'up', 'shield', 'All critical posts are currently manned.')}
        ${kpiCard('Vehicle Entries', '128', '+12 today', 'up', 'car', 'Peak traffic anticipated between 5 PM - 6 PM.')}
    </div>

    <!-- Row 2: Main Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-4">

        <!-- Incident Pulse -->
        <div class="dash-card p-4">
            <div class="flex justify-between items-start mb-3">
                <div>
                    <p class="text-xs font-semibold text-slate-300">Incident Pulse <span class="text-slate-600 font-normal">(Last 7 Days)</span></p>
                    <p class="text-[10px] text-slate-600 mt-0.5">Real-time security signals across all zones.</p>
                </div>
                <a href="#" class="text-[10px] text-slate-500 hover:text-brand-blue flex items-center gap-1">View All <i data-lucide="arrow-right" style="width:10px;height:10px;"></i></a>
            </div>
            <div class="flex items-center gap-2 mb-3">
                <span class="metric-big">274</span>
                <span class="metric-badge badge-up">
                    <i data-lucide="trending-up" style="width:10px;height:10px;"></i> +12.4% acceleration
                </span>
            </div>
            <p class="text-[10px] text-slate-600 mb-3">Engagement &amp; deal activity extra</p>
            <div style="height:130px;position:relative;">
                <canvas id="incidentChart"></canvas>
            </div>
        </div>

        <!-- Access Trajectory -->
        <div class="dash-card p-4">
            <div class="flex justify-between items-start mb-3">
                <div>
                    <p class="text-xs font-semibold text-slate-300">Access Trajectory</p>
                    <p class="text-[10px] text-slate-600 mt-0.5">AI-projected entry/exit momentum over time.</p>
                </div>
                <a href="#" class="text-[10px] text-slate-500 hover:text-brand-blue flex items-center gap-1">View All <i data-lucide="arrow-right" style="width:10px;height:10px;"></i></a>
            </div>
            <div class="flex items-center gap-2 mb-3">
                <span class="metric-big">5,240</span>
                <span class="metric-badge badge-up">
                    <i data-lucide="trending-up" style="width:10px;height:10px;"></i> +8.7%
                </span>
            </div>
            <p class="text-[10px] text-slate-600 mb-3">Next 30-day projection</p>
            <div style="height:130px;position:relative;">
                <canvas id="accessChart"></canvas>
            </div>
        </div>

        <!-- Security Engine -->
        <div class="dash-card p-4 flex flex-col">
            <div class="mb-3">
                <p class="text-xs font-semibold text-slate-300">Security Engine</p>
                <p class="text-[10px] text-slate-600 mt-0.5">Live execution metrics across your security system.</p>
            </div>
            <div class="grid grid-cols-2 gap-2 mb-4">
                <div class="rounded-lg p-3" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.05);">
                    <p class="text-[10px] text-slate-600 mb-1">Patrols</p>
                    <p class="text-base font-bold text-slate-100">1,200</p>
                </div>
                <div class="rounded-lg p-3" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.05);">
                    <p class="text-[10px] text-slate-600 mb-1">Alerts</p>
                    <p class="text-base font-bold text-slate-100">89</p>
                </div>
            </div>
            <div class="flex-1 flex flex-col items-center justify-center">
                <div class="gauge-wrap" style="width:120px;height:120px;">
                    <svg width="120" height="120" viewBox="0 0 120 120">
                        <defs>
                            <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stop-color="#3b6ff7"/>
                                <stop offset="100%" stop-color="#8b5cf6"/>
                            </linearGradient>
                        </defs>
                        <circle cx="60" cy="60" r="48" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="9"/>
                        <circle cx="60" cy="60" r="48" fill="none" stroke="url(#gaugeGrad)" stroke-width="9"
                            stroke-dasharray="${91 * 3.016} 301.6" stroke-dashoffset="75.4"
                            stroke-linecap="round" transform="rotate(-90 60 60)"/>
                    </svg>
                    <div class="gauge-label">
                        <p class="text-2xl font-bold text-slate-100">91</p>
                        <p style="font-size:9px;color:#475569;text-transform:uppercase;letter-spacing:.06em;">/100</p>
                    </div>
                </div>
                <div class="mt-2 flex items-center gap-1.5">
                    <span class="pulse-dot w-1.5 h-1.5 rounded-full bg-green-400" style="width:6px;height:6px;display:inline-block;border-radius:50%;background:#4ade80;"></span>
                    <span style="font-size:11px;color:#4ade80;font-weight:600;">Security Strong</span>
                </div>
                <p style="font-size:10px;color:#475569;margin-top:2px;">+6.4% from last cycle</p>
            </div>
        </div>
    </div>

    <!-- Row 3: Bottom Panels -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-3">

        <!-- Zone Coverage -->
        <div class="dash-card p-4 map-bg">
            <div class="flex justify-between items-start mb-2">
                <div>
                    <p class="text-xs font-semibold text-slate-300">Zone Coverage</p>
                    <p class="text-[10px] text-slate-600 mt-0.5">Active security footprint by zone.</p>
                </div>
                <a href="#" class="text-[10px] text-slate-500 hover:text-brand-blue flex items-center gap-1">View All <i data-lucide="arrow-right" style="width:10px;height:10px;"></i></a>
            </div>
            <div class="flex items-center gap-2 mb-3">
                <span class="metric-big">12</span>
                <span class="metric-badge badge-up">
                    <i data-lucide="trending-up" style="width:10px;height:10px;"></i> +6.2% global spread
                </span>
            </div>
            <p class="text-[10px] text-slate-600 mb-3">Camera distribution &amp; coverage velocity</p>
            <div class="space-y-0.5">
                ${zoneRow('🏢', 'North Block', '9,120', 'up', '+7.8%')}
                ${zoneRow('🔬', 'Research Lab', '18,740', 'up', '+4.1%')}
                ${zoneRow('🏠', 'Hostel Area', '8,460', 'down', '–2.6%')}
                ${zoneRow('📚', 'Library', '5,980', 'up', '+3.7%')}
            </div>
        </div>

        <!-- Active Incident Flow -->
        <div class="dash-card p-4 overflow-hidden">
            <div class="flex justify-between items-center mb-3">
                <div>
                    <p class="text-xs font-semibold text-slate-300">Active Incident Flow</p>
                    <p class="text-[10px] text-slate-600 mt-0.5">Live movement across your security pipeline.</p>
                </div>
                <a href="#" class="text-[10px] text-slate-500 hover:text-brand-blue flex items-center gap-1">View All <i data-lucide="arrow-right" style="width:10px;height:10px;"></i></a>
            </div>
            <table class="inc-table w-full">
                <thead>
                    <tr>
                        <th class="text-left">Entity</th>
                        <th class="text-left">Zone</th>
                        <th class="text-left">Status</th>
                    </tr>
                </thead>
                <tbody>
                    ${incidentRow('UV', 'Unauth Vehicle', 'North Gate', 'Investigating', 's-active', '#3b6ff7')}
                    ${incidentRow('DF', 'Door Forced', 'Server Room', 'Critical', 's-critical', '#ef4444')}
                    ${incidentRow('CO', 'Cam Offline', 'Hostel B', 'Pending', 's-pending', '#64748b')}
                    ${incidentRow('TG', 'Tailgating', 'Library', 'Resolved', 's-resolved', '#22c55e')}
                    ${incidentRow('NA', 'Noise Alert', 'Cafeteria', 'Pending', 's-pending', '#64748b')}
                    ${incidentRow('AC', 'Access Denied', 'Admin Bldg', 'Discovery', 's-discovery', '#3b6ff7')}
                </tbody>
            </table>
        </div>

        <!-- Priority Actions -->
        <div class="dash-card p-4 flex flex-col">
            <div class="flex justify-between items-center mb-3">
                <div>
                    <p class="text-xs font-semibold text-slate-300">Priority Actions</p>
                    <p class="text-[10px] text-slate-600 mt-0.5">Time-sensitive security drivers.</p>
                </div>
                <a href="#" class="text-[10px] text-slate-500 hover:text-brand-blue flex items-center gap-1">View All <i data-lucide="arrow-right" style="width:10px;height:10px;"></i></a>
            </div>
            <div class="flex flex-col gap-2.5 flex-1">
                ${actionCard('High Impact', '#ef4444', 'DUE 02:00 PM', 'Dispatch guard to North Gate', 'Closing Motion')}
                ${actionCard('High Impact', '#ef4444', 'DUE 03:30 PM', 'Review Server Room forced entry', 'Escalation')}
                ${actionCard('Medium Impact', '#f97316', 'DUE 04:00 PM', 'Reset credentials for Lab 3', 'Agreement Draft')}
                ${actionCard('Medium Impact', '#f97316', 'DUE 05:15 PM', 'Restore Hostel B camera feed', 'Pending')}
            </div>
        </div>
    </div>`;
}

// ─── Component Helpers ────────────────────────────────────────
function kpiCard(title, value, trend, dir, icon, insight, type = 'up') {
    const badge = dir === 'up' ? 'badge-up' : (type === 'warn' ? 'badge-warn' : (type === 'info' ? 'badge-info' : 'badge-down'));
    const trendIcon = dir === 'up' ? 'trending-up' : 'trending-down';
    return `<div class="dash-card p-4 fade-up">
        <div class="flex justify-between items-start mb-3">
            <div class="kpi-icon-wrap">
                <i data-lucide="${icon}" style="width:16px;height:16px;color:#3b6ff7;"></i>
            </div>
            <span class="metric-badge ${badge}">
                <i data-lucide="${trendIcon}" style="width:9px;height:9px;"></i> ${trend}
            </span>
        </div>
        <p class="text-[11px] text-slate-500 font-medium mb-1">${title}</p>
        <p class="text-2xl font-bold text-slate-100 tracking-tight">${value}</p>
        <div class="mt-3 pt-3 flex items-start gap-1.5" style="border-top:1px solid rgba(255,255,255,0.05);">
            <i data-lucide="sparkles" style="width:11px;height:11px;color:#3b6ff7;flex-shrink:0;margin-top:1px;"></i>
            <p style="font-size:10px;color:#475569;line-height:1.4;">${insight}</p>
        </div>
    </div>`;
}

function zoneRow(emoji, name, count, dir, pct) {
    const color = dir === 'up' ? '#22c55e' : '#ef4444';
    return `<div class="zone-row">
        <div class="flex items-center gap-2">
            <span style="font-size:13px;">${emoji}</span>
            <span style="font-size:12px;color:#cbd5e1;font-weight:500;">${name}</span>
        </div>
        <div class="flex items-center gap-3">
            <span style="font-size:12px;font-weight:700;color:#f1f5f9;">${count}</span>
            <span style="font-size:10px;font-weight:600;color:${color};">${pct}</span>
        </div>
    </div>`;
}

function incidentRow(initials, entity, zone, status, badgeClass, avatarColor) {
    return `<tr>
        <td>
            <div class="flex items-center gap-2">
                <div class="avatar" style="background:${avatarColor}22;color:${avatarColor};">${initials}</div>
                <span class="text-slate-200 font-medium" style="font-size:11px;">${entity}</span>
            </div>
        </td>
        <td style="color:#64748b;font-size:11px;">${zone}</td>
        <td><span class="status-badge ${badgeClass}">${status}</span></td>
    </tr>`;
}

function actionCard(priority, dotColor, due, title, stage) {
    const cls = priority.includes('High') ? 'action-high' : 'action-medium';
    return `<div class="action-card ${cls}">
        <div class="flex justify-between items-center mb-1.5">
            <span style="font-size:10px;font-weight:700;color:${dotColor};display:flex;align-items:center;gap:5px;">
                <span style="width:6px;height:6px;border-radius:50%;background:${dotColor};display:inline-block;"></span>
                ${priority}
            </span>
            <span style="font-size:9px;color:#475569;">${due}</span>
        </div>
        <p style="font-size:12px;color:#e2e8f0;font-weight:500;margin-bottom:4px;">${title}</p>
        <p style="font-size:10px;color:#475569;">Stage: <span style="color:#94a3b8;">${stage}</span></p>
    </div>`;
}

// ─── Charts ───────────────────────────────────────────────────
function initCharts() {
    const dark = state.isDarkMode;
    const gridColor = 'rgba(255,255,255,0.04)';
    const tickColor = '#334155';
    const commonOpts = {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            x: { grid: { display: false }, ticks: { color: tickColor, font: { family: 'Inter', size: 10 } }, border: { display: false } },
            y: { grid: { color: gridColor, drawBorder: false }, ticks: { color: tickColor, font: { family: 'Inter', size: 10 } }, border: { display: false } }
        }
    };

    // Incident Bar Chart
    const ctxI = document.getElementById('incidentChart');
    if (ctxI) {
        state.charts.push(new Chart(ctxI, {
            type: 'bar',
            data: {
                labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                datasets: [{
                    data: [9, 14, 20, 16, 25, 12, 8],
                    backgroundColor: (ctx) => {
                        const g = ctx.chart.ctx.createLinearGradient(0, 0, 0, 130);
                        g.addColorStop(0, 'rgba(99,102,241,0.85)');
                        g.addColorStop(1, 'rgba(59,111,247,0.4)');
                        return g;
                    },
                    borderRadius: 5, barPercentage: 0.55, categoryPercentage: 0.7,
                }]
            },
            options: { ...commonOpts }
        }));
    }

    // Access Line Chart
    const ctxA = document.getElementById('accessChart');
    if (ctxA) {
        const ctx2d = ctxA.getContext('2d');
        const grad = ctx2d.createLinearGradient(0, 0, 0, 130);
        grad.addColorStop(0, 'rgba(59,111,247,0.35)');
        grad.addColorStop(1, 'rgba(59,111,247,0)');

        const projGrad = ctx2d.createLinearGradient(0, 0, 0, 130);
        projGrad.addColorStop(0, 'rgba(139,92,246,0.3)');
        projGrad.addColorStop(1, 'rgba(139,92,246,0)');

        state.charts.push(new Chart(ctxA, {
            type: 'line',
            data: {
                labels: ['20 Feb', '21 Feb', '22 Feb', '23 Feb', '24 Feb'],
                datasets: [
                    {
                        label: 'Actual',
                        data: [3800, 4200, 4900, 5100, 5240],
                        borderColor: '#3b6ff7', borderWidth: 2,
                        tension: 0.45, fill: true,
                        backgroundColor: grad,
                        pointBackgroundColor: '#3b6ff7', pointBorderColor: '#0a1628',
                        pointBorderWidth: 2, pointRadius: 3,
                    },
                    {
                        label: 'Projected',
                        data: [null, null, null, 5100, 5800],
                        borderColor: '#8b5cf6', borderWidth: 2,
                        borderDash: [5, 4], tension: 0.3, fill: true,
                        backgroundColor: projGrad,
                        pointBackgroundColor: '#8b5cf6', pointRadius: 3,
                        pointBorderColor: '#0a1628', pointBorderWidth: 2,
                    }
                ]
            },
            options: {
                ...commonOpts,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        mode: 'index', intersect: false,
                        backgroundColor: '#112240', titleColor: '#f1f5f9',
                        bodyColor: '#94a3b8', borderColor: 'rgba(255,255,255,0.06)', borderWidth: 1
                    }
                }
            }
        }));
    }
}

// ─── Events ───────────────────────────────────────────────────
function setupEvents() {
    document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);
    document.getElementById('themeToggleBottom')?.addEventListener('click', toggleTheme);
}
function toggleTheme() {
    state.isDarkMode = !state.isDarkMode;
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('sc-theme', state.isDarkMode ? 'dark' : 'light');
    if (state.activeNav === 'dashboard') {
        state.charts.forEach(c => c.destroy()); state.charts = [];
        setTimeout(initCharts, 50);
    }
}

// ─── Public API ───────────────────────────────────────────────
window.app = {
    nav(id) {
        const top = allNavItems.find(n => n.id === id);
        if (top) window.location.href = top.file;
        else window.location.href = id + '.html';
    }
};

document.addEventListener('DOMContentLoaded', init);

// ─── Modal & Form Logic ───────────────────────────────────────
window.openModal = function(type) {
    const modalId = 'dynamicModal';
    let modal = document.getElementById(modalId);
    if (modal) modal.remove();

    const isDS     = state.activeNav === 'day-scholars';
    const isHostel  = state.activeNav === 'boys-hostel' || state.activeNav === 'girls-hostel';
    const isStaff   = state.activeNav === 'staffs';
    const isAdmin   = state.activeNav === 'admin';
    const idLabel   = isStaff ? 'Staff ID' : (isAdmin ? 'Admin ID' : 'Student ID');
    const inp = (id, label, type='text') => `<div class="mb-3"><label class="block text-xs mb-1 text-slate-300">${label}</label><input type="${type}" id="${id}" class="w-full bg-navy-950 border border-white/10 rounded px-3 py-2 text-sm text-white" required></div>`;

    let movementForm = '';
    if (isDS) {
        movementForm = `
            ${inp('m_enrol', 'Enrolment Number')}
            ${inp('m_name', 'Name')}
            ${inp('m_program', 'Program')}
            ${inp('m_permitted', 'Permitted By')}
            ${inp('m_reason', 'Reason')}
            ${inp('m_checkout', 'Check-Out', 'datetime-local')}
            ${inp('m_checkin', 'Check-In', 'datetime-local')}
            ${inp('m_incharge', 'Incharge')}
        `;
    } else if (isHostel) {
        movementForm = `
            ${inp('m_room', 'Room Number')}
            ${inp('m_name', 'Name')}
            ${inp('m_reason', 'Reason')}
            ${inp('m_checkout', 'Check-Out', 'datetime-local')}
            ${inp('m_checkin', 'Check-In', 'datetime-local')}
            ${inp('m_incharge', 'Incharge')}
        `;
    } else {
        movementForm = `
            ${inp('m_id', idLabel)}
            ${inp('m_purpose', 'Purpose')}
        `;
    }

    const forms = {
        movement: movementForm,
        food: `
            <div class="mb-3"><label class="block text-xs mb-1 text-slate-300">${idLabel}</label><input type="text" id="f_id" class="w-full bg-navy-950 border border-white/10 rounded px-3 py-2 text-sm text-white" required></div>
            <div class="mb-3"><label class="block text-xs mb-1 text-slate-300">Meal Type</label><select id="f_meal" class="w-full bg-navy-950 border border-white/10 rounded px-3 py-2 text-sm text-white"><option>Breakfast</option><option>Lunch</option><option>Dinner</option></select></div>
            <div class="mb-3"><label class="block text-xs mb-1 text-slate-300">Items</label><input type="text" id="f_items" class="w-full bg-navy-950 border border-white/10 rounded px-3 py-2 text-sm text-white" required></div>
        `,
        courier: `
            <div class="mb-3"><label class="block text-xs mb-1 text-slate-300">${idLabel}</label><input type="text" id="c_id" class="w-full bg-navy-950 border border-white/10 rounded px-3 py-2 text-sm text-white" required></div>
            <div class="mb-3"><label class="block text-xs mb-1 text-slate-300">Courier Service</label><input type="text" id="c_service" class="w-full bg-navy-950 border border-white/10 rounded px-3 py-2 text-sm text-white" required></div>
            <div class="mb-3"><label class="block text-xs mb-1 text-slate-300">Tracking No</label><input type="text" id="c_track" class="w-full bg-navy-950 border border-white/10 rounded px-3 py-2 text-sm text-white" required></div>
        `,
        vehicle: `
            <div class="mb-3"><label class="block text-xs mb-1 text-slate-300">Vehicle Number</label><input type="text" id="v_num" class="w-full bg-navy-950 border border-white/10 rounded px-3 py-2 text-sm text-white" required></div>
            <div class="mb-3"><label class="block text-xs mb-1 text-slate-300">Owner Name</label><input type="text" id="v_name" class="w-full bg-navy-950 border border-white/10 rounded px-3 py-2 text-sm text-white" required></div>
            <div class="mb-3"><label class="block text-xs mb-1 text-slate-300">Vehicle Type</label><select id="v_type" class="w-full bg-navy-950 border border-white/10 rounded px-3 py-2 text-sm text-white"><option>2-Wheeler</option><option>4-Wheeler</option></select></div>
            <div class="mb-3"><label class="block text-xs mb-1 text-slate-300">Reason</label><input type="text" id="v_reason" class="w-full bg-navy-950 border border-white/10 rounded px-3 py-2 text-sm text-white" required></div>
        `
    };

    const titles = { movement: 'Log Movement', food: 'Add Food Entry', courier: 'Log Parcel', vehicle: 'Log Vehicle' };

    modal = document.createElement('div');
    modal.id = modalId;
    modal.className = 'fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center fade-up';
    modal.innerHTML = `
        <div class="bg-navy-800 border border-white/10 rounded-xl p-6 w-full max-w-md shadow-2xl relative">
            <button onclick="document.getElementById('${modalId}').remove()" class="absolute top-4 right-4 text-slate-400 hover:text-white">
                <i data-lucide="x" style="width:20px;height:20px;"></i>
            </button>
            <h3 class="text-xl font-bold text-white mb-4">${titles[type]}</h3>
            <form onsubmit="submitForm(event, '${type}')">
                ${forms[type]}
                <div class="mt-6 flex justify-end gap-3">
                    <button type="button" onclick="document.getElementById('${modalId}').remove()" class="px-4 py-2 text-sm text-slate-300 hover:text-white border border-white/10 rounded">Cancel</button>
                    <button type="submit" class="px-4 py-2 bg-brand-blue hover:bg-blue-600 text-white text-sm font-semibold rounded transition-colors">Save Entry</button>
                </div>
            </form>
        </div>
    `;
    document.body.appendChild(modal);
    lucide.createIcons({ nodes: modal.querySelectorAll('[data-lucide]') });
};

window.submitForm = async function(e, type) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    btn.innerHTML = 'Saving...';
    btn.disabled = true;

    try {
        const db = window.supabaseClient;

        let memberType = 'student';
        let hostelType = null;
        let movementTable = 'student_movement';
        let idField = 'student_id';

        if (state.activeNav === 'staffs') {
            memberType = 'staff';
            movementTable = 'staff_movement';
            idField = 'staff_id';
        } else if (state.activeNav === 'admin') {
            memberType = 'admin';
            movementTable = 'admin_movement';
            idField = 'admin_id';
        } else if (state.activeNav === 'boys-hostel') {
            hostelType = 'boys';
        } else if (state.activeNav === 'girls-hostel') {
            hostelType = 'girls';
        } else if (state.activeNav === 'day-scholars') {
            hostelType = 'day-scholar';
        }

        if (type === 'movement') {
            const isDS    = state.activeNav === 'day-scholars';
            const isHostel = state.activeNav === 'boys-hostel' || state.activeNav === 'girls-hostel';

            const payload = {};
            if (hostelType) payload.hostel_type = hostelType;

            if (isDS) {
                payload.student_id   = document.getElementById('m_enrol').value;
                payload.student_name = document.getElementById('m_name').value;
                payload.program      = document.getElementById('m_program').value;
                payload.permitted_by = document.getElementById('m_permitted').value;
                payload.purpose      = document.getElementById('m_reason').value;
                payload.time_out     = new Date(document.getElementById('m_checkout').value).toISOString();
                payload.time_in      = new Date(document.getElementById('m_checkin').value).toISOString();
                payload.logged_by    = document.getElementById('m_incharge').value;
                payload.hostel_type  = 'day-scholar';
            } else if (isHostel) {
                payload.room_number  = document.getElementById('m_room').value;
                payload.student_name = document.getElementById('m_name').value;
                payload.purpose      = document.getElementById('m_reason').value;
                payload.time_out     = new Date(document.getElementById('m_checkout').value).toISOString();
                payload.time_in      = new Date(document.getElementById('m_checkin').value).toISOString();
                payload.logged_by    = document.getElementById('m_incharge').value;
            } else {
                payload[idField]  = document.getElementById('m_id').value;
                payload.purpose   = document.getElementById('m_purpose').value;
                payload.time_out  = new Date().toISOString();
            }

            const { error } = await db.from(movementTable).insert([payload]);
            if (error) throw error;
        } else if (type === 'food') {
            const { error } = await db.from('food_movement').insert([{
                member_id: document.getElementById('f_id').value,
                member_type: memberType,
                hostel_type: hostelType,
                meal_type: document.getElementById('f_meal').value,
                items: document.getElementById('f_items').value,
                arrival_time: new Date().toISOString()
            }]);
            if (error) throw error;
        } else if (type === 'courier') {
            const { error } = await db.from('courier_parcels').insert([{
                recipient_id: document.getElementById('c_id').value,
                recipient_type: memberType,
                hostel_type: hostelType,
                courier_service: document.getElementById('c_service').value,
                tracking_no: document.getElementById('c_track').value,
                received_time: new Date().toISOString()
            }]);
            if (error) throw error;
        } else if (type === 'vehicle') {
            const { error } = await db.from('vehicles').insert([{
                vehicle_number: document.getElementById('v_num').value,
                owner_name: document.getElementById('v_name').value,
                vehicle_type: document.getElementById('v_type').value,
                reason: document.getElementById('v_reason').value,
                check_in: new Date().toISOString()
            }]);
            if (error) throw error;
        }
        document.getElementById('dynamicModal').remove();
        fetchDataForCurrentPage();
    } catch (err) {
        console.error(err);
        alert('Error saving record: ' + err.message);
        btn.innerHTML = 'Save Entry';
        btn.disabled = false;
    }
};
