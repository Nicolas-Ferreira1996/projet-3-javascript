const prompt = require("prompt-sync")()

let choice = ""

// Attaques //
const attackone = {
    name: "Bourre Pif",
    damage: -10,
    accuracy: 0.5
}

const attackTwo = {
    name: "Tapenade",
    damage: 15,
    accuracy: 0.4
}

const attackThree = {
    name: "Huraken",
    damage: -25,
    accuracy: 0.3
}

const attackFour = {
    name: "Olive",
    damage: -50,
    accuracy: 0.1
}

const attackFive = {
    name: "Fatal-Foudre",
    damage: -5,
    accuracy: 1
}

// Player //
const guerierDeFeu = {
    name: "Guerrier Du Feu",
    pv: 50,
    attacks: [attackone, attackTwo, attackThree, attackFour, attackFive]
}

// Bot //
const sombreLutin = {
    name: "Sombre Lutin",
    pv: 50,
    attacks: [attackone, attackTwo, attackThree, attackFour, attackFive]
}


// Fonction pour faire choisir attaque player //
function choiceAttaque() {
    for (let i = 0; i < guerierDeFeu.attacks.length; i++) {
        console.log(guerierDeFeu.attacks[i].name + " " + (i + 1));
    }
    choice = parseInt(prompt("choisis une attaque : "))
    let attaque = guerierDeFeu.attacks[choice - 1]
    let precision = randomizeAccuracy()
    if (attaque.accuracy >= precision) {
        playerTurn(attaque)
    }else{
        console.log(" player loupé nuloss ");
        console.log(" il reste au sombre lutin " + sombreLutin.pv + " pv ");
    }
}
    


// Fonction attaque du player sur bot //
function playerTurn(attaque) {
    
    if (attaque.damage > 0 ) {
        guerierDeFeu.pv += attaque.damage
        console.log(" le guerrier du feu recupere " + attaque.damage + " pv ");
        console.log(" il reste au guerrier du feu " + guerierDeFeu.pv + " pv ");
    }else{
         sombreLutin.pv += attaque.damage
         console.log(" le lutin a perdu " + attaque.damage + " pv ");
         console.log(" il reste au sombre lutin " + sombreLutin.pv + " pv ");
    }
}

// Fonction attaque du bot sur player //
function botTurn(attaque) {
    
    if (attaque.damage > 0 ) {
        sombreLutin.pv += attaque.damage
        console.log(" le lutin recupere " + attaque.damage + " pv ");
        console.log(" il reste au sombre lutin " + sombreLutin.pv + " pv ");
    }else{
         guerierDeFeu.pv += attaque.damage
         console.log(" le guerrier de feu a perdu " + attaque.damage + " pv ");
         console.log(" il reste au guerrier du feu " + guerierDeFeu.pv + " pv ");
    }
}

function botAttack() {
    choice = randomize(0, sombreLutin.attacks.length - 1)
    attaque = sombreLutin.attacks[choice]
    precision = randomizeAccuracy()
    
    if (attaque.accuracy >= precision) {
        botTurn(attaque)
    }else{
        console.log(" lutin loupé nuloss ");
        console.log(" il reste au guerrier du feu " + guerierDeFeu.pv + " pv ");
    }
}



function randomize(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function randomizeAccuracy() {
    return Math.random() // (0, 1)
}

console.log(" Vous avez recontrer ce bon vieux sombre lutin, il veut se battre ! ")

while (true) {
    choiceAttaque()
    if (sombreLutin.pv <= 0) {
        console.log(" Vous avez battu le lutin ");
        break
    }
    botAttack()
    if (guerierDeFeu.pv <= 0) {
        console.log(" Le sombre lutin a gagné, perdu looserr ");
        break
    }
}

