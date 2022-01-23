<template>
  <v-container>
    <a
      href="https://vk.com/donut/warmay"
      target="_blank"
      hidden
      rel="noopener noreferrer"
      ref="linkRef"
    ></a>
    <v-card class="cardCover" style="text-align: left">
      <div class="cardHintText">Что есть в платной подписке Май?</div>
      <span v-html="text"></span>
    </v-card>
    <v-card class="cardCover" style="text-align: left">
      <div class="cardHintText">Стоимость подписки</div>
      <span>Стоимость подписки составляет 100 рублей.</span>
    </v-card>
    <div class="pageToolBar">
      <v-btn class="mr-2" light color="white" @click="subscribe">
        <v-icon dark> mdi-plus </v-icon> Подписаться
      </v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "Premium",
  data: () => ({
    text: `
                📝 Консультации с психологами в отдельном чате и лс;<br/><br/>

📱 Полный доступ к мини-приложению Май с тестами и упражнениями по ментальному здоровью, а также статистика и подробное описание результатов анализа;<br/><br/>

👑 Ранний доступ к новым публикациям Май и эксклюзивные материалы!<br/><br/>

❗️ Все собранные средства идут исключительно на развитие Май<br/>
                `,
  }),
  methods: {
    subscribe() {
      this.$refs.linkRef.click();
    },
  },
};
</script>
