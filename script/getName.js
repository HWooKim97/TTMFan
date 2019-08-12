const nameInput = document.querySelector(".js-input");
const nameButton = document.querySelector(".js-change");
const nameText = document.querySelector(".js-name");

const USER = "currentUser";

function handleButton(event){
  localStorage.removeItem(USER);
  nameInput.classList.remove("hiding");
  nameInput.classList.add("showing");
  nameText.classList.remove("showing");
  nameText.classList.add("hiding");
  nameButton.classList.remove("showing");
  nameButton.classList.add("hiding");
  nameInput.value = "";
}

function handleSubmit(event){
  if(event.keyCode === 13){
    event.preventDefault();
    localStorage.setItem(USER, nameInput.value);
    paintName(nameInput.value);
  }
}

function paintName(name){
  nameInput.classList.remove("showing");
  nameInput.classList.add("hiding");
  nameText.classList.remove("hiding");
  nameText.classList.add("showing");
  nameText.innerText = `Hello, ${name}!`;

  nameButton.classList.remove("hiding");
  nameButton.classList.add("showing");
}

function getName(){
  const currentUser = localStorage.getItem(USER);
  
  if(currentUser !== null){
    paintName(currentUser);
  }
}

function init(){
  getName();
  nameButton.onclick = handleButton;
  nameInput.onkeypress = handleSubmit;
}

init();