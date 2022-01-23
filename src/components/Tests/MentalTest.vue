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

    <div v-if="isMember">
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
        <div class="testCard">
          <div class="cardHintText">Тревожность</div>
          <v-progress-linear
            color="#a6adfd"
            buffer-value="0"
            :value="results.p1"
            height="10"
            stream
            rounded
          ></v-progress-linear>
          <br />
          <br />
          <div class="cardHintText">
            Фрустрация (негативное состояние, вызванное невозможностью
            удовлетворения актуальных потребностей)
          </div>
          <v-progress-linear
            color="#a6adfd"
            buffer-value="0"
            :value="results.p2"
            height="10"
            stream
            rounded
          ></v-progress-linear>
          <br />
          <br />
          <div class="cardHintText">Агрессивность</div>
          <v-progress-linear
            color="#a6adfd"
            buffer-value="0"
            :value="results.p3"
            height="10"
            stream
            rounded
          ></v-progress-linear>
          <br />
          <br />
          <div class="cardHintText">
            Ригидность (черта личности, которая характеризуется сильным
            сопротивлением или неспособностью к изменению поведения, мнения или
            отношения)
          </div>
          <v-progress-linear
            color="#a6adfd"
            buffer-value="0"
            :value="results.p4"
            height="10"
            stream
            rounded
          ></v-progress-linear>
        </div>
      </div>
      <div v-if="showResults">
        <div v-if="prevValue.length" class="testCard">
          <div class="cardHintText">сравнение с предыдущей отметкой</div>
          <div class="cardHintText"></div>
          <v-sparkline
            class="mb-3"
            :fill="grathFilled"
            :gradient="['#ff8fcb', '#a6adfd']"
            color="#8A9EFE"
            line-width="3"
            padding="10"
            smooth="6"
            :value="prevValue"
            label-size="13"
            auto-draw
          >
            <template v-slot:label="item">
              {{ item.value }}
            </template>
          </v-sparkline>
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

        <div class="testCard">
          <div class="cardHintText">статистика за последнее время</div>
          <div class="cardHintText"></div>
          <v-sparkline
            class="mb-3"
            :fill="grathFilled"
            :gradient="['#ff8fcb', '#a6adfd']"
            line-width="3"
            padding="10"
            smooth="6"
            :value="value"
            auto-draw
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
    </div>
    <div v-else-if="showResults">
      <div class="testCard">
        <div class="cardHintText">
          Описание и статистика по результатам теста доступна только
          пользователям, которые подписаны на сообщество Май
        </div>
        <v-btn class="mr-4" light small color="white" @click="subscribe">
          Подписаться
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

import testsInfo from "../../data/tests/testsInfo";
import MentalTestData from "../../data/tests/MentalTestData";

export default {
  name: "MentalTest",
  components: {},
  data: () => ({
    text: "",
    questionNum: 1,

    data: MentalTestData,

    showResults: false,
    answerSum: 0,

    grathFilled: false,

    sliderValue: 1,
    answers: [
      "нет, совсем не про меня",
      "такое бывает, но редко",
      "да, это про меня",
    ],
    answerText: "",

    results: {},

    value: [],
    prevValue: [],

    showInfo: false,

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
  // beforeDestroy() {
  //   this.$store.commit("resetTest", null);
  // },
  computed: {
    test() {
      return this.$store.getters.getCurrentTest;
    },
    isMember() {
      return this.$store.getters.isMember;
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

      this.results = {
        scores,
        text,
        p1,
        p2,
        p3,
        p4,
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
    shareTest() {
      this.$store.dispatch("shareTest", null);
    },
    subscribe() {
      this.$store.dispatch("joinCommunity");
    },
  },
};
</script>
