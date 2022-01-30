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
            small
            @click="goTo(card.url)"
          >
            {{ card.title }}
          </v-btn>
          <br />
          <br />
          <br />
          <v-btn
            v-for="(card, j) in cardBtns.social"
            :key="card.url + j"
            class="cardBtns my-2 mx-2"
            color="light"
            text
            x-small
            :href="card.url"
            target="_blank"
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

    <!-- <v-dialog dark scrollable v-model="rolesModal">
      <v-card tile light color="white">
        <v-card-title>
          <v-btn icon light @click="menu = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text></v-card-text>
      </v-card>
    </v-dialog> -->

    <v-dialog dark scrollable persistent v-model="acceptModal">
      <v-card tile light color="white">
        <v-card-text style="padding: 35px 10px; text-align: center">
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

    <v-dialog dark scrollable v-model="statusModal">
      <v-card tile light color="white">
        <v-card-title>
          <v-btn icon light @click="statusModal = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text style="padding: 20px 30px 30px 40px">
          <div v-for="(status, i) in statuses" :key="i">
            <v-icon :color="status.color" dark> mdi-{{ status.icon }} </v-icon>
            — {{ status.text }} <br /><br />
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

    <div class="headerLineTop"></div>
    <div class="headerLineTopSecond" @click="statusModal = true">
      <span class="logoTitle">Мαú</span>
      <template v-if="role == 'admin'">
        <v-icon color="purple" dark> mdi-crown-circle </v-icon></template
      >
      <template v-else>
        <template v-if="role == 'user' && !isDon && !isMember">
          <v-icon color="grey" dark> mdi-account-circle </v-icon>
        </template>
        <template v-else>
          <template v-if="isMember"
            ><v-icon color="green" dark> mdi-check-decagram </v-icon></template
          >
          <template v-if="isDon">
            <v-icon color="pink" dark> mdi-charity </v-icon>
          </template>
        </template>
      </template>
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
      <span class="footerText">{{ footerText }}</span>
    </div>

    <div class="headerLineBot"></div>
  </v-app>
</template>

<script>
import bridge from "@vkontakte/vk-bridge";
import logo from "./pics/logo.png";

import statuses from "./data/Statuses.js";
import msg from "./data/MessagesForYou.js";
import MainMenuModalData from "./data/MainMenuModalData.js";

export default {
  name: "App",

  data: () => ({
    logo,
    statuses,
    msg,

    menu: false,
    acceptModal: false,
    rolesModal: false,
    statusModal: false,
    acceptModalText: `Добро пожаловать в Май! Прежде чем мы продолжим, нам потребуется
          информация из твоего профиля Вконтакте (только общедоступные данные) для корректной работы
          приложения`,
    footerText: "",

    cardBtns: MainMenuModalData,

    userId: 0,
  }),

  created() {
    this.getInitialProps();

    this.$store.commit("setDate", null);
  },
  updated() {
    this.getRandomMsg();
  },
  computed: {
    appId() {
      return this.$store.getters.getAppId;
    },
    isDon() {
      return this.$store.getters.isPremium;
    },
    isMember() {
      return this.$store.getters.isMember;
    },
    role() {
      return this.$store.getters.getRole;
    },
  },
  methods: {
    getInitialProps() {
      bridge.send("VKWebAppGetLaunchParams").then((r) => {
        let tokens = r.vk_access_token_settings;
        this.userId = r.vk_user_id;

        if (!tokens) {
          this.acceptModal = true;
        } else {
          bridge
            .send("VKWebAppGetAuthToken", {
              app_id: this.appId,
              scope: "groups",
            })
            .then((res) => {
              this.loadData(res);
            });
        }
      });
    },
    loadData(res) {
      let data = {
        token: res.access_token,
        id: this.userId,
      };

      this.$store.dispatch("loadData", data);
      this.$store.commit("setToken", res.access_token);
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
        .then((res) => {
          this.loadData(res);

          this.acceptModalText = "Спасибо ♥";

          setTimeout(() => {
            this.acceptModal = false;
          }, 1400);
        });
    },
    getRandomMsg() {
      let max = msg.length;
      let min = 0;

      let index = Math.floor(Math.random() * (max - min)) + min;

      this.footerText = msg[index].text;
    },
  },
};
</script>
