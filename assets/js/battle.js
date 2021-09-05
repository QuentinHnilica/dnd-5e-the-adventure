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


function rollInitiative(){ //find turn rotation
    var turnRotation = []
    for (var i = 0; i < amtOfEnemies; i++){
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
    console.log("battleOver")
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




function battleLogic(){ //this is where the battle code is. Also, the var turn is the index.
    if (turnOrder[turn].enemy == null){ //player battle logic
        console.log('players turn')
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
                console.log('damage Has Been done')
                applyDamage(turnOrder[turn].enemy.dummyAttacks[0].damage)
            }
            else{
                //you miss
                console.log('enemy miss')
            }
    
            turn++
            if(turn === turnOrder.length){
                turn = 0
            }
            if (playerDead == true){
                return
            }
            battleLogic()
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

function useMove(e){
    if (playersTurn == true && myTarget != null){
        if (myTarget.isDead === false){
            var myMoveName = e.target.innerText
            var getMove = search(myMoveName, myChar.attacks)
            if (getMove.damage != 0){
                var diceRoll = Math.floor(Math.random() * (21 - 1) + 1) + 5
                if (diceRoll >= myTarget.ac){
                    myTarget.hp -= getMove.damage
                    console.log(myTarget.hp)
                    if(myTarget.hp <= 0){
                        myTarget.isDead = true
                    }
                    playersTurn = false
                    var gameOver = checkForDeath()
                    if (gameOver){
                        battleOver()
                    }
                    else
                    battleLogic()
                }
                else{
                    console.log('you miss')
                    playersTurn = false
                    battleLogic()
                }
            }
        }
        else{
            console.log('enemy is dead, choose another target')
        }
        
    }
}

function setTarget(e){
    var targetName = e.target.innerText
    var getEnemy = search(targetName, enemiesToFight)
    myTarget = getEnemy
    console.log(myTarget)

}

function battleStart(){
    amtOfEnemies = Math.floor(Math.random() * (4 - 1) + 1) //chooses 1 - 3 enemies for the player to fight
    for (var i = 0; i < amtOfEnemies; i++){
        var newEnemy = { ...testDummy } //Make a table of enemies and choose a random one
        newEnemy.name = 'testDummy' + (i + 1)
        enemiesToFight[i] = newEnemy
        var enemyButton = document.createElement('button')
        enemyButton.innerText = newEnemy.name
        enemyButton.addEventListener('click', setTarget)
        document.body.appendChild(enemyButton)
    }
    for (var o = 0; o < myChar.attacks.length; o++){
        var newButton = document.createElement('button')
        newButton.innerText = myChar.attacks[o].name
        newButton.addEventListener('click', useMove)
        document.body.appendChild(newButton)
    }
    console.log(enemiesToFight)
    turnOrder = rollInitiative()
    battleLogic()
}