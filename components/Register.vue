<template>
  <div style="min-width: 350px">
      <h1 class="text-center">Register</h1>
      <v-form>
          <v-text-field 
            v-model="email"
            name="email"
            label="Your Email"
            color="red"
            ></v-text-field>
            <span v-if="emailError">
              <p class="mb-1"><v-icon x-small>mdi-close</v-icon> {{ emailError }}</p>
            </span>
          <v-text-field 
            v-model="username"
            name="username"
            label="Username"
            color="red"
            ></v-text-field>
            <span v-for="(req, index) in usernameRequirements" :key="index" >
              <p v-if="usernameErrors.indexOf(index) != -1" class="mb-1"><v-icon x-small>{{ usernameErrors.indexOf(index) == -1 ? "mdi-check" : "mdi-close" }}</v-icon> {{ req }}</p>
            </span>
          <v-text-field
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            name="password"
            label="Password"
            @click:append="showPassword = !showPassword"
            color="red"
          ></v-text-field>
          <v-text-field
            v-model="password2"
            :type="showPassword ? 'text' : 'password'"
            name="password2"
            label="Confirm Password"
            @click:append="showPassword = !showPassword"
            color="red"
          ></v-text-field>
                      <span v-for="(req, index) in requirements" :key="index" >
              <p v-if="errors.indexOf(index) != -1" class="mb-1"><v-icon x-small>{{ errors.indexOf(index) == -1 ? "mdi-check" : "mdi-close" }}</v-icon> {{ req }}</p>
            </span>
          <v-row class="flex-column mb-3">

          </v-row>
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
      <p  class="mt-5 grey--text">Already have an account? <a href="/login">Sign In</a></p>
  </div>
</template>

<script>

import passwordValidator from "password-validator";
import validator from "validator";

export default {
  computed: {
    
  },
  data: () => {
    return {
      showPassword: false,
      password: "",
      password2: "",
      username: "",
      email: "",
      name: "",
      requirements: {
        "min": "Your password must contain at least 8 characters.",
        "max": "Your password must contain a maximum of 100 characters.",
        "uppercase": "Your password must contain at least 1 uppercase character.",
        "lowercase": "Your password must contain at least 1 lowercase character.",
        "digits": "Your password must contain at least 1 digit.",
        "spaces": "Your password cannot contain any spaces.",
        "matching": "Your passwords must match.",
      },
      errors: [],
      emailRequirements: {
        "auth/invalid-email": "Your email address is invalid",
        "auth/email-already-in-use": "Your email address is already in use",
      },
      emailError: null,
      usernameErrors: [],
      usernameRequirements: {
        "min": "Your username must be a minimum of 3 characters.",
        "max": "Your username must contain a maximum of 20 characters.",
        "symbols": "Your username must not contain symbols.",
        "spaces": "Your username must not contain spaces.",
        "taken": "Your username is already taken.",
      }
    }
  },
  methods: {
    checkStyle(index) {
      if (this.errors.indexOf(index) == -1) {
        return {
          color: "white"
        }
      }
      return {
        color: "red"
      }
    },
    async isUsernameAvailable() {
      
    },
    validate() {
      this.emailError = null;
      var passwordSchema = new passwordValidator();

      passwordSchema
      .is().min(8)
      .is().max(100)
      .has().uppercase()
      .has().lowercase()
      .has().digits()
      .has().not().spaces();
      
      this.errors = passwordSchema.validate(this.password, {list: true});

      if (this.password != this.password2) {
        this.errors.push("matching");
      }

      if (!validator.isEmail(this.email)) {
        this.emailError = "The email address provided is invalid."
      }

      // check if username is already taken
      var usernameSchema = new passwordValidator();
      usernameSchema
      .is().min(3)
      .is().max(20)
      .has().not().spaces()
      .has().not().symbols();

      this.usernameErrors = (usernameSchema.validate(this.username, {list: true}));
      console.log(this.usernameErrors);
      var vm = this;
      this.$fireStore.collection("users").where("username", "==", this.username.toLowerCase()).get().then(function(q) {
        if (q.empty) {
          if (vm.errors.length == 0 && vm.usernameErrors.length == 0 && vm.emailError == null) {
            vm.createUser();
          }
          else {
            console.log("Other demands were not met!");
            console.log(vm.errors);
            console.log(vm.usernameErrors);
            console.log(vm.emailError);
          }
        } 
        else {
          vm.usernameErrors.push("taken");
          console.log("User already exists with that name!")
        }
      }).catch(function(error) {
        console.log(error)
      });
    },

    submit() {
      var vm = this;

      this.validate();
      
    },
    createUser() {
      var vm = this;
      this.$fireAuth.createUserWithEmailAndPassword(this.email, this.password)
        .then(function (event) {
          vm.$fireStore.collection("users").doc(event.user.uid).set({
            username: vm.username
          });
        })
        .catch(function (error) {
          vm.emailError = emailRequirements[error];
        });
    }
  }
}
</script>

<style scoped>
p {
  transition-duration: 0.5s;
  font-size: 14px;
  color: red;
}
</style>