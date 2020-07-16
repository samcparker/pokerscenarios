<template>
  <v-app dark>
    <nav-draw/>
    <v-main>

        <nuxt />

    </v-main>
  </v-app>
</template>

<script>
import NavDraw from "@/components/NavDraw.vue";
  import firebase from "firebase/app"
  export default {
  components: {NavDraw,},
  mounted() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log("Logged in successfully!");
      }
      else {
        console.log("Didn't log in: (")
      }
    });
  }
  }
</script>

<style>

</style>

