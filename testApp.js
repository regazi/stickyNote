let noteInput = document.getElementById('noteInput')
let backsheet = document.getElementById('stage')
let counter = 1
const aboutButton = document.getElementById('about')
let aboutInfo = document.getElementById('aboutInfo')
const bar = document.getElementById('bar')




aboutButton.addEventListener('click', createAbout)
function createAbout() {
    let aboutGlass = document.createElement('div')
    aboutGlass.classList.add('draggable')
    aboutGlass.innerText = aboutInfo.value
    document.body.append(aboutGlass)
    aboutGlass.style.top = 70 + 'vh'
    aboutGlass.style.left = 48 + 'vw'
    console.log(aboutGlass.style.top)


    dragIt()
}



//submit event listener ------------------------------------------------


noteInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addNote()
        dragIt()

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


//dragging function-------------REVIST and be sure to DRY-----------------------------------------
function dragIt() {
    let dragger = document.querySelectorAll('.draggable')
    // prevent dragging API from initializing 
    dragger.forEach(dragger => {
        dragger.ondragstart = function () {
            return false;
        };
        // start drag && bring selected note to front of z-index-----------------------------------
        dragger.onmousedown = function (event) {
            console.log('start')
            dragger.style.zIndex = 10 + counter++;
            // compensate for pointer positon in box-----------------------------------------------
            let shiftX = event.clientX - dragger.getBoundingClientRect().left;
            let shiftY = event.clientY - dragger.getBoundingClientRect().top;


            // drag tracking-----------------------------------------------------------------------
            moveAt(event.pageX, event.pageY);

            // moves the dragger at (pageX, pageY) coordinates
            // taking initial shifts into account
            function moveAt(pageX, pageY) {
                dragger.style.left = pageX - shiftX + 'px';
                dragger.style.top = pageY - shiftY + 'px';
                //console.log(pageX, pageY)
            }

            function onMouseMove(event) {
                event.preventDefault()
                moveAt(event.pageX, event.pageY);
            }

            // move the dragger on mousemove
            document.addEventListener('mousemove', onMouseMove);

            // drop the dragger, append if on playing field || delete if over trashcan
            dragger.onmouseup = function (event) {
                event.preventDefault()
                let dragBox = dragger.getBoundingClientRect()
                let imgBox = img.getBoundingClientRect();

                if (imgBox.left - dragBox.right < 1 && imgBox.top - dragBox.bottom < 1) {
                    console.log('deleteIsWorking')
                    document.removeEventListener('mousemove', onMouseMove);
                    dragger.onmouseup = null;
                    dragger.classList.add('goneForever')
                    dragger.remove()

                } else {
                    document.removeEventListener('mousemove', onMouseMove);
                    dragger.onmouseup = null;
                    document.body.append(dragger)
                    dragger.style.zIndex = 10;
                    console.log('end')

                }

            };
            console.log(dragger.style.left, dragger.style.top)
        };

    })

}



