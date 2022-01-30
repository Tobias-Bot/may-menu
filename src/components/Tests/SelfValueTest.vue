<template>
  <v-container>
    <div class="testTitle">{{ test.data.title }}</div>
    <div class="cardHintText">{{ text }}</div>
    <div v-show="!showResults">
      <div v-if="data[questionNum - 1]" class="testCard">
        <div class="cardText">
          {{ data[questionNum - 1].text }}
        </div>
        <div style="text-align: center">
          <v-btn
            v-for="(btn, i) in data[questionNum - 1].btns"
            :key="i"
            text
            class="my-2 mx-1"
            style="display: inline-block; font-size: 10px"
            color="light"
            @click="setNextQuestion(btn.value)"
            >{{ btn.title }}</v-btn
          >
        </div>
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
import SelfValueTestData from "../../data/tests/SelfValueTestData";

import TestResults from "./TestResults";

export default {
  name: "SelfValueTest",
  components: {
    TestResults,
  },
  data: () => ({
    text: "",
    questionNum: 1,

    data: SelfValueTestData,

    showResults: false,
    answerSum: 0,

    results: {},
    subResults: [],

    value: [],
    prevValue: [],
  }),
  created() {
    let i = testsInfo.findIndex((test) => test.url == "/test-selfvalue");

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
      let scores = Math.round((sum * 100) / 27);
      let text = "";

      switch (true) {
        case sum >= 21 && sum <= 27:
          text = `Ваша самоценность находится на достаточно высоком уровне. Вы не дадите
        себя в обиду и сможете о себе позаботиться. Вы слышите себя и ориентируетесь
        на свои чувства и желания в принятии решений. <br /><br /> Есть моменты над которыми еще
        можно поработать, но в целом у вас есть ощущение, что вы себе важны и ценны.`;
          break;
        case sum >= 11 && sum <= 20:
          text = `Ваша самоценность напоминает море в период приливов и отливов. Если
        вокруг все спокойно и вы довольны тем, как идут дела, то вы себя цените и
        одобряете. Как только что-то идет не так, вы склонны начать критиковать себя
        или ругать за ошибки. <br /><br /> Если вы повысите свою самоценность, то внутри почувствуете
        больше гармонии, спокойствия и удовлетворенности собой. А изменения к лучшему в
        отношениях, карьере, деньгах и здоровье не заставят себя долго ждать.`;
          break;
        case sum >= 0 && sum <= 10:
          text = `Вы почти не цените себя. Для этого вам нужен веский повод. Чаще всего вы
        слышите голос внутреннего критика, который говорит о том, что вы опять все сделали
        не так. <br /><br /> Вы уже смирились с тем, что не достаточно хороши, чтобы жить счастливо и
        привыкли терпеть лишения. Внутри много напряжения, грусти и безысходности.`;
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
