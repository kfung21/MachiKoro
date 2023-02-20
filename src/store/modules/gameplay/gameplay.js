import state from './state.js'

const getters = {
  getDice: (state) => {
    return state.Dice
  },
}

const mutations = {
  setGlobalSwipe: (state) => {
    state.GlobalSwipe = state
  },
  rollDice: (state) => {
  // payload = low num & high num
    const min = state.DiceRange[0]
    const max = state.DiceRange[1]
    state.Dice = Math.floor(Math.random() * (max - min))+ min 
    console.log('gameplay rollDice', state.Dice);
  },
  setDiceRange: (state, payload) => {
    state.DiceRange =[]
    state.DiceRange.push(payload[0])
    state.DiceRange.push(payload[1])
  },
  setDoubles: (state, payload) => {
    // payload = true/false
    state.Doubles = payload
  },
  setHasDice2: (state, payload) => {
    // payload = true/false
    state.HasDice2 = payload
  },
  setHarbor: (state) => {
    // payload = true/false
    state.Dice += 2
  },
  setAirportCheckIn: (state) => {
    // payload = true/false
    state.AirportCheckIn = state.Players[state.TurnPlayer].money
  },
  setSecondTurn: (state, payload) => {
    // payload = true/false
    state.SecondTurn = payload
  },
  modMoney: (state, payload) => {
    // payload = player, amount
    const playerInd = getPlayerIndex(payload[0])
    const amount = payload[1]
    
    console.log('gameplay mutation modMoney', state, payload);
    state.Players[playerInd].money += amount
    // payload[0].money += payload[1]
    // payload[0].money += payload[1]
  },
  transferMoney: (state, payload) => {
    // payload = from player index, to player index, amount
    console.log('gameplay mutation transferMoney', state, payload);
    const fromPlayer = payload[0]
    const toPlayer = payload[1]
    const amount = payload[2]

    if (state.Players[fromPlayer].money <= amount){
      state.Players[toPlayer].money += state.Players[fromPlayer].money 
      state.Players[fromPlayer].money = 0
    } else {
      state.Players[toPlayer].money += amount
      state.Players[fromPlayer].money -= amount
    }
  },
  buyCard: (state, payload) => {
    // payload = card
    console.log('gameplay mutation BuyCard', state, payload);
    const currPlayer = state.Players[state.TurnPlayer]
    const card = {
      name: payload.name, 
      type: payload.type, 
      icon: payload.icon, 
      cost: payload.cost, 
      activation: payload.activation, 
      quantity: 1, 
      set: payload.set, 
      description: payload.description
    }
    // only buy 1 landmark
    if (card.type == 'landmark'){
      if(!currPlayer.landmarks[card.name] && currPlayer.money >= payload.cost){
        currPlayer.landmarks[card.name] = true
      } else {return}
    }

    // buy the card from marketplace and add to player hand
    if (currPlayer.money >= payload.cost && payload.quantity > 0) {
      payload.quantity-- // marketplace quantity -1
      currPlayer.money = currPlayer.money - payload.cost 

      // make the card in hand 1 item instead of multiple by updating quantity
      const hasCard = currPlayer.hand.filter(temp => temp.name == card.name) 
      console.log('hascard', hasCard, currPlayer.id);
      if(hasCard.length){
          hasCard[0].quantity++
      } else {
        currPlayer.hand.push(card)
          console.log('push card',  currPlayer);
      }
    }
  },
  setPopUpCard: (state, payload) => {
    // payload = card
    state.PopUpCard = payload
  },
  setSelectCardGive: (state, payload) => {
    // payload = card
    state.CardGive = payload
  },
  setSelectCardTake: (state, payload) => {
    // payload = card
    state.CardTake = payload
  },
  SwapCards: (state, payload) => {
    // payload = p1, p2, give card, take card
    const p1 = payload[0]
    const p2 = payload[1]
    const give = payload[2]
    const take = payload[3]

    // remove cards
    let giveHand = state.Players[p1].hand.find(c => c.name === give.name) // give card in p1 hand
    let takeHand = state.Players[p2].hand.find(c => c.name === take.name) // take card in p2 hand
    
    console.log('swap cards mutation', state.Players[p2].hand.findIndex(c => c.name === take.name))

    if (giveHand.quantity > 1){
      giveHand.quantity--
    } else {
      state.Players[p1].hand = state.Players[p1].hand.filter(c => c.name != give.name)
    }
    if (takeHand.quantity > 1){
      takeHand.quantity--
    } else {
      state.Players[p2].hand = state.Players[p2].hand.filter(c => c.name != take.name)
    }
    
    // add cards
    giveHand = state.Players[p1].hand.find(c => c.name === take.name) // give card in p1 hand
    takeHand = state.Players[p2].hand.find(c => c.name === give.name) // take card in p2 hand
    const giveCard = Object.assign({}, give);
    const takeCard = Object.assign({}, take);
    giveCard.quantity = 1
    takeCard.quantity = 1

    if (giveHand){
      giveHand.quantity++
    } else {
      state.Players[p1].hand.push(takeCard)
    }
    if (takeHand){
      takeHand.quantity++
    } else {
      state.Players[p2].hand.push(giveCard)
    }


  },
  setTurnPlayer: (state, payload) => {
    // payload = player
    const playerInd = getPlayerIndex(payload)
    state.TurnPlayer = playerInd - 1

    // if (payload === 'P1') {state.TurnPlayer = 0}
    // if (payload === 'P2') {state.TurnPlayer = 1}
    // if (payload === 'P3') {state.TurnPlayer = 2}
    // if (payload === 'P4') {state.TurnPlayer = 3}
    // if (payload === 'P5') {state.TurnPlayer = 4}
    // else {state.TurnPlayer = payload}
    // console.log('gameplay setTurnPlayer', payload, state.P1);
  },
  setIterPlayer: (state, payload) => {
    if (payload === 'P1') {state.IterPlayer = 0}
    if (payload === 'P2') {state.IterPlayer = 1}
    if (payload === 'P3') {state.IterPlayer = 2}
    if (payload === 'P4') {state.IterPlayer = 3}
    if (payload === 'P5') {state.IterPlayer = 4}
    else {state.IterPlayer = payload}
    // console.log('gameplay setTurnPlayer', payload, state.P1);
  },
  setSelectPlayer: (state, payload) => {
    // payload = player index
    state.SelectPlayer = payload
    console.log('gameplay setSelectPlayer', payload, state.SelectPlayer);
  },
  setIterOrder: (state) => {
    // sets the array of player indexes (ie: P1=0, P2=1...) in the order to evaluate based on the current player
    state.IterOrder = []
    for(var i=0; i<state.NumPlayers-1; i++){
      state.IterOrder.push((state.NumPlayers+state.TurnPlayer-i-1) % state.NumPlayers)
      console.log('setIterOrder', (state.NumPlayers+state.TurnPlayer-i-1) % state.NumPlayers);
    }
  },
  nextPlayerTurn: (state) => {
    // sets the array of player indexes (ie: P1=0, P2=1...) in the order to evaluate based on the current player

    // initial setup
    if (state.TurnPlayer === null) {state.TurnPlayer=0} 
    else {state.TurnPlayer++}
    
    // set next turn player
    if (state.TurnPlayer >= state.NumPlayers){
      state.TurnPlayer = 0
      state.IterPlayer = state.NumPlayers-1
    } else {
      state.IterPlayer = state.TurnPlayer-1
    }
    
    // reset Radio Tower to false
    state.Reroll = false

    console.log('nextPlayerTurn mutation', state.TurnPlayer, state.IterPlayer, state.IterOrder);
    
  },

}

