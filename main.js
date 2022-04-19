;('use strict')
const logic = require('./logic.js')

const inquirer = require('inquirer')

console.log("Welcome to Texas Hold'em!")

const firstQuestion = {
  type: 'input',
  name: 'communityCards',
  message: 'Please enter the five community cards: ',
  validate(value) {
    const pass = value.match(/([2-9][HSDC]|[TJQKA][HSDC])/g)
    if (pass && value.length === 14) {
      return true
    }
    return 'Please enter 5 cards (example: 2C 3C 4C 5C 6C)'
  },
}

const questions = [
  {
    type: 'input',
    name: 'name',
    message: 'Please enter the name of a player: ',
    validate(value) {
      const pass = value.match(/[A-Za-z]/g)
      if (pass && value.length >= 2) {
        return true
      }
      return 'Please enter a valid name (example: John)'
    },
  },
  {
    type: 'input',
    name: 'cards',
    message: 'What cards does the player have?',
    validate(value) {
      const pass = value.match(/([2-9][HSDC]|[TJQKA][HSDC])/g)
      if (pass && value.length === 5) {
        return true
      }
      return 'Please enter 2 cards (example: 2C 3C)'
    },
  },
  {
    type: 'confirm',
    name: 'addPlayer',
    message: 'Would you like to add another player?',
    default: false,
  },
]
const readyToPlay = {
  type: 'confirm',
  name: 'play',
  message: "Let's play?",
  default: true,
}

let users = []
let communityCards = []

const getUserInfo = async () => {
  await inquirer.prompt(questions).then((answers) => {
    answers.cards = answers.cards.split(' ')
    users.push(answers)
    if (answers.addPlayer === true) {
      getUserInfo()
    } else {
      letsPlay()
    }
  })
}

const letsPlay = () => {
  inquirer.prompt(readyToPlay).then((answer) => {
    if (answer.play === true) {
      console.log('\n' + communityCards.map((key) => key).join(' '))
      for (let i = 0; i < users.length; i++) {
        console.log(users[i].name + ' ' + users[i].cards.map((key) => key).join(' '))
      }
      console.log('\n')
      logic.mainFunction(communityCards, users)
    }
  })
}

const getCommCards = () => {
  inquirer.prompt(firstQuestion).then((answer) => {
    if (answer) {
      communityCards = answer.communityCards.split(' ')
      getUserInfo()
    }
  })
}

getCommCards()
