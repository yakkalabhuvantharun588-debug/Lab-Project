// ------------------------------
// INITIAL SETUP
// ------------------------------
let tasks = JSON.parse(localStorage.getItem("taskData")) || [];
let theme = localStorage.getItem("themeMode") || "light";

document.body.classList.toggle("dark", theme === "dark");

const taskField = document.getElementById("taskField");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskContainer = document.getElementById("taskContainer");
const taskFilter = document.getElementById("taskFilter");
const themeToggle = document.getElementById("themeToggle");
const fetchInfoBtn = document.getElementById("fetchInfoBtn");
const infoBox = document.getElementById("infoBox");

// ------------------------------
// RENDER TASKS
// ------------------------------
function displayTasks() {
  taskContainer.innerHTML = "";

  const filter = taskFilter.value;

  tasks
    .filter(t => filter === "all" || t.status === filter)
    .forEach((task, index) => {
      const li = document.createElement("li");
      li.classList.toggle("done", task.status === "done");

      li.innerHTML = `
        <span>${task.text}</span>
        <div>
          <button onclick="toggleTask(${index})">Toggle</button>
          <button onclick="editTask(${index})">Edit</button>
          <button onclick="removeTask(${index})">Delete</button>
        </div>
      `;

      taskContainer.appendChild(li);
    });
}

displayTasks();

// ------------------------------
// ADD TASK
// ------------------------------
addTaskBtn.addEventListener("click", () => {
  const text = taskField.value.trim();
  if (!text) return;

  tasks.push({ text, status: "pending" });
  localStorage.setItem("taskData", JSON.stringify(tasks));

  taskField.value = "";
  displayTasks();
});

// ------------------------------
// EDIT TASK
// ------------------------------
function editTask(index) {
  const updated = prompt("Update task:", tasks[index].text);
  if (updated) {
    tasks[index].text = updated;
    localStorage.setItem("taskData", JSON.stringify(tasks));
    displayTasks();
  }
}

// ------------------------------
// DELETE TASK
// ------------------------------
function removeTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("taskData", JSON.stringify(tasks));
  displayTasks();
}

// ------------------------------
// TOGGLE STATUS
// ------------------------------
function toggleTask(index) {
  tasks[index].status =
    tasks[index].status === "pending" ? "done" : "pending";

  localStorage.setItem("taskData", JSON.stringify(tasks));
  displayTasks();
}

// ------------------------------
// FILTER CHANGE
// ------------------------------
taskFilter.addEventListener("change", displayTasks);

// ------------------------------
// THEME SWITCH
// ------------------------------
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  theme = document.body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("themeMode", theme);
});

// ------------------------------
// FETCH API WITH IMPROVED WORDING & ERROR HANDLING
// ------------------------------
fetchInfoBtn.addEventListener("click", async () => {
  infoBox.innerHTML = "<p>Retrieving information… please wait.</p>";

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/comments?_limit=5");

    if (!response.ok) {
      throw new Error("The server responded with an unexpected status.");
    }

    const data = await response.json();

    infoBox.innerHTML = data
      .map(item => `
        <p>
          <strong>${item.name}</strong><br>
          ${item.body}
        </p>
      `)
      .join("");

  } catch (error) {
    infoBox.innerHTML = `
      <p style="color: red;">
        Unable to load data at the moment.<br>
        <em>${error.message}</em>
      </p>
    `;
  }
});

