<template>
  <v-col cols="4">
    <v-row justify="center">
      <card :show="show" :value="values[0]" />
      <div
      :style="turnStyle"
        class="turn">
      </div>
      <card :show="show" :value="values[1]" />
    </v-row>
  </v-col>
</template>

<script>
export default {
    props: {
        values: Array,
        show: Boolean,
        turn: Boolean
    },
    computed: {
        turnStyle() {
            if (!this.turn) {
                return {
                    opacity: 0,
                }
            }
            return {
                opacity: .5
            }
        }
    }
}
</script>

<style scoped>
.turn {
position: absolute; 
border-radius: 50%; 
width: 150px; 
height: 150px; 
background-color: blue; 
z-index:  100; 
opacity: 0.5; 
text-align: center;
transition-duration: 0.5s;
}
</style>
