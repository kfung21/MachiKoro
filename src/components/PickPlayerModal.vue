<template>
    <div class="backdrop">
        <div class="modal">
            <form @submit.prevent="submitForm">
                <div v-for="(player,index) in Players" :key="player">
                    <div v-if="index<numPlayers && index!=turnPlayer">
                        <input type="radio" id="player {{index}}" name="player" :value="index" v-model="selected" required>
                        <label>Player {{index+1}}</label><br>
                    </div>
                </div>
                <button>Close</button>
            </form>
        </div>
    </div>
</template>

<script>
import {ref} from 'vue'
import {computed} from 'vue'
import { useStore } from 'vuex'

export default {

    setup() {
        const store = useStore()

        const callCard = computed(() => store.state.gameplay.gameplay.CallCard) //state
        const Players = computed(() => store.state.gameplay.gameplay.Players) //state
        const numPlayers = computed(() => store.state.gameplay.gameplay.NumPlayers) //state
        const turnPlayer = computed(() => store.state.gameplay.gameplay.TurnPlayer) //state
        const selected = ref()

        const submitForm = () => {
            store.dispatch('setSelectPlayer',selected) //action            
            store.dispatch('SetPickPlayerModalDisplay',false) //action      
                  

            switch (callCard.value[1].name){
                case 'TV Station':
                    store.dispatch('transferMoney',[selected.value, turnPlayer.value, 5*Players.value[turnPlayer.value].hand.filter(c => c.name ==='TV Station')[0].quantity]) //action
                    break
                case 'Business Center':
                    store.dispatch('SetPickPlayerCardsModalDisplay', true)
                    break
            }
        }


        return {Players, numPlayers, submitForm, selected, turnPlayer}
    }
}
</script>

<style scoped>
.modal {
    width: 400px;
    padding: 20px;
    margin: 100px auto;
    background: white;
    border-radius: 10px;
}
.backdrop {
    top: 0;
    position: fixed;
    background: rgba(0,0,0,0.5);
    width: 100%;
    height: 100%;
}
.button {
    width: 50px;
    height: 15px;
}
</style>