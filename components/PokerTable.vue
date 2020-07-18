<template>
<div>
    <!-- <v-row justify="center" style="margin-bottom: 100px"><h1>Your Turn</h1></v-row> -->
  <v-container style="max-width: 1200px; height: 500px; border-radius: 5%;"  class="table" fill-height>

    <!-- <v-row style="transform: translateY(-100px)"> -->
    <!-- <v-row style="margin-top: -100px"> -->
      <v-row style="margin-top: -100px">
          <v-col cols="4">
            <v-row justify="center">
              <v-col v-if="showNames" cols="12">
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
              <v-col v-if="showNames" cols="12">
                <p class="text-center">COMPUTER</p>
              </v-col>
              <v-col cols="6" class="card">
                <v-img src="/card-back.png"></v-img>
              </v-col>
              <v-col cols="6" class="card">
                <v-img src="/card-back.png"></v-img>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="4">
            <v-row justify="center">
              <v-col v-if="showNames" cols="12">
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

        <v-row justify="center" align="center">
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
        
        <v-row style="margin-bottom: -100px">
        <!-- <v-row style="transform: translateY(100px)"> -->
          <v-col cols="4">
            <v-row justify="center">
              <v-col v-if="showNames" cols="12">
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
              <v-col v-if="showNames" cols="12">
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
              <v-col v-if="showNames" cols="12">
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
    </div>
</template>

<script>
export default {
    data: () => {
        return {
            showNames: false
        }
    }
}
</script>

<style scoped>
  .card {
    min-width: 100px;
    max-width: 100px;
    box-shadow: 0px 0px 19px 0px rgba(0,0,0,0.75);
    padding: 0;
    margin: 0 5px 0 5px;
    
  }
  .card > v-img {
  }

  p {
      font-weight: 900;
  }

  .table {
    background: rgb(0,154,0);
    background: radial-gradient(circle, rgba(0,154,0,1) 0%, rgba(0,79,16,1) 100%);
  }

</style>