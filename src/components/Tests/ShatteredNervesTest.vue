<template>
  <v-container>
    <div class="testTitle">{{ test.data.title }}</div>
    <div class="cardHintText">{{ text }}</div>
    <div v-show="!showResults">
      <div v-if="data[questionNum - 1]" class="testCard">
        <div class="cardText">
          {{ data[questionNum - 1].text }}
        </div>
        <v-btn
          v-for="(btn, i) in data[questionNum - 1].btns"
          :key="i"
          text
          class="mx-5"
          style="display: inline-block"
          color="light"
          @click="setNextQuestion(btn.value)"
          >{{ btn.title }}</v-btn
        >
      </div>
    </div>

    <TestResults
      :showResults="showResults"
      :results="results"
      :subResults="subResults"
      :value="value"
      :prevValue="prevValue"
    />
  </v-container>
</template>

<script>
import testsInfo from "../../data/tests/testsInfo";
import ShatteredNervesTestData from "../../data/tests/ShatteredNervesTestData";

import TestResults from "./TestResults";

export default {
  name: "ShatteredNervesTest",
  components: {
    TestResults,
  },
  data: () => ({
    text: "",
    questionNum: 1,

    data: ShatteredNervesTestData,

    showResults: false,
    answerSum: 0,

    results: {},
    subResults: [],

    value: [],
    prevValue: [],
  }),
  created() {
    let i = testsInfo.findIndex((test) => test.url == "/test-nerves");

    let data = testsInfo[i];

    let test = {
      data,
      value: [],
    };

    this.$store.commit("setCurrentTest", test);
    this.$store.dispatch(
      "loadValueOfCurrentTest",
      data.url.substring(1, data.url.length)
    );
  },
  mounted() {
    this.text = `Вопрос ${this.questionNum} из ${this.data.length}`;
  },
  computed: {
    test() {
      return this.$store.getters.getCurrentTest;
    },
  },
  methods: {
    setNextQuestion(score) {
      this.questionNum++;

      if (this.questionNum <= this.data.length) {
        this.text = `Вопрос ${this.questionNum} из ${this.data.length}`;

        this.answerSum += score;
      } else {
        this.getTestResults();

        this.text = "результаты теста";
        this.showResults = true;
      }
    },
    getTestResults() {
      this.value = this.$store.getters.getCurrentValue;

      if (!this.value.length) {
        this.value.push(0);
      }

      let sum = this.answerSum;
      let scores = Math.round((sum * 100) / 30);
      let text = "";

      switch (true) {
        case sum >= 25 && sum <= 30:
          text = `Очень неуравновешен, возбудим.`;
          break;
        case sum >= 10 && sum < 25:
          text = `Средняя раздражительность.`;
          break;
        case sum >= 5 && sum < 10:
          text = `Спокоен, уравновешен.`;
          break;
        case sum >= 0 && sum < 5:
          text = `Эмоционально ограничен.`;
          break;
        default:
          break;
      }

      this.results = {
        scores,
        text,
      };

      this.value.push(scores);

      if (this.value.length > 2) {
        this.prevValue = this.value.slice(-2);
      }

      this.saveTestResults();
    },
    saveTestResults() {
      let value = this.results.scores;

      this.$store.dispatch("saveTestResults", value);
    },
  },
};
</script>
