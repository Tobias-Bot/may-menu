<template>
  <v-container>
    <template v-for="(test, i) in tests"
      ><TestCard :key="test.url" :test="test" :testIndex="i"
    /></template>

    <!-- <div class="pageToolBar">
      <v-btn to="/" rounded small light color="white">
        <v-icon dark> mdi-arrow-left </v-icon> на главную
      </v-btn>
    </div> -->
  </v-container>
</template>

<script>
//import bridge from "@vkontakte/vk-bridge";

import TestCard from "./Tests/TestCard";
import testsInfo from "../data/tests/testsInfo";

export default {
  name: "Tests",
  components: {
    TestCard,
  },
  data: () => ({
    tests: testsInfo,
  }),
  methods: {},
};
</script>
