<template>
  <v-container>
    <v-card
      v-for="(rule, i) in rules"
      :key="i"
      class="cardCover"
      style="text-align: left"
    >
      <div class="cardHintText">{{ rule.title }}</div>
      <span v-html="rule.text"></span> </v-card
  ></v-container>
</template>

<script>
import rules from "../data/CommunityRules";

export default {
  name: "Rules",
  data: () => ({
    rules,
  }),
};
</script>
