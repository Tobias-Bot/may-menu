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
        <v-slider v-model="sliderValue" min="0" max="2" @input="setAnswer">
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
import MentalTestData from "../../data/tests/MentalTestData";

import TestResults from "./TestResults";

export default {
  name: "MentalTest",
  components: {
    TestResults,
  },
  data: () => ({
    text: "",
    questionNum: 1,

    data: MentalTestData,

    showResults: false,
    answerSum: 0,

    sliderValue: 1,
    answers: [
      "нет, совсем не про меня",
      "такое бывает, но редко",
      "да, это про меня",
    ],
    answerText: "",

    results: {},
    subResults: [
      {
        title: "Тревожность",
        value: 0,
      },
      {
        title: `Фрустрация (негативное состояние, вызванное невозможностью
            удовлетворения актуальных потребностей)`,
        value: 0,
      },
      {
        title: "Агрессивность",
        value: 0,
      },
      {
        title: `Ригидность (черта личности, которая характеризуется сильным
            сопротивлением или неспособностью к изменению поведения, мнения или
            отношения)`,
        value: 0,
      },
    ],

    value: [],
    prevValue: [],

    p1: 0,
    p2: 0,
    p3: 0,
    p4: 0,
  }),
  created() {
    let i = testsInfo.findIndex((test) => test.url == "/test-mental");

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

        if (val >= 0 && val < 10) {
          this.p1 += score;
        }

        if (val >= 10 && val < 20) {
          this.p2 += score;
        }

        if (val >= 20 && val < 30) {
          this.p3 += score;
        }

        if (val >= 30 && val < 40) {
          this.p4 += score;
        }

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
      let p1 = Math.round((this.p1 * 100) / 20);
      let p2 = Math.round((this.p2 * 100) / 20);
      let p3 = Math.round((this.p3 * 100) / 20);
      let p4 = Math.round((this.p4 * 100) / 20);
      let scores = Math.round((sum * 100) / 80);
      let text = "";

      switch (true) {
        case this.p1 >= 0 && this.p1 <= 7:
          text += "Низкий уровень тревожности. ";
          break;
        case this.p1 >= 8 && this.p1 <= 14:
          text += "Средний уровень тревожности, допустимый уровень. ";
          break;
        case this.p1 >= 15 && this.p1 <= 20:
          text += "Высокий уровень тревожности. ";
          break;
        default:
          break;
      }

      switch (true) {
        case this.p2 >= 0 && this.p2 <= 7:
          text +=
            "Не имеете высокой самооценки, устойчивы к неудачам, не боитесь трудностей. ";
          break;
        case this.p2 >= 8 && this.p2 <= 14:
          text += "Средний уровень фрустрации. ";
          break;
        case this.p2 >= 15 && this.p2 <= 20:
          text +=
            "У вас низкая самооценка, вы избегаете трудностей, боитесь неудач, фрустрированы. ";
          break;
        default:
          break;
      }

      switch (true) {
        case this.p3 >= 0 && this.p3 <= 7:
          text += "Вы спокойны и выдержаны. ";
          break;
        case this.p3 >= 8 && this.p3 <= 14:
          text += "Средний уровень агрессивности. ";
          break;
        case this.p3 >= 15 && this.p3 <= 20:
          text +=
            "Вы агрессивны, не выдержаны, есть трудности при общении и работе с людьми. ";
          break;
        default:
          break;
      }

      switch (true) {
        case this.p4 >= 0 && this.p4 <= 7:
          text += "Ригидности нет, легкая переключаемость. ";
          break;
        case this.p4 >= 8 && this.p4 <= 14:
          text += "Средний уровень ригидности. ";
          break;
        case this.p4 >= 15 && this.p4 <= 20:
          text +=
            "Сильно выраженная ригидность, неизменность поведения, убеждений, взглядов, даже если они расходятся, не соответствуют реальной обстановке, жизни. ";
          break;
        default:
          break;
      }

      this.subResults[0].value = p1;
      this.subResults[1].value = p2;
      this.subResults[2].value = p3;
      this.subResults[3].value = p4;

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
