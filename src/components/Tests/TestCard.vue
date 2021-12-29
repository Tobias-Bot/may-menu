<template>
  <v-container>
    <v-card class="mx-auto mb-4" style="border-radius: 25px">
      <v-img :src="test.cover" height="150px"></v-img>

      <v-card-title> {{ test.title }} </v-card-title>

      <v-card-subtitle> Вопросов: {{ test.questionsCount }} </v-card-subtitle>

      <v-card-actions>
        <v-btn color="light" text @click="setCurrentTest">
          <v-icon>mdi-play</v-icon>
        </v-btn>
        <!-- <v-btn
          color="light"
          text
          style="box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.08)"
          @click="setFavoriteTest"
        >
          <v-icon>mdi-heart-outline</v-icon>
        </v-btn> -->

        <v-spacer></v-spacer>

        <v-btn
          icon
          @click="show = !show"
          style="box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.08)"
        >
          <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>

          <v-card-text>
            {{ test.text }}
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card></v-container
  >
</template>

<script>
export default {
  name: "TestCard",
  props: ["test", "testIndex"],
  components: {},
  data: () => ({
    show: false,
  }),
  methods: {
    setCurrentTest() {
      let test = {
        index: this.testIndex,
        data: this.test,
        value: [],
      };

      this.$store.commit("setCurrentTest", test);
      this.$store.dispatch(
        "loadValueOfCurrentTest",
        this.test.url.substring(1, this.test.url.length)
      );
      this.$router.push(this.test.url);
    },
    // setFavoriteTest() {
    //   this.$store.dispatch(
    //     "setFavoriteTest",
    //     this.test.url.substring(1, this.test.url.length)
    //   );
    // },
  },
};
</script>
