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
  export default {
  components: {NavDraw,}    
  }
</script>

<style>

</style>

