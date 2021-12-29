<template>
  <v-container>
    <v-card class="cardCover" style="text-align: left">
      <div class="cardHintText">Что это такое?</div>
      <span
        >Это каталог, в котором содержатся вопросы на «все случаи жизни». Весь
        список разбит на несколько тем. Для каждого вопроса есть описание и
        характеристика. Можно создавать свои списки с вопросами. Это небольшое
        приложение для тех, кто не знает, о чем поговорить.
      </span>
    </v-card>
    <div class="pageToolBar">
      <v-btn
        href="https://vk.com/app7929268"
        target="_blank"
        class="mr-2"
        light
        color="white"
      >
        <v-icon dark> mdi-format-list-bulleted-square </v-icon> Открыть
      </v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "Questions",
  data: () => ({}),
  methods: {},
};
</script>
