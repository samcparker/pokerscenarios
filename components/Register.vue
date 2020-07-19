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
            <span v-for="(req, index) in emailRequirements" :key="index" >
              <p v-if="emailErrors.indexOf(index) != -1" class="mb-1"><v-icon x-small>{{ emailErrors.indexOf(index) == -1 ? "mdi-check" : "mdi-close" }}</v-icon> {{ req }}</p>
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
                      <span v-for="(req, index) in passwordRequirements" :key="index" >
              <p v-if="passwordErrors.indexOf(index) != -1" class="mb-1"><v-icon x-small>{{ passwordErrors.indexOf(index) == -1 ? "mdi-check" : "mdi-close" }}</v-icon> {{ req }}</p>
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
      passwordRequirements: {
        "min": "Your password must contain at least 8 characters.",
        "max": "Your password must contain a maximum of 100 characters.",
        "uppercase": "Your password must contain at least 1 uppercase character.",
        "lowercase": "Your password must contain at least 1 lowercase character.",
        "digits": "Your password must contain at least 1 digit.",
        "spaces": "Your password cannot contain any spaces.",
        "matching": "Your passwords must match.",
      },
      passwordErrors: [],
      emailRequirements: {
        "auth/invalid-email": "Your email address is invalid",
        "auth/email-already-in-use": "Your email address is already in use",
      },
      emailErrors: [],
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
    validate() {
      var vm = this; // access 'this' within promises
      this.emailError = null;
     
      var signupError = false;

      if (!this.isPasswordLegal()) {
        signupError = true;
      }

      if (!this.isEmailLegal()) {
        this.signupError = true;
      } 
      if (!this.isUsernameLegal()) {
        this.signupError = true;
      }

      return new Promise((resolve, reject) => {
        vm.isUsernameAvailable()
        .then(function(available) {
          if (!available) {
            vm.signupError = true;
            vm.usernameErrors.push("taken");
            resolve(false);
          }
          else if (signupError) {
            resolve(false);
          }
          else if (available) {
            resolve(true);
          }
          else {
            reject();
          }
        }).catch(function(error) {
          reject(error);
        });
      });
      
    },
    isEmailLegal() {
      this.emailErrors = [];
      if (!validator.isEmail(this.email)) {
        this.emailErrors.push("The email address provided is invalid.");
      }
      return this.emailErrors.length == 0;
    },
    isPasswordLegal() {
       var passwordSchema = new passwordValidator();

      passwordSchema
      .is().min(8)
      .is().max(100)
      .has().uppercase()
      .has().lowercase()
      .has().digits()
      .has().not().spaces();
      
      this.passwordErrors = passwordSchema.validate(this.password, {list: true});

      if (this.password != this.password2) {
        this.passwordErrors.push("matching");
      }

      return this.passwordErrors.length == 0;
    },
    isUsernameLegal() {
      var usernameSchema = new passwordValidator();
      usernameSchema
      .is().min(3)
      .is().max(20)
      .has().not().spaces()
      .has().not().symbols();

      this.usernameErrors = (usernameSchema.validate(this.username, {list: true}));
      return this.usernameErrors.length == 0;
    },
    isUsernameAvailable() {
      return new Promise((resolve, reject) => {
        this.$fireStore.collection("users").where("username", "==", this.username.toLowerCase()).get()
        .then(function(querySnapshot) {
          if (!querySnapshot.empty) {
            console.log("Username is unavailable.");
            resolve(false);
          }
          else {
            console.log("Username is available!");
            resolve(true);
          }
        })
        .catch(function(error) {
          reject(error);
        });
      });
    },
    submit() {
      var vm = this;

      this.validate().then(function(valid) {
        console.log("Valid: ", valid)
        if (valid) {
          vm.createUser();
        }
      });
      
    },
    createUser() {
      var vm = this;
      this.$fireAuth.createUserWithEmailAndPassword(this.email, this.password)
        .then(function (event) {
          vm.$fireStore.collection("users").doc(event.user.uid).set({
            username: vm.username
          });
          vm.$router.push("/user/me");
        })
        .catch(function (error) {
          console.log(error);
          vm.emailErrors.push(error.code);
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