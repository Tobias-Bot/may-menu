<template>
  <v-app>
    <v-dialog fullscreen dark scrollable v-model="menu">
      <v-card tile light color="white">
        <v-card-title>
          <v-btn icon light @click="menu = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text style="padding: 30px 5px; text-align: center">
          <v-btn
            v-for="(card, i) in cardBtns.main"
            :key="i"
            class="cardBtns my-2 mx-2"
            :disabled="currentPath(card.url)"
            color="light"
            text
            @click="goTo(card.url, card.app)"
          >
            <v-icon light>mdi-{{ card.icon }}</v-icon>
            <span>{{ card.title }}</span>
          </v-btn>
          <br />
          <br />
          <br />
          <v-btn
            v-for="(card, j) in cardBtns.staff"
            :key="card.url + j"
            class="cardBtns my-2 mx-2"
            :disabled="currentPath(card.url)"
            color="light"
            text
            x-small
            @click="goTo(card.url)"
          >
            {{ card.title }}
          </v-btn>
        </v-card-text>

        <v-card-actions style="width: 100%; text-align: center">
          <v-row justify="center" class="my-4">
            <v-btn
              class="cardBtns"
              :disabled="currentPath('/')"
              color="black"
              text
              @click="goTo('/')"
            >
              <v-icon light>mdi-home</v-icon>
              <span>На главную</span>
            </v-btn>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog dark scrollable persistent v-model="acceptModal">
      <v-card tile light color="white">
        <v-card-text style="padding: 30px 10px; text-align: center">
          {{ acceptModalText }}
        </v-card-text>

        <v-card-actions style="width: 100%; text-align: center">
          <v-row justify="center" class="my-4">
            <v-btn class="cardBtns" color="black" text @click="getAccess()">
              <span>Продолжить</span>
            </v-btn>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <div class="headerLineTop"></div>
    <div class="headerLineTopSecond">
      <span class="logoTitle">Мαú</span>
    </div>
    <div class="header">
      <a
        href="https://vk.com/warmay"
        target="_blank"
        rel="noopener noreferrer"
        ref="linkRef"
        ><img id="logo" :src="logo" alt="logo"
      /></a>
    </div>
    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid style="padding: 15px 10px 40px 10px">
        <router-view />
      </v-container>
    </v-main>

    <div class="footer">
      <v-btn
        fab
        right
        bottom
        fixed
        light
        color="white"
        style="box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.2)"
        @click="menu = !menu"
      >
        <v-icon dark> mdi-creation </v-icon>
      </v-btn>
    </div>

    <div class="headerLineBotSecond">
      <span class="footerText">Made for u with ♥</span>
    </div>

    <div class="headerLineBot"></div>
  </v-app>
</template>

<script>
import bridge from "@vkontakte/vk-bridge";
import logo from "./pics/logo.png";

import MainMenuModalData from "./data/MainMenuModalData.js";

//const group_id = 160404048;

export default {
  name: "App",

  data: () => ({
    logo,

    menu: false,
    acceptModal: false,
    acceptModalText: `Добро пожаловать в Май! Прежде чем мы продолжим, нам потребуется
          информация из твоего профиля Вконтакте для корректной работы
          приложения`,

    cardBtns: MainMenuModalData,
  }),

  created() {
    this.getInitialProps();

    this.$store.commit("setDate", null);
  },
  computed: {
    appId() {
      return this.$store.getters.getAppId;
    },
  },
  methods: {
    getInitialProps() {
      bridge.send("VKWebAppGetLaunchParams").then((r) => {
        let tokens = r.vk_access_token_settings;

        if (!tokens) {
          this.acceptModal = true;
        } else {
          bridge
            .send("VKWebAppGetAuthToken", {
              app_id: this.appId,
              scope: "groups",
            })
            .then((r) => {
              this.$store.dispatch("isDon", r.access_token);
              this.$store.commit("setToken", r.access_token);
            });
        }
      });
    },
    goToMay() {
      this.$refs.linkRef.click();
    },
    goTo(url, app) {
      if (!app) {
        this.$router.push(url);
        this.menu = false;
      } else {
        bridge.send("VKWebAppOpenApp", { app_id: app });
      }
    },
    currentPath(url) {
      return this.$router.currentRoute.path == url;
    },
    getAccess() {
      bridge
        .send("VKWebAppGetAuthToken", {
          app_id: this.appId,
          scope: "groups",
        })
        .then((r) => {
          this.$store.dispatch("isDon", r.access_token);
          this.$store.commit("setToken", r.access_token);

          this.acceptModalText = "Спасибо!";

          setTimeout(() => {
            this.acceptModal = false;
          }, 1500);
        });
    },
  },
};
</script>
