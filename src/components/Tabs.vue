<template>
  <!-- Tab links -->
    <div name="swipe-transition" class="tab">
      <div :class="{active:isSGActive}" class="Game unselectable" @click="showGame">Game</div>
      <div :class="{active:isSMActive}" class="Marketplace unselectable" @click="showMarketplace">Marketplace</div>
    <!-- <button class="tablinks" @click="showMarketplace">Marketplace</button> -->
    </div>
</template>

<script>
// import {ref} from 'vue'
import {computed} from 'vue'
import { useStore } from 'vuex'

export default {
    setup () {
        const store = useStore()

        const isSGActive = computed(() => store.state.display.GameTabDisplay)
        const isSMActive = computed(() => store.state.display.MarketPlaceTabDisplay)

        // if(swipe.value===2){
        //   showGame()
        //   console.log('tab swiping right');
        // }
        // if(swipe.value===4){
        //   showMarketplace()
        //   console.log('tab swiping left');
        // }

        const showGame = () => {
          store.dispatch('ShowGame')

        }
        const showMarketplace = () => {
          store.dispatch('ShowMarketplace')
 
        }

        return  {showGame, showMarketplace, isSGActive, isSMActive}
    }
}
</script>

<style scoped>
.active {
  background-color: #89D5D2;
  color: red
}
/* Style the tab */
.tab {
  display: grid;
  min-height: 30px;
  grid-template-columns: 1fr 1fr;
  overflow: hidden;
  border: 1px solid #ccc;
  background-color: #89cff0;;
  text-align: center;
  font-size: 1.5em;
  margin-bottom: 10px;

}

/* Style the buttons that are used to open the tab content */
.tab  {
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0px 0px;
  transition: 0.5s;
  color: white;
}
/* Change background color of buttons on hover */
/* .tab button:hover {
    background-color: #ddd;
} */

.Game {
  grid-column: 1/2;
}
.Marketplace {
  grid-column: 2/3;
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