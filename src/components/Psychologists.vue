<template>
  <v-container>
    <!-- <PsyCard v-for="(card, i) in Cards" :key="i" :card="card" /> -->

    <v-card class="cardCover" style="text-align: left">
      <div class="cardHintText">Помощь психолога</div>
      <span
        >В Май есть отдельное обсуждение с психологами, у которых ты можешь
        проконсультироваться. Обсуждение содержит описание каждого психолога и
        его контакты для связи.
      </span>
    </v-card>

    <v-card class="cardCover" style="text-align: left">
      <div class="cardHintText">Беседа</div>
      <span
        >Также у нас есть отдельный чат со всеми психологами, где ты также
        можешь задать свои вопросы. Беседа доступна только при подписке на Май.
      </span>
    </v-card>

    <v-card class="cardCover" style="text-align: left">
      <div class="cardHintText">Дополнительные службы</div>
      <span>{{ text }}</span>
    </v-card>

    <div class="pageToolBar">
      <v-btn
        href="https://vk.com/topic-160404048_46675469"
        target="_blank"
        class="mr-2"
        rounded
        light
        color="white"
        small
      >
        <v-icon dark> mdi-message-processing </v-icon> Открыть
      </v-btn>
      <v-btn to="/premium" class="mr-2" rounded light color="white" x-small>
        О подписке
      </v-btn>
    </div>
  </v-container>
</template>

<script>
//import PsyCard from "./Psychologists/PsyCard";

export default {
  name: "Tests",
  components: {
    //PsyCard,
  },
  data: () => ({
    text: `8-800-2000-122 — телефон доверия, круглосуточно. Телефон доверия твоего города, номер которого можно найти в Интернете. Для получения неотложной медицинской помощи позвонить по номеру экстренной помощи 112. Звонок с мобильного возможен, даже если номер заблокирован.`,
  }),
  //   computed: {
  //     Cards() {
  //       return this.$store.getters.getPsyCards;
  //     },
  //   },
  //   created() {
  //     this.$store.dispatch("getPsychologists", null);
  //   },
  methods: {},
};
</script>
