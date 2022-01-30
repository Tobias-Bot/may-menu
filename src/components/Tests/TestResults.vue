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

    <div v-if="isMember">
      <div v-if="showResults">
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

        <div v-if="subResults.length" class="testCard">
          <div v-for="(res, i) in subResults" :key="i">
            <div class="cardHintText">
              {{ res.title }}
            </div>
            <v-progress-linear
              color="#a6adfd"
              buffer-value="0"
              :value="res.value"
              height="10"
              stream
              rounded
            ></v-progress-linear>
            <br />
            <br />
          </div>
        </div>

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
export default {
  name: "TestResults",
  props: ["showResults", "results", "subResults", "value", "prevValue"],
  components: {},
  data: () => ({
    showInfo: false,
    grathFilled: false,
  }),
  computed: {
    test() {
      return this.$store.getters.getCurrentTest;
    },
    isMember() {
      return this.$store.getters.isMember;
    },
  },
  methods: {
    shareTest() {
      this.$store.dispatch("shareTest", null);
    },
    subscribe() {
      this.$store.dispatch("joinCommunity");
    },
  },
};
</script>
