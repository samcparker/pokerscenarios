<template>
  <div style="background-color: white; width: 100%; height: 100%; color: black;">

    <v-container>
      <v-row>
        <v-col md="2" cols="12">
          <v-img
            src="https://images.generated.photos/GGxp4X7s2eKJc5CZbjMfVqi-3Acg_Im2BE2zxu0Xzbk/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAwMTQwMzguanBn.jpg">
            <v-container fill-height fluid>
              <v-row class="mx-0">
                <v-btn icon>
                  <v-icon>
                    mdi-camera
                  </v-icon>
                </v-btn>
              </v-row>
            </v-container>
          </v-img>
        </v-col>
        <v-col md="10" cols="12">
          <h2>Your Name<v-btn icon>
              <v-icon color="grey">mdi-pencil-outline</v-icon>
            </v-btn>
          </h2>
          <p>Age: 20 | Location: UK</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati porro earum repellendus a omnis quam
            inventore quisquam saepe vel laborum, officia accusantium, corrupti id impedit enim quas eius maiores
            deleniti.<v-btn icon>
              <v-icon color="grey">mdi-pencil-outline</v-icon>
            </v-btn>
          </p>
          <!-- <v-row>
            <v-col>
              <v-row class="flex-column text-center">
                <h2>Percentage Correct (past week)</h2>
                <p>75%</p>
              </v-row>
            </v-col>
            <v-col>
              <v-row class="flex-column text-center">
                <h2>KDA</h2>
                <p>2.1</p>
              </v-row>
            </v-col>
          </v-row> -->
        </v-col>
      </v-row> 
      <hr class="my-5" style="opacity: 0.5">
      <h2>Statistics</h2>
      <v-row>
          <v-col md="6" cols="12">
              <line-chart/>
          </v-col>
          <v-col md="6" cols="12">
              <line-chart/>
          </v-col>
      </v-row>

    </v-container>

  </div>
</template>

<script>
import LineChart from "@/components/LineChart.vue";

  export default {
    components: {LineChart},
    mounted() {
      if (!this.$store.state.authentication.user) {
        this.$router.push({
          path: "/login"
        });
      }
    }
  }

</script>

<style>

</style>
