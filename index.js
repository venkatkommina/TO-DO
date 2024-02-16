const inputBox = document.querySelector("#main");
const list = document.querySelector("ul");

// Load saved tasks when the page loads
document.addEventListener("DOMContentLoaded", function() {
    showData();
    attachEventListeners();
});

inputBox.addEventListener("keydown", function(event) {
    if (event.key === 'Enter') {
        addTask(this.value);
        this.value = "";
        saveData();
    }
});

document.querySelector("button").addEventListener("click", function() {
    addTask(inputBox.value);
    inputBox.value = "";
    saveData();
});

function addTask(item) {
    if (item.trim() === '') {
        alert("You must write something!");
    } else {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            ${item}
            <i class="fa-solid fa-circle-xmark"></i>
        `;

        listItem.addEventListener("click", function() {
            this.classList.toggle("done");
            saveData();
        });

        listItem.querySelector("i").addEventListener("click", function() {
            listItem.remove();
            saveData();
        });

        list.appendChild(listItem);
        saveData();
    }
}

function saveData() {
    localStorage.setItem("todoList", list.innerHTML);
}

function showData() {
    const savedListItems = localStorage.getItem("todoList");
    if (savedListItems) {
        list.innerHTML = savedListItems;
    }
}

function attachEventListeners() { //imp
    const listItems = document.querySelectorAll("ul li");
    listItems.forEach(function(item) {
        item.addEventListener("click", function() {
            this.classList.toggle("done");
            saveData();
        });
        const deleteIcon = item.querySelector("i");
        deleteIcon.addEventListener("click", function(event) {
            event.stopPropagation(); // Prevent the li's click event from triggering
            item.remove();
            saveData();
        });
    });
}
