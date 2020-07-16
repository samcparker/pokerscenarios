<template>
  <v-navigation-drawer v-model="drawer" :permanent="true" absolute dark app color="#121212">
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
      <v-list-item v-for="button in buttons" :key="button.title" link :href="button.to">
        <v-list-item-content>
          <v-btn :class="!button.outlined ? 'gradient' : ''" style="background-color: #1A1A1A;" :outlined="button.outlined">{{ button.title }}</v-btn>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  export default {
data () {
      return {
        drawer: true,
        items: [
          { title: 'Home', icon: 'mdi-home', to: "/" },
          { title: 'Practise', icon: 'mdi-gamepad-variant-outline', to: "/" },
          { title: 'Pricing', icon: 'mdi-currency-usd-circle', to: "/"  },
          { title: 'About', icon: 'mdi-lightbulb', to: "/"  },
        ],
        buttons: [
            { title: "Login", outlined: true, to: "/login" },
            { title: "Sign Up", outlined: false, to: "/register" },
        ]
      }
    },
  }

</script>

<style>
    .gradient {
        background: rgb(255,0,0);
background: linear-gradient(45deg, rgba(255,0,0,1) 0%, rgba(255,100,100,1) 100%);
    }
</style>
