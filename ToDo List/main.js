// Seleção de elementos
const todoForm = document.querySelector('#todo-form');
const userInput = document.querySelector('#userInput');
const todoList = document.querySelector('#todo-list');
const editForm = document.querySelector('#edit-form');
const editInput = document.querySelector('#edit-input');
const cancelEditBtn = document.querySelector('#cancel-edit-btn');

let oldInputValue

// Funções
const saveTodo = text => {
    const todo = document.createElement('div');
    todo.classList.add('todo');

    const todoTitle = document.createElement('h3');
    todoTitle.innerHTML = text;
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement('button');
    doneBtn.classList.add('finish-todo');
    const check = document.createElement('img');
    check.src = 'svg/check.svg';
    check.classList.add('finish-todo');
    doneBtn.appendChild(check);
    todo.appendChild(doneBtn);

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-todo');
    const pencil = document.createElement('img');
    pencil.src = 'svg/edit.svg';
    pencil.classList.add('edit-todo');
    editBtn.appendChild(pencil);
    todo.appendChild(editBtn);

    const rmBtn = document.createElement('button');
    rmBtn.classList.add('remove-todo');
    const trash = document.createElement('img');
    trash.src = 'svg/trash.svg';
    trash.classList.add('remove-todo');
    rmBtn.appendChild(trash);
    todo.appendChild(rmBtn);

    todoList.appendChild(todo);

    userInput.value = '';
    userInput.focus();
};

const toggleForms = () =>{
  editForm.classList.toggle('hide')
  todoForm.classList.toggle('hide');
  todoList.classList.toggle('hide');
}

const updateTodo = (text) =>{
  const todos = document.querySelectorAll('.todo')

  todos.forEach((todo)=>{
    let todoTitle = todo.querySelector('h3')

    if(todoTitle.innerHTML === oldInputValue){
      todoTitle.innerText = text
    }
  })
}

// Eventos

todoForm.addEventListener('submit', e => {
    e.preventDefault();

    const inputValue = userInput.value;

    if (inputValue) {
        saveTodo(inputValue);
    }
});

document.addEventListener('click', e => {
    const targetEl = e.target;
    const parentEl = targetEl.closest('div');

    let todoTitle

    if(parentEl && parentEl.querySelector('h3')){
      todoTitle = parentEl.querySelector('h3').innerHTML
    }

    if (targetEl.classList.contains('finish-todo')) {
        parentEl.classList.toggle('done');
    }

    if(targetEl.classList.contains('remove-todo')){
      parentEl.remove()
    }

    if(targetEl.classList.contains('edit-todo')){
      toggleForms()

      editInput.value = todoTitle
      oldInputValue = todoTitle
    }
});

cancelEditBtn.addEventListener('click', (e) =>{
  e.preventDefault()

  toggleForms()
})

editForm.addEventListener('submit', (e) =>{
  e.preventDefault()

  const editInputValue = editInput.value
  if(editInputValue){
    updateTodo(editInputValue)
  }

  toggleForms()
})