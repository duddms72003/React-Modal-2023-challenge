const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

//제대로 이해한게 맞다면 local storage에 array의 형태로는 저장이 안되기 때문에
//JSON.stringify로 array처럼 생긴 string으로 저장한 후 다시 JSON.parse 이용해 array로 꺼내는 방법이네요
//array.foreach는 받아온 array를 for 반복문 없이 item 하나씩 function에 넣을 수 있는 신기한 녀석이네요

function deleteTodo(event) {
  const li = event.target.parentElement; //어떤게 클릭된거지 알아보는거 event target parentElement
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id)); //toDo.id는 number고 li.id는 string이라 parsInt로 숫자로 바꿔야 !== 식이 적용됨.
  saveToDos();
}

function paintToDo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  const span = document.createElement("span");
  span.innerText = newTodo.text;
  const button = document.createElement("button");
  button.innerText = "❌";
  button.addEventListener("click", deleteTodo);
  li.appendChild(span);
  li.appendChild(button);
  toDoList.appendChild(li);
}

function handleTodoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value; // 엔터쳐서 ""값 만들기 전에 변수에 담자!
  toDoInput.value = "";
  const newTodoOgj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoOgj);
  paintToDo(newTodoOgj);
  saveToDos();
}

toDoForm.addEventListener("submit", handleTodoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos); //JSON.parse로 string을 array로 만드는 과정
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}
