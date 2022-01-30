import Vue from "vue";
import Vuex from "vuex";

import bridge from "@vkontakte/vk-bridge";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appid: 7706189, //8039190,
    groupid: 160404048,
    psyTopicid: 46675469,
    token: "",
    role: "user",
    isGroupMember: 0,

    maxSavePoints: 31,

    today: "",
    isDon: "",

    notes: [],

    currentTest: {},
    favoriteTests: [],

    currentEx: {},

    currentTracker: {},

    psychologists: [],
  },
  getters: {
    getRole(state) {
      return state.role;
    },
    getAppId(state) {
      return state.appid;
    },
    getToday(state) {
      return state.today;
    },
    getNotes(state) {
      return state.notes;
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
    getCurrentTrackerValue(state) {
      let points = state.currentTracker.value;

      let value = [];

      if (points && points.length) value = points.map((p) => p.v);

      return value;
    },
    getCurrentEx(state) {
      return state.currentEx;
    },
    getCurrentTracker(state) {
      return state.currentTracker;
    },
    isPremium(state) {
      return state.isDon;
    },
    isMember(state) {
      return state.isGroupMember;
    },
    getPsyCards(state) {
      return state.psychologists;
    },
  },
  mutations: {
    setNotes(state, payload) {
      state.notes = payload;
    },
    setCurrentTest(state, payload) {
      state.currentTest = payload;
    },
    setCurrentTestValue(state, payload) {
      state.currentTest.value = payload;
    },
    setCurrentEx(state, payload) {
      state.currentEx = payload;
    },
    setCurrentTracker(state, payload) {
      state.currentTracker = payload;
    },
    setCurrentTrackerValue(state, payload) {
      state.currentTracker.value = payload;
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
    loadData({ state }, data) {
      if (state.isDon == "") {
        let group_id = state.groupid;

        bridge
          .send("VKWebAppCallAPIMethod", {
            method: "groups.getById",
            request_id: "group-info",
            params: {
              group_id: state.groupid,
              v: "5.131",
              access_token: data.token,
            },
          })
          .then((r) => {
            let d = r.response[0];

            if (d.is_admin) {
              state.role = "admin";
              state.isDon = true;

              console.log("You're admin. I see you");
            } else {
              state.role = "user";

              bridge
                .send("VKWebAppCallAPIMethod", {
                  method: "donut.isDon",
                  request_id: "info",
                  params: {
                    owner_id: "-" + group_id,
                    v: "5.131",
                    access_token: data.token,
                  },
                })
                .then((res) => {
                  state.isDon = res.response;
                });

              console.log("You an't admin. But being just user isn't bad too");
            }

            state.isGroupMember = d.is_member;
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
    loadValueOfCurrentTracker({ commit }, key) {
      bridge.send("VKWebAppStorageGet", { keys: [key] }).then((res) => {
        if (res.keys[0].value) {
          console.log(res.keys[0]);
          let value = JSON.parse(res.keys[0].value);
          commit("setCurrentTrackerValue", value);
        }
      });
    },
    getNotes({ state }) {
      bridge.send("VKWebAppStorageGet", { keys: ["notes"] }).then((res) => {
        state.notes = JSON.parse(res.keys[0].value);
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

        let d = test.value;

        if (d.length >= state.maxSavePoints) test.value = d.slice(1);
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
    shareTest({ state }, data) {
      let test = "";
      let testUrl = "";
      let appId = state.appid;

      if (data) {
        testUrl = data;
      } else {
        test = state.currentTest;
        testUrl = test.data.url.substring(1, test.data.url.length);
      }

      bridge.send("VKWebAppShare", {
        link: `https://vk.com/app${appId}#${testUrl}`,
      });
    },
    saveTrackerResults({ state }, data) {
      let tracker = state.currentTracker;
      let today = state.today;
      let value = data;

      let newDataPoint = {
        d: today,
        v: value,
      };

      if (
        tracker.value.length &&
        today == tracker.value[tracker.value.length - 1].d
      )
        tracker.value[tracker.value.length - 1].v = newDataPoint.v;
      else {
        tracker.value.push(newDataPoint);

        let d = tracker.value;

        if (d.length >= state.maxSavePoints) tracker.value = d.slice(1);
      }

      bridge.send("VKWebAppStorageSet", {
        key: "tracker-mood",
        value: JSON.stringify(tracker.value),
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
    joinCommunity({ state }) {
      bridge.send("VKWebAppJoinGroup", { group_id: state.groupid }).then(() => {
        state.isGroupMember = 1;
      });
    },
  },
  modules: {},
});
