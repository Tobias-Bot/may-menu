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
        <v-slider v-model="sliderValue" min="0" max="3" @input="setAnswer">
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
import DepressionTestData from "../../data/tests/DepressionTestData";

import TestResults from "./TestResults";

export default {
  name: "DepressionTest",
  components: {
    TestResults,
  },
  data: () => ({
    text: "",
    questionNum: 1,

    data: DepressionTestData,

    showResults: false,
    answerSum: 0,

    sliderValue: 1,
    answers: ["никогда или изредка", "иногда", "часто", "постоянно"],
    answerText: "",

    results: {},
    subResults: [],

    value: [],
    prevValue: [],
  }),
  created() {
    let i = testsInfo.findIndex((test) => test.url == "/test-depression");

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

        if (this.data[this.questionNum - 2].revert) {
          switch (score) {
            case 1:
              this.answerSum += 4;
              break;
            case 2:
              this.answerSum += 3;
              break;
            case 3:
              this.answerSum += 2;
              break;
            case 4:
              this.answerSum += 1;
              break;
            default:
              break;
          }
        } else {
          this.answerSum += score;
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

      let sum = this.answerSum;
      let scores = Math.round((sum * 100) / 80);
      let text = "";

      switch (true) {
        case sum <= 50:
          text = "Состояние без депрессии";
          break;
        case sum > 50 && sum <= 59:
          text = `Состояние легкой депрессии ситуативного или невротического генеза.
        Невротическая депрессия  (или ситуационная депрессия) это один из видов
        нарушений психо-эмоционального состояния личности, зачастую имеющего
        ситуационный характер. <br/><br/> Данное заболевание включает в себя проявления сразу
        двух психологических заболеваний: невроза и депрессии. Тем не менее, этот
        факт не указывает на особую тяжесть заболевания, а лишь определяет
        особенности протекания и симптомы.`;
          break;
        case sum >= 60 && sum <= 69:
          text = `Субдепрессивное состояние или маскированная депрессия. При маскированной
        депрессии классические аффективные компоненты депрессии (пониженный эмоциональный
          фон, апатия, уход от контактов с внешним миром и т. д.) могут быть очень
          незначительными или даже совсем отсутствовать. <br/><br/> Пациент, как правило, не осознаёт
          депрессивного расстройства. Часто он убежден в наличии у себя какого-либо редкого
          и трудно диагностируемого соматического заболевания, либо имеет какие-либо
          невротические симптомы, расстройства биологического ритма и т.п.`;
          break;
        case sum >= 70:
          text = `Истинное депрессивное состояние. Основными признаками такого состояния являются
        сниженное настроение и снижение или утрата способности получать удовольствие (ангедония). <br/><br/>
        Обычно также присутствуют некоторые из следующих симптомов: сниженная самооценка,
        неадекватное чувство вины, пессимизм, нарушение концентрации внимания, усталость или
        отсутствие энергии, расстройства сна и аппетита, суицидальные тенденции. <br/><br/> Тяжёлые формы
        депрессии характеризуются так называемой «депрессивной триадой»: снижением настроения,
        заторможенностью мышления и двигательной заторможенностью.`;
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
