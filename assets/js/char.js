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
// wizard attacks, spells, and defense
var wizardSpells = [            
    fireBolt={
        discription: 'You hurl a mote of fire at a creature',
        damage: 4,
        atkNum: 1,
        name: 'fire Bolt'
    },
    frostBite={
        discription: 'You cause numbing frost to form on one creature',
        damage: 3,
        atkNum: 2,
        name: 'frost Bite'
    },
    flameShield={
        discription:'Absorb 2 rounds of attacks',
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
// barbarian attacks, weapons, and defense
var barbarianAttacks = [ 
    greatAxe = {
        discription: 'Stike enemy down with a swing of your axe',
        damage : 4,
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
        damage : 5,
        atkNum : 1,
        name: 'execute'
    }
]
// ranger weapons, how it charged, and how to heal yourself
var rangerAttacks = [
    longbow = {
        discription: 'Hurl an arrow at your foe',
        damage : 4,
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
        damage : 5,
        atkNum : 3,
        name: 'Multi Shot'
    }
]

var stats = {}
var startBattle = false
var raceOption = document.querySelector('#races')
var classOption = document.querySelector('#classes')
var finishedButton = document.querySelector('#finished')
var nameBox = document.querySelector('#myName')
var model = document.querySelector('#charMod')
var charSheetButton = document.querySelector('#viewChar')
var charModel = document.querySelector('#charSheet')
var oldAc
var rightBox = document.getElementById('rightBox')
var myHp 
var inBattle = false
//general function for getting info from API
function search(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].name === nameKey) {
            return myArray[i];
        }
    }
}

function updateCharSheet(){
    myChar.currHP = myChar.maxHP //Updates hp before displaying your new HP
    document.getElementById('hp').innerText = "Current HP: " + myChar.currHP
    document.getElementById('myAC').innerText = "AC: " + myChar.ac

}
// list of character abillities scores
function makeCharSheet(){
    document.getElementById('charName').innerText = myChar.name
    document.getElementById('str').innerText = myChar.stats.str
    document.getElementById('wis').innerText = myChar.stats.wis
    document.getElementById('con').innerText = myChar.stats.con
    document.getElementById('int').innerText = myChar.stats.int
    document.getElementById('char').innerText = myChar.stats.char
    document.getElementById('dex').innerText = myChar.stats.dex
    document.getElementById('myAC').innerText = "AC: " + myChar.ac

    document.getElementById('init').innerText = "Initiative: " + myChar.initiative
    document.getElementById('hp').innerText = "Current HP: " + myChar.currHP
    for (var i=0; i<4; i++){
        var moveTag = document.querySelector('#move' + (i+1))
        if(myChar.attacks[i].damage > 0){
            moveTag.innerText = myChar.attacks[i].name + ": " + myChar.attacks[i].discription + " (" + myChar.attacks[i].atkNum
            + "D" + myChar.attacks[i].damage + " + 5)"     
        }
        else{
            moveTag.innerText = myChar.attacks[i].name + ": " + myChar.attacks[i].discription
        }
        
    }
    myHp = document.createElement('p')
    myHp.innerText = "Current HP: " + myChar.currHP
    rightBox.appendChild(myHp)
}
// choose attacks
function pickSpells(){
    if (nameBox.value != ""){
        var chosenClass = classOption.value

        var myRace = raceOption.value
        var raceIndex = search(myRace, theData.results)
        if (raceIndex != null){
            fetch(refUrl + raceIndex.url).then(function(response){
                response.json().then(function(data){
                    var raceData = data
                    myChar.race = myRace
                    myChar.size = data.size
                    myChar.speed = data.speed
                })
            })
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
            myChar.maxHP = 8
            myChar.currHP = 8
            myChar.ac = 10
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
            myChar.maxHP = 8
            myChar.currHP = 8
            myChar.ac = 10
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
            myChar.maxHP = 12
            myChar.currHP = 12
            myChar.ac = 12
            myChar.stats = stats
        }
        oldAc = myChar.ac
        myChar.atkMod = 5
        myChar.deaths = 0
        myChar.name = nameBox.value
        makeCharSheet()
        startBattle = true;
        model.classList.remove('is-active')
        destroyContent()
        startTutorial()
    }
    else{
        nameBox.placeholder = 'Please Choose A Name'
    }
}
// decrementing health status or gaining health for ranger
function applyDamage(amt, bool){
    if (bool){
        myChar.currHP -= amt
        if (myChar.currHP <= 0){
            onDeath()
            playerDead = true;
            myChar.deaths++
            myChar.currHP = myChar.maxHP
            inBattle = false;
        }
    }
    else{
        myChar.currHP += amt
        if (myChar.currHP > myChar.maxHP){
            myChar.currHP = myChar.maxHP
        }
    }
    myHp.innerText = "Current HP: " + myChar.currHP
}
// decrementing health status or gaining health for barbarian
function armorUPBuff(bool){
    
    if (bool){
        oldAc = myChar.ac
        myChar.ac += 2
    }
    else{
        myChar.ac = oldAc
    }
    
}



//Starts Charactor creation
function makeChar(apiInfo, refUrl){
    searchUrl = refUrl
    fetch(refUrl + apiInfo.races).then(function(response){
        response.json().then(function(data){
            theData = data
            for (var i = 0; i < data.results.length; i++){
                var newButton = document.createElement('option')
                newButton.innerHTML = data.results[i].name
                races.appendChild(newButton)
            }
        })
    })


    fetch(refUrl + apiInfo.classes).then(function(response){
        response.json().then(function(data){
            for (var i = 0; i < 3; i++){
                var newButton = document.createElement('option')
                newButton.innerHTML = possibleClasses[i]
                classOption.appendChild(newButton)
            }
        })
    })

    
}
// display character and character name
function showChar(){
    if (myChar.name != null){
        charModel.classList.add('is-active')
    }
    
}

charSheetButton.addEventListener('click', showChar)

finishedButton.addEventListener('click', pickSpells)