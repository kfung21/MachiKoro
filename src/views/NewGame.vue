<template>
  <!-- <div class="NewGame"> -->

      <div class="grid">
          <div class="header">
            <h1 class="header-text">Machi Koro</h1>
          </div>
          <button @click="new_game" class="NewGame">New Game</button> 
          <button :disabled="true" class="Multiplayer">Multiplayer</button> 
          <button @click="quick_game_base" class="QuickGameBase">Quick Game (Base)</button>
          <button @click="quick_game_expansion" class="QuickGameHarbor">Quick Game (Harbor)</button>
      </div>
      
  <!-- </div> -->
</template>

<script>
// import {computed} from 'vue'
import { useStore } from 'vuex'

export default {

    setup() {
        const store = useStore()

        const quick_game_base = () => {
            store.dispatch('SetUpQuickGameBase') //action
        }
        const quick_game_expansion = () => {
            store.dispatch('SetUpQuickGameExpansion') //action
        }
        const new_game = () => {
            store.dispatch('getNumPlayersNewGame') //action
        }

        return {new_game, quick_game_base, quick_game_expansion}
    }
}
</script>

<style scoped> 
.grid {
    display: grid;
    grid-template-columns: 1fr 8fr 1fr;
    grid-template-rows: repeat(5, 1fr);
    grid-gap: 10px;
    align-items: center;
    justify-content: center;
}
@media screen and (min-width: 375px){
    .grid{
        grid-template-columns: 1fr 6fr 1fr;
    }
}
@media screen and (min-width: 480px){
    .grid{
        grid-template-columns: 1fr 3fr 1fr;
    }
}
@media screen and (min-width: 540px){
    .grid{
        grid-template-columns: 1fr 2fr 1fr;
    }
}
@media screen and (min-width: 720px){
    .grid{
        grid-template-columns: 1fr 1fr 1fr;
    }
}
.header {
    grid-column:1/4;
    grid-row: 1;
    background-color: #89cff0 ;
    align-self: start;
    line-height: 90px;
    height: 100px;
    margin : 0;
}
.header-text{
    grid-column: 1/4;
    color: white;
    text-align: center;
    font-size: 3em;
    margin : 0;
}
button {
    /* background-color: grey; */
    min-height: 75px;
    border-radius: 30px;
    background-image: linear-gradient(#89D5D2, #89cff0);
    outline: 0;
    border-style: none;
    color: white;
    font-size: 1.2em;
    box-shadow: 10px 10px 5px grey;
}
.NewGame{
    grid-column: 2/3;
    grid-row: 2;
}
.Multiplayer{
    grid-column: 2/3;
    grid-row: 3;
    color: grey;
    background-image: none;
}
.QuickGameBase{
    grid-column: 2/3;
    grid-row: 4;
}
.QuickGameHarbor{
    grid-column: 2/3;
    grid-row: 5;
}
.break {
  flex-basis: 100%;
  height: 0;
}
</style>