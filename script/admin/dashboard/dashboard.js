const cardDashboard = document.querySelector('.card-dashboard');
const ctx = document.getElementById('myChart').getContext('2d');

const data = [
    { label: "Orders", value: 203, icon: "fa-solid fa-cart-shopping" },
    { label: "Users", value: 20, icon: "fa-solid fa-users" },
    { label: "Menu Items", value: 23, icon: "fa-solid fa-utensils" },
    { label: "Revenue", value: 103, icon: "fa-solid fa-peso-sign" }
];

function dashboardCard() {
    cardDashboard.innerHTML = data.map((item) => `
        <div class="card">
            <div class="card-title">
                <h4>${item.label}</h4>
                <p>${item.value}</p>
            </div>
            <div class="card-icon">
                <i class="${item.icon}"></i>
            </div>
        </div>
    `).join('');
}

function dashboardCharts() {
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Red', 'Blue', 'Yellow'],
            datasets: [{
                label: 'Data',
                data: [12, 32, 32, 3, 4],
                backgroundColor: ['red', 'blue', 'green']
            }]
        }
    })

}

dashboardCard();
dashboardCharts();