<template>
  <div style="background-color: white; width: 100%; height: 100%; color: black;">
    <v-container v-if="userData">
      <v-row class="mx-0 px-0">

            <dashboard-component :title="userData.username + '\'s Profile'" style="width: 100%">
                <v-row class="mx-0">
                    <v-col md="2" cols="12" style="max-width: 300px; ">
                        <v-row class="flex-column mx-0">
                            <v-img src="data:image/png;base64,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"></v-img>
                            <v-btn-toggle

                                v-model="toggle_exclusive"
                                mandatory
                                light
                                >
                                <v-btn icon>
                                    <v-icon color="red">mdi-square</v-icon>
                                </v-btn>
                                <v-btn icon>
                                    <v-icon color="green">mdi-square</v-icon>
                                </v-btn>
                                <v-btn icon>
                                    <v-icon color="blue">mdi-square</v-icon>
                                </v-btn>
                                <v-btn icon>
                                    <v-icon color="purple">mdi-square</v-icon>
                                </v-btn>
                            </v-btn-toggle>
                        </v-row>
                    </v-col>
                    <v-col md="10" cols="12">
                        <h3>About Me</h3>
                        <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                                <v-chip small v-bind="attrs" v-on="on">
                                    Joined {{ timeSinceJoin }}
                                </v-chip>
                            </template>
                            <span>
                                {{ getDateOf(userData.joinedOn) }}
                            </span>
                        </v-tooltip>
                        <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                                <v-chip small v-bind="attrs" v-on="on">
                                    Last logged in {{ timeSinceLogin }}
                                </v-chip>
                            </template>
                            <span>
                                {{ getDateOf(userData.lastLoggedIn) }}
                            </span>
                        </v-tooltip>
                        <div>
                            <p class="mt-5">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed voluptates enim accusamus assumenda voluptatibus rem delectus. Tempora, enim excepturi unde id soluta vero explicabo tempore culpa quibusdam, dicta eveniet est.</p>
                            <v-btn v-if="isUser" @click="editingBio = true" >
                                <v-icon color="grey">mdi-pencil-outline</v-icon>
                            </v-btn>
                        </div>
                        <h3>Achievements</h3>
                        <v-slide-group class="px-0 mx-0" light style="max-width: 50%;">
                            <v-slide-item
                                show-arrows
                                v-for="n in 10"
                                :key="n"
                                color="red">
                                <div class="text-center elevation-5 ma-2 pa-3">
                                    <v-icon color="orange" x-large>mdi-trophy</v-icon>
                                    <h3>Daily Streak</h3>
                                    <p style="font-size: 14px">Joined 10 days in a row!</p>
                                </div>
                            </v-slide-item>
                        </v-slide-group>
                    </v-col>
                </v-row>
            </dashboard-component>
      </v-row>
      <v-row class="mx-0">
          <dashboard-component title="Statistics" style="width: 100%;">
              <v-row class="mx-0 text-center">
                  <v-col>
                      <h1>KDA</h1>
                      <h1>1.68</h1>
                  </v-col>
                  <v-col>
                      <h1>Daily Streak</h1>
                      <h1>17 days</h1>
                  </v-col>
                  <v-col>
                      <h1>Times Won</h1>
                      <h1>153</h1>
                  </v-col>
                  <v-col>
                      <h1>KDA</h1>
                      <h1>1.68</h1>
                  </v-col>
              </v-row>
          </dashboard-component>
      </v-row>
      <v-row class="mx-0 ">
        <v-col class="pa-0" lg="6" cols="12"> 
          <dashboard-component title="Percentage Correct">
            <line-chart/>
          </dashboard-component>
        </v-col>
        <v-col class="pa-0" lg="6" cols="12">
          <dashboard-component title="Hours Practised Each Day">
            <line-chart/>
          </dashboard-component>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else-if="userData == false">
        <dashboard-component >
            <h1>User not found!</h1>
            <v-text-field label="Username" style="color: black" color="black" v-model="userSearch" dark></v-text-field>
            <v-btn @click="search">Search Again</v-btn>
        </dashboard-component>
    </v-container>

  </div>
</template>

<script>
  import LineChart from "@/components/LineChart.vue";
  import DashboardComponent from "@/components/DashboardComponent.vue";
    import moment from "moment";


  export default {
    data: () => {
      return {
        username: null,
        userData: null,
        userSearch: "",
        isUser: false,
        editingBio: false,
        toggle_exclusive: undefined,
      }
    },
    computed: {
      photoURL() {
        if (this.$store.state.authentication.user) {
          return this.$store.state.authentication.user.photoURL;
        }
        return null;
      },
      timeSinceLogin: function() {
          return moment(this.userData.lastLoggedIn).fromNow();
      },
      timeSinceJoin: function() {
          return moment(this.userData.joinedOn).fromNow();
      },
    },
    methods: {
        search() {
            console.log("Searching for: ", this.userSearch.trim());
            this.$router.push("/user/" + this.userSearch);
        },
        getTimeSince(date) {
            return moment(date).fromNow();
        },
        getDateOf(date) {
            return moment(date).format("MMMM Do YYYY @ h:mma");
        }
    },
    // middleware({ store, redirect }) {
    //     if (this.$route.params.slug == null) {
    //         this.$router.push("/");
    //     }
    // },

    created() {
        var username = this.$route.params.slug;
        var vm = this;

        if (this.$route.params.slug == null) {
            this.userData = false;
            return;
        }

        this.$fireStore.collection("users").where("username", "==", username).get()
        .then((querySnapshot) => {
            if (querySnapshot.empty) {
                this.userData = false;
            }
            else {
                querySnapshot.forEach((doc) => {
                    this.userData = doc.data();
                    
                });
            }
        });
    },

    components: {
      LineChart,
      DashboardComponent
    },
    
  }

</script>

<style>
h1 {
    font-family: 'Raleway', sans-serif;
}
</style>
