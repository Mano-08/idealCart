let myList = []
const saveEl = document.getElementById("save-btn")
const containerEl = document.getElementById("container")
const listFromLocalStorage = JSON.parse(localStorage.getItem("myList"))
const clearEl = document.getElementById("erase-btn")
const desertEl = document.getElementById("desert-img")
const containerBackgroundEl = document.getElementById("container")
const container_1 = document.getElementById("gray-container-1")
const container_2 = document.getElementById("gray-container-2")
const container_3 = document.getElementById("gray-container-3")


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
        let string_ = aList[i][0].slice(8,46)
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
                        <input placeholder="write your short note here ....." class="edit_box_" style="display:none;" id="${idEdit}">
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
    let length = s.length
    // ID of the delete button clicked
    let pinID = parseInt(s.slice(8,length))
    let pinVal = myList[pinID]
    myList = myList.slice(0,pinID).concat(myList.slice(pinID+1,myList.length))
    myList.splice(0, 0, pinVal)
    render(myList)
    localStorage.setItem("myList", JSON.stringify(myList) )
    let linkEl = document.getElementById("link_no_0") 
    linkEl.style.background = "rgba(0, 0, 0, 0.388)"
    setTimeout(function() {
        linkEl.style.background = "rgba(0, 0, 0, 0.361)"
    }, 300)
    setTimeout(function() {
        linkEl.style.background = "rgba(0, 0, 0, 0.334)"
    }, 350)
    setTimeout(function() {
        linkEl.style.background = "rgba(0, 0, 0, 0.307)"
    }, 400)
    setTimeout(function() {
        linkEl.style.background = "rgba(0, 0, 0, 0.280)"
    }, 450)
    setTimeout(function() {
        linkEl.removeAttribute("style")
    }, 500)
}


// Function to delete a particular link_box
function delEl(s) {
    let length = s.length
    // ID of the delete button clicked
    let delID = parseInt(s.slice(8,length))
    let linkEl = document.getElementById(`link_no_${delID}`) 
    setTimeout(function() {
        linkEl.style.opacity = "0.8"
    }, 60)
    setTimeout(function() {
        linkEl.style.opacity = "0.6"
    }, 120)
    setTimeout(function() {
        linkEl.style.opacity = "0.4"
    }, 180)
    setTimeout(function() {
        linkEl.style.opacity = "0.2"
    }, 240)
    setTimeout(function() {
        myList = myList.slice(0,delID).concat(myList.slice(delID+1,myList.length))
        render(myList)
        localStorage.setItem("myList", JSON.stringify(myList) )
        if (myList.length == 0) {
            containerBackgroundEl.style.display = "none"
            desertEl.style.display = "block"
        }
    }, 350)
    

    
}


// Function to bring up Note Box
function NoteEl(s) {
    let length = s.length
    // ID of the delete button clicked
    let NoteID = parseInt(s.slice(8,length))
    let linkEl = document.getElementById("notebox_no_" + NoteID.toString()) 
    linkEl.style.opacity = "0"
    linkEl.style.display = "block"
    setTimeout(function() {
        linkEl.style.opacity = "0.2"
    }, 55)
    setTimeout(function() {
        linkEl.style.opacity = "0.4"
    }, 110)
    setTimeout(function() {
        linkEl.style.opacity = "0.6"
    }, 165)
    setTimeout(function() {
        linkEl.style.opacity = "0.8"
    }, 220)
    setTimeout(function() {
        linkEl.style.opacity = "1"
    }, 275)
    
    if (myList.length>=3){
        if (NoteID>=2) {
            
            if (NoteID==2 || NoteID==myList.length - 3) {
                container_1.style.display = "block"
                container_1.style.height = "15vh"
            }
            else if (NoteID==3 || NoteID==myList.length - 2) {
                container_2.style.display = "block"
                container_2.style.height = "30vh"
            }
            else {
                container_3.style.display = "block"
                container_3.style.height = "45vh"
            }
        }
    }
    
}


