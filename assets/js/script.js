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

var town1Button = document.getElementById('town1')
var town2Button = document.getElementById('town2')
var dungeonButton = document.getElementById('dungeon')

//When you need an API Reference use 'refUrl + apiInfo.property
//Ex fetch/startUrl + apiInfo.casses
fetch(startUrl).then(function(response){
    response.json().then(function(data){
        apiInfo = data
        // ability-scores: "/api/ability-scores"
        // alignments: "/api/alignments"
        // backgrounds: "/api/backgrounds"
        // classes: "/api/classes"
        // conditions: "/api/conditions"
        // damage-types: "/api/damage-types"
        // equipment: "/api/equipment"
        // equipment-categories: "/api/equipment-categories"
        // feats: "/api/feats"
        // features: "/api/features"
        // languages: "/api/languages"
        // magic-items: "/api/magic-items"
        // magic-schools: "/api/magic-schools"
        // monsters: "/api/monsters"
        // proficiencies: "/api/proficiencies"
        // races: "/api/races"
        // rule-sections: "/api/rule-sections"
        // rules: "/api/rules"
        // skills: "/api/skills"
        // spells: "/api/spells"
        // subclasses: "/api/subclasses"
        // subraces: "/api/subraces"
        // traits: "/api/traits"
        // weapon-properties: "/api/weapon-properties"
        
    })
})

function startDungeon(){
    destroyContent() //called in html-handler.js
    battleStart()
}

function switchTown(e){
    if (e.target.innerText === 'town1'){
        inTown1 = true
    }
    else{
        inTown1 = false
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
}
}, 1000);
function diceRoller ()
{
    console.log(Math.floor(Math.random() * (21 - 1) + 1))   
    //12 sided
    console.log(Math.floor(Math.random() * (13 - 1) + 1))
    //10 sided 
    console.log(Math.floor(Math.random() * (11 - 1) + 1))
    //8 sided 
    console.log(Math.floor(Math.random() * (9 - 1) + 1))
    //6 sided 
    console.log(Math.floor(Math.random() * (7- 1) + 1))
    // 4 sided 
    console.log(Math.floor(Math.random() * (5- 1) + 1))
}

//diceRoller()

function startGame(){
    makeChar(apiInfo, refUrl)
    model.classList.add('is-active')
}

function closeMod(e){
    console.log(e)
    e.target.parentElement.parentElement.parentElement.classList.remove('is-active')
}
function showMap(e){
    mapmod.classList.add('is-active')
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

