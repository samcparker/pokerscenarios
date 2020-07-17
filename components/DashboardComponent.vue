<template>
  <div class="elevation-3 pa-3 ma-3" style="background-color: white">
      <h2 v-if="title">{{ title }}</h2>
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

</style>