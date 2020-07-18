<template>
  <v-container class="py-0"  fill-height>
    <v-row class="mx-0" justify="center">
      <poker-table/>

    </v-row>
        <!-- <v-row style="width: 100%; margin-top: 100px" class="mx-0">
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
        </v-row> -->
  </v-container>
</template>

<script>
import PokerTable from "@/components/PokerTable.vue";

  export default {
    components: {PokerTable}
  }

</script>

<style>


</style>
