let noteInput = document.getElementById('noteInput');
let backsheet = document.getElementById('stage');
let counter = 1;
const aboutButton = document.getElementById('about');
let aboutInfo = document.getElementById('aboutInfo');
const bar = document.getElementById('bar');
let clicks = 0;
const can = document.getElementById('img');
let discarded = [];
const quotes = ['See some bugs? let Me Know!', 'See some bugs? let Me Know!']



can.addEventListener('click', openDeleteList);

function openDeleteList() {
    clicks++;

    if (clicks == 1) {
        maxDeleteBox()
    } else {
        minDeleteBox()
        clicks--;
        clicks--;

    }
}

function makeTdrag() {
    let dT = document.querySelectorAll('.draggableTrash');

    dT.forEach(dT => {
        dT.addEventListener('click', makeTd => {
            dT.classList.remove('draggableTrash');
            dT.classList.add('draggable')

            document.body.append(dT)
            dragIt()

        })
        // discarded.remove(dT)
    });


}
//--------------------Trash Box (menu of deleted items)--------------Trash Box-----------
// declare and create/style trash box
let button = document.createElement('button');
let box = document.createElement('div');
button.style.minWidth = 4 + 'vw';
button.style.minHeight = 4 + 'vh';
button.style.marginTop = 4 + 'vh';
button.setAttribute('id', 'clearTrash');
box.style.bottom = 25 + 'vh';
box.style.left = 60 + 'vw';
box.setAttribute('id', 'discardedBox')

//premenantly delte last item 
button.onclick = clearTrash => {
    let item = document.getElementById('items')
    item.remove()
    console.log('nope')
    discarded = []

}


//let freshNote = discarded.filter(discarded => discarded.valueOf());
//generateList
function generateList() {
    discarded.forEach((discarded) => {
        let item = document.createElement('li');
        item.innerText = discarded.valueOf();
        item.classList.add('draggableTrash');
        item.setAttribute('id', 'items');
        box.append(item);
    })
    discarded = []
}

//open trash box
function maxDeleteBox() {
    box.append(button)
    document.body.append(box);
    makeTdrag()

};

//close trash box
function minDeleteBox() {
    let box = document.getElementById('discardedBox');
    box.remove();
}
//--------------------Trash Box-------------------------------------Trash Box-------------------------------------------

//--------------------About Menu-------------------------------------About Menu-------------------------------------------
// chose to use if statement and count variable over .stopImmediatePropogation due to desired toggle function

aboutButton.addEventListener('click', clickDecision)

function clickDecision() {
    clicks++;

    if (clicks == 1) {
        addAbout();
    } else {
        romoveAbout()
        clicks--;
        clicks--;
    }

}
function addAbout() {
    let aboutGlass = document.createElement('div');
    aboutGlass.classList.add('aboutPanel');
    aboutGlass.setAttribute('id', 'aboutID');
    aboutGlass.innerText = aboutInfo.value;
    document.body.append(aboutGlass);
    aboutGlass.style.top = 58 + 'vh';
    aboutGlass.style.left = 41 + 'vw';
    aboutGlass.style.zIndex = 1000;
}

function romoveAbout() {
    let aboutGlass = document.getElementById('aboutID')
    aboutGlass.remove()
}
//submit event listener ------------------------------------------------
//--------------------About Menu-------------------------------------About Menu-------------------------------------------

//--------------------Input Note-------------------------------------Input Note-------------------------------------------

noteInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addNote()
        dragIt()

    }

})

//add notes-------------------------------------------------------------
function addNote() {
    let newYellow = [document.createElement('div')];
    newYellow.forEach(newYellow => {
        newYellow.classList.add('draggable');
        newYellow.setAttribute('id', + counter++);
        newYellow.innerHTML = noteInput.value;
        backsheet.appendChild(newYellow);
        newYellow.style.top = 50 + 'vh';
        noteInput.value = "";
    })

}
/*
item = quotes[Math.floor(Math.random() * quotes.length)]
//set up element for instruction aleart. Asynch 
let alrt = document.createElement('div')
alrt.setAttribute('id', 'alrt')
alrt.innerText = item.valueOf()
//'I built this bubble to cover up a bug that is now fixed, but it took some time to do, due to my shitty nesting so... Ill leave it';
alrt.style.left = 50 + 'vw'
alrt.style.top = 1 + 'vh'

function displayAleart() {

    function resolveAfter2seconds(t) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(t);
            }, 2000);
        });
    }

    function displayA() {

        backsheet.append(alrt)
    }

    async function fadeA() {
        //  let alrt = document.getElementById('alrt')
        let tOut = await resolveAfter2seconds(2)
        alrt.remove()
    }
    displayA()
    fadeA()
}
*/
//-----------------------dragging function---------------------------------------------------------------
function dragIt() {
    let dragger = document.querySelectorAll('.draggable')
    // prevent dragging API from initializing 
    dragger.forEach(dragger => {
        dragger.ondragstart = function () {
            return false;
        };
        // start drag && bring selected note to front of z-index-----------------------------------
        dragger.onmousedown = function (event) {
            //  displayAleart()
            dragger.style.zIndex = 10 + counter++;
            // compensate for pointer positon in box-----------------------------------------------
            let shiftX = event.clientX - dragger.getBoundingClientRect().left;
            let shiftY = event.clientY - dragger.getBoundingClientRect().top;










            let dragBox = dragger.getBoundingClientRect()
            if (dragBox.left - event.pageX < - 50 && dragBox.left - event.pageX > -170) {

                //document.addEventListener('keypress', function (e) {
                document.addEventListener('keypress', keyValue)
                function keyValue(e) {
                    if (e.key === 'a') {
                        rotateLeft()
                    } else if (e.key === 'd') {
                        rotateRight()
                    } else {
                        // document.removeEventListener('keypress', keyValue)
                        return;
                    }

                }

                let baseline = 0
                function rotateLeft() {
                    dragger.style.transform = "rotate(" + baseline++ + "deg)"
                }
                function rotateRight() {
                    dragger.style.transform = "rotate(" + baseline-- + "deg)"
                }



            }


            // drag tracking-----------------------------------------------------------------------
            moveAt(event.pageX, event.pageY);

            //bubble = alert
            //            moveBubble(event.pageX, event.pageY)

            //            function moveBubble(pageX, pageY) {
            //                alrt.style.left = pageX + 'px';
            //                alrt.style.top = pageY - 200 + 'px';
            //           }

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
                //                try {
                //                    moveBubble(event.pageX, event.pageY);
            }
            //              catch {
            //                 return;
            //              }
            //            }

            // move the dragger on mousemove
            document.addEventListener('mousemove', onMouseMove);

            // drop the dragger, append if on playing field || delete if over trashcan ------delete funciton--
            dragger.onmouseup = function (event) {
                event.preventDefault()
                let dragBox = dragger.getBoundingClientRect()
                let imgBox = img.getBoundingClientRect();

                if (imgBox.left - dragBox.right < 1 && imgBox.top - dragBox.bottom < 1) {
                    console.log('deleteIsWorking');
                    document.removeEventListener('mousemove', onMouseMove);
                    dragger.onmouseup = null;
                    discarded.push(dragger.innerHTML)
                    dragger.remove();
                    generateList()

                } else {
                    document.removeEventListener('keypress', keyValue)
                    document.removeEventListener('mousemove', onMouseMove);
                    dragger.onmouseup = null;
                    document.body.append(dragger)
                    dragger.style.zIndex = 10;
                    console.log('end')

                }

            };

        };

    })

}



