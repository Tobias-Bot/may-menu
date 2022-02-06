import Vue from "vue";
import VueRouter from "vue-router";

import Main from "../components/Main.vue";
import Chats from "../components/Chats.vue";
import Psychologists from "../components/Psychologists.vue";
import Exercises from "../components/Exercises.vue";
import Questions from "../components/Questions.vue";
import Mailing from "../components/Mailing.vue";
// import Streams from "../components/Streams.vue";

import Profile from "../components/Profile.vue";
import Tests from "../components/Tests.vue";
import Rules from "../components/Rules.vue";
import SocialQuests from "../components/SocialQuests.vue";
import Premium from "../components/Premium.vue";
import Donut from "../components/Donut.vue";

/* Tests routing */

import StressTest from "../components/Tests/StressTest.vue";
import ConfidenceTest from "../components/Tests/ConfidenceTest.vue";
import ShatteredNervesTest from "../components/Tests/ShatteredNervesTest.vue";
import MentalTest from "../components/Tests/MentalTest.vue";
import AnxietyTest from "../components/Tests/AnxietyTest.vue";
import DepressionTest from "../components/Tests/DepressionTest.vue";
import EmpathyTest from "../components/Tests/EmpathyTest.vue";
import EQTest from "../components/Tests/EQTest.vue";
import SelfValueTest from "../components/Tests/SelfValueTest.vue";

/* Trackers routing */

import MoodTracker from "../components/Trackers/MoodTracker";

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
  // {
  //   path: "/streams",
  //   name: "Streams",
  //   component: Streams,
  // },
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
    path: "/tracker-mood",
    name: "MoodTracker",
    component: MoodTracker,
  },
  {
    path: "/tests",
    name: "Tests",
    component: Tests,
  },
  {
    path: "/test-stress",
    name: "StressTest",
    component: StressTest,
  },
  {
    path: "/test-confidence",
    name: "ConfidenceTest",
    component: ConfidenceTest,
  },
  {
    path: "/test-nerves",
    name: "ShatteredNervesTest",
    component: ShatteredNervesTest,
  },
  {
    path: "/test-mental",
    name: "MentalTest",
    component: MentalTest,
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
