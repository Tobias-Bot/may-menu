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
        <v-slider v-model="sliderValue" min="0" max="4" @input="setAnswer">
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
import EmpathyTestData from "../../data/tests/EmpathyTestData";

import TestResults from "./TestResults";

export default {
  name: "EmpathyTest",
  components: {
    TestResults,
  },
  data: () => ({
    text: "",
    questionNum: 1,

    data: EmpathyTestData,

    showResults: false,
    answerSum: 0,

    sliderValue: 1,
    answers: ["нет, никогда", "иногда", "часто", "почти всегда", "всегда"],
    answerText: "",

    results: {},
    subResults: [],

    value: [],
    prevValue: [],
  }),
  created() {
    let i = testsInfo.findIndex((test) => test.url == "/test-empathy");

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
