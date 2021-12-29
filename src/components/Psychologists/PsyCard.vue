<template>
  <v-container>
    <v-card class="mx-auto mb-4" style="border-radius: 25px">
      <v-card-title> {{ card.title }} </v-card-title>

      <!-- <v-card-subtitle> {{ card.tags }} </v-card-subtitle> -->

      <v-card-actions>
        <v-btn color="light" text :href="card.contacts.vk" targen="_blank">
          Написать {{ card.contacts.vk }}
        </v-btn>
        <!-- <v-btn
          v-for="(contact, i) in contacts"
          :key="i"
          color="light"
          textf
          :href="contact.inst"
          targen="_blank"
        >
          <v-icon>mdi-play</v-icon>
        </v-btn> -->
        <!-- <v-btn
          color="light"
          text
          style="box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.08)"
          @click="setFavoriteTest"
        >
          <v-icon>mdi-heart-outline</v-icon>
        </v-btn> -->

        <v-spacer></v-spacer>

        <v-btn
          icon
          @click="show = !show"
          style="box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.08)"
        >
          <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>

          <v-card-text>
            {{ card.text }}
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card></v-container
  >
</template>

<script>
export default {
  name: "TestCard",
  props: ["card"],
  components: {},
  data: () => ({
    show: false,
  }),
  methods: {},
};
</script>
