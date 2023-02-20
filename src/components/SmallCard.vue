<template>
  <div :class="card.type" class="item unselectable"  @mousedown="MarketPlaceCardClick" @touchstart="MarketPlaceCardClick" @mouseup="MarketPlaceLongHold"  @touchend="MarketPlaceLongHold">   
    <div class="top color unselectable" :class="card.type"></div>
    <div class="unselectable cardActivation" :class="card.type">
      {{card.activation}} 
    </div>
    <div :class="card.type" class="cardName unselectable" >{{card.name}}</div> 
    <div class="bottom color unselectable" :class="card.type"></div>
    <div :class="card.type" class="lastRow unselectable">
      <div class="cardCost unselectable">{{card.cost}}</div>
      <div class="icon unselectable" :class="card.icon"></div>
      <div class="cardQuant unselectable">x{{card.quantity}}</div>
    </div>
    
  </div>
</template>

<script>
import { useStore } from 'vuex'
import {computed} from 'vue'

export default {
  props: ['card'],
  setup (props) {
    const store = useStore()
    let interval = false
    let count = 0
    let tempcount = 0
    const allPlayers = computed(() => store.state.gameplay.gameplay.Players) //state
    const turnPlayer = computed(() => store.state.gameplay.gameplay.TurnPlayer) //state

    const MarketPlaceCardClick = () => {
      if (!interval){
        interval = setInterval(() => count++, 1)
        console.log(count);
        tempcount=count
      }
    }

    
    const MarketPlaceLongHold = () => {
      console.log(count)
      if (count > 150){
          store.dispatch('setPopUpCard', props.card) //action
          store.dispatch('SetCardDisplay', true) //action
          console.log('you clicked to view');
      } else {
          if(allPlayers.value[turnPlayer.value].ai===true) {return}
          if(count != tempcount){
            store.dispatch('buyCard', props.card) //action
            console.log('you clicked to buy');
          }
      }
      clearInterval(interval)
      interval=false
      count = 0
    }

    return {MarketPlaceCardClick, MarketPlaceLongHold}
  }

}
</script>

<style>
.primary { 
    background-color: blue;
} 
.primary.item {
  border-color: blue;
}
.primary.cardName {
  color: blue;
}
.secondary { 
    background-color: green;
} 
.secondary.item {
  border-color: green;
}
.secondary.cardName {
  color: green;
}
.restaurants { 
    background-color: red;
} 
.restaurants.item {
  border-color: red;
}
.restaurants.cardName {
  color: red;
}
.major { 
    background-color: purple;
} 
.major.item {
  border-color: purple;
}
.major.cardName {
  color: purple;
}
.landmark { 
    background-color: gold;
} 
.landmark.item {
  border-color: gold;
}
.landmark.cardName {
  color: gold;
}
.item {
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-template-rows: repeat(9, 1fr);
  box-sizing: border-box;
  width: 100px;
  height: 100px;
  background-color: white;
  font-weight: bold;
  text-align: center;
  word-wrap: break-word;
  border-radius: 10px;
  border-style: none;
  border-width: 2px;
}
.top.color {
  grid-column: 1/10;
  grid-row: 8/10;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.cardActivation {
  grid-column: 1/10;
  grid-row: 1/2;  
  text-align: center;
  color: white;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
.cardName {
  grid-column: 1/10;
  grid-row: 2/9;    
  font-size: 15px;
  background-color: white;
  border-left-style: solid;
  border-right-style: solid;
}
.cardCost {
  grid-column: 1/3;
  /* grid-row: 9/10;   */
  max-width: 30px;
  background-color: yellow;
  color: black;
  border-radius: 15px;
  font-size: 0.85em;
}
.cardQuant {
  grid-column: 8/10;
  /* grid-row: 9/10; */
  background-color: grey;
  color: white;
  max-width: 30px;
  border-radius: 15px;
  font-size: 0.85em;
}
.bottom.color {
  grid-column: 1/10;
  grid-row: 8/10;
}
.icon{
  grid-column: 4/7;
  background-color: #14153D;
  background-size: 75%;
  background-repeat: no-repeat;
  background-position: center;
  max-width: 50px;
  border-radius: 15px;
}
.icon.wheat {
  background-image: url(../assets/icons/Wheat.png);
}
.icon.bread {
  background-image: url(../assets/icons/Bread.png);
}
.icon.cow {
  background-image: url(../assets/icons/Cow.png);
}
.icon.cup {
  background-image: url(../assets/icons/Cup.png);
}
.icon.factory {
  background-image: url(../assets/icons/Factory.png);
}
.icon.fruit {
  background-image: url(../assets/icons/Fruit.png);
}
.icon.gear {
  background-image: url(../assets/icons/Gear.png);
}
.icon.tower {
  background-image: url(../assets/icons/Tower.png);
}
.icon.boat {
  background-image: url(../assets/icons/Boat.png);
}
.lastRow{
  display: grid;
  grid-column: 1/10;
  grid-row: 9/10;  
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}

.unselectable {
   -moz-user-select: -moz-none;
   -khtml-user-select: none;
   -webkit-user-select: none;

   /*
     Introduced in IE 10.
     See http://ie.microsoft.com/testdrive/HTML5/msUserSelect/
   */
   -ms-user-select: none;
   user-select: none;
}
</style>