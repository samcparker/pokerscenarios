<template>
  <v-app dark>
    <nav-draw style="height: 100%" />
    <v-main style="height: 100%">

        <nuxt style="height: 100%" />

    </v-main>
  </v-app>
</template>

<script>
import NavDraw from "@/components/NavDraw.vue";
  import firebase from "firebase/app"

  import { mapMutations } from "vuex";

  export default {
  components: {NavDraw,},
  mounted() {
    
  },
  
  }
</script>

<style>

</style>

