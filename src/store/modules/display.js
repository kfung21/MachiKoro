
const state = {
  
    NewGameDisplay: true,
    TabDisplay: false,
    GameTabDisplay: true,
    MarketPlaceTabDisplay: false,
    NumPlayersDisplay: false,
    MarketPlaceDisplay: false,
    DiceDisplay: false,
    CardDisplay: false,
    PickPlayerModalDisplay: false,
    PickPlayerCardsModalDisplay: false,
    Player1Display: false,
    Player2Display: false,
    Player3Display: false,
    Player4Display: false,
    Player5Display: false,
    AllPlayerDisplay: false
  }
  
  const getters = {
    GetPlayerDisplay: (state, player) => {
      switch (player){
        case 1:
          return state.Player1Display;
        case 2:
          return state.Player2Display;
        case 3:
          return state.Player3Display;
        case 4:
          return state.Player4Display;
        case 5:
          return state.Player5Display;
      }
    },
  }
  
  const mutations = {
    SetNewGameDisplay: (state, value) => {
        state.NewGameDisplay = value
    },
    SetTabDisplay: (state, value) => {
        state.TabDisplay = value
    },
    SetGameTabDisplay: (state, value) => {
        state.GameTabDisplay = value
    },
    SetMarketPlaceTabDisplay: (state, value) => {
        state.MarketPlaceTabDisplay = value
    },
    SetNumPlayersDisplay: (state, value) => {
        state.NumPlayersDisplay = value
    },
    SetMarketPlaceDisplay: (state, value) => {
        state.MarketPlaceDisplay = value
    },
    SetDiceDisplay: (state, value) => {
        state.DiceDisplay = value
    },
    SetCardDisplay: (state, value) => {
        state.CardDisplay = value
    },
    SetPickPlayerModalDisplay: (state, value) => {
        state.PickPlayerModalDisplay = value
    },
    SetPickPlayerCardsModalDisplay: (state, value) => {
        state.PickPlayerCardsModalDisplay = value
    },
    SetAllPlayerDisplay: (state, value) => {
        state.AllPlayerDisplay = value
    },
    SetPlayerDisplay: (state, payload) => {
      // payload = player index, true/false
      switch (payload[0]){
        case 0:
          state.Player1Display = payload[1];
          break;
        case 1:
          state.Player2Display = payload[1]
          break;
        case 2:
          state.Player3Display = payload[1]
          break;
        case 3:
          state.Player4Display = payload[1]
          break;
        case 4:
          state.Player5Display = payload[1]
          break;
      }
    },
  }
  
  const actions = {
    SetNewGameDisplay: (context, value) => {
      context.commit('SetNewGameDisplay', value);
    },
    SetTabDisplay: (context, value) => {
      context.commit('SetTabDisplay', value);
    },
    SetGameTabDisplay: (context, value) => {
      context.commit('SetGameTabDisplay', value);
    },
    SetMarketPlaceTabDisplay: (context, value) => {
      context.commit('SetMarketPlaceTabDisplay', value);
    },
    SetNumPlayersDisplay: (context, value) => {
      context.commit('SetNumPlayersDisplay', value);
    },
    SetMarketPlaceDisplay: (context, value) => {
      context.commit('SetMarketPlaceDisplay', value);
    },
    SetDiceDisplay: (context, value) => {
      context.commit('SetDiceDisplay', value);
    },
    SetCardDisplay: (context, value) => {
      context.commit('SetCardDisplay', value);
    },
    SetPickPlayerModalDisplay: (context, value) => {
      context.commit('SetPickPlayerModalDisplay', value);
    },
    SetPickPlayerCardsModalDisplay: (context, value) => {
      context.commit('SetPickPlayerCardsModalDisplay', value);
    },
    SetAllPlayerDisplay: (context, payload) => {
      context.commit('SetAllPlayerDisplay', payload);
    },
    SetPlayerDisplay: (context, payload) => {
      context.commit('SetPlayerDisplay', payload);
    },
    ShowGame: (context) => {
      context.dispatch('SetMarketPlaceTabDisplay', false)
      context.dispatch('SetGameTabDisplay', true)

      context.dispatch('SetMarketPlaceDisplay', false) 
      context.dispatch('SetDiceDisplay', true) 
      context.dispatch('SetAllPlayerDisplay',true) 
    },
    ShowMarketplace: (context) => {
      context.dispatch('SetMarketPlaceTabDisplay', true)
      context.dispatch('SetGameTabDisplay', false)

      context.dispatch('SetMarketPlaceDisplay', true)
      context.dispatch('SetDiceDisplay', false) 
      context.dispatch('SetAllPlayerDisplay',false)       
    },
  }
  
  export default {
    state,
    getters,
    actions,
    mutations
  }