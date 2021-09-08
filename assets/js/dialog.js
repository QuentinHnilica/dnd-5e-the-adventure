var characters = []
var chrButtons =[]
var pEl
var buttonText =["buff","nice","mean","goodby"]
var thisObject
var showNPCButton = document.querySelector('#showList')
var modelNpc = document.querySelector('#dialogMod')
var inTown1 = true
function displayText(e){
    var myResponse =e.target.innerText
    if(myResponse === "nice"){
        pEl.innerText=thisObject.nice
    }
    else if(myResponse === "mean"){
        pEl.innerText=thisObject.mean 

    } 
    else if (myResponse === "goodby"){
        pEl.innerText=thisObject.goodby
        var waitTimer = setInterval(() => {
            console.log("this is a one Second Wait")
            clearInterval(waitTimer)
            destroyContent()
            startScreen()
        }, 1500);
    }
    else{
        if (thisObject.npcNum <= myChar.deaths){
            console.log(myChar)
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
                myChar.initiative += actualStat
            }
            console.log(theBuff,stat)
            myChar.actualBuff += stat
            console.log(myChar)
        }
        else{
            pEl.innerText = thisObject.noBuff
        }
    }

}
function startDialog(e){
    modelNpc.classList.remove('is-active')
    var thisCharacter=e.target.innerText
    destroyContent()
    dialogContent()
    pEl=document.querySelector('#response')
    thisObject=search(thisCharacter,characters)
    pEl.innerText=thisObject.greet 
    for(var o=0;o<4;o++){
    var newButton = document.querySelector('#option' + o)
    newButton.innerText=buttonText[o]  
    newButton.addEventListener("click",displayText)

    }
}
function showNPCs(){
    modelNpc.classList.add('is-active')
    fetch('./assets/dialog.json')
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        characters = data
        console.log(data)
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
        
    })
}

showNPCButton.addEventListener('click', showNPCs)
