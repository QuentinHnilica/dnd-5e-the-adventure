var myChar = {} //During char creation use this object to add properties
var theData

//general function for getting info from API
function search(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].name === nameKey) {
            return myArray[i];
        }
    }
}

function addRace(e){
    var myRace = e.target.innerHTML
    var raceIndex = search(myRace, theData.results)
    if (raceIndex != null){
        fetch(refUrl + raceIndex.url).then(function(response){
            response.json().then(function(data){
                console.log(data)
                var raceData = data
                myChar.race = myRace
            })
        })
    }
}

//Starts Charactor creation
function makeChar(apiInfo, refUrl){
    fetch(refUrl + apiInfo.races).then(function(response){
        response.json().then(function(data){
            theData = data
            for (var i = 0; i < data.results.length; i++){
                var newButton = document.createElement('button')
                newButton.innerHTML = data.results[i].name
                document.body.appendChild(newButton)
                newButton.addEventListener('click', addRace)
            }
        })
    })
}

