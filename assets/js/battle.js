var testDummy = {
    dummyAttacks : [
        basicAttack = {
            damage : 4,
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
    }
}

var enemiesToFight = []
var turn = 0
var amtOfEnemies

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

function battleLogic(){ //this is where the battle code is. Also, the var turn is the index.
    if (turnOrder[turn].enemy == null){ //player battle logic

    }
    else{ // enemy battle logic
        var myAttack = turnOrder[turn].enemy.dummyAttacks[0]
        myRoll = Math.floor(Math.random() * (21 -1 ) + 1) + turnOrder[turn].enemy.stats.str
        if (myRoll > myChar.ac){
            //do damage
            myChar.currHP -= turnOrder[turn]
        }
        else{
            //you miss
        }
    }
}

function battleStart(){
    amtOfEnemies = Math.floor(Math.random() * (4 - 1) + 1) //chooses 1 - 3 enemies for the player to fight
    for (var i = 0; i < amtOfEnemies; i++){
        var newEnemy = testDummy //Make a table of enemies and choose a random one
        enemiesToFight.push(newEnemy)
    }
    turnOrder = rollInitiative()

    battleLogic()
}