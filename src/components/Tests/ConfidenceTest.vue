<template>
  <v-container>
    <div class="testTitle">{{ test.data.title }}</div>
    <div class="cardHintText">{{ text }}</div>
    <div v-show="!showResults">
      <div v-if="data[questionNum - 1]" class="testCard">
        <div class="cardText">
          {{ data[questionNum - 1].text }}
        </div>

        <b>{{ answerText }}</b>
        <br />
        <br />
        <v-slider v-model="sliderValue" min="0" max="4" @input="setAnswer">
        </v-slider>

        <v-btn text color="light" @click="setNextQuestion(sliderValue + 1)"
          >Продолжить</v-btn
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
import ConfidenceTestData from "../../data/tests/ConfidenceTestData";

import TestResults from "./TestResults";

export default {
  name: "ConfidenceTest",
  components: {
    TestResults,
  },
  data: () => ({
    text: "",
    questionNum: 1,

    data: ConfidenceTestData,

    showResults: false,
    answerSum1: 0,
    answerSum2: 0,
    answerSum: 0,

    sliderValue: 2,
    answers: [
      "совсем не характерно для меня, описание не верно",
      "довольно не характерно для меня — скорее нет, чем да",
      "отчасти характерно, отчасти не характерно",
      "довольно характерно для меня — скорее да, чем нет",
      "очень характерно для меня, описание очень верное",
    ],
    answerText: "",

    results: {},
    subResults: [],

    value: [],
    prevValue: [],
  }),
  created() {
    let i = testsInfo.findIndex((test) => test.url == "/test-confidence");

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

    this.answerText = this.answers[this.sliderValue];
  },
  computed: {
    test() {
      return this.$store.getters.getCurrentTest;
    },
  },
  methods: {
    setAnswer() {
      this.answerText = this.answers[this.sliderValue];
    },
    setNextQuestion(score) {
      let part = [3, 6, 7, 8, 10, 18, 20, 21, 22, 25, 27, 28, 29];

      this.questionNum++;

      if (this.questionNum <= this.data.length) {
        this.text = `Вопрос ${this.questionNum} из ${this.data.length}`;

        if (part.includes(this.questionNum - 1)) {
          this.answerSum1 += score;
        } else {
          this.answerSum2 += score;
        }
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

      this.answerSum = this.answerSum1 + 72 - this.answerSum2;
      if (this.answerSum < 0) this.answerSum = 0;

      let sum = this.answerSum;
      let scores = Math.round((sum * 100) / 120);
      let text = "";

      switch (true) {
        case sum >= 97 && sum <= 120:
          text = "Cлишком самоуверен";
          break;
        case sum >= 73 && sum <= 96:
          text = `Уверен в себе`;
          break;
        case sum >= 49 && sum <= 72:
          text = `Нормальный уровень уверенности в себе`;
          break;
        case sum >= 25 && sum <= 48:
          text = `Скорее не уверен, чем уверен`;
          break;
        case sum >= 0 && sum <= 24:
          text = `Крайне неуверен в себе.`;
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