const actions = {
  setGlobalSwipe: (context, payload) => {
    context.dispatch('setGlobalSwipe', payload)
  },
  async rollDice (context) {
    // payload = low, high 
    const curr = context.state.Players[context.state.TurnPlayer]
    for(;;){

      context.dispatch('SetDiceDisplay',false) //action
      if(curr.ai.is){context.dispatch('aiChooseRollTwoDice')}
  
      await new Promise(resolve => setTimeout(resolve, 300))
      
      context.dispatch('SetDiceDisplay',true) //action
      context.commit('rollDice');
      
      // Check for Harbor (10 or more, add 2)
      if(context.state.Dice >= 10 && context.state.Players[context.state.TurnPlayer].landmarks['Harbor']){
        if (curr.ai.is == false){
          if(confirm(`You rolled: ${context.state.Dice} \nDo you want to use the Harbor and add 2 to your roll?`)){ context.commit('setHarbor')}
        } else {
          context.dispatch('aiChooseHarborAdd')
        }
      }
        
      console.log('promise 2');
      
      await new Promise(resolve => setTimeout(resolve, 0))
  
      // Radio Tower Re-Roll?
      if (context.state.Reroll == true){ //did the player already reroll?
        context.state.Reroll = false
        break
      } else { //has not rerolled
          console.log('roll dice again',context.state.Players[context.state.IterOrder[context.state.IterOrder.length-1]].landmarks['Radio Tower']); 
  
          if(context.state.Players[context.state.TurnPlayer].landmarks['Radio Tower'] && context.state.Reroll == false){ //if they have a radio tower ask if they would like to reroll and didn't reroll already
            if(curr.ai.is==false){
              if(!context.state.Reroll) { // reroll if they didn't reroll yet
                if (confirm(`You rolled: ${context.state.Dice} \nDo you want to re-roll?`)){
                  context.state.Reroll = true
                } else {
                  break;
                }  
              } 
            } else {
              context.dispatch('aiChooseReroll')
              break;
            }
          }else {
            break;
          }
      }
    }

    context.dispatch('setDoubles') 
    console.log('promise 3');

  },
  setDiceRange: (context, payload) => {
    context.commit('setDiceRange', payload);
  },
  setDoubles: (context) => {
    let rndNum = null
    const doubles = [2,4,6,8,10,12]

    if(context.state.HasDice2 && doubles.includes(context.state.Dice)){
      if(context.state.Dice === 2 || context.state.Dice === 12){
        context.commit('setDoubles', true)
      } else if (context.state.Dice === 4 || context.state.Dice === 10) {
        rndNum = Math.floor(Math.random() * (99 - 1) + 1)  
        if(rndNum >= 66) {
          context.commit('setDoubles', true)
        }
      } else if (context.state.Dice === 6 || context.state.Dice === 8) {
        rndNum = Math.floor(Math.random() * (100 - 1) + 1)  
        if(rndNum <= 20) {
          context.commit('setDoubles', true)
        }
      }
    } else {
      context.commit('setDoubles', false)
    }
    
  },
  setHasDice2: (context, payload) => {
    context.commit('setHasDice2', payload);
  },
  setSecondTurn: (context, payload) => {
    context.commit('setSecondTurn', payload);
  },
  setTurnPlayer: (context, payload) => {
    context.commit('setTurnPlayer', payload);
  },
  setIterPlayer: (context, payload) => {
    context.commit('setIterPlayer', payload);
  },
  setSelectPlayer: (context, payload) => {
    context.commit('setSelectPlayer', payload);
  },
  nextPlayerTurn: (context) => {
    context.commit('nextPlayerTurn');
    context.commit('setIterOrder');
  },
  setIterOrder: (context) => {
    context.commit('setIterOrder');
  },
  buyCard: (context, payload) => {
    if (context.state.NewGame===false) {context.commit('buyCard', payload)}
    if(context.state.Expansion===true) {context.commit('setMarketPlace', context.state.MarketPlace.filter(c => c.quantity > 0 || c.type === 'landmark'))}
    context.dispatch('reloadMarketPlace')
    context.dispatch('endGame', payload);
  },
  setPopUpCard: (context, payload) => {
    context.commit('setPopUpCard', payload);
  },
  setSelectCardGive: (context, payload) => {
    context.commit('setSelectCardGive', payload);
  },
  setSelectCardTake: (context, payload) => {
    context.commit('setSelectCardTake', payload);
  },
  SwapCards: (context, payload) => {
    context.commit('SwapCards', payload);
  },

  modMoney: (context, payload) => {
    context.commit('modMoney', payload);
  },
  transferMoney: (context, payload) => {
    context.commit('transferMoney', payload);
  },
  setAirportCheckIn: (context) => {    
    context.commit('setAirportCheckIn')
  },
  getAllState: (context) => {
    console.log(context.rootState);
  },
  checkAirportCheckIn: (context) => {    
    // Check Airport to get extra money
    if (context.state.Players[context.state.TurnPlayer].money === context.state.AirportCheckIn && 
      context.state.Players[context.state.TurnPlayer].landmarks['Airport']) {
      context.dispatch('modMoney', [context.state.TurnPlayer, 10])
    }
  },
  checkTrainStation: (context) => {    
    // Check Train Station for Next Player Dice
    console.log('player turn checkTrainStation', context.state.Players[context.state.IterOrder[context.state.IterOrder.length-1]].landmarks['Train Station']);
    // console.log('player turn action', context.state.Players[context.state.IterOrder.length-1].landmarks['Train Station']);
    if (context.state.Players[context.state.IterOrder[context.state.IterOrder.length-1]].landmarks['Train Station']) {
      context.dispatch('setHasDice2', true)
    } else { 
      context.dispatch('setHasDice2', false)
    }
  },
  checkAmusementPark: (context) => {
    // check for amusement park
    const curr = context.state.Players[context.state.TurnPlayer]
    if(context.state.Doubles === true && 
      curr.landmarks['Amusement Park'] 
      // && context.state.SecondTurn === false // uncomment for only 1 second turn
      ){
      if(curr.ai.is === false){
        alert('You rolled doubles and have an Amusement Park. Take another turn!')
      } else {
        context.dispatch('Controller')
      }
      context.dispatch('setSecondTurn', true)
      console.log('second turn enabled', context.state.SecondTurn);
    } else { 
      context.dispatch('setSecondTurn', false)
      console.log('turning off second turn', context.state.SecondTurn);
    }
  },
  checkCityHall: (context) => { //Immediately before buying establishments, if you have 0 coins, get 1 from the bank
    if(context.state.Expansion == true && context.state.Players[context.state.TurnPlayer].money==0){
      context.commit('modMoney',[context.state.TurnPlayer, 1])
    }
  },
  checkNextTurnAI: (context) => {
    const currPlayer = context.state.Players[context.state.TurnPlayer]
    const nextPlayer = context.state.Players[context.state.IterOrder[context.state.IterOrder.length-1]]
    console.log('checkAI', currPlayer);
    if(currPlayer.ai.is===true && nextPlayer.ai.is===true && context.state.EndGame===false){
      context.dispatch('Controller')
    }
  },
  endGame: (context) => {
    const currPlayer = context.state.Players[context.state.TurnPlayer]
    if(context.state.Expansion == false){ //base

      if (currPlayer.landmarks['Train Station'] && 
          currPlayer.landmarks['Shopping Mall'] && 
          currPlayer.landmarks['Amusement Park'] && 
          currPlayer.landmarks['Radio Tower'] ) {
            alert(`Congratulations! ${currPlayer.id} has won the game!`)
            context.dispatch('ResetGame') //action
      }
    } else {
      if (currPlayer.landmarks['Train Station'] && 
          currPlayer.landmarks['Shopping Mall'] && 
          currPlayer.landmarks['Amusement Park'] && 
          currPlayer.landmarks['Radio Tower'] && 
          currPlayer.landmarks['Harbor'] && 
          currPlayer.landmarks['Airport'] ) {
            alert(`Congratulations! ${currPlayer.id} has won the game!`)
            context.dispatch('ResetGame') //action
      }
    }
  },
  async Controller (context) {
    // controls re/roll dice, player turn calculations, etc

    // if(!context.state.FinishedRoll){
      console.log('promise 0');

      if(context.state.NewGame == false) { //Checks for new game
        if(context.state.SecondTurn === false){ //Amusement Park, repeat turn
          console.log('checking second turn', context.state.SecondTurn);
          context.dispatch('checkAirportCheckIn') // Airport Check for harbor (gain 10 money)
          context.dispatch('nextPlayerTurn') //switch players and end turn
        }
      } else {
        context.dispatch('setNewGame', false) //Not a new game anymore
      }

      console.log('promise 1');
      await context.dispatch('rollDice') //roll dice. checks for doubles, Harbor and Radio Tower rerolls
      console.log('promise 4');
      context.dispatch('playerTurn') //calculate hands
      context.dispatch('setAirportCheckIn') //set Airport Check for harbor

      // Player or AI buys stuff
      if(context.state.Players[context.state.TurnPlayer].ai.is){context.dispatch('aiBuyCards')}
      console.log(context.state.Players[context.state.TurnPlayer].id,context.state.Players[context.state.TurnPlayer].ai);

      context.dispatch('checkAmusementPark') // repeat turn
      
      if(context.state.SecondTurn === false) { //if not repeat turn then check Train Station for next player's dices        
        await context.dispatch('checkTrainStation') //set 1 or 2 dice for next player
      }
      console.log('promise 5')
      context.dispatch('checkNextTurnAI') // if next player is an AI then continue rolling

  },
  playerTurn: (context) => {
    // after dice Roll calculate all players hands and check landmarks

    // 1. reverse order calculate other player's hands for money owed
    for(let i=0; i<state.IterOrder.length; i++){
      console.log('player turn action', state.IterOrder[i], typeof(i));
      context.dispatch('setIterPlayer', state.IterOrder[i])
      context.dispatch('calcHand', state.IterOrder[i])
    }

    // 2. calculate turn player's hand for money gained
    context.dispatch('calcHand', state.TurnPlayer)
    
    // 3. check for city hall/expansion
    context.dispatch('checkCityHall')

    // 4. allow construction
    
  },
  calcHand: (context, payload) => {
    // computes all players hands starting with turn player going counter clockwise

    // payload = player index
    console.log('calcHand action',context.state, payload);
    // console.log('calc hand action', context.state.Players[payload]);

    // compute restaurants first
    context.state.Players[payload].hand
      .filter(card => card.type == 'restaurants')
      .forEach(card => context.dispatch('calcCard',[payload, card]))
      
      // compute primary and secondary next
      context.state.Players[payload].hand
      .filter(card => card.type == 'primary' || card.type == 'secondary')
      .forEach(card => context.dispatch('calcCard',[payload, card]))
      
      // compute major last
      context.state.Players[payload].hand
        .filter(card => card.type == 'major')
        .forEach(card => context.dispatch('calcCard',[payload, card]))
      
  },
  async calcCard (context, payload) {
    // payload = player index, card
    console.log('actions calcPrimary', payload) 
    
    const player = payload[0]
    const card = payload[1]
    let shoppingMall = null
    let getNumIcons = null
    let getNumCards = null

    if(context.state.Players[player].landmarks['Shopping Mall']){
      shoppingMall = 1
    } else {
      shoppingMall = 0
    }
    
    if (card.activation.includes(context.state.Dice)) {
      switch (card.name){
          case 'Wheat Field': //Get 1 coin from the bank, on anyone's turn"
              context.commit('modMoney', [getPlayerIndex(player), 1*card.quantity]);
              break;
          case 'Ranch': //Get 1 coin from the bank, on anyone's turn
              context.commit('modMoney', [getPlayerIndex(player), 1*card.quantity]);
              break; 
          case 'Bakery': //Get 1 coin from the bank, on your turn only
              if(player===context.state.TurnPlayer) {context.commit('modMoney', [getPlayerIndex(player), (1 + shoppingMall)*card.quantity])}
              break;
          case 'Cafe': //Get 1 coin from the player who rolled the dice
              if(player!=context.state.TurnPlayer) {context.commit('transferMoney', [context.state.TurnPlayer, player, (1 + shoppingMall)*card.quantity])}
              break;
          case 'Convenience Store': //Get 3 coin from the bank, on your turn only
            if(player===context.state.TurnPlayer) {context.commit('modMoney', [getPlayerIndex(player), (3 + shoppingMall)*card.quantity])}
              break;
          case 'Forest': //Get 1 coin from the bank, on anyone's turn
              context.commit('modMoney', [getPlayerIndex(player), 1*card.quantity])
              break;
          case 'Cheese Factory': //Get 3 coins from the bank for each [cow] establishment that you own, on your turn only
              getNumIcons = context.state.Players[player].hand.filter(card => card.icon==='cow').length
              if(player===context.state.TurnPlayer) {context.commit('modMoney', [getPlayerIndex(player), 3*getNumIcons*card.quantity])}
              break;
          case 'Furniture Factory': //Get 3 coins from the bank for each [gear] establishment that you own, on your turn only
              getNumIcons = context.state.Players[player].hand.filter(card => card.icon==='gear').length
              if(player===context.state.TurnPlayer) {context.commit('modMoney', [getPlayerIndex(player), 3*getNumIcons*card.quantity])}
              break;
          case 'Mine': //Get 5 coins from the bank, on anyone's turn
              context.commit('modMoney', [getPlayerIndex(player), 5*card.quantity])
              break;
          case 'Family Restaurant': //Get 2 coins from the player who rolled the dice
              context.commit('modMoney', [getPlayerIndex(player), (1 + shoppingMall)*card.quantity])
              break;
          case 'Apple Orchard': //Get 3 coins from the bank, on anyone's turn
              context.commit('modMoney', [getPlayerIndex(player), 3*card.quantity])
              break;
          case 'Fruit and Vegetable Market': // Get 2 coins from the bank for each [wheat] establishment that you own, on your turn only
              getNumIcons = context.state.Players[player].hand.filter(card => card.icon==='wheat').length
              if(player===context.state.TurnPlayer) {context.commit('modMoney', [getPlayerIndex(player), 2*getNumIcons])}
              break;
          case 'Stadium': //Get 2 coins from all players, on your turn only
              if(player===context.state.TurnPlayer) {context.state.Players.forEach((p,i) => context.commit('transferMoney', [i, context.state.TurnPlayer, 2*card.quantity]))}    
              break;
          case 'TV Station': //Take 5 coins from any one player, on your turn only
              if(player===context.state.TurnPlayer) {
                context.state.CallCard = payload
                context.dispatch('SetPickPlayerModalDisplay', true)
              }
              break;
          case 'Business Center': //Trade one Non [tower] establishment with another player, on your turn only
              if(player===context.state.TurnPlayer) {
                context.state.CallCard = payload
                context.dispatch('SetPickPlayerModalDisplay', true)
              }
              break;
          // case 'Train Station': //You may roll 1 or 2 dice
          //     context.commit('modMoney', [getPlayerIndex(player), 1*card.quantity])
          //     break;
          // case 'Shopping Mall': //Each of your [cup] and [bread] establishments earn +1 coin
          //     context.commit('modMoney', [getPlayerIndex(player), 1*card.quantity])
          //     break;
          // case 'Amusement Park': //If you roll doubles, take another turn after this one
          //     context.commit('modMoney', [getPlayerIndex(player), 1*card.quantity])
          //     break;
          // case 'Radio Tower': //Once every turn, you can choose to re-roll your dice
          //     context.commit('modMoney', [getPlayerIndex(player), 1*card.quantity])
              // break;
          case 'Flower Orchard': //Get 1 coin from the bank, on anyone's turn
              context.commit('modMoney', [getPlayerIndex(player), 1*card.quantity])
              break;
          case 'Mackerel Boat': //If you have a harbor, get 3 coins from the bank on anyone's turn
              getNumCards = context.state.Players[player].hand.filter(card => card.name==='Harbor').length
              if (getNumCards>0) {context.commit('modMoney', [getPlayerIndex(player), 3])}
              break
          case 'Tuna Boat': //On anyone's turn: the current player rolls 2 dice, if you have a harbor you get as many coins as the dice total
              context.commit('modMoney', [getPlayerIndex(player), 1*card.quantity])
              break
          case 'Flower Shop': //Get 1 coin from the bank for each flower orchard you own, on your turn only
              getNumCards = context.state.Players[player].hand.filter(card => card.name==='Flower Orchard').length
              if(player===context.state.TurnPlayer) {context.commit('modMoney', [getPlayerIndex(player), (1 + shoppingMall)*getNumCards*card.quantity])}
              break
          case 'Food Warehouse': //Get 2 coins from the bank for each [cup] establishment that you own, on your turn only
              getNumIcons = context.state.Players[player].hand.filter(card => card.icon==='cup').length
              if(player===context.state.TurnPlayer) {context.commit('modMoney', [getPlayerIndex(player), 2*getNumIcons*card.quantity])}
              break
          case 'Sushi Bar': //If you have a harbor, you get 3 coins from the player who rolled the dice
              if(player!=context.state.TurnPlayer && player.landmarks.harbor) {context.commit('transferMoney', [context.state.TurnPlayer, player, (3 + shoppingMall)*card.quantity])}
              break
          case 'Pizza Joint ': //Get 1 coin from the player who rolled the dice
              if(player!=context.state.TurnPlayer) {context.commit('transferMoney', [context.state.TurnPlayer, player, (1 + shoppingMall)*card.quantity])}
              break
          case 'Hamburger Stand': //Get 1 coin from the player who rolled the dice
              if(player!=context.state.TurnPlayer) {context.commit('transferMoney', [context.state.TurnPlayer, player, (1 + shoppingMall)*card.quantity])}
              break
          case 'Publisher': //get 1 coin from each player for each [cup] and [bread] establishment they have, on your turn only
              if(player===context.state.TurnPlayer) {
                context.state.Players.forEach(function(p,i) {
                  const getNumIcons = context.state.Players[i].hand.filter(card => card.icon==='cup').length
                  const getNumIcons2 = context.state.Players[i].hand.filter(card => card.icon==='bread').length
                  context.commit('transferMoney', [i, context.state.TurnPlayer, 1*getNumIcons*getNumIcons2*card.quantity])
                }  
              )}  
              break
          case 'Tax Office': //Take half (rounded down) of the coins from each player who has 10 coins or more, on your turn only
              if(player===context.state.TurnPlayer) {
                context.state.Players.forEach(function(p,i) {
                  if(p.money>=10) {
                    context.commit('transferMoney', [i, context.state.TurnPlayer, Math.floor(p.money/2)*card.quantity])
                  }
                }
              )}  
              break
          // case 'City Hall': //Immediately before buying establishments, if you have 0 coins, get 1 from the bank
          //     context.commit('modMoney', [getPlayerIndex(player), 1*card.quantity])
          //     break
          // case 'Harbor': //If the dice total is 10 or more, you may add 2 to the total, on your turn only
          //     context.commit('modMoney', [getPlayerIndex(player), 1*card.quantity])
          //     break
          // case 'Airport': //If you build nothing on your turn, you get 10 coins from the bank
          //     context.commit('modMoney', [getPlayerIndex(player), 1*card.quantity])
          //     break
      }
    }

  },
//   Controller: (context) => {

//   }
}

function getPlayerIndex(id) {
  if (isNaN(id)) {
    if (id.toUpperCase() === 'P1') {return 0}
    if (id.toUpperCase() === 'P2') {return 1}
    if (id.toUpperCase() === 'P3') {return 2}
    if (id.toUpperCase() === 'P4') {return 3}
    if (id.toUpperCase() === 'P5') {return 4}
  } else {
    if (id >=0 && id <=5) {return id}
  }
}

// function waitForSelectPlayer(myVar){
//   if(myVar != null){
//     return true
//   } else {setTimeout(waitForSelectPlayer, 250)}
// }
// function calcRestaurantsMajor(state, card) {
//   switch (card.name) {
//     case 'Cafe':
//       context.commit('modMoney', [getPlayerIndex(player), 1])
//       break

//   }
// }


export default {
  state,
  getters,
  actions,
  mutations
}