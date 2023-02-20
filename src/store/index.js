import { createStore } from 'vuex'
import cards from './modules/cards.js'
import gameplay from './modules/gameplay/index.js'
import display from './modules/display.js'

export default createStore({
  modules: {
    cards,
    display,
    gameplay,
  }
  
})
