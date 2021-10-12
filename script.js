// pobieramy zienne zborczo
let title;
let todoMain;
let todoInput;
let btnAdd;
let todoList;
let errorInfo;
let ulList;
let newLi;
let btnSearch;
// zmienne do popup`a
let popupMain;
let popupInfo;
let popupInput;
let popupAccept;
let popupCencel;
let changeInputValue;
// zmienie do podawania imienia
let sayYourName;
let BtnName;

const main = () => {
  //funkcja main rozpoczyna działnie funkcji kreatora
  DOMElementCreate();
  DOMEventsCreate();
};

const DOMElementCreate = () => {
  title = document.querySelector("h1");
  title.textContent = "LISTA ZADAŃ";
  todoMain = document.querySelector(".todo");
  todoInput = document.querySelector(".todo-input");
  btnAdd = document.querySelector(".btn-add");
  todoList = document.querySelector(".todolist ul");
  errorInfo = document.querySelector(".error-info");
  errorInfo.textContent = "DODAJ NOWE ZADANIE DO WYKONANIA";
  popupMain = document.querySelector(".popup");
  popupInfo = document.querySelector(".popup-info");
  popupInput = document.querySelector(".popup-input");
  popupAccept = document.querySelector(".accept");
  popupCencel = document.querySelector(".cancel");
  sayYourName = document.querySelector(".name");
  BtnName = document.querySelector(".add-name");
  nameAddMainDiv = document.querySelector(".edit-main");
};
const openNewTask = () => {
  //stworzenie nowego zadania
  if (todoInput.value !== "") {
    newLi = document.createElement("li");
    newLi.textContent = todoInput.value;
    todoList.append(newLi);
    todoInput.value = "";
    errorInfo.textContent = "";
    createButtons();
  } else {
    errorInfo.textContent = "Wprowadź nowe zadanie";
  }
};

const createButtons = () => {
  //tworzymy buttony przy każdym zadaniu (zatwierdź, edytuj, usuń)
  const mainAreaBtn = document.createElement("div");
  mainAreaBtn.classList.add("tools");
  newLi.append(mainAreaBtn);

  const acceptBtn = document.createElement("button");
  acceptBtn.classList.add("complete");
  acceptBtn.innerHTML = '<i class="far fa-check-circle fa-2x"></i>';

  const editBtn = document.createElement("button");
  editBtn.classList.add("edit");
  editBtn.innerHTML = '<i class="fas fa-edit fa-2x"></i>';

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete2");
  deleteBtn.innerHTML = '<i class="fas fa-ban fa-2x"></i>';

  mainAreaBtn.append(acceptBtn, editBtn, deleteBtn);
};

const btnListener = (e) => {
  //robię funkcjonalności na buttonach
  if (e.target.matches(".complete")) {
    e.target.closest("li").classList.toggle("completed");
    e.target.classList.toggle("completed");
  } else if (e.target.matches(".delete2")) {
    e.target.closest("li").remove();
    emptyList();
  } else if (e.target.matches(".edit")) {
    popupMain.style.display = "flex";
    popupInputEdit(e);
  }
};

const emptyList = () => {
  //sprawdzam czy lista jest pusta
  let newUlCheck = document.querySelectorAll("li");
  if (newUlCheck.length === 0) {
    errorInfo.textContent = "twoja lista zadań jest pusta";
  }
};

const enterEvent = (e) => {
  //akceptacja na enter
  if (e.key === "Enter") {
    openNewTask();
  }
};
const popupEnter = (e) => {
  if (e.key === "Enter") {
    acceptPopupBtn();
  }
};

const popupInputEdit = (e) => {
  //pobieranie wpisu z głównego inputa do iputa w popup`e
  changeInputValue = e.target.closest("li");
  popupInput.value = changeInputValue.firstChild.textContent;
};
const closePopup = () => {
  //funkcja zamykająca popup`a
  popupMain.style.display = "none";
};
const acceptPopupBtn = () => {
  //pobieranie danych z imputu w popup`e i przekazanie ich do listy zadań
  if (popupInput.value !== "") {
    changeInputValue.firstChild.textContent = popupInput.value;
    popupMain.style.display = "none";
    popupInfo.textContent = "";
  } else {
    popupInfo.textContent = "wprowadź zmianę";
  }
};

const newName = () => {
  //wprowadzanie imienia do listy
  if (sayYourName.value !== "") {
    const addName = sayYourName.value;
    title.textContent = `WITAJ ${addName} !\nOTO TWOJA LISTA ZADAŃ`;
    sayYourName.value = "";
  } else {
    title.textContent = "LISTA ZADAŃ";
  }
};
const nameEnter = (e) => {
  if (e.key === "Enter") {
    newName();
  }
};
const zoomBox = () => {
  todoMain.classList.add("zoom");
};
const zoomOutBox = () => {
  todoMain.classList.remove("zoom");
};
const zoomBox2 = () => {
    nameAddMainDiv.classList.add("zoom");
  };
  const zoomOutBox2 = () => {
    nameAddMainDiv.classList.remove("zoom");
  };

const DOMEventsCreate = () => {
    nameAddMainDiv.addEventListener("mouseover", zoomBox2);
nameAddMainDiv.addEventListener("mouseleave", zoomOutBox2);
  todoMain.addEventListener("mouseleave", zoomOutBox);
  todoMain.addEventListener("mouseover", zoomBox);
  BtnName.addEventListener("click", newName);
  sayYourName.addEventListener("keyup", nameEnter);
  popupAccept.addEventListener("click", acceptPopupBtn);
  popupCencel.addEventListener("click", closePopup);
  todoList.addEventListener("click", btnListener);
  todoInput.addEventListener("keyup", enterEvent);
  popupInput.addEventListener("keyup", popupEnter);
  btnAdd.addEventListener("click", openNewTask);
};

document.addEventListener("DOMContentLoaded", main); //po załadowaniu całego dokumentu dopiero rusza funkcja main
