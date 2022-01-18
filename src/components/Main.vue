<template>
  <v-container>
    <NoteBar :notes="Notes" />
    <br />
    <v-card class="cardCover">
      <div class="cardHintText">Трекер настроения</div>

      <div v-if="TrackerValue.length">
        <v-sparkline
          class="mb-3"
          :gradient="['#ff8fcb', '#a6adfd']"
          color="#8A9EFE"
          line-width="3"
          padding="10"
          smooth="6"
          :value="TrackerValue"
          auto-draw
        ></v-sparkline>
      </div>

      <v-btn
        text
        class="mx-5"
        style="display: inline-block"
        color="light"
        @click="loadTrackerData"
        >Открыть</v-btn
      >
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
      <v-btn class="mr-2" light small color="white" @click="shareApp">
        <v-icon dark> mdi-share </v-icon>
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
  data: () => ({}),
  created() {
    this.getNotes();
  },
  computed: {
    Notes() {
      return this.$store.getters.getNotes;
    },
    TrackerValue() {
      return this.$store.getters.getCurrentTrackerValue;
    },
  },
  methods: {
    shareApp() {
      let appId = this.$store.getters.getAppId;

      bridge.send("VKWebAppShare", {
        link: `https://vk.com/app${appId}`,
      });
    },
    getNotes() {
      if (!this.Notes.length) {
        this.$store.dispatch("getNotes");
      }
    },
    loadTrackerData() {
      let tracker = {
        value: [],
      };

      this.$store.commit("setCurrentTracker", tracker);
      this.$store.dispatch("loadValueOfCurrentTracker", "tracker-mood");
      this.$router.push("/tracker-mood");
    },
  },
};
</script>
