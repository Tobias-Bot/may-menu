<template>
  <v-container>
    <div v-if="notes.length">
      <ColorPicker
        :colorMenu.sync="colorMenu"
        :currentColor.sync="currentColor"
      />

      <v-sheet class="mt-5 mb-5 ml-1">
        <v-slide-group v-model="model" show-arrows>
          <v-slide-item
            v-for="(note, i) in notes"
            :key="i"
            v-slot="{ active, toggle }"
          >
            <v-card
              :color="note.color"
              :class="{ activeCard: active, card: !active }"
              style="border-radius: 5px"
              height="70"
              width="150"
              @click="
                () => {
                  toggle();
                  editNoteText = false;
                }
              "
            >
              <div v-if="!active" class="noteText">
                <div v-if="isFull(note.text)">
                  {{ note.text.substring(0, 55) }}...
                </div>
                <div v-else>{{ note.text }}</div>
              </div>

              <v-row class="fill-height" align="center" justify="center">
                <v-scale-transition>
                  <v-icon
                    v-if="active"
                    light
                    size="45"
                    v-text="'mdi-chevron-down'"
                  ></v-icon>
                </v-scale-transition>
              </v-row>
            </v-card>
            <!-- <v-card
              v-if="i == notes.length - 1"
              class="card"
              outlined
              height="70"
              width="150"
              @click="addNote"
            >
              <v-row class="fill-height pt-5" align="center" justify="center">
                <span style="color: rgba(0, 0, 0, 0.3); font-size: 13px">
                  добавить заметку
                </span>
              </v-row>
            </v-card> -->
          </v-slide-item>
        </v-slide-group>

        <v-expand-transition>
          <v-sheet
            v-if="model != null"
            :style="`border-radius: 10px; border-top: 3px solid ${notes[model].color}; border-bottom: 3px solid ${notes[model].color}`"
          >
            <v-row class="my-5" no-gutters>
              <v-col cols="10"
                ><div
                  class="fullCardText"
                  ref="noteText"
                  :contenteditable="editNoteText"
                  @click="editMode"
                  @blur="saveNoteText"
                  @input="isMaxLength"
                  @paste="clearText"
                  @keydown="
                    (e) => {
                      if (e.code === 'Enter') {
                        e.preventDefault();
                      }
                    }
                  "
                >
                  {{ notes[model].text }}
                </div>
                <div v-show="editNoteText" class="inputHint">
                  {{ noteCurrentLength }}
                </div>
              </v-col>
              <v-col cols="2"
                ><v-btn
                  class="my-2"
                  fab
                  small
                  color="white"
                  @click="deleteNote(model)"
                >
                  <v-icon> mdi-trash-can </v-icon>
                </v-btn>
                <v-btn
                  class="my-2"
                  fab
                  small
                  color="white"
                  @click="colorMenu = true"
                >
                  <v-icon> mdi-palette </v-icon>
                </v-btn>
                <v-btn
                  class="my-2"
                  fab
                  small
                  depressed
                  color="white"
                  @click="
                    () => {
                      model = null;
                      editNoteText = false;
                    }
                  "
                >
                  <v-icon> mdi-close </v-icon>
                </v-btn></v-col
              >
            </v-row>
          </v-sheet>
        </v-expand-transition>
      </v-sheet>
    </div>

    <div v-if="!notes.length">
      <br />
      <br />
    </div>

    <v-row justify="center">
      <v-btn
        v-if="(model == null || !notes.length) && notes.length < maxNotesCount"
        class="addCardBtn"
        light
        text
        small
        @click="addNote"
      >
        <v-icon light>mdi-note-plus-outline</v-icon>
      </v-btn>
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
    model: null,
    colorMenu: false,
    editNoteText: false,
    noteMaxLength: 380,
    noteCurrentLength: 0,
  }),
  computed: {
    currentColor: {
      set(color) {
        if (this.model) {
          this.notes[this.model].color = color;
        } else {
          this.notes[0].color = color;
        }

        this.saveNotes();
      },
      get() {
        if (this.model) {
          return this.notes[this.model].color;
        } else {
          return this.notes[0].color;
        }
      },
    },
  },
  methods: {
    isFull(text) {
      return text.length > 55;
    },
    addNote() {
      this.noteCurrentLength = this.noteMaxLength;

      let note = {
        text: "",
        color: "#FFF",
      };

      this.notes.unshift(note);
      this.model = 0;

      this.editNoteText = true;

      setTimeout(() => {
        this.$refs.noteText.focus();
      }, 0);

      this.saveNotes();
    },
    saveNotes() {
      let notes = this.notes;

      bridge.send("VKWebAppStorageSet", {
        key: "notes",
        value: JSON.stringify(notes),
      });
    },
    deleteNote(index) {
      this.notes.splice(index, 1);
      this.model = null;

      this.editNoteText = false;

      this.saveNotes();
    },
    saveNoteText() {
      let text = this.$refs.noteText.innerText;

      this.notes[this.model].text = text;

      this.editNoteText = false;

      this.saveNotes();
    },
    isMaxLength(e) {
      if (e.inputType === "insertParagraph") {
        e.preventDefault();
      }

      let text = this.$refs.noteText.innerText;

      this.noteCurrentLength = this.noteMaxLength - text.length;

      if (this.noteCurrentLength == -1) {
        this.$refs.noteText.innerText = text.slice(0, -1);

        let div = this.$refs.noteText;

        const range = document.createRange();
        range.selectNodeContents(div);
        range.collapse(false);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);

        this.noteCurrentLength =
          "Объем текста ограничен. Попробуй немного сократить.";
      }
    },
    editMode() {
      this.editNoteText = true;

      let text = this.$refs.noteText.innerText;

      this.noteCurrentLength = this.noteMaxLength - text.length;

      setTimeout(() => {
        this.$refs.noteText.focus();
      }, 0);
    },
    clearText(e) {
      e.preventDefault();
      let text = (e.originalEvent || e).clipboardData.getData("text/plain");
      document.execCommand("insertText", false, text);
    },
  },
};
</script>

<style scoped></style>
