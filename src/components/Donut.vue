<template>
  <v-container>
    <a
      href="https://vk.com/app6471849_-160404048"
      target="_blank"
      hidden
      rel="noopener noreferrer"
      ref="linkRef"
    ></a>
    <v-card class="cardCover" style="text-align: left">
      <div class="cardHintText">Майский фонд психологической помощи</div>
      <span
        >Все полученные деньги мы распределяем между теми, кому необходима
        консультация у психолога/психотерапевта. В фонд также направляются
        средства с рекламы в Май. Ты можешь внести свой вклад и помочь тем, кто
        действительно нуждается в психологической помощи.</span
      >
    </v-card>
    <div class="pageToolBar">
      <v-btn class="mr-2" light color="white" @click="goToMay">
        <v-icon dark> mdi-plus-circle-multiple </v-icon> Пожертвовать
      </v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "Donut",
  data: () => ({}),
  methods: {
    goToMay() {
      this.$refs.linkRef.click();
    },
  },
};
</script>