// Function to close the note box
function NoteDelEl(s) {
    let length2 = s.length
    // ID of the delete button clicked
    let NoteDelID = s.slice(8,length2)    
    let linkEl = document.getElementById(`notebox_no_${s.slice(8,length2)}`) 
    linkEl.style.opacity = "1"
    setTimeout(function() {
        linkEl.style.opacity = "0.8"
    }, 55)
    setTimeout(function() {
        linkEl.style.opacity = "0.6"
    }, 110)
    setTimeout(function() {
        linkEl.style.opacity = "0.4"
    }, 165)
    setTimeout(function() {
        linkEl.style.opacity = "0.2"
    }, 220)
    setTimeout(function() {
        document.getElementById("edit_box_" + NoteDelID).value = null
        document.getElementById("save_btn" + NoteDelID).style.display = "none"
        document.getElementById("edit_btn" + NoteDelID).style.display = "block"
        document.getElementById("edit_box_" + NoteDelID).style.display = "none"
        document.getElementById("note_box_" + NoteDelID).style.display = "block"
        document.getElementById("notebox_no_" + NoteDelID).style.display = "none"
        if (myList.length>=3){
            if (parseInt(NoteDelID)>=2) {
                if (parseInt(NoteDelID)==2 || parseInt(NoteDelID)==myList.length - 3) {
                    container_1.style.display = "none"
                }
                else if (parseInt(NoteDelID)==3 || parseInt(NoteDelID)==myList.length - 2) {
                    container_2.style.display = "none"
                }
                else {
                    container_3.style.display = "none"
                }
            }
            else {
                container_1.style.display = "none"
                container_2.style.display = "none"
                container_3.style.display = "none"
            }
        }

    }, 275)
    
    
}

// To save the notes with enter key
function logKey(e) {
    if (e.code == "Enter") {
        let y = e.target.parentElement.id
        SaveBtn(y.slice(3,y.length))
    } 
}

// Function to Edit notes 
function EditEl(s) {
    let length3 = s.length
    // ID of the delete button clicked
    let NoteEditID = s.slice(8,length3)
    let noteBoxEl = document.getElementById("edit_box_" + NoteEditID)
    noteBoxEl.addEventListener('keypress', logKey);
    noteBoxEl.style.display = "block"
    if(myList[parseInt(NoteEditID)][1]=="null") {
        noteBoxEl.value = ""
    }
    else{
        noteBoxEl.value=`${myList[parseInt(NoteEditID)][1]}`
    }
    noteBoxEl.focus()
    document.getElementById("note_box_" + NoteEditID).style.display = "none"
    document.getElementById(s).style.display = "none"
    document.getElementById("save_btn" + NoteEditID).style.display = "block"
    
}


// Function to save text inside the notes
function SaveBtn(s) {
    let length4 = s.length
    // ID of the delete button clicked
    let NoteSaveID = s.slice(8,length4)
    let NoteBoxEdit_ID = "edit_box_" + NoteSaveID
    myList[parseInt(NoteSaveID)][1] = document.getElementById(NoteBoxEdit_ID).value
    localStorage.setItem("myList", JSON.stringify(myList) )
    render(myList)
    NoteEl(s)
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
        let linkEl = document.getElementById(`link_no_${myList.length-1}`)
        linkEl.style.opacity = "0"
        setTimeout(function() {
            linkEl.style.opacity = "0.2"
        }, 55)
        setTimeout(function() {
            linkEl.style.opacity = "0.4"
        }, 110)
        setTimeout(function() {
            linkEl.style.opacity = "0.6"
        }, 165)
        setTimeout(function() {
            linkEl.style.opacity = "0.8"
        }, 220)
        setTimeout(function() {
            linkEl.style.opacity = "1"
        }, 275)
    })
})


//To erase all the tabs on clicking `erase all` button
clearEl.addEventListener("dblclick", function() {
    if (myList.length != 0) {
        let linkEl = document.querySelector(".container")
        
        setTimeout(function() {
            linkEl.style.opacity = "0.7"
        }, 80)
        setTimeout(function() {
            linkEl.style.opacity = "0.4"
            
        }, 160)
        setTimeout(function() {
            linkEl.style.opacity = "0.1"
            localStorage.clear()
            myList = []
            render(myList)
            desertEl.style.display = "block"
            containerBackgroundEl.style.display = "none"
        }, 240)
        setTimeout(function() {
            linkEl.style.opacity = "0.4"
        }, 320)
        setTimeout(function() {
            linkEl.style.opacity = "0.7"
        }, 400)
        setTimeout(function() {
            linkEl.style.opacity = "1"
        }, 480)
    }
    
    
})
