<template>
  <v-container>
    <br />
    <div style="width: 100%; text-align: center">
      <div class="font-weight-bold">Минимум</div>
      <div class="headline font-weight-bold">{{ min }}</div>
      <br />
      <div class="font-weight-bold">Максимум</div>
      <div class="headline font-weight-bold">{{ max }}</div>
      <br />
      <div class="font-weight-bold">Среднее</div>
      <div class="headline font-weight-bold">{{ avr }}</div>
    </div>
    <br />
    <br />
    <v-timeline dense>
      <v-timeline-item
        v-for="(point, i) in data"
        :key="i"
        :color="i % 2 == 0 ? '#ff8fcb' : '#a6adfd'"
        small
      >
        <v-row>
          <v-col
            ><span class="headline font-weight-bold" v-text="point.v"></span
          ></v-col>
          <v-col
            ><span
              class="font-weight-bold"
              v-text="point.d == Today ? 'сегодня' : point.d"
            ></span
          ></v-col>
        </v-row>
      </v-timeline-item>
    </v-timeline>
    <br />
  </v-container>
</template>

<script>
export default {
  name: "Timeline",
  props: ["data"],
  data: () => ({
    points: [],

    avr: 0,
    min: 0,
    max: 0,
  }),
  created() {
    this.points = this.data.reverse();

    this.getStat();
  },
  computed: {
    Today() {
      return this.$store.getters.getToday;
    },
  },
  methods: {
    getStat() {
      let value = this.data.map((point) => point.v);

      this.min = Math.min(...value);
      this.max = Math.max(...value);

      let sum = 0;

      for (let i = 0; i < value.length; i++) {
        sum += value[i];
      }

      this.avr = Math.floor(sum / value.length);
    },
  },
};
</script>
