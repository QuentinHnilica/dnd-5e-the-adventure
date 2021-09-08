var testDummy = {
    dummyAttacks : [
        basicAttack = {
            damage : 1,
            atkNum : 1
        }
    ],
    ac: 10,
    hp: 10,
    initiative: 2, 
    stats: {
        str : 3,
        dex : 5,
        con : -1,
        int : 0,
        wis : 4,
        char : 1
    },
    isDead: false
}

var enemiesToFight = []
var turn = 0
var amtOfEnemies
var playersTurn = false
var myTarget
var myMove
var button0
var button1
var button2
var battlePage = ''
var activeShield = false
var shieldMax = 2
var shieldCount = 1
var canUseAU = true
var chargeActive = false
var isRaged = false
var rageCount = 0
var targets = [] //for your ult
var multiAttack
var canUlt = true
var executeAgain = false
var barbUlt

var thePTag

var currentFloor = 1
function rollInitiative(){ //find turn rotation
    var turnRotation = []
    for (var i = 0; i < amtOfEnemies; i++){
        console.log(enemiesToFight[i])
        roll = {         
            enemy: enemiesToFight[i],
            thierRoll: Math.floor(Math.random() * (21 - 1) + 1) + enemiesToFight[i].initiative
        }
        turnRotation.push(roll)
    }
    playerRoll = {
        thierRoll: Math.floor(Math.random() * (21 - 1) + 1) + myChar.initiative
    }
    turnRotation.push(playerRoll)
    turnRotation.sort((b, a) => {
        return a.thierRoll - b.thierRoll;
    });
    return turnRotation
}

function battleOver(){
    if (currentFloor < 5){
        armorUPBuff(false)
        canUlt = true
        canUseAU = true
        isRaged = false
        chargeActive = false
        shieldCount = 1
        activeShield = false
        currentFloor++
        turn = 0
        destroyContent()
        battleStart()
    }
    else{
        youWin(myChar)
    }
}


function checkForDeath(){
    var c = 0 //counterVar
    for (var i = 0; i < turnOrder.length; i++){      
        if (turnOrder[i].enemy != null){
            if (turnOrder[i].enemy.isDead === true){
                c++
            }
        }
    }
    if (c == turnOrder.length - 1){
        return true
    }
    else
    return false
}

function BattleText(str){
    
    thePTag.innerText = str
    var genTime = setInterval(() => {
        
        thePTag.innerText = ''
        turn++
            if(turn === turnOrder.length){
                turn = 0
            }
            if (playerDead == true){
                return
            }
            
        clearInterval(genTime)
        battleLogic()
    }, 3000);
}


function battleLogic(){ //this is where the battle code is. Also, the var turn is the index.
    if (turnOrder[turn].enemy == null){ //player battle logic
        thePTag.innerText = 'Your Turn'
        playersTurn = true;
        turn++
        if (turn === turnOrder.length){
            turn = 0
        }
    }
    else{ // enemy battle logic
        if(turnOrder[turn].enemy.isDead == false){
            var myAttack = turnOrder[turn].enemy.dummyAttacks[0]
            myRoll = Math.floor(Math.random() * (21 -1 ) + 1) + turnOrder[turn].enemy.stats.str
            if (myRoll > myChar.ac){
                //do damage
                if (activeShield === false){
                    applyDamage(turnOrder[turn].enemy.dummyAttacks[0].damage, true)
                    BattleText('Enemy Hit You')
                    
                }
                else{
                    shieldCount++
                    if (shieldCount > shieldMax){
                        activeShield = false
                        shieldCount = 1
                        BattleText('Shield Broken')
                    }
                    else{
                        BattleText('ShieldBlocked')
                    }
                }
                
            }
            else{
                //you miss
                BattleText('EnemyMissed')
            }
        }
        else{
            turn++
            if(turn === turnOrder.length){
                turn = 0
            }
            battleLogic()
        }
        
    }
   
}
function getTargets(targetAmt , theMove){
    var moveUpdate = setInterval(function(){
        if (targets.length < targetAmt){
   
        }
        else{
            for (var i = 0; i < targets.length; i++){
                var diceRoll = Math.floor(Math.random() * (21 - 1) + 1) + 5
                if (diceRoll >= targets[i].ac){
                    if (chargeActive){
                        targets[i].hp -= theMove.damage * 3
                        chargeActive = false
                    }
                    else{
                        targets[i].hp -= theMove.damage
                    }
                    
                    if(targets[i].hp <= 0){
                        targets[i].isDead = true
                    }
                    else{
                        //button2.lastChild.innerText = newEnemy.hp
                        //update HP Element here and in the if above.
                    }
                    
                    var gameOver = checkForDeath()
                    if (gameOver){
                        battleOver()
                    }
                }
            }
            playersTurn = false
            multiAttack = false
            canUlt = false
            clearInterval(moveUpdate)
            battleLogic()
            
        }
    }, 1000)
}

