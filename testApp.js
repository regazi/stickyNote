let noteInput = document.getElementById('noteInput')
let backsheet = document.getElementById('container')
let counter = 1
const reload = [JSON.parse(localStorage.getItem('reload'))].toString
let reload2 = JSON.stringify(reload)
/*
window.onload = function () {
    console.log(reload2 + 'current')

    reload.forEach(reload => {

        addNote(reload)
        dragIt()




    });
}
*/




//submit event listener ------------------------------------------------


noteInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addNote()
        dragIt()
        updateLS(e.getItem())
    }

})

//add notes-------------------------------------------------------------
function addNote() {
    let newYellow = [document.createElement('div')]
    //newYellow.setAttribute('id', noteID)
    newYellow.forEach(newYellow => {
        newYellow.classList.add('draggable')
        newYellow.setAttribute('id', + counter++)
        newYellow.innerHTML = noteInput.value
        backsheet.appendChild(newYellow)
        noteInput.value = ""
        console.log(newYellow.id)

    })

}

function moveAt(dragger, pageX, pageY) {
    dragger.style.left = pageX - shiftX + 'px';
    dragger.style.top = pageY - shiftY + 'px';
    //console.log(pageX, pageY)
}

//dragging function-------------REVIST AND BE SURE TO DRY-----------------------------------------
function dragIt() {
    let dragger = document.querySelectorAll('.draggable')
    dragger.forEach(dragger => {
        dragger.ondragstart = function () {

            return false;
        };
        dragger.onmousedown = function (event) {
            console.log('start')
            // compensate for pointer positon in box and ensure postion
            let shiftX = event.clientX - dragger.getBoundingClientRect().left;
            let shiftY = event.clientY - dragger.getBoundingClientRect().top;
            dragger.style.position = 'absolute';
            dragger.style.zIndex = 1000;
            //document.body.append(dragger);

            moveAt(dragger, event.pageX, event.pageY);

            // moves the dragger at (pageX, pageY) coordinates
            // taking initial shifts into account

            function onMouseMove(event) {
                moveAt(dragger, event.pageX, event.pageY);
            }

            // move the dragger on mousemove
            document.addEventListener('mousemove', onMouseMove);

            // drop the dragger, append if on playing field || delete if over trashcan
            dragger.onmouseup = function () {
                let dragBox = dragger.getBoundingClientRect()
                let imgBox = img.getBoundingClientRect();

                if (imgBox.left - dragBox.right < 1 && imgBox.top - dragBox.bottom < 1) {
                    console.log('deleteIsWorking')
                    document.removeEventListener('mousemove', onMouseMove);
                    dragger.onmouseup = null;
                    dragger.classList.remove('draggable')
                    dragger.classList.add('goneForever')
                    dragger.remove()


                } else {
                    document.removeEventListener('mousemove', onMouseMove);
                    dragger.onmouseup = null;
                    document.body.append(dragger)
                    console.log('end')

                }

            };
            console.log(dragger.style.left, dragger.style.top)
        };

    })

}

function updateLS(stickyNote) {
    const repo = []

    if (stickyNote.innerText.length > 0) {
        repo.push({
            text: stickyNote.innerText
        })

        localStorage.setItem('repo', JSON.stringify
            (repo))
        localStorage.setItem
    }

}