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
        <v-btn
          text
          class="my-1 mx-1"
          style="display: inline-block; font-size: 11px"
          color="light"
          @click="setNextQuestion(1)"
          >нет, никогда</v-btn
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
          >почти всегда</v-btn
        >
        <v-btn
          text
          class="my-1 mx-1"
          style="display: inline-block; font-size: 11px"
          color="light"
          @click="setNextQuestion(5)"
          >всегда</v-btn
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

import EmpathyTestData from "../../data/tests/EmpathyTestData";

export default {
  name: "EmpathyTest",
  components: {},
  data: () => ({
    text: "",
    questionNum: 1,

    data: EmpathyTestData,

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
      let tasks = [
        2, 5, 8, 9, 10, 12, 13, 15, 16, 19, 21, 22, 24, 25, 26, 27, 29, 32,
      ];

      this.questionNum++;

      if (this.questionNum <= this.data.length) {
        this.text = `Вопрос ${this.questionNum} из ${this.data.length}`;

        if (tasks.includes(this.questionNum - 1)) {
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
      let scores = Math.round((sum * 100) / 90);
      let text = "";

      switch (true) {
        case sum >= 82 && sum <= 90:
          text = `Очень высокий уровень эмпатийности. У вас болезненно развито сопереживание.
        В общении, как барометр, тонко реагируете на настроение собеседника, еще не
        успевшего сказать ни слова. Вам трудно от того, что окружающие используют вас
        в качестве громоотвода, обрушивая на вас эмоциональное состояние. Плохо
        чувствуете себя в присутствии «тяжелых» людей. <br /><br /> Взрослые и дети охотно доверяют
        вам свои тайны и идут за советом. Нередко испытываете комплекс вины, опасаясь
        причинить людям хлопоты; не только словом, но даже взглядом боитесь задеть их.
        В то же время сами очень ранимы. <br /><br /> Ваша впечатлительность порой долго не дает
        заснуть. Будучи в расстроенных чувствах, нуждаетесь в эмоциональной поддержке
        со стороны. При таком отношении к жизни вы близки к невротическим срывам.
        Побеспокойтесь о психическом здоровье.`;
          break;
        case sum >= 63 && sum <= 81:
          text = `Высокая эмпатийность. Вы чувствительны к нуждам и проблемам окружающих,
        великодушны, склонны многое им прощать. С неподдельным интересом относитесь к
        людям. Вам нравиться «читать» их лица и «заглядывать» в их будущее, вы
        эмоционально отзывчивы, общительны, быстро устанавливаете контакты с окружающими
        и находите общий язык. Должно быть, и дети тянутся к вам. <br /><br /> Окружающие ценят вашу
        душевность. Вы стараетесь не допускать конфликты и находить компромиссные решения.
        Хорошо переносите критику в свой адрес. В оценке событий больше доверяете своим
        чувствам и интуиции, чем аналитическим выводам. <br /><br /> Предпочитаете работать с людьми,
        нежели в одиночку. Постоянно нуждаетесь в социальном одобрении своих действий.
        При всех перечисленных качествах вы не всегда аккуратны в точной и кропотливой
        работе. Не стоит особого труда вывести вас из равновесия.`;
          break;
        case sum >= 37 && sum <= 62:
          text = `Нормальный уровень эмпатийности, присущий подавляющему большинству людей.
        Окружающие не могут назвать вас «толстокожим», но в то же время вы не относитесь
        к числу особо чувствительных лиц. В межличностных отношениях судить о других
        более склонны по их поступкам, чем доверять своим личным впечатлениям. <br /><br /> Вам не
        чужды эмоциональные проявления, но в большинстве своем они находятся под самоконтролем.
        В общении внимательны, стараетесь понять больше, чем сказано словами, но при излишнем
        влиянии чувств собеседника теряете терпение. <br /><br /> Затрудняетесь прогнозировать развитие
        отношений между людьми, поэтому, случается, что их поступки оказываются для вас
        неожиданными. У вас нет раскованности чувств, и это мешает вашему полноценному
        восприятию людей.`;
          break;
        case sum >= 12 && sum <= 36:
          text = `Низкий уровень эмпатийности. Вы испытываете затруднения в установлении
        контактов с людьми, неуютно чувствуете себя в большой компании. Эмоциональные проявления
        в поступках окружающих подчас кажутся Вам непонятными и лишенными смысла. <br /><br /> Бывает,
        когда чувствуете свою отчужденность, окружающие не слишком жалуют вас вниманием.
        Но это поправимо, если вы раскроете панцирь и станете пристальнее всматриваться в
        поведение близких и принимать их проблемы как свои.`;
          break;
        case sum <= 11:
          text = `Очень низкий уровень. Эмпатийные тенденции личности не развиты. Особенно
        трудны контакты с детьми и лицами, которые намного старше вас. В межличностных
        отношениях нередко оказываетесь в неловком положении. <br /><br /> Во многом не находите взаимопонимания
        с окружающими. Любите острые ощущения, спортивные состязания предпочитаете искусству.
        В деятельности слишком сконцентрированы на себе. <br /><br /> Вы можете быть очень продуктивны в
        индивидуальной работе, во взаимодействии же с другими не всегда выглядите в лучшем свете.
        Болезненно переносите критику в свой адрес, хотя можете на нее бурно не реагировать.
        Необходима гимнастика чувств.`;
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
