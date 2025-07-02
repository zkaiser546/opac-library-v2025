// chart.js
let borrowingChart;
let currentView = 'monthly'; // 'monthly' or 'yearly'

// Initialize Chart.js
function initChart() {
    const ctx = document.getElementById('borrowingChart')?.getContext('2d');
    if (!ctx) return;

    borrowingChart = new Chart(ctx, {
        type: 'line',
        data: getChartData(),
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        precision: 0
                    }
                }
            }
        }
    });
}

// Get chart data based on current view
function getChartData() {
    const year = document.getElementById('year-selector')?.value || '2025';
    const month = document.getElementById('month-selector')?.value || '1';

    if (currentView === 'monthly') {
        return {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [{
                label: 'Borrowed Books',
                data: [45, 60, 75, 55],
                borderColor: '#800000',
                backgroundColor: 'rgba(128, 0, 0, 0.1)',
                tension: 0.3,
                fill: true
            }, {
                label: 'Returned Books',
                data: [35, 50, 65, 45],
                borderColor: '#FFD700',
                backgroundColor: 'rgba(255, 215, 0, 0.1)',
                tension: 0.3,
                fill: true
            }]
        };
    } else {
        return {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Borrowed Books',
                data: [320, 290, 350, 380, 400, 420, 450, 470, 410, 390, 360, 330],
                borderColor: '#800000',
                backgroundColor: 'rgba(128, 0, 0, 0.1)',
                tension: 0.3,
                fill: true
            }, {
                label: 'Returned Books',
                data: [300, 270, 330, 360, 380, 400, 430, 450, 390, 370, 340, 310],
                borderColor: '#FFD700',
                backgroundColor: 'rgba(255, 215, 0, 0.1)',
                tension: 0.3,
                fill: true
            }]
        };
    }
}

// Update chart data
function updateChartData() {
    if (!borrowingChart) return;

    const newData = getChartData();
    borrowingChart.data.labels = newData.labels;
    borrowingChart.data.datasets[0].data = newData.datasets[0].data;
    borrowingChart.data.datasets[1].data = newData.datasets[1].data;
    borrowingChart.update();
}

// Setup dashboard event listeners
function setupDashboardEventListeners() {
    // Year selector
    document.getElementById('year-selector')?.addEventListener('change', updateChartData);

    // Month selector
    document.getElementById('month-selector')?.addEventListener('change', updateChartData);

    // View toggle buttons
    document.getElementById('monthly-btn')?.addEventListener('click', function() {
        if (currentView !== 'monthly') {
            currentView = 'monthly';
            this.classList.add('bg-usepmaroon', 'text-white');
            this.classList.remove('bg-gray-100', 'text-gray-600');
            document.getElementById('yearly-btn').classList.add('bg-gray-100', 'text-gray-600');
            document.getElementById('yearly-btn').classList.remove('bg-usepmaroon', 'text-white');
            updateChartData();
        }
    });

    document.getElementById('yearly-btn')?.addEventListener('click', function() {
        if (currentView !== 'yearly') {
            currentView = 'yearly';
            this.classList.add('bg-usepmaroon', 'text-white');
            this.classList.remove('bg-gray-100', 'text-gray-600');
            document.getElementById('monthly-btn').classList.add('bg-gray-100', 'text-gray-600');
            document.getElementById('monthly-btn').classList.remove('bg-usepmaroon', 'text-white');
            updateChartData();
        }
    });
}

// Export functions if using modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initChart,
        updateChartData,
        setupDashboardEventListeners
    };
}