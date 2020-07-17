<template>
  <v-container class="py-15"  fill-height>
    <v-row justify="center">
       <h1>YOUR TURN</h1>
    </v-row>
    <v-row class="mx-0" justify="center">

      <!-- <v-col v-for="n in 50" :key="n" style="min-width: 100px; max-width: 100px;">
          <v-img src="/10c.png"></v-img>
        </v-col> -->
      <!-- <v-row justify="center">
            <v-row style="position: absolute; bottom: 0"  >
                <v-col class="card">
                    <v-img src="/10c.png"></v-img>
                </v-col>
                <v-col class="card">
                    <v-img src="/10c.png"></v-img>
                </v-col>
            </v-row>
        </v-row> -->
       
      <v-container style="max-width: 1200px; height: 500px; background-color: green" fill-height>

        <v-row style="transform: translateY(-100px)">
          <v-col cols="4">
            <v-row justify="center">

              <v-col class="card">
                <v-img src="/card-back.png"></v-img>
              </v-col>
              <v-col class="card">
                <v-img src="/card-back.png"></v-img>
              </v-col>
              <v-col cols="12">
                <p class="text-center">COMPUTER</p>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="4">
            <v-row justify="center">
              <v-col class="card">
                <v-img src="/card-back.png"></v-img>
              </v-col>
              <v-col class="card">
                <v-img src="/card-back.png"></v-img>
              </v-col>
              <v-col cols="12">
                <p class="text-center">COMPUTER</p>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="4">
            <v-row justify="center">
              <v-col class="card">
                <v-img src="/card-back.png"></v-img>
              </v-col>
              <v-col class="card">
                <v-img src="/card-back.png"></v-img>
              </v-col>
              <v-col cols="12">
                <p class="text-center">COMPUTER</p>
              </v-col>
            </v-row>
          </v-col>

        </v-row>
        <v-row justify="center">
          <v-col class="card">
            <v-img src="/10c.png"></v-img>
          </v-col>
          <v-col class="card">
            <v-img src="/10c.png"></v-img>
          </v-col>
          <v-col class="card">
            <v-img src="/card-back.png"></v-img>
          </v-col>
          <v-col class="card">
            <v-img src="/card-back.png"></v-img>
          </v-col>
          <v-col class="card">
            <v-img src="/card-back.png"></v-img>
          </v-col>
        </v-row>
        <v-row style="transform: translateY(0px)">
          <v-col cols="4">
            <v-row justify="center">
              <v-col cols="12">
                <p class="text-center">COMPUTER</p>
              </v-col>
              <v-col class="card">
                <v-img src="/card-back.png"></v-img>
              </v-col>
              <v-col class="card">
                <v-img src="/card-back.png"></v-img>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="4">
            <v-row justify="center">
              <v-col cols="12">
                <p class="text-center">YOU</p>
              </v-col>
              <v-col cols="6" class="card">
                <v-img src="/10c.png"></v-img>
              </v-col>
              <v-col cols="6" class="card">
                <v-img src="/10c.png"></v-img>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="4">
            <v-row justify="center">
              <v-col cols="12">
                <p class="text-center">COMPUTER</p>
              </v-col>
              <v-col class="card">
                <v-img src="/card-back.png"></v-img>
              </v-col>
              <v-col class="card">
                <v-img src="/card-back.png"></v-img>
              </v-col>
            </v-row>
          </v-col>

        </v-row>

        
      </v-container>

    </v-row>
        <v-row style="width: 100%; margin-top: 100px" class="mx-0">
            <v-slide-group
              show-arrows>
                <v-slide-item v-for="n in 10" :key="n" class="pa-4 mx-2" style="max-width: 300px">
                    <v-card light>
                      <v-card-title>Optimal Solution {{ n }}</v-card-title>
                      <v-card-text>You should have folded here because you have < 50% chance you will win.</v-card-text>
                      <v-card-actions>
                        <v-btn icon><v-icon color="grey">mdi-play</v-icon></v-btn>
                      </v-card-actions>
                    </v-card>
                </v-slide-item>
                
                
            </v-slide-group>
        </v-row>
  </v-container>
</template>

<script>
  export default {

  }

</script>

<style>
  .card {
    min-width: 100px;
    max-width: 100px;
    box-shadow: 1ch;
  }

  p {
      font-weight: 900;
  }

</style>
