<template>
    <div class="backdrop">
        <div class="modal">
            <form @submit.prevent="submitForm">
                <div class="container">
                <div>{{Players[turnPlayer].id}}</div>
                <div v-for="(card) in turnPlayerHand" :key="card">
                    <input type="radio" id="card.name" name="give" :value="card" v-model="selectGive" required>
                    <label>{{card.name}}</label><br>
                </div>
                <div class="break"></div>
                <div>{{Players[selectPlayer].id}}</div>
                <div v-for="(card) in selectPlayerHand" :key="card">
                    <input type="radio" id="card.name" name="take" :value="card" v-model="selectTake" required>
                    <label>{{card.name}}</label><br>
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

        const Players = computed(() => store.state.gameplay.gameplay.Players) //state
        const numPlayers = computed(() => store.state.gameplay.gameplay.NumPlayers) //state
        const turnPlayer = computed(() => store.state.gameplay.gameplay.TurnPlayer) //state
        const selectPlayer = computed(() => store.state.gameplay.gameplay.SelectPlayer) //state

        

        const selectPlayerHand = Players.value[selectPlayer.value].hand
        const turnPlayerHand = Players.value[turnPlayer.value].hand
        const selectGive = ref()
        const selectTake = ref()

        const submitForm = () => {
            console.log('trade card modal', turnPlayer.value, selectPlayer.value, selectGive.value, selectTake.value);

            store.dispatch('SetPickPlayerCardsModalDisplay',false) //action            
            store.dispatch('SwapCards', [turnPlayer.value, selectPlayer.value, selectGive.value, selectTake.value]) //action    p1, p2, give card, take card
        }


        return {Players, numPlayers, submitForm, turnPlayer,selectPlayer,
                selectPlayerHand, turnPlayerHand,
                selectGive, selectTake}
    }
}
</script>

<style>
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
.container {
    gap: 10px;
}
.break {
  flex-basis: 100%;
  height: 0;
}
</style>