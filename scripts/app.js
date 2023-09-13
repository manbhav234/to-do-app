const createToDoBtn = document.querySelector('.create-todo-btn') // Main create todo button
const toDoContainer = document.querySelector('.todo-container')

const createOverlayCloseBtn = document.querySelector('.create-todo-close-btn') // Main create todo close button
const overlay = document.querySelector('#overlay') // Background dark on overlay element
const createOverlay = document.querySelector('.create-todo-overlay') // Main create todo overlay
const createTodoForm = document.querySelector('.create-todo-form') // Create todo form

// Javascript for creating the to-do html
const createTodoHTML = function (titleText, deadline){
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

    toDoContainer.appendChild(mainDiv)
}

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

        }else {
            e.target.removeAttribute('checked')
            e.target.nextElementSibling.firstElementChild.style.textDecoration = 'none'
            e.target.nextElementSibling.firstElementChild.nextElementSibling.style.textDecoration = 'none'
        }
    }

})

// Main Create new todo btn
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
    createOverlay.classList.remove('active')
    overlay.classList.remove('active')
})