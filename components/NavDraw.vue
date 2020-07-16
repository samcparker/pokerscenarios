<template>
  <v-navigation-drawer v-model="drawer" :permanent="true" absolute dark app color="#121212">
    <v-list nav class="py-0">
      <v-list-item class="px-0">
        <v-list-item-action icon>
          <v-icon>mdi-poker-chip</v-icon>
        </v-list-item-action>

        <v-list-item-content>
          <v-list-item-title>PokerScenarios</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item v-for="item in items" :key="item.title" link>
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item v-for="button in buttons" :key="button.title" link>
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
          { title: 'Practise', icon: 'mdi-gamepad-variant-outline', to: "/" },
          { title: 'Pricing', icon: 'mdi-currency-usd-circle', to: "/"  },
          { title: 'About', icon: 'mdi-lightbulb', to: "/"  },
        ],
        buttons: [
            { title: "Login", outlined: true },
            { title: "Sign Up", outlined: false },
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
