<template>
  <v-container>
    <!-- <v-dialog dark scrollable v-model="showInfo">
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
    </v-dialog> -->

    <div class="testTitle">Трекер настроения</div>
    <div v-show="!showResults">
      <div class="testCard">
        <div class="cardText">Как ты себя чувствуешь сегодня?</div>

        <br />

        <v-slider v-model="sliderValue" thumb-label="always">
          <template v-slot:thumb-label="{ value }">
            <span style="font-size: 38px">{{
              emojis[Math.min(Math.floor(value / 10), 9)]
            }}</span>
          </template>
        </v-slider>

        <v-btn
          text
          class="mx-5"
          style="display: inline-block"
          color="light"
          @click="saveResults"
          >Сохранить</v-btn
        >
      </div>
    </div>

    <div v-if="isMember">
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
            color="#8A9EFE"
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
          Cтатистика доступна только пользователям, которые подписаны на
          сообщество Май
        </div>
        <v-btn class="mr-4" light small color="white" @click="subscribe">
          Подписаться
        </v-btn>
      </div>
    </div>

    <div class="pageToolBar">
      <v-btn to="/" class="mr-3 py-3" x-small light color="white">
        <v-icon dark> mdi-close </v-icon>
      </v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "MoodTracker",
  components: {},
  data: () => ({
    showResults: false,
    grathFilled: false,
    showInfo: false,

    value: [],
    prevValue: [],

    emojis: ["😭", "😢", "☹️", "🙁", "😐", "🙂", "😊", "😁", "😄", "😍"],
    sliderValue: 50,
  }),
  computed: {
    tracker() {
      return this.$store.getters.getCurrentTracker;
    },
    isMember() {
      return this.$store.getters.isMember;
    },
  },
  methods: {
    getResults() {
      this.value = this.$store.getters.getCurrentTrackerValue;

      if (this.value.length == 1) {
        this.value.unshift(0);
      }

      if (this.value.length > 2) {
        this.prevValue = this.value.slice(-2);
      }

      this.showResults = true;
    },
    saveResults() {
      let value = this.sliderValue;

      this.$store.dispatch("saveTrackerResults", value);

      this.getResults();
    },
  },
};
</script>
