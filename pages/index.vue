<template>
  <div class="bg-img of">
    <!-- <v-img src="/poker-vlo.png" class="bg-img"> -->
      <!-- <v-container style="max-width: 1200px;">
        <h1 class="text-center"><v-icon large>mdi-poker-chip</v-icon> Poker Scenarios</h1>
        <v-row>
          <v-col cols="8">
            <div class="text-left" style="margin: 100px 50px 100px 50px;" >
              <h1 style="font-size: 70px;" class="mb-10">Take Your Poker To The Next Level</h1>
              <v-btn class="gradient" tile x-large>Try Free Now</v-btn>
            </div>
          </v-col>
          <v-col cols="4">
          </v-col>
        </v-row>
        <v-container style="width: 100%;">
          <v-row align="center" justify="center">
            <v-col v-for="n in 3" :key="n" lg="4" cols="12" style="padding: 0 50px 0 50px;">
              <v-row class="flex-column text-center">
                <v-icon class="mb-4" x-large>mdi-poker-chip</v-icon>
                <h2 class="mb-2">Lorem ipsum dolor sit </h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam voluptate suscipit amet odit, distinctio debitis. </p>
                <v-row justify="center" style="height: 100%">
                  <v-btn class="" style="width: 50%" tile outlined>Find out more</v-btn>

                </v-row>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
        
      </v-container> -->
    <!-- </v-img> -->
    <v-container style="max-width: 1200px" fill-height fluid>
      <v-row class="mx-0"  justify="center">
        <h1 class="text-center"><v-icon large>mdi-poker-chip</v-icon>Poker Scenarios</h1>
      </v-row>
      <v-row class="mx-0">
        <v-col>
          <div style="max-width: 50%">
            <h2 style="font-size: 50px;" class="mb-10">Take Your Poker to the Next Level</h2>
            <v-btn color="red" tile x-large>Try Free Now</v-btn>
          </div>
        </v-col>
      </v-row>

      <v-row class="mx-0">
        <v-col v-for="n in 3" :key="n" lg="4" cols="12">
          <v-row class="mx-0 flex-column">
            <v-icon x-large>mdi-poker-chip</v-icon>
            <h3>Some Feature</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas nam maxime quae placeat quibusdam facilis, doloremque itaque, a cumque suscipit soluta veniam aliquid ut rerum fugit, quia nesciunt accusantium quasi!</p>
            <v-btn>Find Out More</v-btn>
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
}

.of {
  overflow: auto;
}

html {
  overflow-y: hidden;
  
}
</style>