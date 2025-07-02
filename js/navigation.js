// navigation.js
function loadDashboard() {
    return fetch('dashboard.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load dashboard');
            }
            return response.text();
        })
        .then(html => {
            document.getElementById('content-container').innerHTML = html;
            document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
            document.getElementById('dashboardBtn').classList.add('active');

            // Initialize dashboard functionality
            initDashboard();
        })
        .catch(error => {
            console.error('Error loading dashboard:', error);
            showError('Failed to load dashboard. Please try again.');
        });
}

function initDashboard() {
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

    // Initialize chart
    initChart();
    setupDashboardEventListeners();
}

function showError(message) {
    const contentContainer = document.getElementById('content-container');
    if (contentContainer) {
        contentContainer.innerHTML = `
            <div class="p-8 text-center">
                <h2 class="text-2xl font-bold text-usepmaroon">Error</h2>
                <p class="text-gray-600 mt-2">${message}</p>
                <button onclick="loadDashboard()" class="mt-4 px-4 py-2 bg-usepmaroon text-white rounded">
                    Reload Dashboard
                </button>
            </div>
        `;
    }
}

// Initialize navigation
document.addEventListener('DOMContentLoaded', function() {
    // Set up dashboard button
    document.getElementById('dashboardBtn')?.addEventListener('click', function(e) {
        e.preventDefault();
        loadDashboard();
    });

    // Load dashboard by default
    loadDashboard();
});