function executeUlt(){
    if(myTarget.isDead === false){
        var diceRoll = Math.floor(Math.random() * (21 - 1) + 1) + 5
        if (diceRoll >= myTarget.ac){
            myTarget.hp -= barbUlt.damage + 5
            if(myTarget.hp > 0){
                executeAgain = false
                battleLogic()
                console.log('didnt kill')
            }
            else{
                console.log('did kill')
                myTarget.isDead = true
            }
    
            var gameOver = checkForDeath()
            if (gameOver){
                battleOver()
            }
        }
        else{
            executeAgain = false
            battleLogic()
        }
    }
}

function useMove(e){
    
    var myMoveName = e.target.innerText
    var getMove = search(myMoveName, myChar.attacks)
    if (getMove.damage != 0 && getMove.name != 'Heal'){
        if (getMove.atkNum < 2){
            if (playersTurn == true && myTarget != null){
                if(getMove.name != 'execute'){
                    if (myTarget.isDead === false){
                        var diceRoll = Math.floor(Math.random() * (21 - 1) + 1) + 5
                        if (diceRoll >= myTarget.ac){
                            if (chargeActive){
                                myTarget.hp -= getMove.damage * 3
                                chargeActive = false
                            }
                            else{
                                myTarget.hp -= getMove.damage
                            }
                            
                            console.log(myTarget.hp)
                            if(myTarget.hp <= 0){
                                myTarget.isDead = true
                            }
                            else{
                                //button2.lastChild.innerText = newEnemy.hp
                                //update HP Element here and in the if above.
                            }
                            
                            var gameOver = checkForDeath()
                            if (gameOver){
                                battleOver()
                            }
                            else{
                                if (isRaged == false){
                                    rageCount = 0
                                    playersTurn = false
                                    battleLogic()
                                }
                                else{
                                    rageCount ++
                                    if (rageCount > 1){
                                        rageCount = 0
                                        battleLogic()
                                    }
                                }                      
                            }   
                        }
                        else{
                            if (isRaged == false){
                                rageCount = 0
                                playersTurn = false
                                battleLogic()
                                BattleText('You Missed')
                            }
                            else{
                                rageCount ++
                                if (rageCount > 1){
                                    rageCount = 0
                                    battleLogic()
                                }
                            }   
                        }
                        
                    }
                    else{
                        thePTag.innerText = 'enemy is dead, choose another target'
                    }
                }
                else{
                    if(canUlt){
                        canUlt = false
                        barbUlt = getMove
                        executeAgain = true
                        executeUlt()
                    }   
                }        
            }
            else{
                thePTag.innerText = 'Select a target'
            }
        }  
        else{
            if (canUlt){
                if (targets.length < getMove.atkNum){
                    multiAttack = true
                    getTargets(getMove.atkNum, getMove)      
                    
                }
            }
            else{
                thePTag.innerText = 'Cant use right now'
            }
        }
    }
    else{
        if(playersTurn){
            if (getMove.name === 'Heal'){
                applyDamage(getMove.damage, false)
                battleLogic()
            }
            else if (getMove.name === 'flame Shield' && activeShield === false){
                activeShield = true
                battleLogic()
            }
            else if (getMove.name === 'rage' && isRaged === false){
                isRaged = true
                battleLogic()
            }
            else if (getMove.name === 'armorUp' && canUseAU){
                canUseAU = false
                armorUPBuff(true)
                battleLogic()
            }
            else if (getMove.name === 'Charge Bow' && chargeActive == false){
                chargeActive = true
                battleLogic()
            }
        }
    }
}

