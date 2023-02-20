  export default {
    //   state
    NewGame: true,
    EndGame: false,
    DiceRange: [],
    Dice: null,
    HasDice2: false,
    Doubles: false,
    Reroll: false,
    FinishedRoll: false,
    SpecialDice: null,
    Expansion: false,
    NumPlayers: 2,
    Deck: [],
    MarketPlace: [],
    PopUpCard: null, // select card from marketplace to enlarge
    CallCard: null, // [player, card] For Player select modal 
    CardGive: null, // Business Center swap cards
    CardTake: null, // Business Center swap cards
    StarterHand: [],
    TurnPlayer: null,
    IterPlayer: null,
    TurnPlayerOwe: null,
    IterPlayerOwe: null,
    SelectPlayer: null,
    SecondTurn: false,
    IterOrder: [],
    AirportCheckIn: null,
    GlobalSwipe: 0,

    // AI Variables
    aiProjectedMoney: null,
    aiDice: null,
    aiStrategy: null, //strategy index
    aiStrategies: [
        {dice:2, cards:[{name:'Ranch',quantity:6}, {name:'Cheese Factory',quantity:2}]}, // cheeseFactory (best strategy)
        {dice:1, cards:[{name:'Convenience Store',quantity:6}, {name:'Bakery',quantity:3}]}, // convenienceStore 2nd best
        {dice:1, cards:[{name:'Wheat Field',quantity:2}, {name:'Ranch',quantity:2}, {name:'Bakery',quantity:2}, {name:'Forest',quantity:1}, {name:'Convenience Store',quantity:2},
                              {name:'Cafe',quantity:2}, {name:'Family Restaurant',quantity:1}, {name:'Stadium',quantity:1}]}, //oneDieSpread
        // bad strategies
        {dice:1, cards:[{name:'Bakery',quantity:6}]}, //bakery
        {dice:2, cards:[{name:'Forest',quantity:3}, {name:'Mine',quantity:3}, {name:'Furniture Factory',quantity:2}]}, //furnitureFactory
        {dice:2, cards:[{name:'Wheat',quantity:6}, {name:'Fruit and Vegetable Market',quantity:3}, {name:'Furniture Factory',quantity:2}]}, //fruitVegetableMarket
        {dice:2, cards:[{name:'Wheat',quantity:1}, {name:'Ranch',quantity:1}, {name:'Forest',quantity:1}, {name:'Mine',quantity:4}, {name:'Apple Orchard',quantity:1}]}, //mineBlueSpread
        {dice:1, cards:[{name:'Wheat',quantity:1}, {name:'Ranch',quantity:1}, {name:'Forest',quantity:1}]} //blue1Die
      ],
    aiLandmarks: [],

    TestCard: [
        {name: 'Wheat Field', type: 'primary', icon: 'wheat', cost: 1, activation: [1], quantity: 6, set: 'base', description: "Get 1 coin from the bank, on anyone's turn"},
        {name: 'Bakery', type: 'secondary', icon: 'bread', cost: 1, activation: [2,3], quantity: 6, set: 'base', description:"Get 1 coin from the bank, on your turn only"},
        {name: 'Cafe', type: 'restaurants', icon: 'cup', cost: 2, activation: [3], quantity: 6, set: 'base', description:"Get 1 coin from the player who rolled the dice"},
        {name: 'Stadium', type: 'major', icon: 'tower', cost: 6, activation: [6], quantity: 4, set: 'base', description:"Get 2 coins from all players, on your turn only"},
        {name: 'Train Station', type: 'landmark', icon: 'tower', cost: 4, activation: [0], quantity: 4, set: 'base', description:"You may roll 1 or 2 dice"}
    ],

    Players: [ // 1-4 player objects
        {
            id: 'P1',
            name: '',
            money: 0,
            hand: [], // all cards
            landmarks: {'Train Station':false, 'Shopping Mall':false, 'Amusement Park':false, 'Radio Tower':false, 'Harbor':false, 'Airport':false}, 
            ai: {is: null, strategy: null} // false = human
        },
        {
            id: 'P2',
            name: '',
            money: 0,
            hand: [], // all cards
            landmarks: {'Train Station':false, 'Shopping Mall':false, 'Amusement Park':false, 'Radio Tower':false, 'Harbor':false, 'Airport':false}, 
            ai: {is: null, strategy: null} // false = human
        },
        {
            id: 'P3',
            name: '',
            money: 0,
            hand: [], // all cards
            landmarks: {'Train Station':false, 'Shopping Mall':false, 'Amusement Park':false, 'Radio Tower':false, 'Harbor':false, 'Airport':false},            
            ai: {is: null, strategy: null} // false = human
        },
        {
            id: 'P4',
            name: '',
            money: 0,
            hand: [], // all cards
            landmarks: {'Train Station':false, 'Shopping Mall':false, 'Amusement Park':false, 'Radio Tower':false, 'Harbor':false, 'Airport':false}, 
            ai: {is: null, strategy: null} // false = human
        },
        {
            id: 'P5',
            name: '',
            money: 0,
            hand: [], // all cards
            landmarks: {'Train Station':false, 'Shopping Mall':false, 'Amusement Park':false, 'Radio Tower':false, 'Harbor':false, 'Airport':false}, 
            ai: {is: null, strategy: null} // false = human
        },
    ],

  }
