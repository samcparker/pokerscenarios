<template>
  <div class="elevation-3 pa-5 ma-3 back" style="border-radius: 10px;">
      <h2 class="pl-3" v-if="title">{{ title }}</h2>
      <slot style="width: 100%; height: 100%;"></slot>
  </div>
</template>

<script>
export default {
    props: {
        title: String
    }
}
</script>

<style>
h1, h2, h3 {
    font-family: 'Raleway', sans-serif;
    
}

.back {
    background-color:whitesmoke
}
</style>