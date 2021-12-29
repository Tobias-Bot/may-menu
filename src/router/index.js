import Vue from "vue";
import VueRouter from "vue-router";

import Main from "../components/Main.vue";
import Chats from "../components/Chats.vue";
import Psychologists from "../components/Psychologists.vue";
import Exercises from "../components/Exercises.vue";
import Questions from "../components/Questions.vue";
import Mailing from "../components/Mailing.vue";
import Streams from "../components/Streams.vue";

import Profile from "../components/Profile.vue";
import Tests from "../components/Tests.vue";
import Rules from "../components/Rules.vue";
import SocialQuests from "../components/SocialQuests.vue";
import Premium from "../components/Premium.vue";
import Donut from "../components/Donut.vue";

/* Tests routing */

import AnxietyTest from "../components/Tests/AnxietyTest.vue";
import DepressionTest from "../components/Tests/DepressionTest.vue";
import EmpathyTest from "../components/Tests/EmpathyTest.vue";
import EQTest from "../components/Tests/EQTest.vue";
import SelfValueTest from "../components/Tests/SelfValueTest.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Main",
    component: Main,
  },
  {
    path: "/chats",
    name: "Chats",
    component: Chats,
  },
  {
    path: "/psychologists",
    name: "Psychologists",
    component: Psychologists,
  },
  {
    path: "/exercises",
    name: "Exercises",
    component: Exercises,
  },
  {
    path: "/questions",
    name: "Questions",
    component: Questions,
  },
  {
    path: "/mailing",
    name: "Mailing",
    component: Mailing,
  },
  {
    path: "/streams",
    name: "Streams",
    component: Streams,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/rules",
    name: "Rules",
    component: Rules,
  },
  {
    path: "/social-quests",
    name: "SocialQuests",
    component: SocialQuests,
  },
  {
    path: "/premium",
    name: "Premium",
    component: Premium,
  },
  {
    path: "/donut",
    name: "Donut",
    component: Donut,
  },
  {
    path: "/tests",
    name: "Tests",
    component: Tests,
  },
  {
    path: "/test-anxiety",
    name: "AnxietyTest",
    component: AnxietyTest,
  },
  {
    path: "/test-depression",
    name: "DepressionTest",
    component: DepressionTest,
  },
  {
    path: "/test-empathy",
    name: "EmpathyTest",
    component: EmpathyTest,
  },
  {
    path: "/test-eq",
    name: "EQTest",
    component: EQTest,
  },
  {
    path: "/test-selfvalue",
    name: "SelfValueTest",
    component: SelfValueTest,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
