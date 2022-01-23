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
      <v-img
        height="200"
        style="border-radius: inherit"
        src="https://64.media.tumblr.com/6e5850e7405582d26e4a067577d40ba2/a1ae6318e423174b-65/s640x960/645987158731d0e56da6e30d8095d8b236c1627d.gifv"
      ></v-img>

      <br />
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
