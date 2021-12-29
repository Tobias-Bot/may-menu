<template>
  <v-container>
    <v-dialog dark scrollable v-model="showInfo">
      <v-card tile light color="white">
        <v-card-title>
          <v-btn icon light @click="showInfo = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="mx-1 my-2"
          ><span v-html="test.data.text"></span
        ></v-card-text>
      </v-card>
    </v-dialog>

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

    <div v-show="showResults">
      <div class="testCard">
        <div class="cardTextResult">{{ results.scores }} из 100</div>
        <v-progress-linear
          color="#ff8fcb"
          buffer-value="0"
          :value="results.scores"
          height="10"
          stream
          rounded
        ></v-progress-linear>
      </div>
      <div class="testCard">
        <div class="cardHintText">описание</div>
        {{ results.text }}
      </div>
    </div>
    <div v-if="showResults">
      <div class="testCard">
        <div class="cardHintText">статистика за последнее время</div>
        <div class="cardHintText"></div>
        <v-sparkline
          class="mb-3"
          :fill="grathFilled"
          :gradient="['#ff8fcb', '#a6adfd']"
          color="#8A9EFE"
          line-width="3"
          padding="10"
          smooth="6"
          :value="value"
          auto-draw-easing
        ></v-sparkline>
        <!-- <v-btn class="mr-4" light small color="white">
          <v-icon dark> mdi-chart-timeline-variant </v-icon>
        </v-btn>
        <v-btn class="mr-4" light small color="white">
          <v-icon dark> mdi-chart-gantt </v-icon>
        </v-btn> -->
        <v-btn
          class="mr-4"
          light
          small
          color="white"
          @click="grathFilled = !grathFilled"
        >
          <v-icon v-show="!grathFilled" dark> mdi-invert-colors </v-icon>
          <v-icon v-show="grathFilled" dark> mdi-invert-colors-off </v-icon>
        </v-btn>
      </div>
    </div>

    <div class="pageToolBar">
      <v-btn to="/tests" class="mr-3 py-3" x-small light color="white">
        <v-icon dark> mdi-close </v-icon>
      </v-btn>
      <v-btn class="mr-2" light color="white" @click="showInfo = true">
        <v-icon dark> mdi-information-variant </v-icon>
      </v-btn>
      <v-btn class="mr-2" light color="white" @click="shareTest">
        <v-icon dark> mdi-share </v-icon>
      </v-btn>
    </div>
  </v-container>
</template>

<script>
//import bridge from "@vkontakte/vk-bridge";

import AnxietyTestData from "../../data/tests/AnxietyTestData";

export default {
  name: "AnxietyTest",
  components: {},
  data: () => ({
    text: "",
    questionNum: 1,

    data: AnxietyTestData,

    showResults: false,
    answerSum: 0,

    grathFilled: false,

    results: {},

    value: [],

    showInfo: false,
  }),
  mounted() {
    this.text = `Вопрос ${this.questionNum} из ${this.data.length}`;
  },
  // beforeDestroy() {
  //   this.$store.commit("resetTest", null);
  // },
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
      let scores = Math.round((sum * 100) / 49);
      let text = "";

      switch (true) {
        case sum > 39 && sum <= 49:
          text = `Очень высокий уровень тревоги`;
          break;
        case sum > 24 && sum <= 39:
          text = `Высокий уровень тревоги`;
          break;
        case sum > 14 && sum <= 24:
          text = `Средний уровень тревоги (с тенденцией к высокому)`;
          break;
        case sum > 4 && sum <= 14:
          text = `Средний уровень тревоги (с тенденцией к низкому)`;
          break;
        case sum >= 0 && sum <= 4:
          text = `Низкий уровень тревоги`;
          break;
        default:
          break;
      }

      this.results = {
        scores,
        text,
      };

      this.value.push(scores);

      this.saveTestResults();
    },
    saveTestResults() {
      let value = this.results.scores;

      this.$store.dispatch("saveTestResults", value);
    },
    shareTest() {
      this.$store.dispatch("shareTest", null);
    },
  },
};
</script>
