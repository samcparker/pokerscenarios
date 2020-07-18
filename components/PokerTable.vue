<template>
<div>
    <!-- <v-row justify="center" style="margin-bottom: 100px"><h1>Your Turn</h1></v-row> -->
          <v-btn @click="riverI += 1" style="margin-bottom: 100px">
        Increase River
      </v-btn>
  <v-container style="max-width: 1200px; height: 500px; border-radius: 5%;"  class="table" fill-height>

    <!-- <v-row style="transform: translateY(-100px)"> -->
    <!-- <v-row style="margin-top: -100px"> -->

      <v-row style="margin-top: -100px">
          <v-col cols="4">
            <v-row justify="center">
              <v-col v-if="showNames" cols="12">
                <p class="text-center">COMPUTER</p>
              </v-col>
              <v-col class="card">
                <v-img src="/cards/red_back.png"></v-img>
              </v-col>
              <v-col class="card">
                <v-img src="/cards/red_back.png"></v-img>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="4">
            <v-row justify="center">
              <v-col v-if="showNames" cols="12">
                <p class="text-center">COMPUTER</p>
              </v-col>
              <v-col cols="6" class="card">
                <v-img src="/cards/red_back.png"></v-img>
              </v-col>
              <v-col cols="6" class="card">
                <v-img src="/cards/red_back.png"></v-img>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="4">
            <v-row justify="center">
              <v-col v-if="showNames" cols="12">
                <p class="text-center">COMPUTER</p>
              </v-col>
              <v-col class="card">
                <v-img src="/cards/red_back.png"></v-img>
              </v-col>
              <v-col class="card">
                <v-img src="/cards/red_back.png"></v-img>
              </v-col>
            </v-row>
          </v-col>

        </v-row>

        <v-row justify="center" align="center">
          <v-col v-for="n in 5" :key="n" class="card">
            <v-img v-if="riverI >= n" :src="'/cards/' + river[n - 1] + '.png'"></v-img>
            <v-img v-else src="/cards/red_back.png"></v-img>
          </v-col>
        </v-row>
        
        <v-row style="margin-bottom: -100px">
        <!-- <v-row style="transform: translateY(100px)"> -->
          <v-col cols="4">
            <v-row justify="center">
              <v-col v-if="showNames" cols="12">
                <p class="text-center">COMPUTER</p>
              </v-col>
              <v-col class="card">
                <v-img src="/cards/red_back.png"></v-img>
              </v-col>
              <v-col class="card">
                <v-img src="/cards/red_back.png"></v-img>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="4">
            <v-row justify="center">
              <v-col v-if="showNames" cols="12">
                <p class="text-center">YOU</p>
              </v-col>
              <v-col cols="6" class="card">
                <v-img v-if="playersCards.length != 0" :src="'/cards/' + playersCards[0][0] + '.png'"></v-img>
                <v-img v-else :src="'/cards/red_back.png'"></v-img>
              </v-col>
              <v-col cols="6" class="card">
                <v-img v-if="playersCards.length != 0" :src="'/cards/' + playersCards[0][1] + '.png'"></v-img>
                <v-img v-else :src="'/cards/red_back.png'"></v-img>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="4">
            <v-row justify="center">
              <v-col v-if="showNames" cols="12">
                <p class="text-center">COMPUTER</p>
              </v-col>
              <v-col class="card">
                <v-img src="/cards/red_back.png"></v-img>
              </v-col>
              <v-col class="card">
                <v-img src="/cards/red_back.png"></v-img>
              </v-col>
            </v-row>
          </v-col>

        </v-row>

        
      </v-container>
    </div>
</template>

<script>
export default {
    data: () => {
        return {
          cards: [],
          showNames: false,
          playersCards: [], // going clockwise starting at the player's position
          river: [],
          riverI: 2
        }
    },
    computed: {

    },
    methods: {
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
    mounted () {
      this.resetCards();
      
      this.playerCards = this.getRandomCards(2);

      for (var i = 0; i < 6; i++) {
        this.playersCards.push(this.getRandomCards(2));
      }

      this.river = this.getRandomCards(5);
      console.log(this.river);
    }
}
</script>

<style scoped>
  .card {
    min-width: 100px;
    max-width: 100px;
    box-shadow: 0px 0px 19px 0px rgba(0,0,0,0.75);
    padding: 0;
    margin: 0 5px 0 5px;
    
  }
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