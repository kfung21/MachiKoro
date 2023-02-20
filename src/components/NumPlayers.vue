<template>
  <!-- <div class="NewGame"> -->
    <div class="grid">
      <div class="header">
          <h1 class="header-text">Machi Koro</h1>
      </div>
      <h2>How Many Players? {{numPlayers}}</h2>
      <div class="players p1">
        <button :disabled="!numPlayers" @click="setNumPlayers" class="startButton">Start Game</button>
        <input placeholder="Enter your name" v-model="p1Name" class="names p1name">
      </div>
      <div class="players p2">
        <button @click="numPlayers=2, showAI=true" class="pButton">2</button>
        <input type="text" placeholder="P2" v-model="p2Name" class="names" v-if="showAI"> 
        <div class="ai" v-if="showAI">
          <input type="checkbox" v-model="p2AI">
          <label>AI</label>
        </div>
      </div>
      <div class="players p3">
        <button @click="numPlayers=3, showAI=true" class="pButton">3</button>
        <input type="text" placeholder="P3" v-model="p3Name" class="names" v-if="showAI"> 
        <div class="ai" v-if="showAI">
          <input type="checkbox" v-model="p3AI">
          <label>AI</label>
        </div>
      </div>
      <div class="players p4">
        <button @click="numPlayers=4, showAI=true" class="pButton">4</button>
        <input type="text" placeholder="P4" v-model="p4Name" class="names" v-if="showAI"> 
        <div class="ai" v-if="showAI">
          <input type="checkbox" v-model="p4AI">
          <label>AI</label>
        </div>
      </div>
      <div class="players p5" v-if="setP5Display">
        <button @click="numPlayers=5, showAI=true"  class="pButton">5</button>
        <input type="text" placeholder="P5" v-model="p5Name" class="names" v-if="showAI"> 
        <div class="ai" v-if="showAI">
          <input type="checkbox" v-model="p5AI">
          <label>AI</label>
        </div>
      </div>
    </div>
 
  <!-- </div> -->
</template>

<script>
import {computed} from 'vue'
import {ref} from 'vue'
import { useStore } from 'vuex'

export default {

    setup() {
        const store = useStore()

        const numPlayers = ref()
        const p1Name = ref('')
        const p2Name = ref('')
        const p3Name = ref('')
        const p4Name = ref('')
        const p5Name = ref('')
        const p1AI = ref(false)
        const p2AI = ref(false)
        const p3AI = ref(false)
        const p4AI = ref(false)
        const p5AI = ref(false)
        const setP5Display = computed(() => store.state.gameplay.gameplay.Expansion)
        const aiStrategy = computed(() => store.state.gameplay.gameplay.aiStrategy)
        const showAI = ref(false)
        // const getNumPlayers = () => {

        // }
        const setNumPlayers = () => {
            console.log('set up num players',p1Name.value, p1AI.value);
            store.dispatch('setNumPlayers', numPlayers.value)    
            
            store.dispatch('setAIStrategy') //set AI strategy
            store.dispatch('setNumPlayersNewGame',[0, p1Name.value, p1AI.value, aiStrategy.value])
            store.dispatch('setAIStrategy') //set AI strategy
            store.dispatch('setNumPlayersNewGame',[1, p2Name.value, p2AI.value, aiStrategy.value])
            store.dispatch('setAIStrategy') //set AI strategy
            store.dispatch('setNumPlayersNewGame',[2, p3Name.value, p3AI.value, aiStrategy.value])
            store.dispatch('setAIStrategy') //set AI strategy
            store.dispatch('setNumPlayersNewGame',[3, p4Name.value, p4AI.value, aiStrategy.value])
            store.dispatch('setAIStrategy') //set AI strategy
            store.dispatch('setNumPlayersNewGame',[4, p5Name.value, p5AI.value, aiStrategy.value])
            
                   
            store.dispatch('SetUpNewGame')           
        }

        return {setNumPlayers, numPlayers, setP5Display, showAI,
                p1Name, p2Name, p3Name, p4Name, p5Name,
                p1AI, p2AI, p3AI, p4AI, p5AI}
    }
}
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 4fr 4fr 1fr;
  grid-template-rows:  2fr 1fr 2fr repeat(4, 1fr);
}
@media screen and (min-width: 375px){
  .grid{
      grid-template-columns: 1fr 6fr 6fr 1fr;
      grid-template-rows:  2fr 1fr 3fr repeat(4, 2fr);
  }
}
@media screen and (min-width: 480px){
  .grid{
      grid-template-columns: 1fr 3fr 3fr 1fr;
      grid-template-rows:  2fr 1fr 3fr repeat(4, 2fr);
  }
}
@media screen and (min-width: 540px){
  .grid{
      grid-template-columns: 1fr 3fr 3fr 1fr;
      grid-template-rows:  2fr 1fr 3fr repeat(4, 2fr);
  }
}
@media screen and (min-width: 720px){
  .grid{
      grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}
.header {
  grid-column: 1/5;
  grid-row: 1/2;
  background-color: #89cff0 ;
  align-self: start;
  line-height: 90px;
  height: 100px;
  margin : 0;
  
}
.header-text{
  grid-column: 1/5;
  grid-row: 1/2;
  color: white;
  text-align: center;
  font-size: 3em;
  margin : 0;
}
h2 {
  grid-column: 1/5;
  grid-row: 2/3;
  text-align: center;
  margin: 2px;
}
button {
    border-radius: 50px;
    background-image: linear-gradient(#89D5D2, #89cff0);
    outline: 0;
    border-style: none;
    color: white;
    font-size: 1.2em;
    box-shadow: 10px 10px 5px grey;
}
.startButton {
  grid-row: 1/4;
  color: blue;
}
.p1 {
  grid-column: 2/4;
  grid-row: 3/4;
}
.p2 {
  grid-column: 2/4;
  grid-row: 4/5;
}
.p3 {
  grid-column: 2/4;
  grid-row: 5/6;
}
.p4 {
  grid-column: 2/4;
  grid-row: 6/7;
}
.p5 {
  grid-column: 2/4;
  grid-row: 7/8;
}
.players {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  margin: 10px;
}
.names {
  grid-column: 2/3;
  grid-row: 1/2;
  margin: 10px 10px;
  border-radius: 5px;
  border-width: 1px;
}
.p1name {
  margin-top: 20px;
  margin-bottom: 10px;
}
.ai {
  grid-column: 2/3;
  grid-row: 2/3;
  margin-left: 10px;
}
.pButton {
  grid-column: 1/2;
  grid-row: 1/3;
  border-radius: 50px;
}
</style>