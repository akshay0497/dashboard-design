// Initialize charts
let revenueChart, distributionChart, targetsChart;

// Generate random data
function generateRevenueData() {
    return Array.from({length: 12}, () => Math.floor(Math.random() * 50000) + 10000);
}

function generateDistributionData() {
    return Array.from({length: 4}, () => Math.floor(Math.random() * 100) + 20);
}

function generateTargetData() {
    return Array.from({length: 6}, () => ({
        target: Math.floor(Math.random() * 100000) + 50000,
        achieved: Math.floor(Math.random() * 100000) + 40000
    }));
}

// Format currency
function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    }).format(value);
}

// Update stats
function updateStats() {
    const revenue = Math.floor(Math.random() * 1000000) + 500000;
    const users = Math.floor(Math.random() * 10000) + 5000;
    const orders = Math.floor(Math.random() * 5000) + 1000;
    const conversion = Math.floor(Math.random() * 20) + 10;

    document.getElementById('totalRevenue').textContent = formatCurrency(revenue);
    document.getElementById('totalUsers').textContent = users.toLocaleString();
    document.getElementById('totalOrders').textContent = orders.toLocaleString();
    document.getElementById('conversion').textContent = `${conversion}%`;
}

// Create Revenue Chart
function createRevenueChart() {
    const ctx = document.getElementById('revenueChart').getContext('2d');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    revenueChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'Revenue',
                data: generateRevenueData(),
                borderColor: '#4e73df',
                backgroundColor: 'rgba(78, 115, 223, 0.05)',
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        borderDash: [2],
                        drawBorder: false
                    },
                    ticks: {
                        callback: value => formatCurrency(value)
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Create Distribution Chart
function createDistributionChart() {
    const ctx = document.getElementById('distributionChart').getContext('2d');
    
    distributionChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Direct', 'Social', 'Referral', 'Organic'],
            datasets: [{
                data: generateDistributionData(),
                backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e'],
                hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf', '#f4b619'],
                hoverBorderColor: 'rgba(234, 236, 244, 1)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            },
            cutout: '70%'
        }
    });
}

// Create Targets Chart
function createTargetsChart() {
    const ctx = document.getElementById('targetsChart').getContext('2d');
    const data = generateTargetData();
    
    targetsChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6'],
            datasets: [
                {
                    label: 'Target',
                    data: data.map(d => d.target),
                    backgroundColor: 'rgba(78, 115, 223, 0.2)',
                    borderColor: 'rgba(78, 115, 223, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Achieved',
                    data: data.map(d => d.achieved),
                    backgroundColor: 'rgba(28, 200, 138, 0.2)',
                    borderColor: 'rgba(28, 200, 138, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: value => formatCurrency(value)
                    }
                }
            }
        }
    });
}

// Generate activity feed items
function generateActivityFeed() {
    const activities = [
        { type: 'sale', icon: 'fa-dollar-sign', color: '#4e73df' },
        { type: 'user', icon: 'fa-user', color: '#1cc88a' },
        { type: 'alert', icon: 'fa-exclamation-triangle', color: '#f6c23e' },
        { type: 'task', icon: 'fa-tasks', color: '#36b9cc' }
    ];

    const feed = document.getElementById('activityFeed');
    feed.innerHTML = '';

    for (let i = 0; i < 6; i++) {
        const activity = activities[Math.floor(Math.random() * activities.length)];
        const time = Math.floor(Math.random() * 60);
        
        const item = document.createElement('div');
        item.className = 'activity-item';
        item.innerHTML = `
            <div class="activity-icon" style="background-color: ${activity.color}">
                <i class="fas ${activity.icon}"></i>
            </div>
            <div class="activity-content">
                <div class="activity-title">New ${activity.type} activity</div>
                <div class="activity-time">${time} minutes ago</div>
            </div>
        `;
        
        feed.appendChild(item);
    }
}

// Update current date
function updateDate() {
    const date = new Date();
    document.getElementById('currentDate').textContent = date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Initialize dashboard
function initDashboard() {
    updateDate();
    updateStats();
    createRevenueChart();
    createDistributionChart();
    createTargetsChart();
    generateActivityFeed();

    // Add click event for update button
    document.getElementById('updateRevenueChart').addEventListener('click', () => {
        revenueChart.data.datasets[0].data = generateRevenueData();
        revenueChart.update();
        updateStats();
    });

    // Update activity feed every 30 seconds
    setInterval(generateActivityFeed, 30000);
}

// Initialize when document is loaded
document.addEventListener('DOMContentLoaded', initDashboard);