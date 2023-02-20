<template>
  <div class ="Player unselectable">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <div class="PlayerGrid" @click="PlayerClick">
        <div class="PlayerName">{{player.name}}</div>
        <div class="PlayerCardStats">
            <div class="primaryColor color"><i class="fa fa-circle" style="color:#0000FF;"></i></div> 
            <div class="primaryQuantity quantity">{{blue}}</div>
            <div class="secondaryColor color"><i class="fa fa-circle" style="color:#00FF00;"></i></div>
            <div class="secondaryQuantity quantity">{{green}}</div>
            <div class="restaurantsColor color"><i class="fa fa-circle" style="color:#FF0000;"></i></div> 
            <div class="restaurantsQuantity quantity">{{red}}</div>
            <div class="majorColor color"><i class="fa fa-circle" style="color:#800080;"></i></div> 
            <div class="majorQuantity quantity">{{purple}}</div>
            <div class="landmarkColor color"><i class="fa fa-circle" style="color:#FFFF00;"></i></div> 
            <div class="landmarkQuantity quantity">{{yellow}}</div>
            <div class="PlayerID">{{player.id}}</div> 
            <div class="Money">${{player.money}}</div>
        </div>
        <!-- add future colored activation numbers -->
    </div>
      
  </div>
</template>

<script>
import {ref} from 'vue'
import {computed} from 'vue'
import { useStore } from 'vuex'

export default {
    props: ['player'],
    components: {
        
    },
    setup (props) {
        const store = useStore()
        const diceOutcomes = ref({
            nums:[1,2,3,4,5,6,7,8,9,10,11,12],
            colors: null
        }) // local reactive state

        // const getStarterHand = computed(() => store.getters['getStarterHand']) //getter
        // const getPlayers = computed(() => store.getters['getPlayers']) //getter

        // const blue = computed(() => {return store.getters.getPrimary(props.player.id)}).value.length
        let counter = null

        const blue = computed(() => {
            counter = 0
            props.player.hand.filter(card => card.type === 'primary').forEach(temp => counter+=temp.quantity)
            return counter
            // return props.player.hand.filter(card => card.type === 'primary').length
        })
        const green = computed(() => {
            counter = 0
            props.player.hand.filter(card => card.type === 'secondary').forEach(temp => counter+=temp.quantity)
            return counter
        })
        const red = computed(() => {
            counter = 0
            props.player.hand.filter(card => card.type === 'restaurants').forEach(temp => counter+=temp.quantity)
            return counter
        })
        const purple = computed(() => {
            counter = 0
            props.player.hand.filter(card => card.type === 'major').forEach(temp => counter+=temp.quantity)
            return counter
        })
        const yellow = computed(() => {
            counter = 0
            props.player.hand.filter(card => card.type === 'landmark').forEach(temp => counter+=temp.quantity)
            return counter
        })
        


        // console.log('player props', typeof(store.getters.getPrimary(props.player.id).length));

        const PlayerClick = () => {
            // console.log('player props', computed(() => store.getters.getPrimary(props.player.id)).value.length);
            console.log('player props2',  props.player)
            // console.log('player props3',  computed(() => store.getters.getPrimary('P2')).value)
            let str = ''
            for (let i=0; i<props.player.hand.length; i++){
                str += '[' + props.player.hand[i].activation + '] ' + props.player.hand[i].name.toUpperCase() + ' x' + props.player.hand[i].quantity + ' (' + props.player.hand[i].icon + ') ' + '\n'
            }
            alert(str)
        }

        const p1 = computed(() => store.state.gameplay.gameplay.P1) //state

        return {diceOutcomes, p1, blue, green, red, purple, yellow, PlayerClick}
    }
}
</script>

<style scoped>
.PlayerGrid{
    border-style: solid;
    border-width: 1px;
    border-radius: 10px;
    box-shadow: 3px 3px 3px grey;
}
.PlayerName{
    text-align: center;
}
.PlayerCardStats {
    display: grid;
     grid-template-columns: 1fr 1fr 1fr 1fr;
     grid-template-rows: repeat(6, 1fr);
}
.color{
    grid-column: 2/3;
}
.quantity{
    grid-column:3/4;
}
.PlayerID {
    grid-column: 2/3;
}
.Money {
    grid-column: 3/4;
    color: green;
    font-weight: bold;
    text-decoration: underline;
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
.break {
  flex-basis: 100%;
  height: 0;
}
</style>