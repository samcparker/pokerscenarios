<template>
  <div class="bg-img of">
    <v-container style="max-width: 1200px" fill-height fluid>
      <v-row class="mx-0 pb-10" justify="center">
        <h1 class="text-center"><v-icon large>mdi-poker-chip</v-icon> Poker Scenarios</h1>
      </v-row>
      <v-row class="mx-0">
        <v-col>
          <div style="max-width: 50%">
            <h2 style="font-size: 50px;" class="mb-10">Take Your Poker to the Next Level</h2>
            <v-btn color="red" tile large>Try Free Now</v-btn>
          </div>
        </v-col>
      </v-row>

      <v-row class="mx-0 mt-15">
        <v-col v-for="n in 3" :key="n" lg="4" cols="12">
          <v-row class="mx-0 flex-column">
            <v-icon x-large>mdi-poker-chip</v-icon>
            <h3>Some Feature</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas nam maxime quae placeat quibusdam facilis, doloremque itaque, a cumque suscipit soluta veniam aliquid ut rerum fugit, quia nesciunt accusantium quasi!</p>
            <v-btn outlined tile>Find Out More</v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>

export default {
  components: {

  }
}
</script>

<style>
.bg-img {
  width: 100%;
  height: 100%;
  position: absolute;
  background: url("/poker-vlo.png") no-repeat;
  background-size: cover;
  z-index: 0;
  overflow-y : auto;
  overflow-x: hidden;
}

html {
  overflow: hidden;
  
}
</style>