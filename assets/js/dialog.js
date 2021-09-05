// list of characters to talk to
// click button open with start dialog
// make buttons with character responses
// display their response
// keep doing this until the player  goodbye button or get quest button
// Do quest stuff later
// if they hit goodbye, display the goodbye text and then end the dialog
var characters = []
    var chrButtons =[]
    var pEl
    var buttonText =["quest","nice","mean","goodby"]
    var thisObject
function displayText(e){
    var myResponse =e.target.innerText
    if(myResponse==="nice"){
        pEl.innerText=thisObject.nice
    }
    else if(myResponse==="mean"){
        pEl.innerText=thisObject.mean 

    } 
    else if (myResponse==="goodby"){
        pEl.innerText=thisObject.goodby
    }

}
    function startDialog(e){
        var thisCharacter=e.target.innerText
         for (var i=0;i<chrButtons.length;i++){
             chrButtons[i].remove()
         }
         chrButtons=[]
         pEl=document.createElement("p")
         thisObject=search(thisCharacter,characters)
         pEl.innerText=thisObject.greet 
         document.body.appendChild(pEl)
         for(var o=0;o<4;o++){
            var newButton = document.createElement("button")
            newButton.innerText=buttonText[o]  
            chrButtons.push(newButton)
            document.body.appendChild(newButton)
            newButton.addEventListener("click",displayText)

         }
    }
fetch('./assets/dialog.json')
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        characters = data
        for(var i=0;i < characters.length; i++){
            var newButton = document.createElement("button")
            newButton.innerText=characters[i].name 
            chrButtons.push(newButton)
            document.body.appendChild(newButton)
            newButton.addEventListener("click", startDialog)
        }
    })
