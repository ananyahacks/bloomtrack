let sleep = JSON.parse(localStorage.getItem("sleep")) || [];
let chartInstance = null;

function saveSleep() {
    localStorage.setItem("sleep", JSON.stringify(sleep));
}

function addSleep() {
    const input = document.getElementById("sleepInput");
    if (!input.value) return;

    sleep.push({
        date: new Date().toLocaleDateString(),
        hours: Number(input.value)
    });

    if (sleep.length > 7) sleep.shift();

    input.value = "";
    saveSleep();
    renderChart();
}

function renderChart() {
    const ctx = document.getElementById("chart");

    if (chartInstance) {
        chartInstance.destroy(); // prevents duplicate charts
    }

    chartInstance = new Chart(ctx, {
        type: "line",
        data: {
            labels: sleep.map(d => d.date),
            datasets: [{
                label: "Hours Slept",
                data: sleep.map(d => d.hours),
                borderColor: "#c084fc",
                backgroundColor: "rgba(216, 180, 254, 0.2)",
                tension: 0.4,
                fill: true,
                pointRadius: 6,
                pointBackgroundColor: "#d8b4fe"
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 12
                }
            }
        }
    });
}

renderChart();