<template>
  <v-container>
    <v-dialog v-if="currentEx" dark scrollable fullscreen v-model="ExModal">
      <v-card tile light color="white">
        <v-card-title>
          <v-btn icon light @click="ExModal = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <br />

        <v-card-text
          style="
            color: black;
            font-width: 500;
            font-size: 16px;
            overflow: hidden;
          "
        >
          {{ currentEx.title }}
        </v-card-text>

        <br />

        <v-card-text style="padding: 10px 20px 30px 20px; color: black">
          <div v-html="currentEx.description"></div>
        </v-card-text>
      </v-card>
    </v-dialog>

    <template v-for="(ex, i) in exs"
      ><ExerciseCard :key="i" :data="ex" @openModal="ExModal = true"
    /></template>

    <!-- <div class="pageToolBar">
      <v-btn v-if="!isDon" to="/premium" color="light" text small>
        О подписке
      </v-btn>
    </div> -->
  </v-container>
</template>

<script>
import ExerciseCard from "./Exercises/ExerciseCard";
import exs from "../data/Exercises";

export default {
  name: "Exercises",
  components: {
    ExerciseCard,
  },
  data: () => ({
    exs,
    ExModal: false,
  }),
  computed: {
    isDon() {
      let isDon = this.$store.getters.isPremium;

      if (isDon) isDon = true;
      else isDon = false;

      return isDon;
    },
    currentEx() {
      return this.$store.getters.getCurrentEx;
    },
  },
  methods: {},
};
</script>
