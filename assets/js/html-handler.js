var mainBox = document.querySelector('#mainBox')

var deathRuns
// clear page
function destroyContent(){
    mainBox.innerHTML = ''
}
// character dialogue
function dialogContent(){

    var newDiv = document.createElement('div')
    newDiv.classList.add('npcResponse')
    mainBox.appendChild(newDiv)
    var newP = document.createElement('p')
    newP.id = 'response'
    newDiv.appendChild(newP)

     // dialogue buttons
    var dialogButtonDiv = document.createElement('div')
    dialogButtonDiv.classList.add('columns')
    dialogButtonDiv.classList.add('dialogOptions')
    mainBox.appendChild(dialogButtonDiv)
    for (var i = 0; i < 4; i++){
        var divColumn = document.createElement('div')
        divColumn.classList.add('column')
        divColumn.classList.add('is-3')
        dialogButtonDiv.appendChild(divColumn)
        var newButton = document.createElement('button')
        newButton.classList.add('button')
        newButton.classList.add('is-primary')
        newButton.id = 'option' + i
        divColumn.appendChild(newButton)
    }
}

function battleContent(currentFloor){
    //All of the Enemy Buttons
    var newDiv = document.createElement('div')
    mainBox.appendChild(newDiv)
    var newColumns = document.createElement('div')
    newColumns.classList.add('columns')
    newDiv.appendChild(newColumns)
    var column1 = document.createElement('div')
    column1.classList.add('column')
    column1.classList.add('is-4')
    column1.id = "enemy1"
    column1.style = 'text-align: center;'
    newColumns.appendChild(column1)
    var button1 = document.createElement('button')
    button1.classList.add('button')
    button1.classList.add('is-primary')
    column1.appendChild(button1)
    var p1 = document.createElement('p')
    column1.appendChild(p1)

    var column2 = document.createElement('div')
    column2.classList.add('column')
    column2.classList.add('is-4')
    column2.id = "enemy2"
    column2.style= 'text-align: center;'
    newColumns.appendChild(column2)
    var button2 = document.createElement('button')
    button2.classList.add('button')
    button2.classList.add('is-primary')
    column2.appendChild(button2)
    var p2 = document.createElement('p')
    column2.appendChild(p2)

    var column3 = document.createElement('div')
    column3.classList.add('column')
    column3.classList.add('is-4')
    column3.style = 'text-align: center;'
    column3.id = "enemy3"
    newColumns.appendChild(column3)
    var button3 = document.createElement('button')
    button3.classList.add('button')
    button3.classList.add('is-primary')
    column3.appendChild(button3)
    var p3 = document.createElement('p')
    column3.appendChild(p3)


    var textDiv = document.createElement('div')
    mainBox.appendChild(textDiv)
    var textP = document.createElement('p')
    textP.id = 'battleText'
    textDiv.appendChild(textP)
    var floorP = document.createElement('p')
    floorP.innerText = 'floor: ' + currentFloor
    textDiv.appendChild(floorP)
    //Player Move Buttons

    var dialogDiv = document.createElement('div')
    dialogDiv.classList.add('columns')
    dialogDiv.classList.add('dialogOptions')
    mainBox.appendChild(dialogDiv)
    var playerColumn1 = document.createElement('div')
    playerColumn1.classList.add('column')
    playerColumn1.classList.add('is-3')
    playerColumn1.style = 'text-align: center;'
    dialogDiv.appendChild(playerColumn1)
    var playerbutton1 = document.createElement('button')
    playerbutton1.classList.add('button')
    playerbutton1.classList.add('is-primary')
    playerbutton1.id = 'attack0'
    playerColumn1.appendChild(playerbutton1)

    var playerColumn2 = document.createElement('div')
    playerColumn2.classList.add('column')
    playerColumn2.classList.add('is-3')
    playerColumn2.style = 'text-align: center;'
    dialogDiv.appendChild(playerColumn2)
    var playerbutton2 = document.createElement('button')
    playerbutton2.classList.add('button')
    playerbutton2.classList.add('is-primary')
    playerbutton2.id = 'attack1'
    playerColumn2.appendChild(playerbutton2)

    var playerColumn3 = document.createElement('div')
    playerColumn3.classList.add('column')
    playerColumn3.classList.add('is-3')
    playerColumn3.style = 'text-align: center;'
    dialogDiv.appendChild(playerColumn3)
    var playerbutton3 = document.createElement('button')
    playerbutton3.classList.add('button')
    playerbutton3.classList.add('is-primary')
    playerbutton3.id = 'attack2'
    playerColumn3.appendChild(playerbutton3)


    var playerColumn4 = document.createElement('div')
    playerColumn4.classList.add('column')
    playerColumn4.classList.add('is-3')
    playerColumn4.style = 'text-align: center;'
    dialogDiv.appendChild(playerColumn4)
    var playerbutton4 = document.createElement('button')
    playerbutton4.classList.add('button')
    playerbutton4.classList.add('is-primary')
    playerbutton4.id = 'attack3'
    playerColumn4.appendChild(playerbutton4)

   
}
// start screen and select map
function startScreen(){
    destroyContent()

    var startText = document.createElement('p')
    startText.innerText = 'Open Your Map to select where to go'
    startText.style = 'font-weight: bold; font-size: 30px;'
    mainBox.appendChild(startText)


    var dialogButtonDiv = document.createElement('div')
    dialogButtonDiv.classList.add('columns')
    dialogButtonDiv.classList.add('dialogOptions')
    mainBox.appendChild(dialogButtonDiv)
}
// map selection and direction
function showMod(e){
    console.log(e)
    var thisMod = document.querySelector('#' + e.target.accessKey) 
    thisMod.classList.add('is-active')
}

        // Game directions
