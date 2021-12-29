<template>
  <v-container>
    <v-card class="cardCover" style="text-align: left">
      <div class="cardHintText">Рассылки</div>
      <span
        >Все записи в Май разбиты по небольшим тематикам, для каждой из которых
        есть своя рассылка. Если ты не хочешь подписываться на уведомления обо
        всех записях в Май, можешь подписаться на отдельные рассылки и получать
        уведомления о постах в личные сообщения.</span
      >
    </v-card>
    <div class="pageToolBar">
      <v-btn
        href="https://vk.com/app5748831_-160404048"
        target="_blank"
        class="mr-2"
        light
        color="white"
      >
        <v-icon dark> mdi-email-multiple </v-icon> Выбрать рассылку
      </v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "Mailing",
  data: () => ({}),
  methods: {},
};
</script>
