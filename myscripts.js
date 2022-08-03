let myList = []
const saveEl = document.getElementById("save-btn")
const containerEl = document.getElementById("container")
const listFromLocalStorage = JSON.parse(localStorage.getItem("myList"))
const deleteEl = document.getElementById("erase-btn")

if(listFromLocalStorage) {
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
    let listItems = ""
    for (let i = 0; i < aList.length; i++) {
        idVal = "L" + i.toString()
        listItems += `
            
            <div class="link-box" id="${idVal}">
                <div class="link-btn" >
                    <a href="${aList[i]}" style="text-decoration:none; color: rgb(0, 2, 21);">${aList[i]}</a>
                </div>
                <div class="notes">
                    
                    <img class="note-icon" src="images/pencil.svg">
                    <div style="display:none;" class="note-box"></div>
                </div>
                <div class="delete-btn">
                    <img class="del-icon" src="images/delete.svg">
                </div>
                <div class="move-btn">
                    <img class="move-icon" src="images/grid.png">
                </div>
            </div>
        `
    }
    containerEl.innerHTML = listItems
}
