var myChar = {} //During char creation use this object to add properties
var inventory = {}
var searchUrl
var playerDead = false
var equipmentUrl = '/api/equipment/'
var spellUrl = '/api/spells/'
var theData
var raceButtons = [] 
var possibleClasses = ['Wizard', 'Barbarian', 'Ranger']
var classButtons = []
var wizardSpells = [
    fireBolt={
        discription: 'You hurl a mote of fire at a creature',
        damage: 10,
        atkNum: 1,
        name: 'fire Bolt'
    },
    frostBite={
        discription: 'You cause numbing frost to form on one creature',
        damage: 6,
        atkNum: 2,
        name: 'frost Bite'
    },
    flameShield={
        discription:'2 rounds of attacks',
        damage : 0,
        atkNum : 0,
        name: 'flame Shield'
    },
    magicMissle = {
        discription: 'choose 3 targets to shoot magic missle at',
        damage : 6,
        atkNum : 3,
        name: 'magic Missle'
    }
]
var barbarianAttacks = [
    greatAxe = {
        discription: 'Stike enemy down with a swing of your axe',
        damage : 10,
        atkNum : 1,
        name: "Great Axe"
    },
    rage = {
        discription: 'Enter rage mode, allowing you to attack twice on your turn',
        damage : 0,
        atkNum : 0,
        name: 'rage'
    },
    armorUp = {
        discription: 'get a +2 to AC for the battle',
        damage : 0,
        atkNum : 0,
        name: 'armorUp'
    },
    execute = {
        discription: 'Jump towards an enemy slicing them down the middle. If it executes, you can use again',
        damage : 12,
        atkNum : 1,
        name: 'execute'
    }
]
var rangerAttacks = [
    longbow = {
        discription: 'Hurl an arrow at your foe',
        damage : 10,
        atkNum : 1,
        name: 'longbow'
    },
    chargeBow = {
        discription: 'next attack will do 3x damage',
        damage : 0,
        atkNum : 0,
        name: 'Charge Bow'
    },
    heal = {
        discription: 'heal yourself up to 6 hp',
        damage : 6,
        atkNum : 1,
        name: 'Heal'
    },
    multiShot = {
        discription: 'Shoot 3 Arrows at your target',
        damage : 6,
        atkNum : 3,
        name: 'Multi Shot'
    }
]

var stats = {}
var startBattle = false



//general function for getting info from API
function search(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].name === nameKey) {
            return myArray[i];
        }
    }
}
function nameSubmit(e){
    myChar.name = document.getElementById('nameBox').value
    startBattle = true;
    // start the game here
}

function nameChar(){ //gives choose your name
    var newTextbox = document.createElement('input')
    newTextbox.setAttribute('type', 'text')
    newTextbox.setAttribute('id', 'nameBox')
    var newButton = document.createElement('button')
    newButton.innerHTML = 'Submit Name'
    document.body.appendChild(newTextbox)
    document.body.appendChild(newButton)
    
    newButton.addEventListener('click', nameSubmit)
}


function destroyButtons(){ //refactor later into the html js file
    for (var i = 0; i < classButtons.length; i++){
        raceButtons[i].remove()
    }
}


function pickSpells(chosenClass){
    for (var i = 0; i < classButtons.length; i++){
        classButtons[i].remove()
    }
    if (chosenClass == 'Wizard'){
        myChar.attacks = wizardSpells
        stats.str = -1
        stats.dex = 4
        stats.con = 0
        stats.int = 3
        stats.wis = 5
        stats.char = 1
        myChar.initiative = 4
        myChar.maxHP = 12
        myChar.currHP = 12
        myChar.ac = 12
        myChar.stats = stats
    }
    else if (chosenClass == 'Ranger'){
        myChar.attacks = rangerAttacks
        stats.str = 3
        stats.dex = 5
        stats.con = -1
        stats.int = 0
        stats.wis = 4
        stats.char = 1
        myChar.initiative = 5
        myChar.maxHP = 10
        myChar.currHP = 10
        myChar.ac = 14
        myChar.stats = stats
    }
    else{
        myChar.attacks = barbarianAttacks
        stats.str = 5
        stats.dex = 1
        stats.con = 4
        stats.int = -1
        stats.wis = 0
        stats.char = 1
        myChar.initiative = 5
        myChar.maxHP = 16
        myChar.currHP = 16
        myChar.ac = 15
        myChar.stats = stats
    }
    nameChar()
}

function applyDamage(amt){
    myChar.currHP -= amt
    console.log(myChar.currHP)
    if (myChar.currHP <= 0){
        console.log('you die')
        playerDead = true;
    }
}

function chooseClass(e){
    
    var myClass = e.target.innerHTML
    var classIndex = search(myClass, theData.results)
    if (classIndex != null){
        fetch(refUrl + classIndex.url).then(function(response){
            response.json().then(function(data){
                myChar.class = myClass
                pickSpells(myClass)
            })
        })
    }
}

function displayClass(){ //to choose your class
    for (var i = 0; i < raceButtons.length; i++){
        raceButtons[i].remove()
    }
    fetch(refUrl + apiInfo.classes).then(function(response){
        response.json().then(function(data){
            for (var i = 0; i < 3; i++){
                theData= data
                var newButton = document.createElement('button')
                newButton.innerHTML = possibleClasses[i]
                document.body.appendChild(newButton)
                classButtons.push(newButton)
                newButton.addEventListener('click', chooseClass)
            }
        })
    })
}

function addRace(e){
    var myRace = e.target.innerHTML
    var raceIndex = search(myRace, theData.results)
    if (raceIndex != null){
        fetch(refUrl + raceIndex.url).then(function(response){
            response.json().then(function(data){
                var raceData = data
                myChar.race = myRace
                myChar.size = data.size
                myChar.speed = data.speed
                displayClass()
            })
        })
    }
}

//Starts Charactor creation
function makeChar(apiInfo, refUrl){
    searchUrl = refUrl
    fetch(refUrl + apiInfo.races).then(function(response){
        response.json().then(function(data){
            theData = data
            for (var i = 0; i < data.results.length; i++){
                var newButton = document.createElement('button')
                newButton.innerHTML = data.results[i].name
                document.body.appendChild(newButton)
                raceButtons.push(newButton)
                newButton.addEventListener('click', addRace)
            }
        })
    })
}

