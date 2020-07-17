<template>
    <div style="width: 100%; height: 100%">
        <v-img src="/poker-vlo.png" class="bg-img">
            <v-container fill-height fluid>
                <v-row align="center" justify="center">
                    <login v-if="!authenticated" />
                </v-row>
            </v-container>    
        </v-img>
    </div>
</template>

<script>
import Login from "@/components/Login.vue";

export default {
    components: { Login },
    methods: {

    },
    computed: {
        authenticated() {
            return this.$store.state.authentication.user != null;
        },
    },
    mounted() {
        // if (this.$store.state.authentication.user) {
        //     this.$router.push({
        //         path: "/"
        //     });
        // }
    }
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