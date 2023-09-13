const toDoArray = Array.from(document.querySelector('.todo-container').children) // Array of todos
const deleteBtn = Array.from(document.querySelectorAll('.delete')) // Array of delete buttons
const checkBoxes = Array.from(document.querySelectorAll('.checkbox')) // Array of checkboxes
const createToDoBtn = document.querySelector('.create-overlay-btn') // Main create todo button

const createOverlayCloseBtn = document.querySelector('.create-todo-close-btn') // Main create todo close button
const overlay = document.querySelector('#overlay') // Background dark on overlay element
const createOverlay = document.querySelector('.create-todo-overlay') // Main create todo overlay

// if (toDoArray.length != 0){
//     toDoArray.forEach((value,index) => {
//         value.setAttribute('id', `todo-${index}`)
//     })
// }

deleteBtn.forEach((elem) => {
    elem.addEventListener('click', function(e){
        e.target.parentElement.remove()
    
    })
})

checkBoxes.forEach((elem) => {
    elem.addEventListener('click', function(e){
        if (!(e.target.hasAttribute('checked'))){
            e.target.setAttribute('checked', 'checked')
            e.target.nextElementSibling.firstElementChild.style.textDecoration = 'line-through'
            e.target.nextElementSibling.firstElementChild.nextElementSibling.style.textDecoration = 'line-through'

        }else {
            e.target.removeAttribute('checked')
            e.target.nextElementSibling.firstElementChild.style.textDecoration = 'none'
            e.target.nextElementSibling.firstElementChild.nextElementSibling.style.textDecoration = 'none'
        }
    })
})

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
