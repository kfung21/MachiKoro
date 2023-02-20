import state from './state.js'

const getters = {
}

const mutations = {
  setNewGame: (state, payload) => {
    state.NewGame = payload
  },
  setEndGame: (state, payload) => {
    state.EndGame = payload
  },
  setExpansion: (state, payload) => {
    state.Expansion = payload
  },
  setAI: (state, payload) => {
    // payload = player index, true/false, strategy
    // console.log('set AI', payload);
    console.log('setting ai', payload, state.Players[payload[0]]);
    state.Players[payload[0]].ai.is = payload[1]
    state.Players[payload[0]].ai.strategy = payload[2]
  },
  setPlayerName: (state, payload) => {
    // payload = player index, true/false
    // console.log('set AI', payload);
    state.Players[payload[0]].name = payload[1]
    console.log('set Player Name', state.Players[payload[0]].name);
  },
  loadDeck: (state, payload) => {
    // payload = player index, true/false
    state.Deck = payload
    console.log('load Deck mutation', payload);
  },
  setStarterHand: (state, payload) => {
    // pass player hand and the starter hand to be mutated/assigned
    state.StarterHand = payload
  },
  setMarketPlace: (state, payload) => {
    state.MarketPlace = payload
    console.log('set MarketPlace mutation', state.MarketPlace);
  },
  setNumPlayers: (state, payload) => {
    // console.log('mutations setnumplayers', state, payload);
    state.NumPlayers = payload

    for(let i=0; i<5; i++){
      state.Players[i].hand =[]
      state.Players[i].money = null
      state.Players[i].landmarks = {'Train Station':false, 'Shopping Mall':false, 'Amusement Park':false, 'Radio Tower':false, 'Harbor':false, 'Airport':false}      
    }
    
    console.log('All players', state.Players);
  },
  DealGame: () => {
    
    for (let i = 0; i < state.NumPlayers; i++) {
      for(let j=0; j<state.StarterHand.length; j++){
        const shCard = state.StarterHand[j]
        const card = {
          name: shCard.name, 
          type: shCard.type, 
          icon: shCard.icon, 
          cost: shCard.cost, 
          activation: shCard.activation, 
          quantity: 1, 
          set: shCard.set, 
          description: shCard.description
        }
        switch (i) {
          case 0:
            state.Players[0].hand.push(card)
            break;
          case 1:
            state.Players[1].hand.push(card)
            break;
          case 2:
            state.Players[2].hand.push(card)
            break;
          case 3:
            state.Players[3].hand.push(card)
            break;
          case 4:
            state.Players[4].hand.push(card)
            break;
        }
        console.log('dealgame loop', i, j);
      // console.log('DealGame Mutate', state);
      }
    }
     
    
  }

}

