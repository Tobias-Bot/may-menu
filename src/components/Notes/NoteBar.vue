<template>
  <v-container>
    <ColorPicker
      v-if="notes.length"
      :colorMenu.sync="colorMenu"
      :currentColor.sync="currentColor"
    />

    <v-dialog v-if="notes.length && index !== null" dark v-model="noteModal">
      <v-card tile light :color="notes[index].color">
        <v-card-title>
          <v-btn icon light @click="noteModal = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>

          <v-spacer></v-spacer>

          <v-btn class="my-1 mx-2" icon @click="colorMenu = true">
            <v-icon> mdi-palette </v-icon>
          </v-btn>
          <v-btn class="my-1 mx-2" icon @click="deleteNote(index)">
            <v-icon> mdi-trash-can </v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text style="padding: 10px 20px 30px 20px; color: black">
          <textarea
            class="fullCardText"
            v-model="fullNoteText"
            @blur="saveNoteText"
            @input="isMaxLength"
            @paste="isMaxLength"
          ></textarea>
        </v-card-text>

        <v-card-actions style="width: 100%; text-align: center">
          <v-row justify="center" class="mb-4">
            <div class="inputHint">
              {{ editNoteText ? noteCurrentLength : "* * *" }}
            </div>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-row justify="center" no-gutters class="mt-3">
      <v-col cols="6" style="padding-right: 5px">
        <v-btn
          v-if="notes.length < maxNotesCount"
          class="card"
          style="height: 60px"
          color="black"
          outlined
          @click="addNote"
        >
          <v-icon light>mdi-note-plus-outline</v-icon>
        </v-btn>
        <div v-for="(note, i) in notes" :key="i">
          <div
            v-if="i % 2 == 0"
            class="card"
            :style="`background-color: ${note.color}`"
            @click="openNote(i)"
          >
            <div class="noteText">
              <div v-if="isFull(note.text)">
                {{ note.text.substring(0, maxCardLen) }}...
              </div>
              <div v-else>{{ note.text }}</div>
            </div>
          </div>
        </div>
      </v-col>
      <v-col cols="6" style="padding-left: 5px">
        <div v-for="(note, i) in notes" :key="i">
          <div
            v-if="i % 2 !== 0"
            class="card"
            :style="`background-color: ${note.color}`"
            @click="openNote(i)"
          >
            <div class="noteText">
              <div v-if="isFull(note.text)">
                {{ note.text.substring(0, maxCardLen) }}...
              </div>
              <div v-else>{{ note.text }}</div>
            </div>
          </div>
        </div></v-col
      >
    </v-row>
  </v-container>
</template>

<script>
import bridge from "@vkontakte/vk-bridge";

import ColorPicker from "../Utils/ColorPicker.vue";

export default {
  name: "NoteBar",
  components: {
    ColorPicker,
  },
  props: ["notes"],
  data: () => ({
    maxNotesCount: 10,
    maxCardLen: 200,
    index: null,
    colorMenu: false,
    editNoteText: false,
    noteMaxLength: 380,
    noteCurrentLength: 0,

    fullNoteText: "",

    noteModal: false,
  }),
  computed: {
    currentColor: {
      set(color) {
        if (this.index) {
          this.notes[this.index].color = color;
        } else {
          this.notes[0].color = color;
        }

        this.saveNotes();
      },
      get() {
        if (this.index) {
          return this.notes[this.index].color;
        } else {
          return this.notes[0].color;
        }
      },
    },
  },
  methods: {
    isFull(text) {
      return text.length > this.maxCardLen;
    },
    openNote(i) {
      this.index = i;
      this.fullNoteText = this.notes[i].text;

      let text = this.fullNoteText;
      this.noteCurrentLength = this.noteMaxLength - text.length;

      this.editNoteText = true;
      this.noteModal = true;
    },
    addNote() {
      this.noteCurrentLength = this.noteMaxLength;

      let note = {
        text: "",
        color: "#FFF",
      };

      this.notes.unshift(note);
      this.index = 0;
      this.fullNoteText = this.notes[this.index].text;
      this.noteModal = true;
      this.editNoteText = true;

      this.$store.commit("setNotes", this.notes);
    },
    saveNotes() {
      let notes = this.notes;

      bridge.send("VKWebAppStorageSet", {
        key: "notes",
        value: JSON.stringify(notes),
      });

      this.$store.commit("setNotes", notes);
    },
    deleteNote(index) {
      this.notes.splice(index, 1);
      this.index = null;

      this.editNoteText = false;
      this.noteModal = false;

      this.saveNotes();
    },
    saveNoteText(e) {
      let text = this.fullNoteText;

      this.notes[this.index].text = text;

      this.isMaxLength(e);

      this.editNoteText = false;

      this.saveNotes();
    },
    isMaxLength(e) {
      if (e.inputType === "insertParagraph") {
        e.preventDefault();
      }

      let text = this.fullNoteText;

      this.noteCurrentLength = this.noteMaxLength - text.length;

      if (this.noteCurrentLength <= 0) {
        this.fullNoteText = text.slice(0, this.noteMaxLength);

        this.noteCurrentLength =
          "Объем текста ограничен. Попробуй немного сократить.";
      }
    },
  },
};
</script>

<style scoped></style>
