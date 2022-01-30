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

      <v-btn text class="mx-5" color="light" @click="loadTrackerData"
        >Открыть</v-btn
      >
    </v-card>

    <v-card v-if="isDon !== null && !isDon" class="cardCover">
      <v-img
        height="200"
        style="border-radius: inherit"
        src="https://64.media.tumblr.com/52a3e77155f041b556fe76ccbd66a1d5/tumblr_pphfez5UAu1we9f2ro1_r2_1280.gifv"
      ></v-img>

      <div class="cardHintText">
        Полный доступ к приложению в одной подписке Май!
      </div>

      <v-btn text class="mx-5" color="light" to="/premium">Подробнее</v-btn>
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
    isDon() {
      return this.$store.getters.isPremium;
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
