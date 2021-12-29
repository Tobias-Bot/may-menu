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
          text
          class="my-1 mx-1"
          style="display: inline-block; font-size: 11px"
          color="light"
          @click="setNextQuestion(1)"
          >никогда или изредка</v-btn
        >
        <v-btn
          text
          class="my-1 mx-1"
          style="display: inline-block; font-size: 11px"
          color="light"
          @click="setNextQuestion(2)"
          >иногда</v-btn
        >
        <v-btn
          text
          class="my-1 mx-1"
          style="display: inline-block; font-size: 11px"
          color="light"
          @click="setNextQuestion(3)"
          >часто</v-btn
        >
        <v-btn
          text
          class="my-1 mx-1"
          style="display: inline-block; font-size: 11px"
          color="light"
          @click="setNextQuestion(4)"
          >постоянно</v-btn
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
      <div
        class="testCard"
        :style="
          results.text && results.text.length > 30 ? 'text-align: left;' : ''
        "
      >
        <div class="cardHintText">описание</div>
        <span v-html="results.text"></span>
      </div>
    </div>
    <div v-if="showResults">
      <div class="testCard">
        <div class="cardHintText">статистика за последнее время</div>
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

import DepressionTestData from "../../data/tests/DepressionTestData";

export default {
  name: "DepressionTest",
  components: {},
  data: () => ({
    text: "",
    questionNum: 1,

    data: DepressionTestData,

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
