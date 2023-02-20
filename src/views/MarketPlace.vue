<template>
  <div class ="MarketPlace">
    <transition name="modal-transition">
        <Card v-if="cardDisplay" :card="card"></Card>
    </transition>
    <div class="grid">
      <div v-for="card in setMarketPlace" :key="card">
        <!-- <label>{{card.name}} - Cost: {{card.cost}} - Activation: {{card.activation}} - Quantity: {{card.quantity}}</label> -->
        <SmallCard :card="card"></SmallCard>
      </div>
    </div>
      
  </div>
</template>

<script>
import {computed} from 'vue'
import { useStore } from 'vuex'
import SmallCard from '../components/SmallCard.vue'
import Card from './Card.vue'

export default {
  components: {
      SmallCard,
      Card
  },
  setup () {
      const store = useStore()

      const setMarketPlace = computed(() => store.state.gameplay.gameplay.MarketPlace) //state
      const cardDisplay = computed(() => store.state.display.CardDisplay) //state
      const card = computed(() => store.state.gameplay.gameplay.PopUpCard) //state

      console.log('MarketPlace Component', setMarketPlace.value);

      return {setMarketPlace, cardDisplay, card}
  }
}
</script>

<style scoped>
  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
    align-items: center;
    justify-items: center;
  }
@media screen and (min-width: 300px){
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
}
@media screen and (min-width: 540px){
  .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }
}
@media screen and (min-width: 720px){
  .grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
  }
}
@media screen and (min-width: 1200px){
  .grid {
    display: grid;
    grid-template-columns: repeat(9, 1fr);
  }
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
@keyframes modal-swipe-down{
    0% { transform: translateY(-100px); opacity: 0 }
    50% { transform: translateY(-100px); opacity: 0 }
    100% { transform: translateY(0px); opacity: 1}
}

</style>