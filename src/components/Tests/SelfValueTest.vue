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
          ><span v-html="test.data.text"></span>
        </v-card-text>
      </v-card>
    </v-dialog>

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

import SelfValueTestData from "../../data/tests/SelfValueTestData";

export default {
  name: "SelfValueTest",
  components: {},
  data: () => ({
    text: "",
    questionNum: 1,

    data: SelfValueTestData,

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
  //   beforeDestroy() {
  //     this.$store.commit("resetTest", null);
  //   },
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
