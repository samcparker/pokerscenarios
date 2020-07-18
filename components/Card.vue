<template>
  <v-col cols="6" class="card">
        <v-img v-if="show" :src="'/cards/' + value + '.png'"></v-img>
        <v-img v-else src="/cards/red_back.png"></v-img>
      </v-col>
</template>

<script>
export default {
    props: {
        value: String,
        show: Boolean
    }
}
</script>

<style>
  .card {
    min-width: 100px;
    max-width: 100px;
    box-shadow: 0px 0px 19px 0px rgba(0,0,0,0.75);
    padding: 0;
    margin: 0 5px 0 5px;
  }
</style>