
import state from './state.js'

const getters = {
}

const mutations = {
  setAIDice: (state, payload) => {
    state.aiDice = payload
  },
  setAIStrategy: (state, payload) => {
    state.aiStrategy = payload
  },
  setAIStrategies: (state, payload) => {
    state.aiStrategies = payload
  },
  setAILandmarks: (state, payload) => {
    state.aiLandmarks = payload
  },
  
  setAIMoney: (state, payload) => {
    state.aiProjectedMoney = payload
  },
  aiModMoney:(state, payload) => {
    // payload = player, amt
    state.aiProjectedMoney += payload[1]
  },
  aiTransferMoney:(state, payload) => {
    // payload = from, to, amt
    if(payload[0] == state.TurnPlayer){
      state.aiProjectedMoney -= payload[2]
    } else {
      state.aiProjectedMoney += payload[2]
    }
  },
}

const actions = {
  aiChooseRollTwoDice: (context) => {
    if(context.state.Players[context.state.TurnPlayer].hand.some(s => {s.activation.some(t => t > 6)})){
      console.log('ai chooses reroll');
      context.dispatch('setDiceRange',[1,12])
    } else {
      context.dispatch('setDiceRange',[1,6])
    }
  },
  aiChooseReroll: (context) => {
    context.commit('setAIDice', context.state.Dice)
    context.dispatch('aiPlayerTurn')
    context.state.Reroll = true
    if(context.state.aiProjectedMoney < 2){
      console.log('ai chooses reroll');
      context.dispatch('rollDice')
    }
  },
  aiChooseHarborAdd: (context) => {
    context.commit('setAIDice', context.state.Dice)
    context.dispatch('aiPlayerTurn')
    const oDice = context.state.aiProjectedMoney

    context.commit('setAIDice', context.state.Dice+2)
    context.dispatch('aiPlayerTurn')
    const newDice = context.state.aiProjectedMoney

    if(oDice < newDice){
      console.log('ai chooses to add harbor +2');
    }else {
      console.log('ai stays with first roll');
    }
  },
  aiBuyCards: (context) => {

    // try to buy everything in the list it can then end turn
    const curr = context.state.Players[context.state.TurnPlayer]
    const tm = context.state.MarketPlace
    const strategy = context.state.aiStrategies[curr.ai.strategy]
    let boughtCard = false

    console.log('ai buying cards', context.state);

    for(let i=0; i<context.state.aiLandmarks.length; i++){ // try to buy all landmarks first
      if(curr.hand.filter(c => c.name != context.state.aiLandmarks[i].name)[0].name){
        if(curr.money >= tm.filter(c => c.name === context.state.aiLandmarks[i].name)[0].cost){
          context.dispatch('buyCard', tm.filter(c => c.name === context.state.aiLandmarks[i].name)[0])
          if(context.state.EndGame===true){break;}
        }
      }
    }

    
    for(let j=0; j<strategy.cards.length; j++){
      
      if(tm.some(c => c.name === strategy.cards[j].name)){ // does marketplace have target card
        if(curr.hand.some(h => h.name === strategy.cards[j].name)) {// if there is at least one card in hand
          console.log('ai buying cards2',strategy.cards[j].name, curr.hand.filter(h => h.name === strategy.cards[j].name))
          if(curr.hand.filter(h => h.name === strategy.cards[j].name)[0].quantity < strategy.cards[j].quantity){ // check quantity in hand >= target quantity
            context.dispatch('buyCard', tm.filter(c => c.name === strategy.cards[j].name)[0])
            boughtCard = true
          }
        }else {
          context.dispatch('buyCard', tm.filter(c => c.name === strategy.cards[j].name)[0])
          boughtCard = true
        }
      }
    }
    if(boughtCard === false && curr.money > 5 && context.state.Expansion === true && curr.hand.filter(c=>c.type==='landmark').length<6) {
      if(tm.filter(c => c.cost < 5).length){
        context.dispatch('buyCard', tm.filter(c => c.cost <= 3)[0])
        boughtCard = true
      }
    }



  },


  // Helper Functions
  setAIStrategy: (context) => {
    let aiLandmarks = []
    // Strategies from: https://boardgamegeek.com/thread/1301080/complete-simulation-machi-koro-strategies
    
    // Pick a strategy
    // if(context.state.aiStrategy == null){
      const rndNum = Math.floor(Math.random() * 8) 

      context.commit('setAIStrategy', rndNum)
      if(context.state.Expansion) {
        aiLandmarks = [{name: 'Shopping Mall'}, {name: 'Train Station'}, {name: 'Amusement Park'}, {name: 'Radio Tower'}, {name: 'Harbor'}, {name: 'Airport'}]
      } else {
        aiLandmarks = [{name: 'Shopping Mall'}, {name: 'Train Station'}, {name: 'Amusement Park'}, {name: 'Radio Tower'}]
      }
      context.commit('setAILandmarks', aiLandmarks)

      // if (context.state.Expansion===false){ //base set choose random
      //   context.commit('setAIStrategy', rndNum)
      //   if (rndNum >= 1 && rndNum <= 3) {aiLandmarks = [{name: 'Shopping Mall'}, {name: 'Train Station'}, {name: 'Amusement Park'}, {name: 'Radio Tower'}, {name: 'Harbor'}, {name: 'Airport'}]}
      // } else {
      //   let sInd = 0
      //   let sim = 0.
      //   let simCount = 0

      //   context.state.aiStrategies.forEach((s, i) => { //check each strategy
      //     context.state.MarketPlace.forEach(m => { //check each card in marketplace
      //       if(s.cards.some(c => c.name === m.name)){ //compare each card in strategy to all marketplace cards
      //         simCount += 1
      //       }
      //     })
      //     if(simCount/s.length > sim){ 
      //       sim = simCount/s.length
      //       sInd = i
      //     }
      //   })
      //   context.commit('setAIStrategy', sInd)
      //   if (sInd >= 1 && sInd <= 3) {aiLandmarks = [{name: 'Shopping Mall'}, {name: 'Train Station'}, {name: 'Amusement Park'}, {name: 'Radio Tower'}, {name: 'Harbor'}, {name: 'Airport'}]}
      // }
    // }
    // if (aiLandmarks == []) {aiLandmarks = [{name: 'Train Station'},{name: 'Shopping Mall'}, {name: 'Amusement Park'}, {name: 'Radio Tower'}, {name: 'Harbor'}, {name: 'Airport'}]}

    
  },
  aiPlayerTurn: (context) => {
    // after dice Roll calculate all players hands and check landmarks
    context.commit('setAIMoney',0)
    // 1. reverse order calculate other player's hands for money owed
    for(let i=0; i<state.IterOrder.length; i++){
      console.log('player turn action', state.IterOrder[i], typeof(i));
      context.dispatch('setIterPlayer', state.IterOrder[i])
      context.dispatch('aiCalcHand', state.IterOrder[i])
    }

    // 2. calculate turn player's hand for money gained
    context.dispatch('aiCalcHand', state.TurnPlayer)
    
    
  },
  aiCalcHand: (context, payload) => {
    // computes all players hands starting with turn player going counter clockwise

    // payload = player index
    console.log('aiCalcHand action',context.state, payload);
    // console.log('calc hand action', context.state.Players[payload]);

    // compute restaurants first
    context.state.Players[payload].hand
      .filter(card => card.type == 'restaurants')
      .forEach(card => context.dispatch('aiCalcCard',[payload, card]))
      
      // compute primary and secondary next
      context.state.Players[payload].hand
      .filter(card => card.type == 'primary' || card.type == 'secondary')
      .forEach(card => context.dispatch('aiCalcCard',[payload, card]))
      
      // compute major last
      context.state.Players[payload].hand
        .filter(card => card.type == 'major')
        .forEach(card => context.dispatch('aiCalcCard',[payload, card]))
      
  },
  async aiCalcCard (context, payload) {
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
    
    if (card.activation.includes(context.state.aiDice)) {
      switch (card.name){
          case 'Wheat Field': //Get 1 coin from the bank, on anyone's turn"
              context.commit('aiModMoney', [getPlayerIndex(player), 1*card.quantity]);
              break;
          case 'Ranch': //Get 1 coin from the bank, on anyone's turn
              context.commit('aiModMoney', [getPlayerIndex(player), 1*card.quantity]);
              break; 
          case 'Bakery': //Get 1 coin from the bank, on your turn only
              if(player===context.state.TurnPlayer) {context.commit('aiModMoney', [getPlayerIndex(player), (1 + shoppingMall)*card.quantity])}
              break;
          case 'Cafe': //Get 1 coin from the player who rolled the dice
              if(player!=context.state.TurnPlayer) {context.commit('aiTransferMoney', [context.state.TurnPlayer, player, (1 + shoppingMall)*card.quantity])}
              break;
          case 'Convenience Store': //Get 3 coin from the bank, on your turn only
            if(player===context.state.TurnPlayer) {context.commit('aiModMoney', [getPlayerIndex(player), (3 + shoppingMall)*card.quantity])}
              break;
          case 'Forest': //Get 1 coin from the bank, on anyone's turn
              context.commit('aiModMoney', [getPlayerIndex(player), 1*card.quantity])
              break;
          case 'Cheese Factory': //Get 3 coins from the bank for each [cow] establishment that you own, on your turn only
              getNumIcons = context.state.Players[player].hand.filter(card => card.icon==='cow').length
              if(player===context.state.TurnPlayer) {context.commit('aiModMoney', [getPlayerIndex(player), 3*getNumIcons*card.quantity])}
              break;
          case 'Furniture Factory': //Get 3 coins from the bank for each [gear] establishment that you own, on your turn only
              getNumIcons = context.state.Players[player].hand.filter(card => card.icon==='gear').length
              if(player===context.state.TurnPlayer) {context.commit('aiModMoney', [getPlayerIndex(player), 3*getNumIcons*card.quantity])}
              break;
          case 'Mine': //Get 5 coins from the bank, on anyone's turn
              context.commit('aiModMoney', [getPlayerIndex(player), 5*card.quantity])
              break;
          case 'Family Restaurant': //Get 2 coins from the player who rolled the dice
              context.commit('aiModMoney', [getPlayerIndex(player), (1 + shoppingMall)*card.quantity])
              break;
          case 'Apple Orchard': //Get 3 coins from the bank, on anyone's turn
              context.commit('aiModMoney', [getPlayerIndex(player), 3*card.quantity])
              break;
          case 'Fruit and Vegetable Market': // Get 2 coins from the bank for each [wheat] establishment that you own, on your turn only
              getNumIcons = context.state.Players[player].hand.filter(card => card.icon==='wheat').length
              if(player===context.state.TurnPlayer) {context.commit('aiModMoney', [getPlayerIndex(player), 2*getNumIcons])}
              break;
          case 'Stadium': //Get 2 coins from all players, on your turn only
              if(player===context.state.TurnPlayer) {context.state.Players.forEach((p,i) => context.commit('aiTransferMoney', [i, context.state.TurnPlayer, 2*card.quantity]))}    
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
          //     context.commit('aiModMoney', [getPlayerIndex(player), 1*card.quantity])
          //     break;
          // case 'Shopping Mall': //Each of your [cup] and [bread] establishments earn +1 coin
          //     context.commit('aiModMoney', [getPlayerIndex(player), 1*card.quantity])
          //     break;
          // case 'Amusement Park': //If you roll doubles, take another turn after this one
          //     context.commit('aiModMoney', [getPlayerIndex(player), 1*card.quantity])
          //     break;
          // case 'Radio Tower': //Once every turn, you can choose to re-roll your dice
          //     context.commit('aiModMoney', [getPlayerIndex(player), 1*card.quantity])
              // break;
          case 'Flower Orchard': //Get 1 coin from the bank, on anyone's turn
              context.commit('aiModMoney', [getPlayerIndex(player), 1*card.quantity])
              break;
          case 'Mackerel Boat': //If you have a harbor, get 3 coins from the bank on anyone's turn
              getNumCards = context.state.Players[player].hand.filter(card => card.name==='Harbor').length
              if (getNumCards>0) {context.commit('aiModMoney', [getPlayerIndex(player), 3])}
              break
          case 'Tuna Boat': //On anyone's turn: the current player rolls 2 dice, if you have a harbor you get as many coins as the dice total
              context.commit('aiModMoney', [getPlayerIndex(player), 1*card.quantity])
              break
          case 'Flower Shop': //Get 1 coin from the bank for each flower orchard you own, on your turn only
              getNumCards = context.state.Players[player].hand.filter(card => card.name==='Flower Orchard').length
              if(player===context.state.TurnPlayer) {context.commit('aiModMoney', [getPlayerIndex(player), (1 + shoppingMall)*getNumCards*card.quantity])}
              break
          case 'Food Warehouse': //Get 2 coins from the bank for each [cup] establishment that you own, on your turn only
              getNumIcons = context.state.Players[player].hand.filter(card => card.icon==='cup').length
              if(player===context.state.TurnPlayer) {context.commit('aiModMoney', [getPlayerIndex(player), 2*getNumIcons*card.quantity])}
              break
          case 'Sushi Bar': //If you have a harbor, you get 3 coins from the player who rolled the dice
              if(player!=context.state.TurnPlayer && player.landmarks.harbor) {context.commit('aiTransferMoney', [context.state.TurnPlayer, player, (3 + shoppingMall)*card.quantity])}
              break
          case 'Pizza Joint ': //Get 1 coin from the player who rolled the dice
              if(player!=context.state.TurnPlayer) {context.commit('aiTransferMoney', [context.state.TurnPlayer, player, (1 + shoppingMall)*card.quantity])}
              break
          case 'Hamburger Stand': //Get 1 coin from the player who rolled the dice
              if(player!=context.state.TurnPlayer) {context.commit('aiTransferMoney', [context.state.TurnPlayer, player, (1 + shoppingMall)*card.quantity])}
              break
          case 'Publisher': //get 1 coin from each player for each [cup] and [bread] establishment they have, on your turn only
              if(player===context.state.TurnPlayer) {
                context.state.Players.forEach(function(p,i) {
                  const getNumIcons = context.state.Players[i].hand.filter(card => card.icon==='cup').length
                  const getNumIcons2 = context.state.Players[i].hand.filter(card => card.icon==='bread').length
                  context.commit('aiTransferMoney', [i, context.state.TurnPlayer, 1*getNumIcons*getNumIcons2*card.quantity])
                }  
              )}  
              break
          case 'Tax Office': //Take half (rounded down) of the coins from each player who has 10 coins or more, on your turn only
              if(player===context.state.TurnPlayer) {
                context.state.Players.forEach(function(p,i) {
                  if(p.money>=10) {
                    context.commit('aiTransferMoney', [i, context.state.TurnPlayer, Math.floor(p.money/2)*card.quantity])
                  }
                }
              )}  
              break
          // case 'City Hall': //Immediately before buying establishments, if you have 0 coins, get 1 from the bank
          //     context.commit('aiModMoney', [getPlayerIndex(player), 1*card.quantity])
          //     break
          // case 'Harbor': //If the dice total is 10 or more, you may add 2 to the total, on your turn only
          //     context.commit('aiModMoney', [getPlayerIndex(player), 1*card.quantity])
          //     break
          // case 'Airport': //If you build nothing on your turn, you get 10 coins from the bank
          //     context.commit('aiModMoney', [getPlayerIndex(player), 1*card.quantity])
          //     break
      }
    }
  
  }
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


export default {
  state,
  getters,
  actions,
  mutations
}