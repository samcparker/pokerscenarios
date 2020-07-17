<template>
  <div class="bg-img" >
    <!-- <v-img src="/poker-vlo.png" class="bg-img"> -->
      <v-container style="height: 100%; max-width: 1200px;">
        <h1 class="text-center"><v-icon large>mdi-poker-chip</v-icon> Poker Scenarios</h1>
        <v-row>
          <v-col cols="8">
            <div class="text-left" style="margin: 100px 50px 100px 50px;" >
              <h1 style="font-size: 70px;" class="mb-10">Take Your Poker To The Next Level</h1>
              <v-btn class="gradient" x-large>Try Free Now</v-btn>
            </div>
          </v-col>
          <v-col cols="4">
            <!-- <v-icon size="500">mdi-chart-line</v-icon> -->
          </v-col>
        </v-row>
        <v-container style="position: relative; bottom: 0; width: 100%; min-height: 100%;">
          <v-row align="center" justify="center">
            <v-col v-for="n in 3" :key="n" lg="4" cols="12" style="padding: 0 50px 0 50px;">
              <v-row class="flex-column text-center">
                <!-- <v-img style="max-width: 50%; margin-left: auto; margin-right: auto" src="https://graphicriver.img.customer.envatousercontent.com/files/41997023/prev.jpg?auto=compress%2Cformat&fit=crop&crop=top&w=590&h=590&s=c04a6318eeb5eef10d76b5a938dcada2"></v-img> -->
                <v-icon class="mb-4" x-large>mdi-poker-chip</v-icon>
                <h2 class="mb-2">Lorem ipsum dolor sit </h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam voluptate suscipit amet odit, distinctio debitis. </p>
                <v-row justify="center" style="height: 100%">
                  <v-btn class="" style="width: 50%" outlined>Find out more</v-btn>

                </v-row>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
        
      </v-container>
    <!-- </v-img> -->
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
height: auto;
position: absolute;
background: url("/poker-vlo.png");
z-index: 0;
}
</style>