
const state = {
  // type: primary, secondary, major, landmark, restaurants
  // icons: wheat, cow, gear, bread, factory, fruit, cup, tower, boat

  cards: [
    {name: 'Wheat Field', type: 'primary', icon: 'wheat', cost: 1, activation: [1], quantity: 6, set: 'base', description: "Get 1 coin from the bank, on anyone's turn"}, 
    {name: 'Wheat Field', type: 'primary', icon: 'wheat', cost: 1, activation: [1], quantity: 4, set: 'starter', description:"Get 1 coin from the bank, on anyone's turn"},
    {name: 'Wheat Field', type: 'primary', icon: 'wheat', cost: 1, activation: [1], quantity: 1, set: 'harbor', description:"Get 1 coin from the bank, on anyone's turn"},
    {name: 'Ranch', type: 'primary', icon: 'cow', cost: 1, activation: [2], quantity: 6, set: 'base', description:"Get 1 coin from the bank, on anyone's turn"},
    {name: 'Bakery', type: 'secondary', icon: 'bread', cost: 1, activation: [2,3], quantity: 6, set: 'base', description:"Get 1 coin from the bank, on your turn only"},
    {name: 'Bakery', type: 'secondary', icon: 'bread', cost: 1, activation: [2,3], quantity: 4, set: 'starter', description:"Get 1 coin from the bank, on your turn only"},
    {name: 'Bakery', type: 'secondary', icon: 'bread', cost: 1, activation: [2,3], quantity: 1, set: 'harbor', description:"Get 1 coin from the bank, on your turn only"},
    {name: 'Cafe', type: 'restaurants', icon: 'cup', cost: 2, activation: [3], quantity: 6, set: 'base', description:"Get 1 coin from the player who rolled the dice"},
    {name: 'Convenience Store', type: 'secondary', icon: 'bread', cost: 2, activation: [4], quantity: 6, set: 'base', description:"Get 3 coin from the bank, on your turn only"},
    {name: 'Forest', type: 'primary', icon: 'gear', cost: 3, activation: [5], quantity: 6, set: 'base', description:"Get 1 coin from the bank, on anyone's turn"},
    {name: 'Cheese Factory', type: 'secondary', icon: 'factory', cost: 5, activation: [7], quantity: 6, set: 'base', description:"Get 3 coins from the bank for each [cow] establishment that you own, on your turn only"},
    {name: 'Furniture Factory', type: 'secondary', icon: 'factory', cost: 3, activation: [8], quantity: 6, set: 'base', description:"Get 3 coins from the bank for each [gear] establishment that you own, on your turn only"},
    {name: 'Mine', type: 'primary', icon: 'gear', cost: 6, activation: [9], quantity: 6, set: 'base', description:"Get 5 coins from the bank, on anyone's turn"},
    {name: 'Family Restaurant', type: 'restaurants', icon: 'cup', cost: 3, activation: [9,10], quantity: 6, set: 'base', description:"Get 2 coins from the player who rolled the dice"},
    {name: 'Apple Orchard', type: 'primary', icon: 'wheat', cost: 3, activation: [10], quantity: 6, set: 'base', description:"Get 3 coins from the bank, on anyone's turn"},
    {name: 'Fruit and Vegetable Market', type: 'secondary', icon: 'fruit', cost: 2, activation: [11,12], quantity: 6, set: 'base', description:"Get 2 coins from the bank for each [wheat] establishment that you own, on your turn only"},
    {name: 'Stadium', type: 'major', icon: 'tower', cost: 6, activation: [6], quantity: 4, set: 'base', description:"Get 2 coins from all players, on your turn only"},
    {name: 'Stadium', type: 'major', icon: 'tower', cost: 6, activation: [6], quantity: 1, set: 'harbor', description:"Get 2 coins from all players, on your turn only"},
    {name: 'TV Station', type: 'major', icon: 'tower', cost: 7, activation: [6], quantity: 4, set: 'base', description:"Take 5 coins from any one player, on your turn only"},
    {name: 'TV Station', type: 'major', icon: 'tower', cost: 7, activation: [6], quantity: 1, set: 'harbor', description:"Take 5 coins from any one player, on your turn only"},
    {name: 'Business Center', type: 'major', icon: 'tower', cost: 8, activation: [6], quantity: 4, set: 'base', description:"Trade one Non [tower] establishment with another player, on your turn only"},
    {name: 'Business Center', type: 'major', icon: 'tower', cost: 8, activation: [6], quantity: 1, set: 'harbor', description:"Trade one Non [tower] establishment with another player, on your turn only"},
    {name: 'Train Station', type: 'landmark', icon: 'tower', cost: 4, activation: [0], quantity: 4, set: 'base', description:"You may roll 1 or 2 dice"},
    {name: 'Train Station', type: 'landmark', icon: 'tower', cost: 4, activation: [0], quantity: 1, set: 'harbor', description:"You may roll 1 or 2 dice"},
    {name: 'Shopping Mall', type: 'landmark', icon: 'tower', cost: 10, activation: [0], quantity: 4, set: 'base', description:"Each of your [cup] and [bread] establishments earn +1 coin"},
    {name: 'Shopping Mall', type: 'landmark', icon: 'tower', cost: 10, activation: [0], quantity: 1, set: 'harbor', description:"Each of your [cup] and [bread] establishments earn +1 coin"},
    {name: 'Amusement Park', type: 'landmark', icon: 'tower', cost: 16, activation: [0], quantity: 4, set: 'base', description:"If you roll doubles, take another turn after this one"},
    {name: 'Amusement Park', type: 'landmark', icon: 'tower', cost: 16, activation: [0], quantity: 1, set: 'harbor', description:"If you roll doubles, take another turn after this one"},
    {name: 'Radio Tower', type: 'landmark', icon: 'tower', cost: 22, activation: [0], quantity: 4, set: 'base', description:"Once every turn, you can choose to re-roll your dice"},
    {name: 'Radio Tower', type: 'landmark', icon: 'tower', cost: 22, activation: [0], quantity: 1, set: 'harbor', description:"Once every turn, you can choose to re-roll your dice"},
    {name: 'Flower Orchard', type: 'primary', icon: 'wheat', cost: 2, activation: [4], quantity: 6, set: 'harbor', description:"Get 1 coin from the bank, on anyone's turn"},
    {name: 'Mackerel Boat', type: 'primary', icon: 'boat', cost: 2, activation: [8], quantity: 6, set: 'harbor', description:"If you have a harbor, get 3 coins from the bank on anyone's turn"},
    {name: 'Tuna Boat', type: 'primary', icon: 'boat', cost: 5, activation: [12,13,14], quantity: 6, set: 'harbor', description:"On anyone's turn: the current player rolls 2 dice, if you have a harbor you get as many coins as the dice total"},
    {name: 'Flower Shop', type: 'secondary', icon: 'bread', cost: 1, activation: [6], quantity: 6, set: 'harbor', description:"Get 1 coin from the bank for each flower orchard you own, on your turn only"},
    {name: 'Food Warehouse', type: 'secondary', icon: 'factory', cost: 2, activation: [12,13], quantity: 6, set: 'harbor', description:"Get 2 coins from the bank for each [cup] establishment that you own, on your turn only"},
    {name: 'Sushi Bar', type: 'restaurants', icon: 'cup', cost: 4, activation: [1], quantity: 6, set: 'harbor', description:"If you have a harbor, you get 3 coins from the player who rolled the dice"},
    {name: 'Pizza Joint', type: 'restaurants', icon: 'cup', cost: 1, activation: [7], quantity: 6, set: 'harbor', description:"Get 1 coin from the player who rolled the dice"},
    {name: 'Hamburger Stand', type: 'restaurants', icon: 'cup', cost: 1, activation: [8], quantity: 6, set: 'harbor', description:"Get 1 coin from the player who rolled the dice"},
    {name: 'Publisher', type: 'major', icon: 'tower', cost: 5, activation: [7], quantity: 5, set: 'harbor', description:"get 1 coin from each player for each [cup] and [bread] establishment they have, on your turn only"},
    {name: 'Tax Office', type: 'major', icon: 'tower', cost: 5, activation: [7], quantity: 5, set: 'harbor', description:"Take half (rounded down) of the coins from each player who has 10 coins or more, on your turn only"},
    {name: 'City Hall', type: 'landmark', icon: 'tower', cost: 0, activation: [0], quantity: 5, set: 'harbor', description:"Immediately before buying establishments, if you have 0 coins, get 1 from the bank"},
    {name: 'Harbor', type: 'landmark', icon: 'tower', cost: 2, activation: [0], quantity: 5, set: 'harbor', description:"If the dice total is 10 or more, you may add 2 to the total, on your turn only"},
    {name: 'Airport', type: 'landmark', icon: 'tower', cost: 30, activation: [0], quantity: 5, set: 'harbor', description:"If you build nothing on your turn, you get 10 coins from the bank"},
  ]

}

const getters = {
  getStarterBase: (state) => {
    return state.cards.filter(card => card.base == 'starter')
  }
}

const mutations = {
  close_card: (state) => { 
    state.display = !state.display
    console.log(state.cards);
  }
}

const actions = {
  close_card: (context) => {
      context.commit('close_card');
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}