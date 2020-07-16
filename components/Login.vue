<template>
  <div style="min-width: 350px">
      <h1 class="text-center">Login</h1>
      <v-form>
          <v-text-field 
            v-model="email"
            name="Email"
            label="email"
            color="red"
            ></v-text-field>
          <v-text-field
            v-model="password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            name="password"
            label="Password"
            @click:append="showPassword = !showPassword"
            color="red"
          ></v-text-field>
          <!-- <v-checkbox
          class="my-0 py-0 mb-2"
          v-model="checkbox"
          :error-messages="errors"
          value="1"
          label="Remember Me"
          type="checkbox"
          required
          color="red"
        ></v-checkbox> -->
        <v-row justify="center" class="px-4">

          <v-btn @click="submit" class="gradient" style="width: 100%" tile>Submit</v-btn>
        </v-row>
      </v-form>
        <p class="my-0 py-0 mt-3 text-center">Or login with: </p>
      <v-row class="mx-0">
          <v-col align="center">
              <v-btn class="px-0" style="width: 100%" tile  >
                <v-icon left>mdi-google</v-icon>Google
            </v-btn>
          </v-col>
          <v-col align="center">
              <v-btn class="px-0" style="width: 100%" tile >
                <v-icon left>mdi-facebook</v-icon>Facebook
            </v-btn>
          </v-col>
      </v-row>
      <p  class="mt-5 grey--text">Don't have an account? <a href="register">Sign Up</a></p>
  </div>
</template>

<script>
import firebase from "firebase/app";

export default {
    data: () => {
        return {
            showPassword: false,
            password: "",
            email: ""
        }
    },
    mounted() {
        if (firebase.auth().currentUser) {
            console.log(firebase.auth().currentUser);
        }
        else {
            console.log("No one logged in at Login.vue!");
        }

        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                
            }
        });
    },
    methods: {
        submit() {
            // console.log("Signing in with email '" + this.email + "' and password '" + this.password + "'.")
            firebase.auth().signInWithEmailAndPassword(this.email, this.password).catch((error) => {
                console.log("Error");
            });

            
        }
    }
}
</script>

<style>

</style>