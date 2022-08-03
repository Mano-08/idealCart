let myList = []
const saveEl = document.getElementById("save-btn")
const containerEl = document.getElementById("container")
const listFromLocalStorage = JSON.parse(localStorage.getItem("myList"))
const clearEl = document.getElementById("erase-btn")
const desertEl = document.getElementById("desert-img")
const containerBackgroundEl = document.getElementById("container")

if (listFromLocalStorage) {
    myList = listFromLocalStorage
    render(myList)
}

saveEl.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myList.push(tabs[0].url)
        localStorage.setItem("myList", JSON.stringify(myList) )
        render(myList)
    })
})

function render(aList) {
    desertEl.style.display = "none"
    let listItems = ""
    for (let i = 0; i < aList.length; i++) {
        let idLink = "link-no-" + i.toString()
        let idDel = "del-no-" + i.toString()
        let string_ = aList[i].slice(0,38)
        listItems += `
            
            <div class="link-box" id="${idLink}">
                <div class="link-btn" >
                    <a href="${aList[i]}" target="_blank" id="${idLink}" class="the-link"  style="text-decoration:none; color: rgb(0, 2, 21);">${string_}</a>
                </div>
                <div class="notes">
                    
                    <img class="note-icon" src="images/pencil.svg">
                    <div style="display:none;" class="note-box"></div>
                </div>
                <div class="delete-btn">
                    <img class="del-icon" id="${idDel}" src="images/delete.svg">
                </div>
                <div class="move-btn">
                    <img class="move-icon" src="images/grid.png">
                </div>
            </div>

        `
    }
    containerEl.innerHTML = listItems
}

clearEl.addEventListener("dblclick", function() {
    localStorage.clear()
    myList = []
    render(myList)
    desertEl.style.display = "block"

})
