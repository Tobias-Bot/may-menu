import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import vuetify from "./plugins/vuetify";
import bridge from "@vkontakte/vk-bridge";

import "./styles/Common.css";
import "./styles/MainMenuModal.css";
import "./styles/NoteBar.css";
import "./styles/TestControlPanel.css";

bridge.send("VKWebAppInit", {});

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
