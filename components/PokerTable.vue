<template>
<div>
    <!-- <v-row justify="center" style="margin-bottom: 100px"><h1>Your Turn</h1></v-row> -->
          <v-btn @click="riverI += 1" style="margin-bottom: 100px"> Increase River</v-btn>
          <v-btn @click="increaseTurn" style="margin-bottom: 100px"> Increase Turn</v-btn>
  <v-container style="max-width: 1200px; height: 500px; border-radius: 5%;"  class="table" fill-height>

    <!-- <v-row style="transform: translateY(-100px)"> -->
    <!-- <v-row style="margin-top: -100px"> -->

      <v-row style="margin-top: -100px">
          <hand :turn="turn == 2" :values="playersCards[2]"/>
          <hand :turn="turn == 3" :values="playersCards[3]"/>
          <hand :turn="turn == 4" :values="playersCards[4]"/>
        </v-row>

        <v-row justify="center" align="center">
          <card v-for="n in 5" :show="riverI >= n" :value="riverCards[n - 1]" :key="n"/>
          <!-- <v-col v-for="n in 5" :key="n" class="card">
            <v-img v-if="riverI >= n" :src="'/cards/' + riverCards[n - 1] + '.png'"></v-img>
            <v-img v-else src="/cards/red_back.png"></v-img>
          </v-col> -->
        </v-row>
        
        <v-row style="margin-bottom: -100px">
        <!-- <v-row style="transform: translateY(100px)"> -->
          <hand :turn="turn == 1" :values="playersCards[1]"/>
          <hand :turn="turn == 0" :show="true" :values="playersCards[0]"/>
          <hand :turn="turn == 5" :values="playersCards[5]"/>

        </v-row>

        
      </v-container>
    </div>
</template>
    <!-- <div style="position: absolute; border-radius: 50%; width: 150px; height: 150px; background-color: red; z-index:  100; opacity: 0.5">
                  hi
              </div> -->
<script>
export default {
    data: () => {
        return {
          cards: [],
          showNames: false,
          playersCards: [], // going clockwise starting at the player's position
          riverCards: [],
          riverI: 3,
          turn: 0
        }
    },
    computed: {

    },
    methods: {
      increaseTurn() {
        
        this.turn += 1;
        this.turn %= 6;
        console.log(this.turn);
      },
      sourceFromCard(card) {
        return "/cards/" + card + ".png";
      },
      resetCards() {
        const suits = ["C", "D", "H", "S"];
        const pictureCards = ["A", "J", "Q", "K"];
        var cards = [];

        for (var i in suits) {
          for (var j = 2; j <= 10; j++) {
            cards.push(j + suits[i]);
          }
          for (var j in pictureCards) {
            cards.push(pictureCards[j] + suits[i]);
          }
        }

        this.cards = cards;
      },
      getRandomCards(k) {
        var gen = [];
        for (var i = 0; i < k; i++) {
          gen.push(this.getRandom());
        }
        return gen;
      },
      getRandom() {
        var i = Math.floor((Math.random() * this.cards.length));
        var card = this.cards[i];
        this.cards = this.cards.filter(e => { return e != this.cards[i] });

        return card;        
      }
    },
    created () {
      this.resetCards();
      
      this.turn = Math.floor(Math.random() * 6);
      this.playerCards = this.getRandomCards(2);

      for (var i = 0; i < 6; i++) {
        this.playersCards.push(this.getRandomCards(2));
      }

      this.riverCards = this.getRandomCards(5);
      console.log(this.river);
    }
}
</script>

<style scoped>

  .card > v-img {
  }

  p {
      font-weight: 900;
  }

  .table {
    background: rgb(0,154,0);
    background: radial-gradient(circle, rgba(0,154,0,1) 0%, rgba(0,79,16,1) 100%);
  }

</style>