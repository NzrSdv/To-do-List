const mainInput = document.querySelector(".main-input");
const addButton = document.querySelector(".add-button");
const cancelButton = document.querySelector(".cancel-button");
const readerWindow = document.querySelector(".reader-window");

let counter = 1;

var notion = document.createElement("div");
notion.textContent = "No tasks yet";
notion.className = "no-task";

function notionAppend(){
    if (readerWindow.children.length == 0) {
        readerWindow.append(notion);
      }
}

if(localStorage.getItem("Todo") != undefined){
  let list =  [...JSON.parse(localStorage.getItem("Todo"))]
  for(let i = 0; i < list.length; i++){
    newTask(list[i].task);
  }
}
else{
  notionAppend();
}

addButton.addEventListener("click", () => {
  let taskInfo = mainInput.value;
  if (readerWindow.children[0] == notion) {
    notion.remove();
  }
  newTask(taskInfo);
  LSInputter(taskInfo);
  mainInput.value = "";
});

cancelButton.addEventListener("click", () => {
    if(readerWindow.children[0] == notion){
        alert("nothing to delete");
    }
    else{
        while(readerWindow.children[0] != notion){
          readerWindow.removeChild(readerWindow.firstChild);
          localStorage.clear();
          notionAppend();
        }
        counter = 1; 
    }
})

function newTask(someTask) {
  var taskText = document.createElement("input");
  taskText.type = "text";
  taskText.className = "task-text";
  taskText.readOnly = true;
  taskText.value = someTask;

  var taskCheck = document.createElement("input");
  taskCheck.type = "checkbox";

  taskCheck.addEventListener("change",() => {
    if(taskCheck.checked){
        taskText.style.textDecoration = "line-through";
    }
    else{
        taskText.style.textDecoration = "none";

    }
  })

  var iSection = document.createElement("div");
  iSection.className = "inputs-section";

  iSection.append(taskCheck);
  iSection.append(taskText);

  var eButton = document.createElement("button");
  eButton.className = "edit-button";
  eButton.textContent = "Edit";

  eButton.addEventListener("click", () => {
    taskText.readOnly = !taskText.readOnly;
    if (!taskText.readOnly) {
      taskText.focus();
      eButton.textContent = "Confirm";
    } else {
      eButton.textContent = "Edit";
    }
  });

  var dButton = document.createElement("button");
  dButton.className = "delete-button";
  dButton.textContent = "Delete";

  dButton.addEventListener("click", () => {
    if(confirm("are you sure you want to delete this note?")){
        
      let CurrentId = parseInt(taskBlock.getAttribute("id"));
      let db = JSON.parse(localStorage.getItem("Todo"))
      let newDb = db.filter(element => {
        if(element.id != CurrentId){
          return element;
        }
      })
      localStorage.setItem("Todo",JSON.stringify(newDb))
      taskBlock.remove();
        notionAppend();
    }
  })

  var bSection = document.createElement("div");
  bSection.className = "buttons-section";

  bSection.append(eButton);
  bSection.append(dButton);

  var taskBlock = document.createElement("div");
  taskBlock.className = "task-Block";
  taskBlock.append(iSection);
  taskBlock.append(bSection);
  taskBlock.setAttribute("id",`${counter}`);
  readerWindow.append(taskBlock);
}
function LSInputter(someTask){
  if(localStorage.getItem("Todo") != undefined){
    localStorage.setItem("Todo",JSON.stringify([...JSON.parse(localStorage.getItem("Todo")),{id:counter,task:someTask}]))
    counter++;
  }
  else{
    localStorage.setItem("Todo",JSON.stringify([{id:counter,task:someTask}]))
    counter++;
  }
}