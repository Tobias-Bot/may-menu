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
        <v-slider v-model="sliderValue" min="0" max="5" @input="setAnswer">
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
import EQTestData from "../../data/tests/EQTestData";

import TestResults from "./TestResults";

export default {
  name: "EQTest",
  components: {
    TestResults,
  },
  data: () => ({
    text: "",
    questionNum: 1,

    data: EQTestData,

    showResults: false,
    answerSum: 0,

    sliderValue: 2,
    answers: [
      "полностью НЕ согласен",
      "в основном НЕ согласен",
      "отчасти НЕ согласен",
      "отчасти согласен",
      "в основном согласен",
      "полностью согласен",
    ],
    answerText: "",

    results: {},
    subResults: [
      {
        title: "Эмоциональная осведомленность",
        value: 0,
      },
      {
        title: "Управление своими эмоциями",
        value: 0,
      },
      {
        title: "Самомотивация",
        value: 0,
      },
      {
        title: "Эмпатия",
        value: 0,
      },
      {
        title: "Распознавание эмоций других людей",
        value: 0,
      },
    ],

    value: [],
    prevValue: [],

    p1: 0,
    p2: 0,
    p3: 0,
    p4: 0,
    p5: 0,
  }),
  created() {
    let i = testsInfo.findIndex((test) => test.url == "/test-eq");

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
      this.questionNum++;

      if (this.questionNum <= this.data.length) {
        this.text = `Вопрос ${this.questionNum} из ${this.data.length}`;

        let val = this.questionNum - 1;

        if (
          val === 1 ||
          val === 2 ||
          val === 4 ||
          val === 17 ||
          val === 19 ||
          val === 25
        )
          this.p1 += score;
        if (
          val === 3 ||
          val === 7 ||
          val === 8 ||
          val === 10 ||
          val === 18 ||
          val === 30
        )
          this.p2 += score;
        if (
          val === 5 ||
          val === 6 ||
          val === 13 ||
          val === 14 ||
          val === 16 ||
          val === 22
        )
          this.p3 += score;
        if (
          val === 9 ||
          val === 11 ||
          val === 20 ||
          val === 21 ||
          val === 23 ||
          val === 28
        )
          this.p4 += score;
        if (val === 12 || val === 15 || val === 24 || val === 26 || val === 27)
          this.p5 += score;

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
      let p1 = Math.round((this.p1 * 100) / 36);
      let p2 = Math.round((this.p2 * 100) / 36);
      let p3 = Math.round((this.p3 * 100) / 36);
      let p4 = Math.round((this.p4 * 100) / 36);
      let p5 = Math.round((this.p5 * 100) / 30);
      let scores = Math.round((sum * 100) / 180);
      let text = "";

      switch (true) {
        case sum >= 140:
          text = "Высокий уровень эмоционального интеллекта";
          break;
        case sum >= 98 && sum <= 138:
          text = "Средний уровень эмоционального интеллекта";
          break;
        case sum <= 78:
          text = "Низкий уровень эмоционального интеллекта";
          break;
        default:
          break;
      }

      this.subResults[0].value = p1;
      this.subResults[1].value = p2;
      this.subResults[2].value = p3;
      this.subResults[3].value = p4;
      this.subResults[4].value = p5;

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
