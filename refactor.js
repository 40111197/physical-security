const fs = require('fs');
const path = require('path');

// --- Helper Functions from app.js ---
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

function getMovementHTML() {
    return `<div class="dash-card p-5 fade-up">
        <div class="flex justify-between items-center mb-5">
            <h2 class="text-lg font-bold text-slate-100">Student Movement Log</h2>
            <button class="bg-brand-blue hover:bg-blue-600 text-white text-xs font-semibold py-1.5 px-3 rounded flex items-center gap-1.5 transition-colors" style="background:#3b6ff7;">
                <i data-lucide="plus" style="width:12px;height:12px;"></i> Log Movement
            </button>
        </div>
        <div class="overflow-x-auto">
            <table class="inc-table w-full">
                <thead>
                    <tr>
                        <th class="text-left" style="padding-bottom:12px;color:#94a3b8;font-size:11px;">Student ID</th>
                        <th class="text-left" style="padding-bottom:12px;color:#94a3b8;font-size:11px;">Name</th>
                        <th class="text-left" style="padding-bottom:12px;color:#94a3b8;font-size:11px;">Time Out</th>
                        <th class="text-left" style="padding-bottom:12px;color:#94a3b8;font-size:11px;">Time In</th>
                        <th class="text-left" style="padding-bottom:12px;color:#94a3b8;font-size:11px;">Purpose</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-top:1px solid rgba(255,255,255,0.05);">
                        <td style="padding:12px 0;" class="text-slate-200 text-xs font-medium">B2023-045</td>
                        <td style="padding:12px 0;" class="text-slate-400 text-xs">Rahul Sharma</td>
                        <td style="padding:12px 0;" class="text-slate-400 text-xs">08:15 AM</td>
                        <td style="padding:12px 0;" class="text-slate-400 text-xs">--:--</td>
                        <td style="padding:12px 0;" class="text-slate-400 text-xs">Classes</td>
                    </tr>
                    <tr style="border-top:1px solid rgba(255,255,255,0.05);">
                        <td style="padding:12px 0;" class="text-slate-200 text-xs font-medium">B2022-112</td>
                        <td style="padding:12px 0;" class="text-slate-400 text-xs">Amit Kumar</td>
                        <td style="padding:12px 0;" class="text-slate-400 text-xs">06:00 PM</td>
                        <td style="padding:12px 0;" class="text-slate-400 text-xs">08:45 PM</td>
                        <td style="padding:12px 0;" class="text-slate-400 text-xs">Gymnasium</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>`;
}

function getVehicleHTML() {
    return `<div class="dash-card p-5 fade-up">
        <div class="flex justify-between items-center mb-5">
            <h2 class="text-lg font-bold text-slate-100">Vehicle Log</h2>
            <button class="bg-brand-blue hover:bg-blue-600 text-white text-xs font-semibold py-1.5 px-3 rounded flex items-center gap-1.5 transition-colors">
                <i data-lucide="plus" style="width:12px;height:12px;"></i> Log Vehicle
            </button>
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
                <tbody>
                    <tr>
                        <td class="text-white text-xs font-medium">1</td>
                        <td class="text-brand-blue text-xs font-semibold">TN-32-AB-1234</td>
                        <td class="text-white text-xs">Rajesh Kumar</td>
                        <td class="text-white text-xs">+91 9876543210</td>
                        <td class="text-white text-xs">Faculty</td>
                        <td class="text-white text-xs">Regular Class</td>
                        <td class="text-brand-blue text-xs font-semibold">4-Wheeler</td>
                        <td class="text-white text-xs">08:15 AM</td>
                        <td class="text-white text-xs">--:--</td>
                        <td class="text-white text-xs">Guard Ramesh</td>
                    </tr>
                    <tr>
                        <td class="text-white text-xs font-medium">2</td>
                        <td class="text-brand-blue text-xs font-semibold">PY-01-XY-9876</td>
                        <td class="text-white text-xs">Priya Sharma</td>
                        <td class="text-white text-xs">+91 9123456789</td>
                        <td class="text-white text-xs">Visitor</td>
                        <td class="text-white text-xs">Meeting with Admin</td>
                        <td class="text-brand-blue text-xs font-semibold">2-Wheeler</td>
                        <td class="text-white text-xs">09:30 AM</td>
                        <td class="text-white text-xs">11:45 AM</td>
                        <td class="text-white text-xs">Guard Suresh</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>`;
}

