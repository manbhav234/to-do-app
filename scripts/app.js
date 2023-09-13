const createToDoBtn = document.querySelector('.create-todo-btn') // Main create todo button
const toDoContainer = document.querySelector('.todo-container')

const createOverlayCloseBtn = document.querySelector('#create-todo-close-btn') // Main create todo close button
const overlay = document.querySelector('#overlay') // Background dark on overlay element

const createOverlay = document.querySelector('#create-todo-overlay') // Main create todo overlay
const createTodoForm = document.querySelector('#create-todo-form') // Create todo form

const editOverlay = document.querySelector('#edit-todo-overlay')
const editTodoForm = document.querySelector('#edit-todo-form')
const editOverlayCloseBtn = document.querySelector('#edit-todo-close-btn') 

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
    mainDiv.id = `${index}`
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
    // todoClickListener()
}


// Fetching and displaying todos from the local storage
if(localStorage.getItem('todoList')){
    let todoList = JSON.parse(localStorage.getItem('todoList'))

    todoList.forEach((value, index) => {
        createTodoHTML(value.title, value.deadline, value.isComplete, index)
    })
}

// const updateTodoHTML = function(elemId, title, deadline){
//     // elemId = String(elemId)
//     // console.log(elemId)
//     document.getElementById(elemId).firstElementChild.nextElementSibling.firstElementChild.textContent = title
//     document.getElementById(elemId).firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.textContent = deadline
// }       



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

//Update Local storage based on checkbox activity
const updateCheckLocalStorage = function(setVal, elemId) {
    let todoList = JSON.parse(localStorage.getItem('todoList'))
    todoList.forEach((value, index) => {
        if(Number(elemId) === index){
            value.isComplete = setVal;
        }
    })
    localStorage.setItem('todoList', JSON.stringify(todoList))
}

//Update local storage based on delete button activity
const updateDelLocalStorage = function(elemId){
    let todoList = JSON.parse(localStorage.getItem('todoList'))
    todoList.forEach((value,index) => {
        if(Number(elemId) === index){
            todoList.splice(index,1)
        }
    })
    localStorage.setItem('todoList', JSON.stringify(todoList))
}

const loadContentOnOverlay = function(elemId){
    let todoList = JSON.parse(localStorage.getItem('todoList'))
    let todoObj = todoList[elemId]
    const titleElem = document.querySelector('#edit-todo-title').setAttribute('value', todoObj.title)
    const descElem = document.querySelector('#edit-description').textContent = todoObj.description
    const deadlineElem = document.querySelector('#edit-deadline').setAttribute('value', todoObj.deadline)
    editTodoForm.addEventListener('submit', function(e){
        e.preventDefault()
        const editTodoTitle = document.querySelector('#edit-todo-title').value
        const editTodoDesc = document.querySelector('#edit-description').value
        const editTodoDeadline = document.querySelector('#edit-deadline').value
        todoObj.title = editTodoTitle
        todoObj.description = editTodoDesc
        todoObj.deadline = editTodoDeadline
        todoList.splice(elemId,1,todoObj)
        localStorage.setItem('todoList', JSON.stringify(todoList))
        editOverlay.classList.remove('active')
        overlay.classList.remove('active')
        // updateTodoHTML(elemId, editTodoTitle,editTodoDeadline)
    })
}






// Delete and checkbox click listeners
toDoContainer.addEventListener('click', function(e){

    //Delete Button
    if(e.target.classList.contains('delete')) {
        e.target.parentElement.remove()
        updateDelLocalStorage(e.target.parentElement.id)
    }

    //Checkbox
    if (e.target.classList.contains('checkbox')){
        if (!(e.target.hasAttribute('checked'))){
            e.target.setAttribute('checked', 'checked')
            e.target.nextElementSibling.firstElementChild.style.textDecoration = 'line-through'
            e.target.nextElementSibling.firstElementChild.nextElementSibling.style.textDecoration = 'line-through'
            updateCheckLocalStorage(true,e.target.parentElement.id)

        }else {
            e.target.removeAttribute('checked')
            e.target.nextElementSibling.firstElementChild.style.textDecoration = 'none'
            e.target.nextElementSibling.firstElementChild.nextElementSibling.style.textDecoration = 'none'
            updateCheckLocalStorage(false,e.target.parentElement.id)
        }
    }

    if(e.target.classList.contains('todo-content')){
        if(!(editOverlay.classList.contains('active'))){
            editOverlay.classList.add('active')
            overlay.classList.add('active')
            loadContentOnOverlay(e.target.parentElement.id)
        }
        editOverlayCloseBtn.addEventListener('click', function(e){
            editTodoForm.reset()
            editOverlay.classList.remove('active')
            overlay.classList.remove('active')
            
        })
    }

})

// Main Create new todo buttonn click listener
createToDoBtn.addEventListener('click', function(e){
    if(!(createOverlay.classList.contains('active'))){
        createOverlay.classList.add('active')
        overlay.classList.add('active')
    }
    createOverlayCloseBtn.addEventListener('click', function(e){
        createTodoForm.reset()
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
})

