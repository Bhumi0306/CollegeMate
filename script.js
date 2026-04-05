window.onload = function () {
    loadTimetable();
    loadAssignments();
    loadTodos();
    loadAttendanceHistory();
};

// -------- TIMETABLE --------
function addTimetable() {
    let subject = subjectInput = document.getElementById("subject").value;
    let time = document.getElementById("time").value;
    if (subject === "" || time === "") return;

    let data = JSON.parse(localStorage.getItem("timetable")) || [];
    data.push({ subject, time });
    localStorage.setItem("timetable", JSON.stringify(data));

    document.getElementById("subject").value = "";
    document.getElementById("time").value = "";
    loadTimetable();
}

function loadTimetable() {
    let list = document.getElementById("timetableList");
    list.innerHTML = "";
    let data = JSON.parse(localStorage.getItem("timetable")) || [];

    data.forEach((item, i) => {
        let li = document.createElement("li");
        li.innerHTML = `${item.subject} - ${item.time}
        <button onclick="deleteTimetable(${i})">❌</button>`;
        list.appendChild(li);
    });
}

function deleteTimetable(i) {
    let data = JSON.parse(localStorage.getItem("timetable"));
    data.splice(i, 1);
    localStorage.setItem("timetable", JSON.stringify(data));
    loadTimetable();
}

// -------- ATTENDANCE --------
function calculateAttendance() {
    let total = totalClasses.value;
    let attended = attendedClasses.value;
    if (total == 0) return;

    let percent = ((attended / total) * 100).toFixed(2);
    let status = percent >= 75 ? "Safe ✅" : "Shortage ⚠️";

    attendanceResult.textContent = `Attendance: ${percent}% - ${status}`;
    attendanceResult.style.color = percent >= 75 ? "lightgreen" : "orange";

    let history = JSON.parse(localStorage.getItem("attendanceHistory")) || [];
    history.push({ date: new Date().toLocaleDateString(), percent, status });
    localStorage.setItem("attendanceHistory", JSON.stringify(history));

    loadAttendanceHistory();
}

function loadAttendanceHistory() {
    let list = document.getElementById("attendanceHistory");
    list.innerHTML = "";
    let history = JSON.parse(localStorage.getItem("attendanceHistory")) || [];

    history.forEach((item, i) => {
        let li = document.createElement("li");
        li.innerHTML = `${item.date} - ${item.percent}% (${item.status})
        <button onclick="deleteAttendance(${i})">❌</button>`;
        list.appendChild(li);
    });
}

function deleteAttendance(i) {
    let history = JSON.parse(localStorage.getItem("attendanceHistory"));
    history.splice(i, 1);
    localStorage.setItem("attendanceHistory", JSON.stringify(history));
    loadAttendanceHistory();
}

// -------- ASSIGNMENTS --------
function addAssignment() {
    let name = assignment.value;
    let date = deadline.value;
    if (name === "" || date === "") return;

    let data = JSON.parse(localStorage.getItem("assignments")) || [];
    data.push({ name, date });
    localStorage.setItem("assignments", JSON.stringify(data));

    assignment.value = "";
    deadline.value = "";
    loadAssignments();
}

function loadAssignments() {
    let list = document.getElementById("assignmentList");
    list.innerHTML = "";
    let data = JSON.parse(localStorage.getItem("assignments")) || [];

    data.forEach((item, i) => {
        let li = document.createElement("li");
        li.innerHTML = `${item.name} | ${item.date}
        <button onclick="deleteAssignment(${i})">❌</button>`;
        list.appendChild(li);
    });
}

function deleteAssignment(i) {
    let data = JSON.parse(localStorage.getItem("assignments"));
    data.splice(i, 1);
    localStorage.setItem("assignments", JSON.stringify(data));
    loadAssignments();
}

// -------- TODO --------
function addTodo() {
    let text = todo.value;
    if (text === "") return;

    let data = JSON.parse(localStorage.getItem("todos")) || [];
    data.push({ text, done: false });
    localStorage.setItem("todos", JSON.stringify(data));

    todo.value = "";
    loadTodos();
}

function loadTodos() {
    let list = document.getElementById("todoList");
    list.innerHTML = "";
    let data = JSON.parse(localStorage.getItem("todos")) || [];

    data.forEach((item, i) => {
        let li = document.createElement("li");
        li.textContent = item.text;

        if (item.done) {
            li.style.textDecoration = "line-through";
            li.style.opacity = "0.6";
        }

        li.onclick = () => {
            data[i].done = !data[i].done;
            localStorage.setItem("todos", JSON.stringify(data));
            loadTodos();
        };

        let del = document.createElement("button");
        del.textContent = "❌";
        del.onclick = (e) => {
            e.stopPropagation();
            deleteTodo(i);
        };

        li.appendChild(del);
        list.appendChild(li);
    });
}

function deleteTodo(i) {
    let data = JSON.parse(localStorage.getItem("todos"));
    data.splice(i, 1);
    localStorage.setItem("todos", JSON.stringify(data));
    loadTodos();
}
