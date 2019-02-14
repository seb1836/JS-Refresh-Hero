const warActions = [
  {
    name: 'sword',
    attaque: 10,
    manaCost: 0
  },
  {
    name: 'axe',
    attaque: 15,
    manaCost: 0
  },
  {
    name: 'shield',
    defense: 5
  }
]

const mageActions = [
  {
    name: 'fireBall',
    attaque: 40,
    manaCost: 30
  },
  {
    name: 'frostBolt',
    attaque: 20,
    manaCost: 20
  },
  {
    name: 'mana',
    mana: 100
  }
]

const heroes = [
  {
    name: 'roger',
    id: 'hero1',
    hp: 500,
    maxHp: 500,
    mana: 0,
    maxMana: 0,
    attaque: 0,
    defense: 0,
    actions: warActions
  },

  {
    name: 'saoulliker',
    id: 'hero2',
    hp: 230,
    maxHp: 230,
    mana: 200,
    maxMana: 200,
    attaque: 0,
    defense: 0,
    actions: mageActions
  }
]

function heroIdentifier(id) {
  return heroes.find(hero => id === hero.id)
}
/*for (i = 0; i < heroes.length; i++) {
    if (id === heroes[i].id) {
      return heroes[i];
    }
  }
}*/

function hasEnoughtMana(hero, actionMana) {
  console.log(actionMana.manaCost)
  if (hero.mana - actionMana.manaCost < 0) {
    alert('pas assez de mana')
    return false
  } else {
    return true
  }
}

function getAction(casterObj, spellName) {
  return casterObj.actions.find(action => spellName === action.name)
}
/*for (let i = 0; i < casterObj.actions.length; i++) {
    if (spellName === casterObj.actions[i].name) {
      return casterObj.actions[i];
    }
  }
}*/

function majData(action, casterObj, defenderObj) {
  console.log('attak', casterObj.attaque)
  const name = action.name === 'mana' || action.name === 'shield' ? action.name : 'normal'
  window[`${name}Action`](action, casterObj, defenderObj)

  console.log('123', casterObj)
}

function shieldAction(action, casterObj) {
  // if (action.name === "shield") {
  casterObj.defense = action.defense
  // }
}
function manaAction(action, casterObj) {
  // if (action.name === "mana") {
  if (action.mana + casterObj.mana > casterObj.maxMana) {
    alert('max reached')
    casterObj.mana = casterObj.maxMana
  } else {
    casterObj.mana = casterObj.mana + action.mana
  }
  // }
}
function normalAction(action, casterObj, defenderObj) {
  if (hasEnoughtMana(casterObj, action)) {
    casterObj.mana = casterObj.mana - action.manaCost
    casterObj.attaque = action.attaque
    console.log('attaque after', casterObj.attaque)
    defenderObj.hp = defenderObj.hp - casterObj.attaque + defenderObj.defense
  }
}
function doAction(spellName, casterHTML, defenderHTML) {
  console.log('html', casterHTML)
  const casterObj = heroIdentifier(casterHTML.id)
  const defenderObj = heroIdentifier(defenderHTML.id)
  majData(getAction(casterObj, spellName), casterObj, defenderObj)
  updateBar(casterObj, defenderObj, casterHTML, defenderHTML)
  console.log('testattobj', casterObj)
  console.log('testdefobj', defenderObj)
  endgame(casterObj, defenderObj)
}

function endgame(caster, defender) {
  if (caster.hp <= 0) {
    alert(caster.name + '' + ' a perdu')
    //retour page a definir
    document.getElementsByClassName('gone')[0].className = 'main-menu-btn'
    document.getElementsByClassName('game-container')[0].classList.add('gone')
    resetGame()
  } else if (defender.hp <= 0) {
    alert(defender.name + '' + ' a perdu')
    //retour page a definir
    document.getElementsByClassName('gone')[0].className = 'main-menu-btn'
    document.getElementsByClassName('game-container')[0].classList.add('gone')
    resetGame()
  }
}

function resetGame() {
  resetObject()
  resethtml()
}

function play() {
  document.getElementsByClassName('main-menu-btn')[0].className = 'gone'
  document.getElementsByClassName('game-container gone')[0].classList.remove('gone')
  resetObject()
  resethtml()
  refreshHeroHtml()
}

function resetObject() {
  heroes.forEach(hero => {
    // for (let i = 0; i < heroes.length; i++) {

    hero.hp = hero.maxHp
    hero.mana = hero.maxMana
  })
}

function resethtml() {
  heroes.forEach(hero => {
    //for (let i = 0; i < heroes.length; i++) {
    const heroHTML = document.getElementById(hero.id)

    heroHTML.getElementsByClassName('hero-hp')[0].innerHTML = hero.maxHp + 'HP'
    heroHTML.getElementsByClassName('hero-mp')[0].innerHTML = hero.maxMana + 'MP'
    heroHTML.getElementsByClassName('hp-bar')[0].style.width = '100%'
    heroHTML.getElementsByClassName('mp-bar')[0].style.width = '100%'
  })
}
function updateBar(casterObj, defenderObj, casterHTML, defenderHTML) {
  defenderHTML.getElementsByClassName('hp-bar')[0].style.width = `${(100 * defenderObj.hp) / defenderObj.maxHp}%`
  casterHTML.getElementsByClassName('mp-bar')[0].style.width = `${(100 * casterObj.mana) / casterObj.maxMana}%`
  console.log('testfdfsd----------------------------------', casterObj, defenderObj)
  refreshHeroHtml()
}

function refreshHeroHtml() {
  heroes.forEach(hero => {
    document.getElementById(hero.id).getElementsByClassName('hero-hp')[0].innerHTML = hero.hp + 'HP'
    document.getElementById(hero.id).getElementsByClassName('hero-mp')[0].innerHTML = hero.mana + 'MP'
  })
}
