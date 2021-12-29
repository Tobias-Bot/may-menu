<template>
  <v-container> Profile </v-container>
</template>

<script>
import bridge from "@vkontakte/vk-bridge";

export default {
  name: "Profile",

  data: () => ({
    width: 2,
    radius: 8,
    padding: 5,
    lineCap: "round",
    value: [0, 2, 5, 9, 5, 100, 3, 5, 0, 0, 1, 8, 2, 9, 0],
    gradientDirection: "top",
    fill: false,
    type: "trend",
    autoLineWidth: false,
    text: "Hello",
  }),

  mounted() {
    bridge.send("VKWebAppStorageGet", { keys: ["test"] }).then((res) => {
      this.text = res.keys[0].value;
    });
  },
};
</script>
