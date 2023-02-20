<template>
  <!-- <div > -->
  <div @keyup.enter="specialCodes" tabindex="0" class="gameShell" @touchstart="codeStart" @touchend="codeEnd" @touchmove="touchMove">
    <NewGame v-if="newGameDisplay"></NewGame>
    <NumPlayers v-if="NumPlayersDisplay"></NumPlayers>
    <Tabs v-if="tabDisplay"></Tabs>
    <PickPlayerModal v-if="PickPlayerModalDisplay"/>
    <TradeCardsModal v-if="PickPlayerCardsModalDisplay"/>
    <div class="PlayerTurnStatusDisplay " v-if="tabDisplay">
        <div class="unselectable PlayerTurnNameDisplay" >{{allPlayers[turnPlayer].id}} Turn</div>
        <div class="unselectable PlayerTurnMoneyDisplay">${{allPlayers[turnPlayer].money}}</div>
    </div>
    <transition name="swipe-transition">
        <MarketPlace v-if="marketPlaceDisplay"></MarketPlace> 
    </transition>
    <!-- <transition-group tag="div"  name="game-transition" class="GameGrid"> -->
        <div name="game-transition" class="diceContainer">
            <button v-if="allPlayerDisplay" @click="rollDice(1,6)" class="RollDiceButton RDB1">1 Dice</button>
            <button v-if="allPlayerDisplay" :disabled="!dice2" @click="rollDice(1,12)" class="RollDiceButton RDB2">2 Dice</button>
            <transition name="dice-transition">
                <span class="unselectable DiceRollNum" v-if="diceDisplay">{{dice}}</span>
            </transition>
        </div> 
        <div class="placeholder"></div>      
        <div v-if="allPlayerDisplay" class="PlayerGrid" :class="numPlayers">
            <Player v-if="p1Display" :player="p1" class="p1grid"></Player>
            <Player v-if="p2Display" :player="p2" class="p2grid"></Player>
            <Player v-if="p3Display" :player="p3" class="p3grid"></Player>
            <Player v-if="p4Display" :player="p4" class="p4grid"></Player>
            <Player v-if="p5Display" :player="p5" class="p5grid"></Player>
        </div>
    <!-- </transition-group> -->
  </div>
</template>

<script>
import {ref} from 'vue'
import {computed} from 'vue'
import { useStore } from 'vuex'
import MarketPlace from './MarketPlace.vue'
import NewGame from './NewGame.vue'
import Player from './Player.vue'
import PickPlayerModal from '../components/PickPlayerModal.vue'
import TradeCardsModal from '../components/TradeCardsModal.vue'
import NumPlayers from '../components/NumPlayers.vue'
import Tabs from '../components/Tabs.vue'

