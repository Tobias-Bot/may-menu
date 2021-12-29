<template>
  <v-container>
    <v-card
      v-for="(chat, i) in chats"
      :key="i"
      class="mx-auto mb-4"
      style="border-radius: 25px"
    >
      <v-img :src="chat.background" height="150px"></v-img>

      <v-card-title> {{ chat.title }} </v-card-title>

      <v-card-subtitle> {{ chat.text }} </v-card-subtitle>

      <v-card-actions>
        <v-btn
          color="light"
          text
          :href="chat.url"
          target="_blank"
          :disabled="chat.premium && !isDon"
        >
          войти
        </v-btn>
        <v-btn v-if="chat.premium && !isDon" to="/premium" color="light" text small>
          о подписке
        </v-btn>
      </v-card-actions>
    </v-card>

    <!-- <div class="pageToolBar">
      <v-btn class="mr-2" light color="white" @click="shareTest">
        <v-icon dark> mdi-share </v-icon>
      </v-btn>
    </div> -->
  </v-container>
</template>

<script>
import chats from "../data/Chats.js";

export default {
  name: "Chats",
  data: () => ({
    chats,
  }),
  computed: {
    isDon() {
      let isDon = this.$store.getters.isPremium;

      if (isDon) isDon = true;
      else isDon = false;

      return isDon;
    },
  },
  methods: {},
};
</script>