function setTarget(e){
    var targetName = e.target.innerText
    var getEnemy = search(targetName, enemiesToFight)
    
    if (multiAttack){
        targets.push(getEnemy)
    }
    else{
        myTarget = getEnemy
        if (executeAgain){
            executeUlt()
        }
    }
}

function destroyExtraButtons(buttonsToKill){
    for (var i = 0; i < buttonsToKill.length; i++){
        buttonsToKill[i].firstChild.remove()
    }
}

function battleStart(){
    battleContent(currentFloor)
    destroyButtArr = []
    enemiesToFight = []
    thePTag = document.querySelector('#battleText')
    var newEnemy
    if (currentFloor < 5){
        amtOfEnemies = Math.floor(Math.random() * (4 - 1) + 1) //chooses 1 - 3 enemies for the player to fight
        if (amtOfEnemies === 1){
            button0 = document.getElementById('enemy2')
            button1 = document.getElementById('enemy1')
            button2 = document.getElementById('enemy3')
            destroyButtArr.push(button1)
            destroyButtArr.push(button2)
            destroyExtraButtons(destroyButtArr)
        }
        else if( amtOfEnemies === 2){
            button0 = document.getElementById('enemy1')
            button1 = document.getElementById('enemy3')
            button2 = document.getElementById('enemy2')
            destroyButtArr.push(button2)
            destroyExtraButtons(destroyButtArr)
        }
        else{
            button0 = document.getElementById('enemy1')
            button1 = document.getElementById('enemy2')
            button2 = document.getElementById('enemy3')
        }
        for (var i = 0; i < amtOfEnemies; i++){
            if (currentFloor === 1){
                newEnemy = { ...testDummy } //Make a table of enemies and choose a random one
                newEnemy.name = 'testDummy' + (i + 1)
                enemiesToFight[i] = newEnemy
            }
            else if(currentFloor === 2){
                newEnemy = { ...testDummy } //change from testDummy
                newEnemy.name = 'testDummy' + (i + 1)
                enemiesToFight[i] = newEnemy
            }
            else if(currentFloor === 3){
                newEnemy = { ...testDummy } //Make a table of enemies and choose a random one
                newEnemy.name = 'testDummy' + (i + 1)
                enemiesToFight[i] = newEnemy
            }
            else{
                newEnemy = { ...testDummy } //Make a table of enemies and choose a random one
                newEnemy.name = 'testDummy' + (i + 1)
                enemiesToFight[i] = newEnemy
            }
            
            if (i === 0){
                button0.firstChild.innerText = newEnemy.name
                button0.lastChild.innerText = newEnemy.hp
                button0.firstChild.addEventListener('click', setTarget)
            }
            else if(i === 1){
                button1.firstChild.innerText = newEnemy.name
                button1.lastChild.innerText = newEnemy.hp
                button1.firstChild.addEventListener('click', setTarget)
            }
            else{
                button2.firstChild.innerText = newEnemy.name
                button2.lastChild.innerText = newEnemy.hp
                button2.firstChild.addEventListener('click', setTarget)
            }
        }
    }
    else{
        amtOfEnemies = 1
        button0 = document.getElementById('enemy2')
        button1 = document.getElementById('enemy1')
        button2 = document.getElementById('enemy3')
        destroyButtArr.push(button1)
        destroyButtArr.push(button2)
        destroyExtraButtons(destroyButtArr)

        newEnemy = { ...testDummy } //Make this the boss
        newEnemy.name = 'testDummy' + 1 //change to bosses name
        enemiesToFight.push(newEnemy)

        button0.firstChild.innerText = newEnemy.name
        button0.lastChild.innerText = newEnemy.hp
        button0.firstChild.addEventListener('click', setTarget)
    }
    
    for (var o = 0; o < myChar.attacks.length; o++){
        var newButton = document.querySelector('#attack' + o)
        newButton.innerText = myChar.attacks[o].name
        newButton.addEventListener('click', useMove)
    }
    console.log(enemiesToFight)
    turnOrder = rollInitiative()
    battleLogic()
}