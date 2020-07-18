<template>
  <div style="min-width: 350px">
      <h1 class="text-center">Login</h1>
      <v-form>
          <v-text-field 
            v-model="email"
            name="email"
            label="Email"
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

          <v-btn @click="submit" color="red" style="width: 100%" tile>Submit</v-btn>
        </v-row>
      </v-form>
        <p class="my-0 py-0 mt-3 text-center">Or login with: </p>
      <v-row class="mx-0">
          <v-col align="center">
              <v-btn class="px-0" style="width: 100%" tile outlined>
                <v-icon left>mdi-google</v-icon>Google
            </v-btn>
          </v-col>
          <v-col align="center">
              <v-btn class="px-0" style="width: 100%" tile outlined>
                <v-icon left>mdi-facebook</v-icon>Facebook
            </v-btn>
          </v-col>
      </v-row>
      <p  class="mt-5 grey--text">Don't have an account? <a href="register">Sign Up</a></p>
  </div>
</template>

<script>

export default {
    data: () => {
        return {
            showPassword: false,
            password: "",
            email: ""
        }
    },
    mounted() {

    },
    methods: {
        submit() {
          var vm = this;
            this.$fireAuth.signInWithEmailAndPassword(this.email, this.password)
              .then(function(user) {
                vm.$router.push("/user/me");
              }) 
              .catch((error) => {
                  console.log("Error: ", error);
              }
            );
        }
    }
}
</script>

<style>

</style>