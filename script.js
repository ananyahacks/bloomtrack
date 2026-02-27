const habitInput = document.getElementById("habitInput");
const addBtn = document.getElementById("addBtn");
const habitList = document.getElementById("habitList");

const totalHabitsEl = document.getElementById("totalHabits");
const completedHabitsEl = document.getElementById("completedHabits");
const completionRateEl = document.getElementById("completionRate");

let habits = JSON.parse(localStorage.getItem("habits")) || [];
let currentFilter = "all";

function saveHabits() {
    localStorage.setItem("habits", JSON.stringify(habits));
}

function updateStats() {
    const total = habits.length;
    const completed = habits.filter(h => h.completed).length;
    const rate = total === 0 ? 0 : Math.round((completed / total) * 100);

    totalHabitsEl.innerText = total;
    completedHabitsEl.innerText = completed;
    completionRateEl.innerText = rate + "%";
}

function renderHabits() {
    habitList.innerHTML = "";

    let filtered = habits;
    if (currentFilter === "completed") {
        filtered = habits.filter(h => h.completed);
    } else if (currentFilter === "pending") {
        filtered = habits.filter(h => !h.completed);
    }

    filtered.forEach((habit, index) => {
        const li = document.createElement("li");
        li.classList.add("habit-item");
        if (habit.completed) li.classList.add("completed");

        li.innerHTML = `
            <span>${habit.text}</span>
            <div>
                <button onclick="toggleHabit(${index})">✔</button>
                <button onclick="deleteHabit(${index})">✖</button>
            </div>
        `;

        habitList.appendChild(li);
    });

    updateStats();
}

function addHabit() {
    if (habitInput.value.trim() === "") return;

    habits.push({
        text: habitInput.value,
        completed: false
    });

    habitInput.value = "";
    saveHabits();
    renderHabits();
}

function toggleHabit(index) {
    habits[index].completed = !habits[index].completed;
    saveHabits();
    renderHabits();
}

function deleteHabit(index) {
    habits.splice(index, 1);
    saveHabits();
    renderHabits();
}

addBtn.addEventListener("click", addHabit);

document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        currentFilter = btn.dataset.filter;
        renderHabits();
    });
});

renderHabits();