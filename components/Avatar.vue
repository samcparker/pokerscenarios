<template>
  <v-img :src="photoURL ? photoURL : 'https://s3.amazonaws.com/37assets/svn/765-default-avatar.png'">
    <v-container fill-height fluid>
        <v-row class="mx-0">
            <v-btn icon>
                <v-icon color="red">
                    mdi-camera
                </v-icon>
            </v-btn>
        </v-row>
    </v-container>
  </v-img>
</template>

<script>
export default {
    props: {
        photoURL: String
    }
}
</script>

<style>

</style>