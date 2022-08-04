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
        let idMove = "move_no_" + i.toString()
        let string_ = aList[i].slice(0,38)
        listItems += `
            
            <div class="link-box" id="${idLink}">
                <a href="${aList[i]}" target="_blank" class="link-btn" >
                    <div id="${idLink}" class="the-link"  style="text-decoration:none; color: rgb(0, 2, 21);">${string_}</div>
                </a>
                <div class="notes">
                    
                    <img class="note-icon" id="${idNote}" src="images/pencil.svg">
                    <div style="display:none;" class="note-box"></div>
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

if (listFromLocalStorage) {
    myList = listFromLocalStorage
    render(myList)
}


//To get the id of any element clicked

const onClick = (event) => {
    const list_ = {delt_no_:1,move_no_:2,note_no_:3}
    
    if (event.target.id.slice(0,8) in list_ ) {
        let idClicked = event.target.id
        if (idClicked.slice(0,8)=="note_no_") {
            
        } else if (idClicked.slice(0,8)=="delt_no_") {
            
        } else {
            
        }

    } 

}

window.addEventListener('click', onClick)



saveEl.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myList.push(tabs[0].url)
        localStorage.setItem("myList", JSON.stringify(myList) )
        render(myList)
    })
})



clearEl.addEventListener("dblclick", function() {
    localStorage.clear()
    myList = []
    render(myList)
    desertEl.style.display = "block"
    containerBackgroundEl.style.display = "none"

})