const actions = {
  // commit mutations
  setNewGame: (context, payload) => {
    context.commit('setNewGame',payload)
  },
  setEndGame: (context, payload) => {
    context.commit('setEndGame',payload)
  },
  setExpansion: (context, payload) => {
    context.commit('setExpansion',payload)
  },
  setAI: (context, payload) => {
    context.commit('setAI',payload)
  },
  DealGame: (context) => {
    context.commit('DealGame');
  },
  setNumPlayers: (context, payload) => {
    context.commit('setNumPlayers', payload);
  },
  getNumPlayersNewGame: (context) => {
    context.dispatch('SetNewGameDisplay', false) //action
    context.dispatch('SetNumPlayersDisplay', true) //action
    if(confirm('Would you like to play the Harbor Expansion?')){
      context.dispatch('setExpansion', true)
    } else {
      context.dispatch('setExpansion', false)
    }
  },
  setNumPlayersNewGame: (context, payload) => {
    // payload = player index, name, ai
    context.dispatch('setPlayerName', [payload[0], payload[1]])
    context.dispatch('setAIStrategy')
    context.dispatch('setAI', [payload[0], payload[2], payload[3]])
  },
  setPlayerName: (context, payload) => {
    context.commit('setPlayerName', payload)
  },
  setStarterHand: (context) => {
    // console.log('action SetStarterHand', context);
    console.log('set Starter Hand  action', context.rootState);
    const baseHand = context.rootState.cards.cards.filter(card => card.set=='starter')
    baseHand.forEach(card => {
      card.quantity = 1
    })
    if(context.state.Expansion == true){
      baseHand.push({name: 'City Hall', type: 'landmark', icon: 'tower', cost: 0, activation: [0], quantity: 5, set: 'harbor', description:"Immediately before buying establishments, if you have 0 coins, get 1 from the bank"})
    } 
    context.commit('setStarterHand', baseHand)
  },
  setMarketPlace: (context) => {
    if(context.state.MarketPlace.length){context.commit('setMarketPlace',[])}

    // console.log('set MarketPlace',context.rootState.cards.cards);
    if(state.Expansion == false){
      context.commit('setMarketPlace', copyCards(context.rootState.cards.cards.filter(card => card.set=='base')))
    } else{
      context.dispatch('loadDeck')
      context.dispatch('reloadMarketPlace')
    }
  },
  loadDeck: (context) => {
    let expDeck = []
    let expCard = {}

    const tempDeck = copyCards(context.rootState.cards.cards.filter(card => (card.set=='base' || card.set=='harbor') && card.type!='landmark'))

    for(let i=0; i<tempDeck.length; i++){
      for(let j=1; j<=tempDeck[i].quantity; j++){
        expCard = {}
        Object.assign(expCard, tempDeck[i])
        expCard.quantity = 1
        expDeck.push(expCard)
      }
    }
    expDeck = shuffle(expDeck)
    context.commit('loadDeck', expDeck)
  },

  reloadMarketPlace: (context) => {
    if(context.state.Expansion == false) {return} //make sure it's harbor expansion game

    let tempMarketPlace = []
    const getMP = context.rootState.gameplay.gameplay.MarketPlace //pointer
    let TS = {}
    let SM = {}
    let AP = {}
    let RT = {}
    let H = {}
    let A = {}

    // get the landmarks quantities
    if(getMP.length){
      TS = getMP.filter(c => c.name=='Train Station')[0]
      SM = getMP.filter(c => c.name=='Shopping Mall')[0]
      AP = getMP.filter(c => c.name=='Amusement Park')[0]
      RT = getMP.filter(c => c.name=='Radio Tower')[0]
      H = getMP.filter(c => c.name=='Harbor')[0]
      A = getMP.filter(c => c.name=='Airport')[0]

      tempMarketPlace = getMP.filter(c=>c.type!='landmark')
    } else {
      TS = {name: 'Train Station', type: 'landmark', icon: 'tower', cost: 4, activation: [0], quantity: 5, set: 'base', description:"You may roll 1 or 2 dice"}
      SM = {name: 'Shopping Mall', type: 'landmark', icon: 'tower', cost: 10, activation: [0], quantity: 5, set: 'base', description:"Each of your [cup] and [bread] establishments earn +1 coin"}
      AP = {name: 'Amusement Park', type: 'landmark', icon: 'tower', cost: 16, activation: [0], quantity: 4, set: 'base', description:"If you roll doubles, take another turn after this one"}
      RT = {name: 'Radio Tower', type: 'landmark', icon: 'tower', cost: 22, activation: [0], quantity: 4, set: 'base', description:"Once every turn, you can choose to re-roll your dice"}
      H = {name: 'Harbor', type: 'landmark', icon: 'tower', cost: 2, activation: [0], quantity: 5, set: 'harbor', description:"If the dice total is 10 or more, you may add 2 to the total, on your turn only"}
      A = {name: 'Airport', type: 'landmark', icon: 'tower', cost: 30, activation: [0], quantity: 5, set: 'harbor', description:"If you build nothing on your turn, you get 10 coins from the bank"}
      
      Object.assign(tempMarketPlace, context.rootState.gameplay.gameplay.MarketPlace) // create a temp Marketplace and reload it
    }

    console.log('reload marketplace temp market', tempMarketPlace);
    while(tempMarketPlace.length<10){
      if(context.state.Deck.length > 0){
        const tempCard = context.state.Deck.pop()
        const hasCard = tempMarketPlace.filter(temp => temp.name == tempCard.name) 
        
        if(hasCard.length){
            hasCard[0].quantity++
        } else {
          tempMarketPlace.push(tempCard)
        }
      }
    }

    // reassign landmarks
    tempMarketPlace.push(TS)
    tempMarketPlace.push(SM)
    tempMarketPlace.push(AP)
    tempMarketPlace.push(RT)
    tempMarketPlace.push(H)
    tempMarketPlace.push(A)

    context.commit('setMarketPlace', tempMarketPlace)

    console.log('reload MarketPlace', tempMarketPlace);

    
  },
  
  

  // New & Reset Game Setups
  ResetGame: (context) => {
    context.dispatch('setNewGame', true) 
    context.dispatch('setEndGame', false)
    context.dispatch('SetNewGameDisplay', true) 
    context.dispatch('SetMarketPlaceDisplay', false) 
    context.dispatch('SetDiceDisplay', false) 
    context.dispatch('SetTabDisplay', false) 
    context.dispatch('SetPlayerDisplay', [0, false]) 
    context.dispatch('SetPlayerDisplay', [1, false]) 
    context.dispatch('SetPlayerDisplay', [2, false]) 
    context.dispatch('SetPlayerDisplay', [3, false]) 
    context.dispatch('SetPlayerDisplay', [4, false])
    context.dispatch('SetAllPlayerDisplay',false)
    context.dispatch('setHasDice2', false)
    
     
  },
  SetUpNewGame: (context) => {
    // Toggle component displays
    context.dispatch('nextPlayerTurn')
    context.dispatch('SetNewGameDisplay', false) //action
    context.dispatch('SetNumPlayersDisplay', false) //action
    // context.dispatch('SetMarketPlaceDisplay', true) //action
    context.dispatch('SetDiceDisplay', true) //action
    context.dispatch('SetTabDisplay', true) //action
    context.dispatch('SetAllPlayerDisplay', true) //action
    context.dispatch('SetPlayerDisplay', [0, true])
    context.dispatch('SetPlayerDisplay', [1, true])
    if (context.state.NumPlayers >2) {context.dispatch('SetPlayerDisplay', [2, true])}
    if (context.state.NumPlayers >3) {context.dispatch('SetPlayerDisplay', [3, true])}
    if (context.state.NumPlayers >4) {context.dispatch('SetPlayerDisplay', [4, true])}

    
    context.dispatch('setMarketPlace') //create marketplace
    context.dispatch('setStarterHand') //create starter hands  
    context.dispatch('DealGame'); //deal hands
        
    // //set player properties
    context.dispatch('modMoney',[0, 3]);
    context.dispatch('modMoney',[1, 3]);
    context.dispatch('modMoney',[2, 3]);
    context.dispatch('modMoney',[3, 3]);
    context.dispatch('modMoney',[4, 3]);
  },

  SetUpQuickGameBase: (context) => {
    // Toggle component displays
    context.dispatch('nextPlayerTurn')
    context.dispatch('SetNewGameDisplay', false) //action
    // context.dispatch('SetMarketPlaceDisplay', true) //action
    context.dispatch('SetDiceDisplay', true) //action
    context.dispatch('SetTabDisplay', true) //action
    context.dispatch('SetAllPlayerDisplay', true) //action
    context.dispatch('SetPlayerDisplay', [0, true]) //action
    context.dispatch('SetPlayerDisplay', [1, true]) //action
    
    context.dispatch('setExpansion', false) //base or expansion
    context.dispatch('setMarketPlace') //create marketplace
    context.dispatch('setNumPlayers', 2) //set number of players
    context.dispatch('setStarterHand') //create starter hands  
    context.dispatch('DealGame'); //deal hands
    context.dispatch('setAIStrategy') //set AI strategy
    
    // //set player properties
    context.dispatch('modMoney',[0, 3]);
    context.dispatch('modMoney',[1, 3]);
    context.dispatch('setPlayerName',[0, '']);
    context.dispatch('setPlayerName',[1, '']);
    context.dispatch('setAIStrategy')
    context.dispatch('setAI',[0, false, context.state.aiStrategy]);
    context.dispatch('setAIStrategy') //set AI strategy
    context.dispatch('setAI',[1, true, context.state.aiStrategy]);
    
    console.log('setup quick game display', context.rootState.display);
  },
  SetUpQuickGameExpansion: (context) => {
    // Toggle component displays
    context.dispatch('nextPlayerTurn')
    context.dispatch('SetNewGameDisplay', false) //action
    // context.dispatch('SetMarketPlaceDisplay', true) //action
    context.dispatch('SetDiceDisplay', true) //action
    context.dispatch('SetTabDisplay', true) //action
    context.dispatch('SetAllPlayerDisplay', true) //action
    context.dispatch('SetPlayerDisplay', [0, true]) //action
    context.dispatch('SetPlayerDisplay', [1, true]) //action
    
    context.dispatch('setExpansion', true) //base or expansion
    context.dispatch('setMarketPlace') //create marketplace
    context.dispatch('setNumPlayers', 2) //set number of players
    context.dispatch('setStarterHand') //create starter hands  
    context.dispatch('DealGame'); //deal hands
    context.dispatch('setAIStrategy') //set AI strategy
    
    // //set player properties
    context.dispatch('setPlayerName',[0, '']);
    context.dispatch('setPlayerName',[1, '']);
    context.dispatch('modMoney',[0, 3]);
    context.dispatch('modMoney',[1, 3]);
    context.dispatch('setAIStrategy')
    context.dispatch('setAI',[0, false, context.state.aiStrategy]);
    context.dispatch('setAIStrategy') //set AI strategy
    context.dispatch('setAI',[1, true, context.state.aiStrategy]);
    
    console.log('setup quick game display', context.rootState.display);
  },
  
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function copyCards(array) {
  let newArray = []

  for(let j=0; j<array.length; j++){
    const shCard = array[j]
    const card = {
      name: shCard.name, 
      type: shCard.type, 
      icon: shCard.icon, 
      cost: shCard.cost, 
      activation: shCard.activation, 
      quantity: shCard.quantity, 
      set: shCard.set, 
      description: shCard.description
    }
    newArray.push(card)
  }
  return newArray
}

export default {
  state,
  getters,
  actions,
  mutations
}