<template>
    <div style="width: 100%; height: 100%">
        <v-img src="/poker-vlo.png" class="bg-img">
            <v-container fill-height fluid>
                <v-row align="center" justify="center">
                    <signup/>
                </v-row>
            </v-container>    
        </v-img>
    </div>
</template>

<script>
import Signup from "@/components/Signup.vue";

export default {
    middleware: "not-auth",
    components: { Signup },
}
</script>

<style scoped>
.bg-img {
width: 100%;
height: 100%;
position: absolute;
z-index: 0;
}
</style>