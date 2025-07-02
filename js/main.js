// main.js
// Sidebar and overlay controls
const sidebar = document.getElementById('sidebar');
const openBtn = document.getElementById('mobileMenuBtn');
const closeBtn = document.getElementById('closeBtn');
const overlay = document.getElementById('overlay');
const toggleBtn = document.getElementById('toggleBtn');

// Profile dropdown controls
const profileTrigger = document.getElementById('profile-trigger');
const profileDropdown = document.getElementById('profile-dropdown');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Chart when dashboard loads
    // This will be handled in the dashboard loading function

    // Set current month as selected
    const currentMonth = new Date().getMonth() + 1;
    const monthSelector = document.getElementById('month-selector');
    if (monthSelector) monthSelector.value = currentMonth;

    // Set current year as selected
    const currentYear = new Date().getFullYear();
    const yearSelector = document.getElementById('year-selector');
    if (yearSelector) {
        if (!Array.from(yearSelector.options).some(option => option.value == currentYear)) {
            const option = document.createElement('option');
            option.value = currentYear;
            option.text = currentYear;
            yearSelector.insertBefore(option, yearSelector.firstChild);
        }
        yearSelector.value = currentYear;
    }

    // Add event listeners for chevron buttons to toggle submenus
    document.querySelectorAll('.chevron-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const submenu = this.closest('.has-submenu').querySelector('.submenu');
            if (submenu) {
                submenu.classList.toggle('open');
                // Rotate chevron icon
                const icon = this.querySelector('i');
                if (icon) {
                    if (submenu.classList.contains('open')) {
                        icon.classList.remove('fa-chevron-down');
                        icon.classList.add('fa-chevron-up');
                    } else {
                        icon.classList.remove('fa-chevron-up');
                        icon.classList.add('fa-chevron-down');
                    }
                }
            }
        });
    });

    // Close submenus when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.has-submenu')) {
            document.querySelectorAll('.submenu').forEach(submenu => {
                submenu.classList.remove('open');
                const icon = submenu.closest('.has-submenu')?.querySelector('.chevron-btn i');
                if (icon) {
                    icon.classList.remove('fa-chevron-up');
                    icon.classList.add('fa-chevron-down');
                }
            });
        }
    });
});

// Profile dropdown
if (profileTrigger && profileDropdown) {
    profileTrigger.addEventListener('click', function(e) {
        e.stopPropagation();
        profileDropdown.classList.toggle('show');
    });

    document.addEventListener('click', function(e) {
        if (!profileTrigger.contains(e.target) && !profileDropdown.contains(e.target)) {
            profileDropdown.classList.remove('show');
        }
    });
}

function toggleSidebar() {
    if (sidebar && toggleBtn) {
        sidebar.classList.toggle('sidebar-collapsed');
        toggleBtn.innerHTML = sidebar.classList.contains('sidebar-collapsed')
            ? '<i class="fa-solid fa-chevron-right"></i>'
            : '<i class="fa-solid fa-chevron-left"></i>';
    }
}

function openSidebar() {
    if (sidebar && overlay) {
        sidebar.classList.remove('-translate-x-full');
        overlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeSidebar() {
    if (sidebar && overlay) {
        sidebar.classList.add('-translate-x-full');
        overlay.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

// Event listeners
if (openBtn) openBtn.addEventListener('click', openSidebar);
if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
if (overlay) overlay.addEventListener('click', closeSidebar);
if (toggleBtn) toggleBtn.addEventListener('click', toggleSidebar);

// Handle window resize
window.addEventListener('resize', function() {
    if (sidebar && overlay) {
        if (window.innerWidth >= 768) {
            sidebar.classList.remove('-translate-x-full');
            overlay.classList.add('hidden');
            document.body.style.overflow = '';
        } else if (!sidebar.classList.contains('-translate-x-full') && !sidebar.classList.contains('sidebar-collapsed')) {
            sidebar.classList.add('-translate-x-full');
        }
    }
});