<template>
  <v-container>
    <v-card class="mx-auto mb-4" style="border-radius: 25px">
      <v-img :src="data.cover" height="150px"></v-img>

      <v-card-title
        style="font-size: 18px; line-height: 1.5; word-break: break-word"
      >
        {{ data.title }}
      </v-card-title>

      <v-card-subtitle
        v-if="data.isPremium || data.ps.length"
        style="margin-top: 8px"
      >
        {{ data.isPremium && !isDon ? "Доступно только по подписке" : data.ps }}
      </v-card-subtitle>

      <v-card-actions>
        <v-btn
          color="light"
          text
          :disabled="data.isPremium && !isDon"
          @click="setCurrentEx"
        >
          Читать
          <!-- <v-icon>mdi-play</v-icon> -->
        </v-btn>
        <v-btn
          v-if="data.isPremium && !isDon"
          to="/premium"
          color="light"
          text
          small
        >
          о подписке
        </v-btn>
      </v-card-actions></v-card
    ></v-container
  >
</template>

<script>
export default {
  name: "ExerciseCard",
  props: ["data"],
  components: {},
  data: () => ({
    show: false,
  }),
  computed: {
    isDon() {
      return this.$store.getters.isPremium;
    },
  },
  methods: {
    setCurrentEx() {
      this.$emit("openModal");

      this.$store.commit("setCurrentEx", this.data);
    },
  },
};
</script>