function getFoodHTML() {
    return `<div class="dash-card p-5 fade-up">
        <div class="flex justify-between items-center mb-5">
            <h2 class="text-lg font-bold text-slate-100">Food Movement</h2>
            <button class="bg-brand-blue hover:bg-blue-600 text-white text-xs font-semibold py-1.5 px-3 rounded flex items-center gap-1.5 transition-colors" style="background:#3b6ff7;">
                <i data-lucide="plus" style="width:12px;height:12px;"></i> Add Entry
            </button>
        </div>
        <div class="overflow-x-auto">
            <table class="inc-table w-full">
                <thead>
                    <tr>
                        <th class="text-left" style="padding-bottom:12px;color:#94a3b8;font-size:11px;">Student ID</th>
                        <th class="text-left" style="padding-bottom:12px;color:#94a3b8;font-size:11px;">Meal Type</th>
                        <th class="text-left" style="padding-bottom:12px;color:#94a3b8;font-size:11px;">Items</th>
                        <th class="text-left" style="padding-bottom:12px;color:#94a3b8;font-size:11px;">Arrival Time</th>
                        <th class="text-left" style="padding-bottom:12px;color:#94a3b8;font-size:11px;">Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-top:1px solid rgba(255,255,255,0.05);">
                        <td style="padding:12px 0;" class="text-slate-200 text-xs font-medium">B2023-045</td>
                        <td style="padding:12px 0;" class="text-slate-400 text-xs">Dinner</td>
                        <td style="padding:12px 0;" class="text-slate-400 text-xs">2x Burgers</td>
                        <td style="padding:12px 0;" class="text-slate-400 text-xs">08:30 PM</td>
                        <td style="padding:12px 0;"><span class="status-badge s-resolved" style="background:rgba(34,197,94,0.1);color:#4ade80;">Collected</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>`;
}

function getCourierHTML() {
    return `<div class="dash-card p-5 fade-up">
        <div class="flex justify-between items-center mb-5">
            <h2 class="text-lg font-bold text-slate-100">Parcel Details</h2>
            <button class="bg-brand-blue hover:bg-blue-600 text-white text-xs font-semibold py-1.5 px-3 rounded flex items-center gap-1.5 transition-colors" style="background:#3b6ff7;">
                <i data-lucide="plus" style="width:12px;height:12px;"></i> Log Parcel
            </button>
        </div>
        <div class="overflow-x-auto">
            <table class="inc-table w-full">
                <thead>
                    <tr>
                        <th class="text-left" style="padding-bottom:12px;color:#94a3b8;font-size:11px;">Student ID</th>
                        <th class="text-left" style="padding-bottom:12px;color:#94a3b8;font-size:11px;">Courier Service</th>
                        <th class="text-left" style="padding-bottom:12px;color:#94a3b8;font-size:11px;">Tracking No.</th>
                        <th class="text-left" style="padding-bottom:12px;color:#94a3b8;font-size:11px;">Received Time</th>
                        <th class="text-left" style="padding-bottom:12px;color:#94a3b8;font-size:11px;">Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-top:1px solid rgba(255,255,255,0.05);">
                        <td style="padding:12px 0;" class="text-slate-200 text-xs font-medium">B2021-089</td>
                        <td style="padding:12px 0;" class="text-slate-400 text-xs">Amazon</td>
                        <td style="padding:12px 0;" class="text-slate-400 text-xs">AMZ-9928123</td>
                        <td style="padding:12px 0;" class="text-slate-400 text-xs">02:15 PM</td>
                        <td style="padding:12px 0;"><span class="status-badge s-pending" style="background:rgba(245,158,11,0.1);color:#fbbf24;">Waiting</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>`;
}

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

