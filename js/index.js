var game = {
  init: false
};

// Weapons & spells
var actions = [
  {
    type: "weapon",
    name: "sword",
    label: "Epée",
    attack: 10
  },
  {
    type: "weapon",
    name: "axe",
    label: "Hache",
    attack: 12
  },
  {
    type: "weapon",
    name: "shield",
    label: "Bouclier",
    attack: 0,
    defense: 5
  },
  {
    type: "spell",
    name: "fireball",
    label: "Boule de feu",
    attack: 40,
    mana: 30
  },
  {
    type: "spell",
    name: "frostbolt",
    label: "Eclair de givre",
    attack: 20,
    mana: 20
  },
  {
    type: "spell",
    name: "mana",
    label: "Potion de mana",
    attack: 0,
    mana: 100
  }
];

// Characters
var heroes = [
  {
    name: "Roger le guerrier ",
    hp: 500,
    maxHP: 500,
    mp: 50,
    maxMP: 50,
    defense: 0,
    attack: 10,
    class: "warrior",
    id: "hero1",
    actions: []
  },
  {
    name: "Rapafro mage",
    hp: 350,
    maxHP: 350,
    mp: 200,
    maxMP: 200,
    defense: 0,
    attack: 6,
    class: "mage",
    id: "hero2",
    actions: []
  }
];

// refresh one hero informations a faire
var refreshHerohtml = function(heroElement, hero) {
  // var herotab[]
  //conditions d acces a while
  // let i = 0;
  //while (i< herotab)
  console.log(heroElement, hero);

  heroElement
    .getElementsByClassName("hero-hp")[0]
    .getElementsByTagName("span")[0].innerHTML = hero.hp + " HP";
  heroElement
    .getElementsByClassName("hero-mp")[0]
    .getElementsByTagName("span")[0].innerHTML = hero.mp + " MP";
  //heroElement =document.getElementsByClassName('hero-mp');  essai pour get element generique et faire maj
  heroElement.getElementsByClassName("hp-bar")[0].style.width = `${(hero.hp *
    100) /
    hero.maxHP}%`;
  //var memo = hero1.hp * 100 / hero1.maxHP
  heroElement.getElementsByClassName("mp-bar")[0].style.width = `${(hero.mp *
    100) /
    hero.maxMP}%`;
  heroElement.getElementsByClassName("attack")[0].innerHTML = hero.attack;
  heroElement.getElementsByClassName("defense")[0].innerHTML = hero.defense;

  console.log(hero);
  console.log(heroElement);
};

// refresh the UI a faire récupérer refresh ele html
var refresh = function() {
  let i = 0;

  while (i < heroes.length) {
    refreshHerohtml(document.getElementById(heroes[i].id), heroes[i]);
    i = i + 1;
  }
};

// load the game
var play = function() {
  // display game content and hide play button
  var gameContainer = document.getElementById("game");
  gameContainer.className = "game-container";
  var playButton = document.getElementById("play");
  playButton.className = "play gone";

  // init both heroes using the refresh function
  refresh();
};

// check if attacker has enough mana
var hasEnoughMana = function(attacker, manaCost) {
  if (attacker.mp - manaCost < 0) {
    alert("Pas assez de MP !");
    return false;
  }
  return true;
};

// check if defender is dead
var isDead = function(defender) {
  if (defender.hp <= 0) {
    var message = defender.name + " a perdu !";
    alert(message);
    return true;
  }
  return false;
};

// handle actions from onclick events optimisation
var doAction = function(action, attacker, defender) {
  /* DEBUG */
  var debug = attacker.name + " uses " + action;
  if (action !== "mana" && action !== "shield") {
    debug += " on " + defender.name;
  }
  console.log(debug);
  /* END DEBUG */

  // TODO : reset attacker's defense at each turn
  attacker.defense = 0;
  defender.defense = 0;
  // TODO : write the code for each action
  //        => remove attacker's attack + action damage to defender's HP
  //        => all the informations you need in the actions array (line 6)
  if (action === "sword") {
    defender.hp = defender.hp - actions[0].attack + defender.defense;
    attacker.attack = actions[0].attack;
  } else if (action === "axe") {
    // insert code here
    defender.hp = defender.hp - actions[1].attack + defender.defense;
    attacker.attack = actions[1].attack;
  } else if (action === "shield") {
    // insert code here

    defender.defense = actions[2].defense + defender.defense;
    // Note : shield doesn't add attack but defense
  } else if (action === "fireball") {
    // insert code here
    /* poser question sur comment obtenir value return*/
    if (hasEnoughMana(attacker, actions[3].mana)) {
      attacker.attack = actions[3].attack;
      attacker.mp = attacker.mp - actions[3].mana;
      defender.hp = defender.hp - actions[3].attack + defender.defense;
      // Note : don't forget to check if attacker has enough mana to cast the spell with hasEnoughMana function
    }
  } else if (action === "frostbolt") {
    // insert code here
    if (hasEnoughMana(attacker, actions[4].mana)) {
      attacker.mp = attacker.mp - actions[4].mana;
      defender.hp = defender.hp - actions[4].attack + defender.defense;
      attacker.attack = actions[4].attack;
      // Note : don't forget to check if attacker has enough mana to cast the spell with hasEnoughMana function
    }
  } else if (action === "mana") {
    // insert code here
    if (attacker.mp <= 100) {
      attacker.mp = actions[5].mana + attacker.mp;
      // Note : don't forget to check if attacker MP won't be above maxMP after drinking the mana potion
    } else {
      alert("maximum dépassé");
    }
  }

  // check if the defender is dead to end the game
  if (isDead(defender)) {
    endGame();
    return;
  }

  // refresh DOM once JS objects were updated
  refresh();
};

// reset heroes data
var resetData = function() {
  let i = 0;
  while (i < heroes.length) {
    heroes[i].hp = heroes[i].maxHP;
    heroes[i].mp = heroes[i].maxMP;
    heroes[i++].defense = 0;
  }
};

// end the game
var endGame = function() {
  game.init = false;

  // hide game content and display play button
  var gameContainer = document.getElementById("game");
  gameContainer.className = "game-container gone";
  var playButton = document.getElementById("play");
  playButton.className = "main-menu-btn visible";

  // Reset data for a new game
  resetData();
};

window.addEventListener("scroll", function() {
  console.log("scroll");
});

window.addEventListener("keypress", function() {
  console.log("key pressed");
});

window.addEventListener("keydown", function(event) {
  console.log(event.key);
});

//var b =hasenougthmana()
