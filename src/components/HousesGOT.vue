<template>
  <v-app>
    
    <v-progress-circular
      :size="300"
      :width="10"
      color="black"
      indeterminate
      v-if="isLoading"
      class="mx-auto mt-16"
    ></v-progress-circular>
    <v-layout wrap align-center v-if="houses && !isLoading">
      
      <v-flex v-for="house in houses" :key="house.name" xs12 sm6 md4 lg3>
        <v-card class="mx-auto" max-width="360" color="#2e2e2e" dark>
           
          <v-img
              src="https://www.mixdexhq.com/wp-content/uploads/game-of-thrones.jpg"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-card-title >{{ house.name }}</v-card-title>
            </v-img>

         

          <v-card-text>
            <div class="my-2 text-subtitle-1">Region: {{ house.region }}</div>

            <div v-if="house.words" class="my-2 text-subtitle-1 font-italic">{{ house.words }}</div>
            <div v-else class="my-2 text-subtitle-1 font-italic">Unspecified words</div>

            <div v-if="house.coatOfArms" class="my-2 text-subtitle-1">Coat of Arms: {{ house.coatOfArms }}</div>
            <div v-else class="my-2 text-subtitle-1">Unspecified Coat of Arms</div>

          </v-card-text>

          <v-divider class="mx-4"></v-divider>

          <v-card-actions>
            <v-btn
              color="white"
              class="black--text"
              elevation="5"
              v-if="house.currentLord"
              @click="goTo(house.currentLord)"
            >
              Lord Description
            </v-btn>
            <v-btn
              color="primary"
              elevation="5"
              v-else
              outlined
              :disabled = true
            >
              No information about the Lord
            </v-btn>
          </v-card-actions>

          <v-card-actions>
            <v-btn
              color="white"
              class="black--text"
              elevation="5"
              v-if="house.heir"
              @click="goTo(house.heir)"
            >
              Heir Description
            </v-btn>
            <v-btn
              color="primary"
              elevation="5"
              v-else
              outlined
              :disabled = true
            >
              No information about the heir
            </v-btn>
          </v-card-actions>

          <v-card-actions>
            <v-btn
              color="white"
              class="black--text"
              elevation="5"
              v-if="house.founder"
              @click="goTo(house.founder)"
            >
              Founder Description
            </v-btn>
            <v-btn
              color="primary"
              elevation="5"
              v-else
              outlined
              :disabled = true
            >
              No information about the founder
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  name: "tabla-houses",
  data() {
    return {
      houses: [],
      isLoading: Boolean
    };
  },
  methods: {
    goTo(personaje) {
      this.$router.push({ name: "character", params: { id: personaje } });
    },
    back() {
      this.$router.go(-1);
    },
  },
  async created() {
    this.isLoading = true
    await axios
      .get("https://www.anapioficeandfire.com/api/houses")
      .then(async (res) => {
        if (res != null) {
          console.log(res);
          this.houses = res.data;
          console.log(this.houses);
          this.isLoading=false
        }
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("aaaaa");
  },
};
</script>

<style scoped>
  .v-card {
    margin-top: 20px !important;
    margin-bottom: 20px !important;
  }
  .v-btn:hover{
    box-shadow: 0px 10px 10px rgba(37, 37, 37, 0.4)!important;
    transform: translateY(-5px) ;
  }
  .v-progress-circular {
    margin: 1rem;
  }
  .v-card__text{
    height: 200px;
  }
</style>