function getDashboardHTML() {
    return `
    <!-- Row 1: KPI Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        ${kpiCard('Active Cameras', '142', '+3 online', 'up', 'video', 'AI Insight: Coverage optimal in high-traffic zones.')}
        ${kpiCard('Access Events', '5,240', '+8.7% today', 'up', 'key', 'AI Insight: Peak access at North Gate 9–11 AM.')}
        ${kpiCard('Open Incidents', '7', '–2 vs yesterday', 'down', 'alert-triangle', 'AI Insight: Loitering flagged at Research Lab 3.', 'warn')}
        ${kpiCard('Security Score', '91%', '–2% last sprint', 'down', 'shield-check', 'AI Insight: Score improves when cam uptime >98%.', 'info')}
    </div>

    <!-- Row 2: Charts -->
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

// --- Injection Logic ---

function injectIntoFile(filePath, contentToInject) {
    let fileContent = fs.readFileSync(filePath, 'utf8');
    const regex = /(<main[^>]*id="mainContent"[^>]*>)([\s\S]*?)(<\/main>)/i;
    
    if (regex.test(fileContent)) {
        const finalContent = `\n${getPageHeaderHTML()}\n${contentToInject}\n${renderFooter()}\n`;
        const updatedContent = fileContent.replace(regex, `$1${finalContent}$3`);
        fs.writeFileSync(filePath, updatedContent, 'utf8');
        console.log(`Updated: ${filePath}`);
    }
}

function refactorAppJS(filePath) {
    let appContent = fs.readFileSync(filePath, 'utf8');
    
    // 1. Convert sidebar buttons to anchor tags
    appContent = appContent.replace(
        /<button class="sidebar-icon-btn \$\{active \? 'active' : ''\}" title="\$\{item\.label\}" onclick="window\.location\.href='\$\{getUrl\(item\.file\)\}'">[\s\S]*?<\/button>/g,
        '<a href="${getUrl(item.file)}" class="w-10 h-10 rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all relative group ${active ? \'bg-brand-blue/10 text-brand-blue\' : \'text-slate-400 hover:text-slate-200 hover:bg-white/5\'}" title="${item.label}">\n            <i data-lucide="${item.icon}" style="width:20px;height:20px;stroke-width:${active?\'2.5\':\'2\'};"></i>\n            ${active ? \'<div class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-brand-blue rounded-r-md"></div>\' : \'\'}\n        </a>'
    );
    
    // Convert topNav a tags to correctly detect active state using filename instead of state.activeNav
    appContent = appContent.replace(
        /const dropHTML = item\.dropdown\.map\(d => `[\s\S]*?<a href="\$\{getUrl\(d\.file\)\}" class="block px-4 py-2 hover:bg-white\/5 text-sm flex items-center gap-2 \$\{state\.activeNav === d\.id \? 'text-brand-blue font-medium' : 'text-slate-300'\}"/g,
        'const dropHTML = item.dropdown.map(d => {\n                const isCurrentPage = d.file.includes(filename) && filename !== \'index.html\';\n                return `\n                <a href="${getUrl(d.file)}" class="block px-4 py-2 hover:bg-white/5 text-sm flex items-center gap-2 ${isCurrentPage ? \'text-brand-blue font-medium\' : \'text-slate-300\'}"'
    );
    appContent = appContent.replace(
        /<\/a>\n            `\)\.join\(''\);/g,
        '</a>\n            `;\n            }).join(\'\');'
    );

    // 3. Remove all functions from renderFooter onwards, up to initCharts
    const startIndex = appContent.indexOf('function renderFooter() {');
    const endIndex = appContent.indexOf('// ─── Charts ───────────────────────────────────────────────────');
    
    if (startIndex !== -1 && endIndex !== -1) {
        appContent = appContent.substring(0, startIndex) + appContent.substring(endIndex);
    }
    
    fs.writeFileSync(filePath, appContent, 'utf8');
    console.log('Cleaned up app.js successfully!');
}

function processDirectory(dirPath) {
    const files = fs.readdirSync(dirPath);
    for (const file of files) {
        const fullPath = path.join(dirPath, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.html')) {
            let injectedHTML = '';
            const fileName = path.basename(fullPath);
            
            if (fileName === 'index.html') {
                injectedHTML = getDashboardHTML();
            } else if (fileName === 'vehicle.html') {
                injectedHTML = getVehicleHTML();
            } else if (fileName.includes('-movement')) {
                injectedHTML = getMovementHTML();
            } else if (fileName.includes('-food')) {
                injectedHTML = getFoodHTML();
            } else if (fileName.includes('-courier')) {
                injectedHTML = getCourierHTML();
            } else {
                injectedHTML = getPlaceholderHTML({ label: 'Details Module', icon: 'users' });
            }
            
            injectIntoFile(fullPath, injectedHTML);
        }
    }
}

// Start processing from current directory
const targetDir = process.cwd();
console.log(`Starting HTML refactor in ${targetDir}`);
processDirectory(targetDir);
refactorAppJS(path.join(targetDir, 'app.js'));
console.log('Refactoring complete.');
