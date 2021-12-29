import Vue from "vue";
import Vuex from "vuex";

import bridge from "@vkontakte/vk-bridge";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appid: 7646928,
    groupid: 160404048,
    psyTopicid: 46675469,
    token: "",

    maxSavePoints: 2,

    today: "",
    isDon: "",

    currentTest: {},
    favoriteTests: [],

    psychologists: [],

    moodValue: [],
  },
  getters: {
    getAppId(state) {
      return state.appid;
    },
    getToday(state) {
      return state.today;
    },
    getCurrentTest(state) {
      return state.currentTest;
    },
    getCurrentValue(state) {
      let points = state.currentTest.value;

      let value = [];

      if (points.length) value = points.map((p) => p.v);

      return value;
    },
    isPremium(state) {
      return state.isDon;
    },
    getPsyCards(state) {
      return state.psychologists;
    },
  },
  mutations: {
    setCurrentTest(state, payload) {
      state.currentTest = payload;
    },
    setCurrentTestValue(state, payload) {
      state.currentTest.value = payload;
    },
    setDate(state) {
      let date = new Date();
      let result = date.toLocaleDateString();

      state.today = result;
    },
    setToken(state, payload) {
      state.token = payload;
    },
  },
  actions: {
    isDon({ state }, token) {
      if (state.isDon == "") {
        let group_id = state.groupid;

        bridge
          .send("VKWebAppCallAPIMethod", {
            method: "donut.isDon",
            request_id: "info",
            params: {
              owner_id: "-" + group_id,
              v: "5.131",
              access_token: token,
            },
          })
          .then((res) => {
            state.isDon = res.response;
          });
      }
    },
    loadValueOfCurrentTest({ commit }, key) {
      bridge.send("VKWebAppStorageGet", { keys: [key] }).then((res) => {
        if (res.keys[0].value) {
          console.log(res.keys[0]);
          let value = JSON.parse(res.keys[0].value);
          commit("setCurrentTestValue", value);
        }
      });
    },
    saveTestResults({ state }, data) {
      let test = state.currentTest;
      let today = state.today;
      let value = data;

      let newTestDataPoint = {
        d: today,
        v: value,
      };

      if (test.value.length && today == test.value[test.value.length - 1].d)
        test.value[test.value.length - 1].v = newTestDataPoint.v;
      else {
        test.value.push(newTestDataPoint);

        if (test.value.length >= state.maxSavePoints)
          test.value.slice(1, test.value.length - 1);
      }

      bridge.send("VKWebAppStorageSet", {
        key: test.data.url.substring(1, test.data.url.length),
        value: JSON.stringify(test.value),
      });
    },
    // setFavoriteTest({ state }, data) {
    //   state.favoriteTests.push(data);

    //   bridge.send("VKWebAppStorageSet", {
    //     key: "favorite-tests",
    //     value: data,
    //   });
    // },
    shareTest({ state }) {
      let test = state.currentTest;

      let testUrl = test.data.url.substring(1, test.data.url.length);
      let appId = state.appid;

      bridge.send("VKWebAppShare", {
        link: `https://vk.com/app${appId}#${testUrl}`,
      });
    },
    saveTrackerResults({ state }, data) {
      state.moodValue.push(data);

      bridge.send("VKWebAppStorageSet", {
        key: "tracker-mood",
        value: JSON.stringify(state.moodValue),
      });
    },
    getPsychologists({ state }) {
      if (!state.psychologists.length) {
        bridge
          .send("VKWebAppCallAPIMethod", {
            method: "board.getComments",
            request_id: "1",
            params: {
              group_id: state.groupid,
              topic_id: state.psyTopicid,
              v: "5.131",
              access_token: state.token,
            },
          })
          .then((r) => {
            let comments = r.response.items.splice(1, r.response.items.length);

            let cards = comments.map((c) => {
              let vk = c.text.indexOf("VK: ");

              return {
                title: c.text.slice(0, 100),
                text: c.text,
                contacts: {
                  vk: ~vk ? c.text.slice(vk + 4, vk + 30) : "",
                },
              };
            });

            state.psychologists = cards;
          });
      }
    },
  },
  modules: {},
});
