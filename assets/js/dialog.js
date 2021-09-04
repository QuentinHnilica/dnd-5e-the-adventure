
// list of characters to talk to
// click button open with start dialog
// make buttons with character responses
// display their response
// keep doing this until the player clicks goodbye button or get quest button
// Do quest stuff later
// if they hit goodbye, display the goodbye text and then end the dialog
var characters = []
fetch('./assets/dialog.json')
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        characters = data
        for(var i=0;i < characters.length; i++){
            var newButton = document.createElement("button")
            newButton.innerText=characters[i].name 
            document.body.appendChild(newButton)
        }
    })