function howToPlay(){
    var startGameButton = document.createElement('button')
    startGameButton.classList.add('button')
    startGameButton.classList.add('is-primary')
    startGameButton.innerText = 'Begin Journey'
    startGameButton.id = 'beginJourney'
    mainBox.appendChild(startGameButton)
    var dialogButtonDiv = document.createElement('div')
    dialogButtonDiv.classList.add('columns')
    dialogButtonDiv.classList.add('dialogOptions')
    mainBox.appendChild(dialogButtonDiv)
    
    for (var i = 0; i < 4; i++){
        var divColumn = document.createElement('div')
        divColumn.classList.add('column')
        divColumn.classList.add('is-3')
        dialogButtonDiv.appendChild(divColumn)
        var newButton = document.createElement('button')
        newButton.classList.add('button')
        newButton.classList.add('is-primary')
        newButton.id = 'question' + i
        newButton.style = 'width: 100%'
        newButton.addEventListener('click', showMod)
        divColumn.appendChild(newButton)
    }
    document.querySelector('#question0').innerText = 'Game Objective'
    document.querySelector('#question0').accessKey = 'objective'
    document.querySelector('#question1').innerText = 'Battles'
    document.querySelector('#question1').accessKey = 'battleInfo'
    document.querySelector('#question2').innerText = 'My Map'
    document.querySelector('#question2').accessKey = 'mapHelp'
    document.querySelector('#question3').innerText = 'NPC Interaction'
    document.querySelector('#question3').accessKey = 'dialogHelp'
    
}
    // start game tutorial or skip
function startTutorial(){
    var dialogDiv = document.createElement('div')
    dialogDiv.classList.add('columns')
    dialogDiv.classList.add('dialogOptions')
    dialogDiv.style = 'justify-content: center;'
    mainBox.appendChild(dialogDiv)
    var startTutButton = document.createElement('button')
    startTutButton.innerText = 'How To Play'
    startTutButton.id = 'startTut'
    startTutButton.classList.add('button')
    startTutButton.classList.add('is-primary')
    startTutButton.style = 'margin-right: 1%; margin-bottom: 20%'
    dialogDiv.appendChild(startTutButton)

    var skipTutButton = document.createElement('button')
    skipTutButton.innerText = 'Begin Your Adventure'
    skipTutButton.id = 'skipTut'
    skipTutButton.classList.add('button')
    skipTutButton.classList.add('is-primary')
    skipTutButton.style = 'margin-left: 1%; margin-bottom: 20%'
    dialogDiv.appendChild(skipTutButton)
}

function saveStats(){
    //local Storage Stats
    console.log(deathRuns)
}
// end game results
function youWin(charStats){
    destroyContent()
    deathRuns = charStats.deaths
    var startText = document.createElement('p')
    startText.innerText = 'Congrats You Won!'
    startText.style = 'font-weight: bold; font-size: 30px;'
    mainBox.appendChild(startText)
    var saveWinsButton = document.createElement('button')
    saveWinsButton.classList.add('button')
    saveWinsButton.classList.add('is-primary')
    saveWinsButton.innerText = 'Save Your Score'
    mainBox.appendChild(saveWinsButton)
    saveWinsButton.addEventListener('click', saveStats)


    var dialogButtonDiv = document.createElement('div')
    dialogButtonDiv.classList.add('columns')
    dialogButtonDiv.classList.add('dialogOptions')
    mainBox.appendChild(dialogButtonDiv)
}
