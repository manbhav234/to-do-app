const createToDoBtn = document.querySelector('.create-todo-btn') // Main create todo button
const toDoContainer = document.querySelector('.todo-container')

const createOverlayCloseBtn = document.querySelector('.create-todo-close-btn') // Main create todo close button
const overlay = document.querySelector('#overlay') // Background dark on overlay element
const createOverlay = document.querySelector('.create-todo-overlay') // Main create todo overlay
const createTodoForm = document.querySelector('.create-todo-form') // Create todo form


// Javascript for creating the to-do html
const createTodoHTML = function (titleText, deadline, isComplete, index){
    const mainDiv = document.createElement('div')
    const checkBoxInput = document.createElement('input')
    const contentDiv = document.createElement('div')
    const titleElem = document.createElement('h3')
    const titleElemText = document.createTextNode(titleText)
    const deadlineElem = document.createElement('p')
    const deadlineElemText = document.createTextNode(deadline)
    const deleteImg = document.createElement('img')

    mainDiv.classList.add('todo')
    
    checkBoxInput.type = 'checkbox'
    checkBoxInput.classList.add('checkbox')
    checkBoxInput.id = `${index}`
    mainDiv.appendChild(checkBoxInput)
    
    contentDiv.classList.add('todo-content')
    mainDiv.appendChild(contentDiv)

    titleElem.classList.add('main-title')
    titleElem.appendChild(titleElemText)
    contentDiv.appendChild(titleElem)

    deadlineElem.classList.add('main-deadline')
    
    deadlineElem.appendChild(deadlineElemText)
    contentDiv.appendChild(deadlineElem)

    deleteImg.setAttribute('src', 'images/dustbin-closed.png')
    deleteImg.setAttribute('alt', 'Delete')
    deleteImg.classList.add('delete')
    mainDiv.appendChild(deleteImg)

    if (isComplete){
        checkBoxInput.setAttribute('checked', 'checked')
        checkBoxInput.nextElementSibling.firstElementChild.style.textDecoration = 'line-through'
        checkBoxInput.nextElementSibling.firstElementChild.nextElementSibling.style.textDecoration = 'line-through'
    }

    toDoContainer.appendChild(mainDiv)
}

// Fetching and displaying todos from the local storage
if(localStorage.getItem('todoList')){
    let todoList = JSON.parse(localStorage.getItem('todoList'))

    todoList.forEach((value, index) => {
        createTodoHTML(value.title, value.deadline, value.isComplete, index)
    })
}

//Add a todo to local storage
const addToLocalStorage = function (title,description, deadline){
    let newTodoObj = {
        title: title,
        description: description,
        deadline: deadline,
        isComplete: false
    }
    if (!localStorage.getItem('todoList')){
        let todoList = []
        todoList.push(newTodoObj)
        localStorage.setItem('todoList', JSON.stringify(todoList))
    }
    else{
        let todoList = JSON.parse(localStorage.getItem('todoList'))
        todoList.push(newTodoObj)
        localStorage.setItem('todoList', JSON.stringify(todoList))
    }
}

const updateCheckLocalStorage = function(setVal, elemId) {
    let todoList = JSON.parse(localStorage.getItem('todoList'))
    todoList.forEach((value, index) => {
        if(Number(elemId) === index){
            value.isComplete = setVal;
        }
    })
    localStorage.setItem('todoList', JSON.stringify(todoList))
}

// Delete and checkbox click listeners
toDoContainer.addEventListener('click', function(e){

    //Delete Button
    if(e.target.classList.contains('delete')) {
        e.target.parentElement.remove()
    }

    //Checkbox
    if (e.target.classList.contains('checkbox')){
        if (!(e.target.hasAttribute('checked'))){
            e.target.setAttribute('checked', 'checked')
            e.target.nextElementSibling.firstElementChild.style.textDecoration = 'line-through'
            e.target.nextElementSibling.firstElementChild.nextElementSibling.style.textDecoration = 'line-through'
            updateCheckLocalStorage(true,e.target.id)

        }else {
            e.target.removeAttribute('checked')
            e.target.nextElementSibling.firstElementChild.style.textDecoration = 'none'
            e.target.nextElementSibling.firstElementChild.nextElementSibling.style.textDecoration = 'none'
            updateCheckLocalStorage(false,e.target.id)
        }
    }

})

// Main Create new todo buttonn click listener
createToDoBtn.addEventListener('click', function(e){
    if(!(createOverlay.classList.contains('active'))){
        createOverlay.classList.add('active')
        overlay.classList.add('active')
    }
    createOverlayCloseBtn.addEventListener('click', function(e){
        createOverlay.classList.remove('active')
        overlay.classList.remove('active')
    })
})

// Adding new todo to todo-container
createTodoForm.addEventListener('submit', function(e){
    e.preventDefault()
    const createTodoTitle = document.querySelector('.create-todo-title').value
    const createTodoDesc = document.querySelector('#create-description').value
    const createTodoDeadline = document.querySelector('#create-deadline').value
    createTodoHTML(createTodoTitle, createTodoDeadline)
    createTodoForm.reset()
    addToLocalStorage(createTodoTitle, createTodoDesc, createTodoDeadline)
    createOverlay.classList.remove('active')
    overlay.classList.remove('active')
})