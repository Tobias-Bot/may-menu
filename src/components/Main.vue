<template>
  <v-container>
    <div><NoteBar :notes.sync="notes" /></div>
    <br />
    <br />
    <v-card class="cardCover" style="text-align: left">
      <div class="cardHintText">О Приложении</div>
      <span
        >Приложение находится на этапе разработки, но ты уже можешь пользоваться
        им. Если у тебя есть свои идеи, что можно было бы добавить в приложение,
        пиши нам в личные сообщения, мы будем рады 🌿
      </span>
      <!-- <v-sparkline
        class="mb-3"
        :gradient="['#ff8fcb', '#a6adfd']"
        color="#8A9EFE"
        line-width="3"
        padding="10"
        smooth="6"
        :value="value"
        auto-draw-easing
      ></v-sparkline> -->
    </v-card>

    <div class="pageToolBar">
      <v-btn
        href="https://vk.com/im?sel=-160404048"
        target="_blank"
        class="mr-2"
        light
        color="white"
        small
      >
        <v-icon dark> mdi-forum </v-icon> Написать в Май
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import bridge from "@vkontakte/vk-bridge";

import NoteBar from "./Notes/NoteBar";

export default {
  name: "Main",
  components: {
    NoteBar,
  },
  data: () => ({
    notes: [],

    moodValue: [],
  }),
  created() {
    this.getNotes();
  },
  methods: {
    getNotes() {
      bridge.send("VKWebAppStorageGet", { keys: ["notes"] }).then((res) => {
        this.notes = JSON.parse(res.keys[0].value);
      });
    },
    setMoodTrackerPoint() {
      // let date = this.$store.getters.getToday;
      // let value =
      // let point = {
      //   d: date,
      //   v:
      // }
      // this.$store.dispatch("saveTrackerResults", point);
    },
  },
};
</script>
