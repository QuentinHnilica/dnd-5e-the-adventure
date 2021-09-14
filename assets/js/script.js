var startUrl = 'https://www.dnd5eapi.co/api'
var refUrl = 'https://www.dnd5eapi.co'
var apiInfo = {}
var startButton = document.getElementById('start-Button')
var closeCharCreate = document.getElementById('closeCharCreate')
var closeMapMod = document.getElementById('closeMapMod')
var closeDialogOptions = document.getElementById('closeDialogOptions')
var closeCharSheet = document.getElementById('closeCharSheet')
var closeObjective = document.getElementById('closeObjective')
var closeBattleInfo = document.getElementById('closeBattleInfo')
var closeMapHelp = document.getElementById('closeMapHelp')
var closeDialogHelp = document.getElementById('closeDialogHelp')
var openMapButton = document.getElementById('showMap')
var mapmod = document.getElementById('mapMod')

var whoToTalkButton = document.getElementById('whoToTalk')
var whoToTalkMod = document.getElementById('WhoToTalkMod')
var closeWhoToTalkMod = document.getElementById('closeWhoToTalkMod')
var insertName = document.getElementById('insertName')

var town1Button = document.getElementById('town1')
var town2Button = document.getElementById('town2')
var dungeonButton = document.getElementById('dungeon')

//When you need an API Reference use 'refUrl + apiInfo.property
//Ex fetch/startUrl + apiInfo.casses
fetch(startUrl).then(function(response){
    response.json().then(function(data){
        apiInfo = data //contains char creation data
    })
})

function startDungeon(e){
    if (inBattle == false){
        e.target.parentElement.parentElement.parentElement.classList.remove('is-active')
        inBattle = true
        destroyContent() //called in html-handler.js
        battleStart()
    }  
}

function switchTown(e){
    if (e.target.innerText === 'town1'){
        inTown1 = true
        townSwitch(inTown1)
    }
    else{
        inTown1 = false
        townSwitch(inTown1)
    }
    e.target.parentElement.parentElement.parentElement.classList.remove('is-active')
}

function beginTutorial(){
    destroyContent()
    howToPlay()
    var beginJourneyButton = document.querySelector('#beginJourney')
    beginJourneyButton.addEventListener('click', startScreen)
}

function moveOn(){
    startScreen()
}

function tutorialReady(){
    var startTutorialButton = document.querySelector('#startTut')
    var skipTutorialbutton = document.querySelector('#skipTut')
    startTutorialButton.addEventListener('click', beginTutorial)
    skipTutorialbutton.addEventListener('click', moveOn)
}


var seconds = 0;
setInterval(function() {
seconds++;
if (myChar != null){
    if (startBattle == true){
        startBattle = false;
        tutorialReady()
    }

    if (playerDead){
        youDied()
    }
}
}, 1000);

function startGame(){
    makeChar(apiInfo, refUrl)
    model.classList.add('is-active')
}

function closeMod(e){
    e.target.parentElement.parentElement.parentElement.classList.remove('is-active')
}
function showMap(e){
    if (inBattle == false){
        mapmod.classList.add('is-active')
    } 
}
function openTalkToMod(){
    insertName.innerHTML = ""
    for (var i = 0; i < 10; i++){
        if (characters[i].npcNum <= myChar.deaths && characters[i].buffGiven === false){
            var newName = document.createElement('p')
            newName.innerText = characters[i].name
            insertName.appendChild(newName)
        }
    }
    whoToTalkMod.classList.add('is-active')
}

startButton.addEventListener('click', startGame)
closeCharCreate.addEventListener('click', closeMod)
closeMapMod.addEventListener('click', closeMod)
closeDialogOptions.addEventListener('click', closeMod)
closeCharSheet.addEventListener('click', closeMod)
closeObjective.addEventListener('click', closeMod)
closeBattleInfo.addEventListener('click', closeMod)
closeMapHelp.addEventListener('click', closeMod)
closeDialogHelp.addEventListener('click', closeMod)
openMapButton.addEventListener('click', showMap)

dungeonButton.addEventListener('click', startDungeon)

town1Button.addEventListener('click', switchTown)
town2Button.addEventListener('click', switchTown)

whoToTalkButton.addEventListener('click', openTalkToMod)
closeWhoToTalkMod.addEventListener('click', closeMod)