export default {
    components: {
        MarketPlace,
        NewGame,
        Player,
        PickPlayerModal,
        TradeCardsModal,
        NumPlayers,
        Tabs
    },
    setup () {
        const store = useStore()
        // const dice = ref(0) // local reactive state

        const dice = computed(() => store.getters['getDice']) //getter
        const dice2 = computed(() => store.state.gameplay.gameplay.HasDice2) //state
        // const swipe = computed(() => store.state.gameplay.gameplay.GlobalSwipe) //state

        const allPlayers = computed(() => store.state.gameplay.gameplay.Players) //state
        const turnPlayer = computed(() => store.state.gameplay.gameplay.TurnPlayer) //state
        const PickPlayerModalDisplay = computed(() => store.state.display.PickPlayerModalDisplay) //state
        const PickPlayerCardsModalDisplay = computed(() => store.state.display.PickPlayerCardsModalDisplay) //state

        const newGameDisplay = computed(() => store.state.display.NewGameDisplay) //state
        const tabDisplay = computed(() => store.state.display.TabDisplay) //state
        const NumPlayersDisplay = computed(() => store.state.display.NumPlayersDisplay) //state
        const marketPlaceDisplay = computed(() => store.state.display.MarketPlaceDisplay) //state
        const diceDisplay = computed(() => store.state.display.DiceDisplay) //state
        const p1Display = computed(() => store.state.display.Player1Display) //state
        const p2Display = computed(() => store.state.display.Player2Display) //state
        const p3Display = computed(() => store.state.display.Player3Display) //state
        const p4Display = computed(() => store.state.display.Player4Display) //state
        const p5Display = computed(() => store.state.display.Player5Display) //state
        const allPlayerDisplay = computed(() => store.state.display.AllPlayerDisplay) //state

        const p1 = computed(() => store.state.gameplay.gameplay.Players[0]) //state
        const p2 = computed(() => store.state.gameplay.gameplay.Players[1]) //state
        const p3 = computed(() => store.state.gameplay.gameplay.Players[2]) //state
        const p4 = computed(() => store.state.gameplay.gameplay.Players[3]) //state
        const p5 = computed(() => store.state.gameplay.gameplay.Players[4]) //state
        // const testCards = computed(() => store.state.gameplay.gameplay.TestCard) //state
        const testArr = computed(() => store.state.gameplay.gameplay.IterOrder)
        const numPlayers = toWords(computed(() => store.state.gameplay.gameplay.NumPlayers).value.toString())

        let interval = false
        let count = 0
        let specialCodesAllow = false

        function toWords (num) {
            console.log('main triggered here', num);
            if(num ==='2'){
                return 'two';
            } else if (num ==='3'){
                return 'three';
            } else if (num ==='4'){
                return 'four';
            } else if (num ==='5'){
                return 'five';             
            }
        }


        const rollDice = (low, high) => {
            let min = low
            let max = high         
            
            store.dispatch('setDiceRange',[min,max]) //action
            store.dispatch('Controller') //action
            console.log('turn player', turnPlayer.value);
        }       


        //--------------------- cheats and touch events --------------------------------------------------------------------------------------------------------------------------
        let touchstartX 
        let touchstartY 
        let touchendX 
        let touchendY       
        let swipeDir = ref()

        const specialCodes = () => {
            specialCodesAllow = true
            codes()
        }
        const codeStart = (event) => {
            if (!interval){interval = setInterval(() => count++, 1)}

            touchstartX = event.touches[0].screenX
            touchstartY = event.touches[0].screenY
            touchendX = 0
            touchendY = 0
            swipeDir.value = null

            console.log('touch start', touchstartX, touchstartY, typeof(touchstartY));
        }       
        const codeEnd = () => {
            if (count > 150){
                codes()
            } 
            count = 0
            clearInterval(interval)
            interval=false
            handleGesture()
        }
        const codes = () => {
            if(marketPlaceDisplay.value==true && specialCodesAllow == false){return}
            const code = prompt("Enter a code")
            if(code==null){
                specialCodesAllow = false
                return
            }
            let cheat = ''
            let val = null

            if (code.substring(0, 5).toLowerCase()==='money') {
                cheat='money'
                val = parseInt(code.split(cheat).pop())
                store.dispatch('modMoney',[turnPlayer.value, val])
            }
            if (code.substring(0, 4).toLowerCase()==='roll') {
                cheat='roll'
                val = parseInt(code.split(cheat).pop())
                rollDice(val, val)
            }
            if (code.substring(0, 5).toLowerCase()==='state'){
                store.dispatch('getAllState') //action
            } 
            specialCodesAllow = false
        }
        const touchMove = (event) => {
            touchendX = event.touches[0].screenX
            touchendY = event.touches[0].screenY

            console.log('touch Move', touchendX, touchendY);
        }

        function handleGesture() {
            if (touchendX==0){touchendX=touchstartX}
            if (touchendY==0){touchendY=touchstartY}

            let xDiff = touchendX - touchstartX
            let yDiff = touchendY - touchstartY

            console.log('touch end results:', xDiff, yDiff, screen.width, screen.height)

            if(Math.abs(xDiff) < 0.02*screen.width && Math.abs(yDiff) < 0.02*screen.height){
                console.log('tap');
                // store.dispatch('setGlobalSwipe', 0)
            }
            if(Math.abs(xDiff) > 0.02*screen.width && Math.abs(xDiff) > Math.abs(yDiff) && xDiff < 0){
                console.log('swipe left');
                // store.dispatch('setGlobalSwipe', 4)
                if(marketPlaceDisplay.value==false && diceDisplay.value==true){
                    store.dispatch('ShowMarketplace')
                }
            }
            if(xDiff > 0.02*screen.width && Math.abs(xDiff) > Math.abs(yDiff) && xDiff > 0){
                console.log('swipe right');
                // store.dispatch('setGlobalSwipe', 2)

                if(marketPlaceDisplay.value==true && diceDisplay.value==false){
                    store.dispatch('ShowGame')
                }
            }
            if(Math.abs(yDiff) > 0.02*screen.height && Math.abs(yDiff) > Math.abs(xDiff) && yDiff < 0){
                // store.dispatch('setGlobalSwipe', 1)
                console.log('swipe up');
            }
            if(yDiff > 0.02*screen.height && Math.abs(yDiff) > Math.abs(xDiff) && yDiff > 0){
                // store.dispatch('setGlobalSwipe', 3)
                console.log('swipe down');
            }
            
        }

        console.log('num players on main', numPlayers.value);
        return {dice, dice2, rollDice, allPlayers, numPlayers, codes, codeStart, codeEnd, specialCodes,
            newGameDisplay, marketPlaceDisplay, diceDisplay, tabDisplay, allPlayerDisplay, 
            p1Display,p2Display,p3Display,p4Display,p5Display,PickPlayerModalDisplay,PickPlayerCardsModalDisplay, NumPlayersDisplay,
            p1, p2, p3, p4, p5, turnPlayer,
            testArr, PickPlayerModal, touchMove
            }
    }
}
</script>

