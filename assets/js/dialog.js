var characters = []
var chrButtons =[]
var pEl
var buttonText =["buff","nice","mean","goodby"]
var thisObject
var showNPCButton = document.querySelector('#showList')
var modelNpc = document.querySelector('#dialogMod')
var inTown1 = true

var jokeUrl = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit'
var testImg = document.querySelector('#testImg')
var canTalk = true

function tellJoke(){
    fetch(jokeUrl).then(function(response){
        response.json().then(function(data){
            if (data.setup != null){
                pEl.innerText = data.setup + " .... " + data.delivery
            }
            else{
                pEl.innerText = "Sorry, I don't have a joke right now.."
            }
            
        })
    })
    
}
// non player character responses
function displayText(e){
    var myResponse =e.target.innerText
    if(myResponse === "nice"){
        pEl.innerText=thisObject.nice
    }
    else if(myResponse === "Tell Joke"){
        tellJoke() 

    } 
    else if (myResponse === "goodby"){
        pEl.innerText=thisObject.goodby
        canTalk = true
        var waitTimer = setInterval(() => {
            clearInterval(waitTimer)
            destroyContent()
            startScreen()
        }, 1500);
    }
    //
    else{
        if (thisObject.npcNum <= myChar.deaths){
            if(thisObject.buffGiven === false){
                pEl.innerText = thisObject.hasBuff
                var theBuff = thisObject.theBuff.replace(/[^a-zA-Z]/g,"")
                var stat = thisObject.theBuff.replace(/\D/g,'')
                var actualStat = Number(stat)
                if (theBuff === 'ac'){
                    myChar.ac += actualStat
                }
                else if(theBuff === 'maxHP'){
                    myChar.maxHP += actualStat
                }
                else{
                    myChar.atkMod += actualStat
                }
                thisObject.buffGiven = true
                updateCharSheet()
            }
            else{
                pEl.innerText = thisObject.alreadyGiven
            }
        }
        else{
            pEl.innerText = thisObject.noBuff
            
        }
            
    }

}
// start non player character dialog
function startDialog(e){
    canTalk = false
    modelNpc.classList.remove('is-active')
    var thisCharacter=e.target.innerText
    destroyContent()//nested in the html-handler.js
    dialogContent()
    pEl=document.querySelector('#response')
    thisObject=search(thisCharacter,characters)
    pEl.innerText=thisObject.greet 
    for(var o=0;o<4;o++){
    var newButton = document.querySelector('#option' + o)
    if (o === 2){
        newButton.innerText = "Tell Joke"
    }
    else{
        newButton.innerText=buttonText[o]  
    }
    
    newButton.addEventListener("click",displayText)

    }
}
// show non player character
function showNPCs(){
    if (inBattle == false && canTalk){
        if (inTown1){
            for(var i=0;i < 5; i++){
                var newButton = document.querySelector('#option' + i)
                newButton.innerText=characters[i].name 
                newButton.addEventListener("click", startDialog)
            }
        }
        else{
            for(var i=0;i < 5; i++){
                var newButton = document.querySelector('#option' + i)
                newButton.innerText=characters[i + 5].name 
                newButton.addEventListener("click", startDialog)
            }
        }
        modelNpc.classList.add('is-active')
    }  
}

fetch('./assets/dialog.json')
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        characters = data        
})


showNPCButton.addEventListener('click', showNPCs)
