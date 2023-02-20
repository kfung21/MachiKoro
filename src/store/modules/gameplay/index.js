import gamesetup from './gamesetup.js'
import gameplay from './gameplay.js'
import ai from './ai.js'
import state from './state.js'

export default {
  modules: {
    namespaced: true,
    state,
    gamesetup,
    gameplay,
    ai
  }
  
}