<style scoped>
.gameShell {
    border: none;
    outline: none;
    overscroll-behavior: contain;
}
.PlayerTurnStatusDisplay{
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    font-size: 1.5em;
    text-align: center;
    color: green;
    margin-bottom: 10px;
}
.PlayerTurnNameDisplay{
    grid-column: 3/6;
}
.PlayerTurnMoneyDisplay{
    grid-column: 6/7;
}


.GameGrid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 4fr;
}
.diceContainer{
    grid-column: 1/3;
    grid-row: 1/2;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: 1fr 1fr;
    justify-items: center;
    align-items: center;
}
.placeholder{
    grid-column: 1/3;
    grid-row: 1/2;
    min-height: 100px;
}
.RollDiceButton {
    background-color: #e5e5e5;
    text-align: center;
    border-radius: 30px;
    height: 50px;
    width: 50px;
    text-align: center;
    border-radius: 20%;
    font-size: 15px;
    outline: 0;
}
.RDB1 {
    grid-column: 2/3;
    grid-row: 1/2;
    box-shadow: 10 10 10;
}
.RDB2 {
    grid-column: 3/4;
    grid-row: 1/2;
}
.DiceRollNum {
    font-size: 2em;
    grid-column: 4/5;
    grid-row: 1/2;
}

.PlayerGrid{
    grid-column: 1/3;
    grid-row: 2;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;

}
/* .PlayerGrid.three {
    grid-template-columns: 1fr 1fr 1fr;
}
.PlayerGrid.four {
    grid-template-columns: 1fr 1fr;
}
.PlayerGrid.five {
    grid-template-columns: 1fr 1fr 1fr;
} */

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

/* Transitions */

.swipe-transition-enter-from {
  opacity: 0;
  transform: translateX(100px);
}
.swipe-transition-enter-active {
    animation: marketplace-swipe-left 1s ease-in;
}
.swipe-transition-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
.swipe-transition-leave-active {
  transition: all 0.5s ease-in; 
}
.game-transition-enter-active {
  animation: game-swipe-right 1s ease-in;
}
.game-transition-leave-from {
  transform: translateY(-320px) translateX(0px); 
  opacity: 1 
}
.game-transition-leave-to {
   transform: translateY(500px) translateX(0px); 
   opacity: 0 
}
.game-transition-leave-active {
  transition: all 0.5s ease-in; 
}
.dice-transition-enter-active {
    animation: wobble 1s ease-in;
}

.modal-transition-enter-active {
    animation: modal-swipe-down 0.5s ease-in;
}
.modal-transition-leave-to {
  opacity: 0;
  transform: translateY(-100px);
}
.modal-transition-leave-active {
  transition: all 0.5s ease-in; 
}

@keyframes game-swipe-right {
    0% { transform: translateX(-100px); opacity: 0 }
    50% { transform: translateX(-100px); opacity: 0 }
    100% { transform: translateX(0px); opacity: 1 }
}
@keyframes marketplace-swipe-left {
    0% { transform: translateX(100px); opacity: 0 }
    50% { transform: translateX(100px); opacity: 0 }
    100% { transform: translateX(0px); opacity: 1}
}
@keyframes wobble {
    0% { transform: translateY(0px); opacity: 0 }
    10% { transform: translateY(0px); opacity: 1 }
    20% { transform: translateX(8px); opacity: 1 }
    30% { transform: translateX(-8px); opacity: 1 }
    40% { transform: translateX(4px); opacity: 1 }
    50% { transform: translateX(-4px); opacity: 1 }
    100% { transform: translateX(0px); opacity: 1 }
}

</style>