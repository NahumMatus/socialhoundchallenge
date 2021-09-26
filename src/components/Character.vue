<template>
  <v-app>
    <router-link custom :to="{ name: 'houses' }" v-slot="{ href, navigate }">
      <v-btn
        color="black"
        class="white--text"
        elevation="2"
        fixed
        left
        top
        :href="href"
        @click="navigate"
      >
        <v-icon dark left>mdi-arrow-left</v-icon>Go back to houses
      </v-btn>
    </router-link>

    <v-progress-circular
      :size="300"
      :width="10"
      color="black"
      indeterminate
      v-if="isLoading"
      class="mx-auto mt-16"
    ></v-progress-circular>
    <v-card class="mx-auto mt-16" max-width="50%" v-if="!isLoading">
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-img
        height="200"
        src="https://tierragamer.com/wp-content/uploads/2018/07/game-of-thrones-espanol.jpg"
      ></v-img>

      <v-card-title>{{ character.name }}</v-card-title>
      <v-divider class="mx-4 my-0"></v-divider>

      <v-card-text>
        <div class="my-4 text-subtitle-1" v-if="character.gender">
          Gender: {{ character.gender }}
        </div>
        <div class="my-4 text-subtitle-1" v-else>Gender: -</div>

        <div class="my-4 text-subtitle-1" v-if="character.culture">
          Culture: {{ character.culture }}
        </div>
        <div class="my-4 text-subtitle-1" v-else>Culture: -</div>

        <div class="my-4 text-subtitle-1" v-if="character.born">
          Born: {{ character.born }}
        </div>
        <div class="my-4 text-subtitle-1" v-else>Born: -</div>

        <div class="my-4 text-subtitle-1" v-if="character.died">
          Died: {{ character.died }}
        </div>
        <div class="my-4 text-subtitle-1" v-else>Died: -</div>

        <div class="my-4 text-subtitle-1">
          Titles:
          <ul v-for="title in character.titles" :key="title">
            <li v-if="title">{{ title }}</li>
            <li v-else>Without titles</li>
          </ul>
        </div>

        <div class="my-4 text-subtitle-1">
          Aliases:
          <ul v-for="aliase in character.aliases" :key="aliase">
            <li v-if="aliase">{{ aliase }}</li>
            <li v-else>Without aliases</li>
          </ul>
        </div>

        <div class="my-4 text-subtitle-1" v-if="character.father">
          Father: {{ character.father }}
          <v-btn
            color="black"
            class="white--text mx-4"
            elevation="5"
            v-if="character.father"
            @click="goTo(character.father)"
          >
            View Father
          </v-btn>
        </div>
        <div class="my-4 text-subtitle-1" v-else>Father: -</div>

        <div class="my-4 text-subtitle-1" v-if="character.mother">
          Mother: {{ character.mother }}
          <v-btn
            color="black"
            class="white--text mx-4"
            elevation="5"
            v-if="character.mother"
            @click="goTo(character.mother)"
          >
            View Mother
          </v-btn>
        </div>
        <div class="my-4 text-subtitle-1" v-else>Mother: -</div>

        <div class="my-4 text-subtitle-1" v-if="character.spouse">
          Spouse:
          <v-btn
            color="black"
            class="white--text mx-4"
            elevation="5"
            v-if="character.spouse"
            @click="goTo(character.spouse)"
          >
            {{ character.spouseName }}
          </v-btn>
        </div>
        <div class="my-4 text-subtitle-1" v-else>Spouse: -</div>

        <div class="my-4 text-subtitle-1">
          Allegiances:
          <ul v-for="alleg in character.allegiances" :key="alleg">
            <li v-if="alleg">{{ alleg }}</li>
            <li v-else>Without allegiances</li>
          </ul>
        </div>
      </v-card-text>

    </v-card>
  </v-app>
</template>



<script>
export default {
  name: "tabla-character",
  /* props: true, */
  data() {
    return {
      character: {},
      isLoading: Boolean,
    };
  },
  methods: {
    goTo(personaje) {
      this.isLoading = true;
      this.$router.push({ name: "character", params: { id: personaje } });
    },
    back() {
      this.isLoading = true;
      this.$router.go(-1);
    },
    async getCharacter(url) {
      fetch(url, { method: "get" })
        .then((response) => response.json()) // pass the data as promise to next then block
        .then((data) => {
          return data;
        })
        .then(async (data) => {
          //Para que "Allegiances" tenga los nombres de las casas en vez del link
          await Promise.all(
            data.allegiances.map(async (e, index, array) => {
              return fetch(e, { method: "get" })
                .then((response) => response.json())
                .then((data) => {
                  array[index] = data.name;
                });
            })
          );
          //Para agregar el nombre del personaje del "Spouse"
          this.character = data;

          if (data.spouse) {
            return fetch(data.spouse, { method: "get" })
              .then((response) => {
                if (response.ok) return response.json();
              })
              .then((data) => {
                this.character["spouseName"] = data.name;
                this.isLoading = false;
              });
          }
          this.isLoading = false;
          console.log("new3 ", this.character);
        });
    },
  },

  async created() {
    this.loading = true;
    console.log(this.$route.params.id);
    await this.getCharacter(this.$route.params.id);
  },
  watch: {
    $route() {
      this.isLoading = true;
      this.getCharacter(this.$route.params.id);
    },
  },
};
</script>

<style scoped>
  .v-btn:hover {
    box-shadow: 0px 10px 10px rgba(37, 37, 37, 0.4) !important;
    color: #fff;
    transform: scale(1.05);
  }
</style>