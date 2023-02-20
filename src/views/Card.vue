<template>
  <div class="backdrop unselectable" @click="close_card">
    <div class="card unselectable" >
      <div class="top color unselectable" :class="card.type"></div>
      <p class="activation unselectable" :class="card.type">{{card.activation}}</p>
      <h1 class="cardName unselectable" :class="card.type">{{card.name}}</h1>
      <div class="bottom color unselectable" :class="card.type"></div>
      <div class="icon unselectable" :class="card.icon"></div>
      <div class="description unselectable">{{card.description}}</div>
      <div class="cost unselectable">{{card.cost}}</div>
    </div>
  </div>
</template>

<script>
// import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
    props: ['card'],
    setup () {
        const store = useStore()
        
        // const card = {name: 'Wheat Field', type: 'primary', icon: 'wheat', cost: 1, activation: [1], quantity: 6, set: 'base', description: "Get 1 coin from the bank, on anyone's turn"}
        
        const close_card = () => store.dispatch('SetCardDisplay',false)

        return {close_card}
    }

}
</script>

<style scoped>
.backdrop {
  display: grid;
  top: 0;
  position: fixed;
  background: rgba(0,0,0,0.5);
  width: 100%;
  height: 100%;
}
.card {
  display: grid;
  grid-template-columns: 1fr 1fr 5fr 2fr;
  grid-template-rows: 1fr 2fr 1fr 1fr;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  background: white;
  max-width: 200px;
  text-align: center;
  border-radius: 20px;
  align-self: center;
  justify-self: center;
}
.top.color {
  grid-column: 1/5;
  grid-row: 1/2;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}
.activation {
  grid-column: 3/4;
  grid-row: 1/2;
  color: white;
  font-size: 18px;
}
.icon{
  grid-column: 2/3;
  grid-row: 2/3;
  background-size: 100%;
  background-color: white;
  background-repeat: no-repeat;
  background-position: center;
  max-width: 50px;
  border-radius: 15px;
}
.cardName{
  grid-column: 3/4;
  grid-row: 2/3;
  color:black;
  font-size: 1.2em;
  font-weight: bold;
  align-self: center;
  justify-self: center;
  border-style: none;
}
.bottom.color {
  grid-column: 1/5;
  grid-row: 3/5;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}
.description {
  grid-column: 2/4;
  grid-row: 3/5;
  justify-self: center;
  align-self: center;
  color: white;
}
.cost {
  grid-column: 1/2;
  grid-row: 4/5;
  background: yellow;
  font-size: 1.5em;
  text-align: center;
  min-width: 30px;
  border-radius: 20px;
  justify-self: center;
  align-self: center;
}


.primary.color {
  background-color: blue;
}
.primary.cardName{
  color: blue;
}
.secondary.color {
  background-color: green;
}
.secondary.cardName{
  color: green;
}
.restaurants.color {
  background-color: red;
}
.restaurants.cardName{
  color: red;
}
.major.color {
  background-color: purple;
}
.major.cardName{
  color: purple;
}
.landmark.color {
  background-color: gold;
}
.landmark.cardName{
  color: gold;
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