<template>
  <v-container fill-height>
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

      <v-container style="max-width: 1200px; height: 100%; background-color: green" fill-height>
        <!-- <v-row justify="center">
            <v-col class="card">
              <v-img src="/10c.png"></v-img>
            </v-col>
            <v-col class="card">
              <v-img src="/10c.png"></v-img>
            </v-col>
            <v-col class="card">
              <v-img src="/10c.png"></v-img>
            </v-col>
            <v-col class="card">
              <v-img src="/10c.png"></v-img>
            </v-col>
            <v-col class="card">
              <v-img src="/10c.png"></v-img>
            </v-col>
          </v-row> -->

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
        <v-row style="transform: translateY(100px)">
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
        <v-row style="width: 100%; background-color: white">
            <v-slide-group>
                <v-slide-item>
                    
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
  }

  p {
      font-weight: 900;
  }

</style>
