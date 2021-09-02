var startUrl = 'https://www.dnd5eapi.co/api'
var refUrl = 'https://www.dnd5eapi.co'
var apiInfo = {}


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
        makeChar(apiInfo, refUrl)
    })
})



// var seconds = 0;
// setInterval(function() {
// seconds++;
// console.log(seconds)
// if (myChar != null){
//     console.log(myChar)
// }
// }, 1000);
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
diceRoller()