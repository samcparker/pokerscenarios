<template>
  <v-navigation-drawer v-model="drawer" absolute dark app color="#121212" fixed>
    <v-list nav class="py-0">
      <v-list-item class="mt-4">
        <v-list-item-icon>
          <v-icon>mdi-poker-chip</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title><b>Poker Scenarios</b></v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider class="my-5"></v-divider>

      <v-list-item v-for="item in items" :key="item.title" link :href="item.to">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider class="my-5"></v-divider>
      <div v-if="!authenticated">
        <v-list-item v-for="button in buttons" :key="button.title" link :href="button.to">
          <v-list-item-content>
            <v-btn :class="!button.outlined ? 'gradient' : ''" tile>{{ button.title }}</v-btn>
          </v-list-item-content>
        </v-list-item>
      </div>
      <div v-else>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Logged in! <a href="/user/me">My Profile</a></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-btn @click="logout" tile>Logout</v-btn>
          </v-list-item-content>
        </v-list-item>

      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import firebase from 'firebase/app';

  export default {
data () {
      return {
        drawer: true,
        items: [
          { title: 'Home', icon: 'mdi-home', to: "/" },
          { title: 'Practise', icon: 'mdi-gamepad-variant-outline', to: "/" },
          { title: 'Membership', icon: 'mdi-currency-usd-circle', to: "/membership"  },
          { title: 'About', icon: 'mdi-lightbulb', to: "/"  },
        ],
        buttons: [
            { title: "Login", outlined: true, to: "/login" },
            { title: "Sign Up", outlined: false, to: "/register" },
        ]
      }
    },
    computed: {
      authenticated() {
        return this.$store.state.authentication.user != null;
      },
      uservalue() {
        return this.$store.state.authentication.user;
      }
    },
    methods: {
      
      logout() {
        this.$fireAuth.signOut().then(function() {
          console.log("Successfully signed out!");
        }).catch(function(error) {
          console.log("Error when signing out: ", error);
        });
      }
    }
  }

</script>

<style>
    .gradient {
        background: rgb(255,0,0);
background: linear-gradient(45deg, rgba(255,0,0,1) 0%, rgba(255,100,100,1) 100%);
    }
</style>
