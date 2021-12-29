<template>
  <v-container>
    <v-card class="cardCover" style="text-align: left">
      <div class="cardHintText">Что это такое?</div>
      <span
        >Это каталог, в котором содержатся упражнения по саморазвитию и
        ментальному здоровью с описанием каждого упражнения. Каталог доступен
        только по подписке на Май.</span
      >
    </v-card>
    <div class="pageToolBar">
      <v-btn
        href="https://vk.com/app7957050"
        target="_blank"
        class="mr-2"
        light
        color="white"
        :disabled="!isDon"
        small
      >
        <v-icon dark> mdi-book-open-page-variant </v-icon> Открыть
      </v-btn>
      <v-btn v-if="!isDon" to="/premium" color="light" text x-small>
        О подписке
      </v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "Exercises",
  data: () => ({}),
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
