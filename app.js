let noteInput = document.getElementById('noteInput')
let backsheet = document.getElementById('container')
let redButton = document.getElementById('red')
let blueButton = document.getElementById('blue')
const pasteldButton = document.getElementById('pastel')
const counter = 1

//note background color selector
redButton.addEventListener('click', changeRed)
blueButton.addEventListener('click', changeBlue)
pasteldButton.addEventListener('click', changePastel)

function changeRed() {
    backsheet.style.background = ('red')
}
function changeBlue() {
    backsheet.style.background = ('blue')
}
function changePastel() {
    backsheet.style.background = ('rgb(41, 204, 190')
}

noteInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addNote()
    }

})

function addNote() {
    let newYellow = document.createElement('div')
    newYellow.classList.add('draggable')
    //newYellow.draggable = true
    //newYellow.ondragstart = 'drag(ev)'
    newYellow.innerHTML = noteInput.value
    backsheet.appendChild(newYellow)
    noteInput.value = ""

}

function allowDrop(ev) {
    ev.preventDefault();
}

//questionable code
/*  
function setColor() {
    let dragger = document.querySelectorAll('draggable')
    dragger.forEach(thing => {
        thing.draggable = true
        if (counter == 2) {
            thing.classlist.add('red')
        } else if (counter == 3) {
            thing.classList.add.apply('blue')
        } else if (counter == 4) {
            thing.classList.add('pastel')
        } else
            thing.classList.add('draggable')
        thing.ondragstart = console.log(thing.class)//'drag(ev)'

    });
*/
function drag(ev) {

    ev.dataTransfer.setData('text', ev.target.id);
    console.log(data)
    console.log('dragging')
    console.log(element)
}

function drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    let dataCont = document.createElement('div')
    dataCont.append(data)
    dataCont.classList.add('draggable')
    ev.target.append(dataCont);
    backsheet.innerHTML = ''


}
/*
// test code for dragging anywhere
const cAfter = document.getElementById('containerAfter')
cAfter.addEventListener('click', checkTarget)

function checkTarget() {
    if (Event.AT_TARGET = cAfter.children) {
        console.log('fuck yeh!')
        let dragger = document.getElementsByClassName('draggable')
       
    }
}*/