let form = document.querySelector("form");
let text = document.getElementById("text");
let todoCon = document.querySelector(".todo-con");

form.addEventListener('submit', (e) => {
    e.preventDefault();
    addtodo();
});

let todos = JSON.parse(localStorage.getItem("todos")) || [];
if (todos) {
    todos.forEach(element => {
        addtodo(element);
    });
}
// setitem(); // Update items counter after loading existing todos

function addtodo(elem) {
    let todoColl = document.createElement("div");
    todoColl.classList.add("todocoll");
    let todotext = text.value;
    if (elem) {
        todotext = elem.text;
    }
    if (todotext) {
        todoColl.innerHTML = `
        <div class="todo-li">
            <div class="check ${elem && elem.complete ? "active-check" : ""}"><img src="./images/icon-check.svg" alt=""></div>
            <p class="ptag ${elem && elem.complete ? "complete" : ""}">${todotext}</p>
            <button class="close"><img src="./images/icon-cross.svg" alt=""></button>
        </div>
        <div class="hr"></div>`;
        todoCon.appendChild(todoColl);
        updateLs();
        // setitem();// Update items counter immediately after adding
    }

    let close = todoColl.querySelector(".close");
    close.addEventListener("click", () => {
        todoColl.remove();
        updateLs();
        // setitem(); // Update items counter after removing
    });

    let check = todoColl.querySelector(".check");
    check.addEventListener('click', () => {
        check.classList.toggle("active-check");
        todoColl.children[0].children[1].classList.toggle("complete");
        updateLs();
        // setitem(); // Update items counter after marking complete
    });

    text.value = "";
}

function updateLs() {
    let ptag = document.querySelectorAll(".ptag");
    let arr = [];
    ptag.forEach(element => {
        arr.push({
            text: element.innerText,
            complete: element.classList.contains("complete")
        });
    });
    localStorage.setItem("todos", JSON.stringify(arr));
}

let info = document.querySelectorAll(".choice p");
info.forEach(element => {
    element.addEventListener("click", () => {
        info.forEach(item => {
            item.classList.remove("active");
        });
        element.classList.add("active");
        filterTodos(element.innerText);
    });
});

function filterTodos(filter) {
    let todoli = document.querySelectorAll(".todocoll");
    todoli.forEach(elem => {
        switch (filter) {
            case "Active":
                if (!elem.children[0].children[1].classList.contains("complete")) {
                    elem.style.display = "block";
                } else {
                    elem.style.display = "none";
                }
                break;
            case "Completed":
                if (elem.children[0].children[1].classList.contains("complete")) {
                    elem.style.display = "block";
                } else {
                    elem.style.display = "none";
                }
                break;
            default:
                elem.style.display = "block";
                break;
        }
    });
}

let clear = document.querySelector(".clear");
clear.addEventListener("click", () => {
    let todoli = document.querySelectorAll(".todocoll");
    todoli.forEach(elem => {
        if (elem.children[0].children[1].classList.contains("complete")) {
            elem.remove();
            updateLs();
            // setitem(); // Update items counter after clearing completed
        }
    });
});

let left = document.querySelector(".left");
function setitem() {
    let todoli = document.querySelectorAll(".todocoll");
    let activeTodo = document.querySelectorAll(".todo-li .active-check");
    let diff = todoli.length - activeTodo.length;
    left.innerText = `${diff} items left`;
}
