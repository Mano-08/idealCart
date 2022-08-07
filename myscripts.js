let myList = []
const saveEl = document.getElementById("save-btn")
const containerEl = document.getElementById("container")
const listFromLocalStorage = JSON.parse(localStorage.getItem("myList"))
const clearEl = document.getElementById("erase-btn")
const desertEl = document.getElementById("desert-img")
const containerBackgroundEl = document.getElementById("container")

// Function to render the List 
function render(aList) {
    containerBackgroundEl.style.display = "block"
    desertEl.style.display = "none"
    
    
    let listItems = ""
    for (let i = 0; i < aList.length; i++) {
        let edited_notes = aList[i][1]
        let i_str = i.toString()
        let idSaveButton = "save_btn" + i_str
        let idEditButton = "edit_btn" + i_str
        let idEdit = "edit_box_" + i_str
        let idBox = "note_box_" + i_str
        let idNoteDel = "nb_close" + i_str
        let idLink = "link_no_" + i_str
        let idDel = "delt_no_" + i_str
        let idNote = "note_no_" + i_str
        let idNoteBox = "notebox_no_" + i_str
        let idMove = "move_no_" + i_str
        let string_ = aList[i][0].slice(0,38)
        listItems += `
            
            <div class="link-box" id="${idLink}">
                <a href="${aList[i]}" target="_blank" class="link-btn" >
                    <div id="${idLink}" class="the-link"  style="text-decoration:none; color: rgb(0, 2, 21);">${string_}</div>
                </a>
                <div class="notes">
                    
                    <img class="note-icon" id="${idNote}" src="images/pencil.svg">
                    <div style="display:none;" id="${idNoteBox}" class="note-box">
                        <div class="nbedit" style="display:block" id="${idEditButton}">edit</div>
                        <div class="savebtn" style="display:none;" id="${idSaveButton}">save</div>
                        <img class="nb_close" id="${idNoteDel}" src="images/close.svg">
                        <input class="edit_box_" style="display:none;" id="${idEdit}">
                        <div style="display:block;" class="note_box_" id="${idBox}">${edited_notes}</div>
                    </div>
                </div>
                <div class="delete-btn">
                    <img class="del-icon" id="${idDel}" src="images/delete.svg">
                </div>
                <div class="move-btn">
                    <img id="${idMove}" class="move-icon" src="images/up-arrow.png">
                </div>
            </div>

        `
    }


    containerEl.innerHTML = listItems
}

// Function to pin linkbox on top 
function PinEl(s) {
    let theLength = s.length
    // ID of the delete button clicked
    let pinID = parseInt(s.slice(8,theLength))
    let pinVal = myList[pinID]
    myList = myList.slice(0,pinID).concat(myList.slice(pinID+1,myList.length))
    myList.splice(0, 0, pinVal)
    render(myList)
    localStorage.setItem("myList", JSON.stringify(myList) )
}


// Function to delete a particular link_box
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


// Function to bring up Note Box
function NoteEl(s) {
    let length1 = s.length
    // ID of the delete button clicked
    let NoteID = s.slice(8,length1)
    let NoteBoxID = "notebox_no_" + NoteID
    document.getElementById(NoteBoxID).style.display = "block"
    
}


// Function to close the note box
function NoteDelEl(s) {
    let length2 = s.length
    // ID of the delete button clicked
    let NoteDelID = s.slice(8,length2)
    let NoteBoxDelID = "notebox_no_" + NoteDelID
    document.getElementById(NoteBoxDelID).style.display = "none"
}


// Function to Edit notes 
function EditEl(s) {
    let length3 = s.length
    // ID of the delete button clicked
    let NoteEditID = s.slice(8,length3)
    let NoteBox_open_ID = "note_box_" + NoteEditID
    let NoteBoxEditID = "edit_box_" + NoteEditID
    let SaveID = "save_btn" + NoteEditID
    document.getElementById(NoteBoxEditID).style.display = "block"
    document.getElementById(NoteBox_open_ID).style.display = "none"
    document.getElementById(s).style.display = "none"
    document.getElementById(SaveID).style.display = "block"
    
}


// Function to save text inside the notes
function SaveBtn(s) {
    let length4 = s.length
    // ID of the delete button clicked
    let NoteSaveID = s.slice(8,length4)
    let NoteBox_ID = "note_box_" + NoteSaveID
    let NoteBoxEdit_ID = "edit_box_" + NoteSaveID
    let Edit_ID = "edit_btn" + NoteSaveID
    myList[parseInt(NoteSaveID)][1] = document.getElementById(NoteBoxEdit_ID).value
    localStorage.setItem("myList", JSON.stringify(myList) )
    render(myList)
    document.getElementById(NoteBox_ID).style.display = "block"
    document.getElementById(NoteBoxEdit_ID).style.display = "none"
    document.getElementById(s).style.display = "none"
    document.getElementById(Edit_ID).style.display = "block"
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
    const list_ = {delt_no_:1,move_no_:2,note_no_:3,nb_close:4,edit_btn:5,save_btn:6}
    
    if (event.target.id.slice(0,8) in list_ ) {
        let idClicked = event.target.id
        if (idClicked.slice(0,8)=="note_no_") {
            NoteEl(idClicked)
        } 
        if (idClicked.slice(0,8)=="nb_close") {
            NoteDelEl(idClicked)
        }
        if (idClicked.slice(0,8)=="delt_no_") {
            delEl(idClicked)
        } 
        if (idClicked.slice(0,8)=="edit_btn") {
            EditEl(idClicked)
        }
        if (idClicked.slice(0,8)=="save_btn") {
            SaveBtn(idClicked)
        }
        if (idClicked.slice(0,8)=="move_no_") {
            PinEl(idClicked)
        }
        else {
            
        }
    } 
}


//eventlistner to respond to the clicks
window.addEventListener('click', onClick)


//To save the tab on clicking `save page` button
saveEl.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myList.push([tabs[0].url,"null"])
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
