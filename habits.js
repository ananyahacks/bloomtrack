let habits = JSON.parse(localStorage.getItem("habits")) || [];

function save() {
    localStorage.setItem("habits", JSON.stringify(habits));
}

function render() {
    const list = document.getElementById("habitList");
    list.innerHTML = "";

    habits.forEach((habit, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span class="${habit.done ? 'completed' : ''}">
                ${habit.text}
            </span>
            <button onclick="toggle(${index})">✔</button>
        `;
        list.appendChild(li);
    });
}

function addHabit() {
    const input = document.getElementById("habitInput");
    if (!input.value.trim()) return;

    habits.push({ text: input.value, done: false });
    input.value = "";
    save();
    render();
}

function toggle(index) {
    habits[index].done = !habits[index].done;
    save();
    render();
}

render();