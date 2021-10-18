<template>
  <div
    class="voice-card"
    data-value="English (US)"
    :style="{
      background: linearGradient,
    }"
  >
    <BackgroundSvg />
    <div
      class="voice-card__inner"
      @mouseover="isPlayerShow = true"
      @mouseleave="isPlayerShow = false"
    >
      <Description v-show="!isPlayerShow" :speaker="speaker" />
      <Player v-show="isPlayerShow" :speaker="speaker" />
    </div>
  </div>
</template>

<script>
import randomcolor from "randomcolor";

import BackgroundSvg from "./components/BackgroundSvg.vue";
import Description from "./components/Description.vue";
import Player from "./components/Player.vue";

export default {
  props: {
    speaker: {
      type: Object,
      required: true,
    },
  },
  components: {
    BackgroundSvg,
    Description,
    Player,
  },
  data() {
    return {
      randomcolor,
      isPlayerShow: false,
    };
  },
  computed: {
    linearGradient() {
      return (
        "linear-gradient(45.28deg, " +
        this.randomColor() +
        " -11.53%, " +
        this.randomColor() +
        " 112.13%)"
      );
    },
  },
  created() {
    this.$accessModule("speaker_" + this.speaker.id, this);
  },
  methods: {
    randomColor() {
      return this.randomcolor({
        luminosity: "bright",
        format: "rgb",
      });
    },
  },
};
</script>
