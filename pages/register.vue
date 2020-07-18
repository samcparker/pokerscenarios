<template>
    <div class="bg-img of">
        <v-container fill-height fluid>
            <v-row align="center" justify="center">
                <register/>
            </v-row>
        </v-container>    
    </div>
</template>

<script>
import Register from "@/components/Register.vue";

export default {
    middleware({ store, redirect }) {
        var authenticated = store.state.authentication.user != null;
        console.log("Is authenticated: ", authenticated)
        if (authenticated) {
            return redirect("/user/me");
        }
    },
    components: { Register },
}
</script>

<style scoped>
.bg-img {
  width: 100%;
  height: 100%;
  position: absolute;
  background: url("/poker-vlo.png") no-repeat;
  background-size: cover;
  z-index: 0;
  overflow-y : auto;
  overflow-x: hidden;
}
</style>