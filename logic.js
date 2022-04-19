let allCards = require('./kickers.json')
let allFaces = allCards.cards

const handValues = [
  'Highcard',
  'Pair',
  'Two Pairs',
  'Three of a Kind',
  'Straight',
  'Flush',
  'Full House',
  'Four of a Kind',
  'Straight Flush',
  'Royal Flush',
]

class PlayerHand {
  constructor(communityCards, playerInfo) {
    this.communityCards = communityCards
    this.playerCards = playerInfo.cards
    this.playerName = playerInfo.name
    this.suitsArray = []
    this.facesArray = []
    this.joinedHand = []
    this.sortedArray = []
    this.isFlush = { face: '', status: false }
    this.straightStatus = { face: '', status: '' }
    this.pairCount = { faces: [], count: 0 }
    this.finalResult = { handValue: '', faceValue: [] }
  }

  finalCombination = () => {
    this.sortArray()
    this.divideArray()
    this.flush()
    this.straight()
    this.pair()
    let ranks = this.countFaces()
    if (this.isFlush.status === true && this.straightStatus.status === 'Royal Straight') {
      this.finalResult.handValue = 'Royal Flush'
      this.finalResult.faceValue.push(this.straightStatus.face)
    } else if (this.isFlush.status === true && this.straightStatus.status === 'Straight') {
      this.finalResult.handValue = 'Straight Flush'
      this.finalResult.faceValue.push(this.straightStatus.face)
    } else if (Object.keys(ranks).find((key) => ranks[key] === 4)) {
      this.finalResult.handValue = 'Four of a Kind'
      this.finalResult.faceValue.push(Object.keys(ranks).find((key) => ranks[key] === 4))
    } else if (Object.keys(ranks).find((key) => ranks[key] === 3) && this.pairCount.count >= 1) {
      this.finalResult.handValue = 'Full House'
      this.finalResult.faceValue.push(Object.keys(ranks).find((key) => ranks[key] === 3))
      this.finalResult.faceValue.push(this.pairCount.faces.map((key) => ` ${key}`))
    } else if (this.isFlush.status === true) {
      this.finalResult.handValue = 'Flush'
      this.finalResult.faceValue.push(this.isFlush.face)
    } else if (this.straightStatus.status === 'Straight' || this.straightStatus.status === 'Royal Straight') {
      this.finalResult.handValue = 'Straight'
      this.finalResult.faceValue.push(this.straightStatus.face)
    } else if (Object.keys(ranks).find((key) => ranks[key] === 3)) {
      this.finalResult.handValue = 'Three of a Kind'
      this.finalResult.faceValue.push(Object.keys(ranks).find((key) => ranks[key] === 3))
    } else if (this.pairCount.count === 2) {
      this.finalResult.handValue = 'Two Pairs'
      this.finalResult.faceValue = this.pairCount.faces.map((key) => `${key}`)
    } else if (this.pairCount.count === 1) {
      this.finalResult.handValue = 'Pair'
      this.finalResult.faceValue = this.pairCount.faces.map((key) => `${key}`)
    } else {
      this.finalResult.handValue = 'Highcard'
      this.finalResult.faceValue.push(this.facesArray[this.facesArray.length - 1])
    }
    return [this.playerName, this.finalResult]
  }

  sortArray = () => {
    this.joinedHand = this.communityCards.concat(this.playerCards)
    for (let i = 0; i < allFaces.length; i++) {
      for (let j = 0; j < this.joinedHand.length; j++) {
        if (allFaces[i].name === this.joinedHand[j].charAt(0)) {
          this.sortedArray.push({ face: allFaces[i].kicker, suit: this.joinedHand[j].charAt(1) })
        }
      }
    }
    return this.sortedArray
  }

  divideArray = () => {
    for (let i = 0; i < this.sortedArray.length; i++) {
      this.facesArray.push(this.sortedArray[i].face)
      this.suitsArray.push(this.sortedArray[i].suit)
    }
  }

  countSuits = () => {
    let suitCount = {}
    this.suitsArray.forEach(function (x) {
      suitCount[x] = (suitCount[x] || 0) + 1
    })
    return suitCount
  }

  countFaces = () => {
    let faceCount = {}
    this.facesArray.forEach(function (x) {
      faceCount[x] = (faceCount[x] || 0) + 1
    })
    return faceCount
  }

  flush = () => {
    let suitsObject = this.countSuits(this.suitsArray)
    if (Object.keys(suitsObject).find((key) => suitsObject[key] >= 5)) {
      let flushSuit = Object.keys(suitsObject).find((key) => suitsObject[key] >= 5)
      for (let i = this.sortedArray.length - 1; i >= 0; i--) {
        this.isFlush.status = true
        if (this.sortedArray[i].suit === flushSuit) {
          this.isFlush.face = this.sortedArray[i].face
          return
        }
      }
    }
  }

  straight = () => {
    let section = this.facesArray.slice(0).join('')
    if (
      section.includes('10') &&
      section.includes('Jack') &&
      section.includes('Queen') &&
      section.includes('King') &&
      section.includes('Ace')
    ) {
      //for the further chance of Royal Flush:
      return (this.straightStatus = { face: 'Ace', status: 'Royal Straight' })
    } else {
      for (let i = this.facesArray.length - 1; i >= 0; i--) {
        let index = allFaces.findIndex((object) => object.kicker == this.facesArray[i])
        let ref = allFaces.slice(index - 4, index + 1)
        let count = 0
        let face = ''
        if (ref.length >= 5) {
          for (let j = 0; j < ref.length; j++) {
            if (section.includes(ref[j].kicker)) {
              count++
              face = ref[j].kicker
            }
          }
          if (count >= 5) {
            return (this.straightStatus = { face: face, status: 'Straight' })
          }
        } else {
          return (this.straightStatus = { face: '', status: 'False' })
        }
      }
    }
  }
  pair = () => {
    let faceCount = this.countFaces(this.facesArray)
    this.pairCount.count = Object.keys(faceCount).filter((key) => faceCount[key] === 2).length
    this.pairCount.faces = Object.keys(faceCount).filter((key) => faceCount[key] === 2)
  }
}

const sortPlayerRanks = (resultArray) => {
  let sortedResults = []
  for (let i = handValues.length - 1; i >= 0; i--) {
    for (let j = 0; j < resultArray.length; j++) {
      if (handValues[i] === resultArray[j].result.handValue) {
        sortedResults.push(resultArray[j])
      }
    }
  }
  return sortedResults
}

const mainFunction = (communityCards, users) => {
  let playerResultArray = []
  for (let i = 0; i < users.length; i++) {
    let player = new PlayerHand(communityCards, users[i])
    let [playerName, playerResult] = player.finalCombination()
    playerResultArray.push({ name: playerName, result: playerResult })
  }
  let sortedResults = sortPlayerRanks(playerResultArray)
  for (let i = 0; i < sortedResults.length; i++) {
    console.log(sortedResults[i].result.faceValue)
    console.log(
      `${i + 1} ${sortedResults[i].name} ${sortedResults[i].result.handValue} ` + sortedResults[i].result.faceValue.map((key) => `${key}`)
    )
  }
}

module.exports = { mainFunction: mainFunction }
