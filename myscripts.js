let myList = []
const saveEl = document.getElementById("save-btn")
const containerEl = document.getElementById("container")
const listFromLocalStorage = JSON.parse(localStorage.getItem("myList"))
const clearEl = document.getElementById("erase-btn")
const desertEl = document.getElementById("desert-img")
const containerBackgroundEl = document.getElementById("container")



function render(aList) {
    containerBackgroundEl.style.display = "block"
    desertEl.style.display = "none"
    
    
    let listItems = ""
    for (let i = 0; i < aList.length; i++) {
        let idLink = "link_no_" + i.toString()
        let idDel = "delt_no_" + i.toString()
        let idNote = "note_no_" + i.toString()
        let idNoteBox = "notebox_no_" + i.toString()
        let idMove = "move_no_" + i.toString()
        let string_ = aList[i].slice(0,38)
        listItems += `
            
            <div class="link-box" id="${idLink}">
                <a href="${aList[i]}" target="_blank" class="link-btn" >
                    <div id="${idLink}" class="the-link"  style="text-decoration:none; color: rgb(0, 2, 21);">${string_}</div>
                </a>
                <div class="notes">
                    
                    <img class="note-icon" id="${idNote}" src="images/pencil.svg">
                    <div style="display:none;" id="${idNoteBox}" class="note-box"></div>
                </div>
                <div class="delete-btn">
                    <img class="del-icon" id="${idDel}" src="images/delete.svg">
                </div>
                <div class="move-btn">
                    <img id="${idMove}" class="move-icon" src="images/grid.png">
                </div>
            </div>

        `
        
       
        
        
    }


    containerEl.innerHTML = listItems
}

//Function to delete a particular link_box
function delEl(s) {
    let length_ = s.length
    // ID of the delete button clicked
    let delID = parseInt(s.slice(8,length_))
    
    myList = myList.slice(0,delID).concat(myList.slice(delID+1,myList.length))
    render(myList)
    localStorage.setItem("myList", JSON.stringify(myList) )
    if (myList.length == 0) {
        containerBackgroundEl.style.display = "none"
        desertEl.style.display = "block"
    }

    
}

//To get back link data from localStorage after refresh
if (listFromLocalStorage) {
    myList = listFromLocalStorage
    render(myList)
}

// If myList == [] then bring up desert img
if (myList.length == 0) {
    containerBackgroundEl.style.display = "none"
    desertEl.style.display = "block"
}

//To get the id of any element clicked
const onClick = (event) => {
    const list_ = {delt_no_:1,move_no_:2,note_no_:3}
    
    if (event.target.id.slice(0,8) in list_ ) {
        let idClicked = event.target.id
        if (idClicked.slice(0,8)=="note_no_") {
            alert(idClicked)
        } else if (idClicked.slice(0,8)=="delt_no_") {
            delEl(idClicked)
        } else {
            
        }
    } 
}
window.addEventListener('click', onClick)


const onHover = (event) => {
    if (event.target.id.slice(0,8) == "note_no_") {
        //document.getElementById(event.target.id).style.background = "rgba(0, 255, 255, 0.352)"
        let noteIdNo = event.target.id.slice(8,event.target.id.length)
        let noteId = "notebox_no_" + noteIdNo
        document.getElementById(noteId).style.display = "block"
        document.getElementById(noteId).addEventListener('mouseover', (event_) => {
            document.getElementById(noteId).style.display = "block"
            //let newEl = "note_no_"+noteIdNo
            //document.getElementById(event.target.id).style.background = "rgba(0, 255, 255, 0.352)"
        })
    }
        
    
    else {
        if (event.target.id.length < 11) {
            for (let i = 0; i < myList.length; i++) {
                document.getElementsByClassName("note-box")[i].style.display = "none"
                //document.getElementsByClassName("note-icon")[i].style.background = "rgba(243, 238, 238, 0)"
            }
        }
    }
}
window.addEventListener('mouseover', onHover)

//To save the tab on clicking `save page` button
saveEl.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myList.push(tabs[0].url)
        localStorage.setItem("myList", JSON.stringify(myList) )
        render(myList)
    })
})



//To erase all the tabs on clicking `erase all` button
clearEl.addEventListener("dblclick", function() {
    localStorage.clear()
    myList = []
    render(myList)
    desertEl.style.display = "block"
    containerBackgroundEl.style.display = "none"

})
