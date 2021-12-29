<template>
  <v-container>
    <v-dialog v-model="menu" scrollable max-heigth="400px">
      <v-card tile light color="white">
        <v-card-title>
          <v-btn icon light @click="menu = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-row class="fill-height my-5" align="center" justify="center">
            <div v-for="(color, i) in colors">
              <div
                :key="i"
                :class="
                  currentColor === color ? 'colorSquareActive' : 'colorSquare'
                "
                :style="`background-color: ${color}`"
                @click="setCardColor(color)"
              ></div>
            </div>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: "ColorPicker",
  props: ["colorMenu", "currentColor"],
  data: () => ({
    colors: [
      "#FFC0CB",
      "#FFB6C1",
      "#FF69B4",
      "#FF1493",
      "#DB7093",
      "#FFA07A",
      "#FF6347",
      "#FFFF00",
      "#FFFFE0",
      "#FFDAB9",
      "#E6E6FA",
      "#DDA0DD",
      "#9370DB",
      "#9932CC",
      "#6A5ACD",
      "#BC8F8F",
      "#F4A460",
      "#98FB98",
      "#00FA9A",
      "#9ACD32",
      "#66CDAA",
      "#00FFFF",
      "#E0FFFF",
      "#AFEEEE",
      "#7FFFD4",
      "#40E0D0",
      "#4682B4",
      "#B0E0E6",
      "#1E90FF",
      "#4169E1",
      "#FFFFFF",
    ],
  }),
  computed: {
    menu: {
      set(isOpen) {
        this.$emit("update:colorMenu", isOpen);
      },
      get() {
        return this.colorMenu;
      },
    },
  },
  methods: {
    setCardColor(color) {
      this.$emit("update:currentColor", color);
    },
  },
};
</script>

<style scoped></style>
