<template>
  <div style="min-width: 350px">
      <h1 class="text-center">Register</h1>
      <v-form>
          <v-text-field 
            v-model="name"
            name="name"
            label="Your Name"
            color="red"
            ></v-text-field>
          <v-text-field 
            v-model="email"
            name="email"
            label="Your Email"
            color="red"
            ></v-text-field>
          <v-text-field 
            v-model="username"
            name="username"
            label="Username"
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
        <v-row justify="center" class="px-4">

          <v-btn @click.stop="submit" color="red" style="width: 100%" tile>Create Account</v-btn>
        </v-row>
      </v-form>
        <p class="my-0 py-0 mt-3 text-center">Or sign up with: </p>
      <v-row class="mx-0">
          <v-col align="center">
              <v-btn class="px-0" style="width: 100%" outlined tile  >
                <v-icon left>mdi-google</v-icon>Google
            </v-btn>
          </v-col>
          <v-col align="center">
              <v-btn class="px-0" style="width: 100%" outlined tile >
                <v-icon left>mdi-facebook</v-icon>Facebook
            </v-btn>
          </v-col>
      </v-row>
      <p  class="mt-5 grey--text">Already have an account? <a href="login">Sign In</a></p>
  </div>
</template>

<script>
import firebase from 'firebase/app';

export default {
    data: () => {
        return {
            showPassword: false,
            password: "",
            username: "",
            email: "",
            name: ""
        }
    },
    methods: {
        submit() {
            console.log("Signing up with email '" + this.email + "' and password '" + this.password + "'.")
            this.$fireAuth.createUserWithEmailAndPassword(this.email, this.password)
            .catch(function(error) {
                console.log(error)
            });
        }
    }
}
</script>

<style>

</style>