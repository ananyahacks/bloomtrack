let moods = JSON.parse(localStorage.getItem("moods")) || [];
let chartInstance = null;

function saveMood() {
    localStorage.setItem("moods", JSON.stringify(moods));
}

function addMood(emoji) {
    moods.push({
        date: new Date().toLocaleDateString(),
        mood: emoji
    });

    if (moods.length > 7) moods.shift();

    saveMood();
    renderMoods();
    renderChart();
}

function renderMoods() {
    const grid = document.getElementById("moodGrid");
    grid.innerHTML = "";

    moods.forEach(entry => {
        const div = document.createElement("div");
        div.classList.add("mood-card");
        div.innerHTML = `
            <div>${entry.mood}</div>
            <small>${entry.date}</small>
        `;
        grid.appendChild(div);
    });
}

function renderChart() {
    const ctx = document.getElementById("moodChart");

    const moodCounts = {
        "😊": 0,
        "😌": 0,
        "😴": 0,
        "😢": 0,
        "😡": 0
    };

    moods.forEach(entry => {
        moodCounts[entry.mood]++;
    });

    if (chartInstance) {
        chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ["Happy 😊", "Calm 😌", "Tired 😴", "Sad 😢", "Angry 😡"],
            datasets: [{
                data: Object.values(moodCounts),
                backgroundColor: [
                    "#fbcfe8",  // pink
                    "#c4b5fd",  // lavender
                    "#fde68a",  // soft yellow
                    "#bfdbfe",  // baby blue
                    "#fca5a5"   // soft red
                ],
                borderWidth: 0
            }]
        },
        options: {
            plugins: {
                legend: {
                    position: "bottom"
                }
            },
            cutout: "60%"
        }
    });
}

renderMoods();
renderChart();