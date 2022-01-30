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
        <v-slider v-model="sliderValue" min="0" max="1" @input="setAnswer">
        </v-slider>

        <v-btn text color="light" @click="setNextQuestion(sliderValue)"
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
import StressTestData from "../../data/tests/StressTestData";

import TestResults from "./TestResults";

export default {
  name: "StressTest",
  components: {
    TestResults,
  },
  data: () => ({
    text: "",
    questionNum: 1,

    data: StressTestData,

    showResults: false,
    answerSum: 0,

    sliderValue: 1,
    answers: ["нет, ко мне это не относится", "да, это про меня"],
    answerText: "",

    results: {},
    subResults: [],

    value: [],
    prevValue: [],
  }),
  created() {
    let i = testsInfo.findIndex((test) => test.url == "/test-stress");

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
      let scores = Math.round((sum * 100) / 18);
      let text = "";

      switch (true) {
        case sum >= 10:
          text = `Ваше здоровье в серьезнейшей опасности. Необходимо пункт за пунктом проанализировать ответы на тест и постараться немедленно заняться своим здоровьем.`;
          break;
        case sum >= 7 && sum <= 9:
          text = `Высокий уровень стресса на данный момент. Если в самое ближайшее время вы не предпримете решительных шагов к изменению своего образа жизни, то вас ожидают, к сожалению, крупные неприятности.`;
          break;
        case sum >= 4 && sum <= 6:
          text = `Пока ситуация не слишком тревожная, но уже необходимо обратить внимание на пункты, где ответ был утвердительным.`;
          break;
        case sum >= 0 && sum <= 3:
          text = `Нормальный уровень стресса. На всякий случай проверьте себя в течение еще одной недели, так как ваше субъективное восприятие «слишком много» или «слишком мало» может оказаться несамокритичным.`;
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
