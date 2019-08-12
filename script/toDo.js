const toDoInput = document.querySelector(".js-toDo");
const toDoList = document.querySelector(".js-toDoList");

let toDoArr = [];

let newID = toDoArr.length + 1;

function delToDo(event){
  const btn = event.target;
  const li = event.target.parentNode;

  li.parentNode.removeChild(li);

  const cleanTODO = toDoArr.filter(function(idx){
    return idx.id !== parseInt(li.id);
  });

  toDoArr = cleanTODO;
  saveToDo();
}

function saveToDo(){
  localStorage.setItem("toDo", JSON.stringify(toDoArr));
}

function paintList(t){
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  delBtn.innerText = "X";
  delBtn.onclick = delToDo;
  const span = document.createElement("span");
  span.innerText = t;
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newID;
  toDoList.appendChild(li);

  const toDoObj = {
    text : t,
    id : newID++
  }
  toDoArr.push(toDoObj);
  saveToDo();
}

function handleSubmit(event){
  if(event.keyCode === 13){
    event.preventDefault();
    paintList(toDoInput.value);
    toDoInput.value = "";
  }
}

function loadToDo(){
  const TODO = localStorage.getItem("toDo");
  
  if(TODO !== null){
    const parseTODO = JSON.parse(TODO);
    parseTODO.forEach(function(idx){
      paintList(idx.text);
    });
  }
}

function init(){
  loadToDo();
  toDoInput.onkeypress = handleSubmit;
}

init();