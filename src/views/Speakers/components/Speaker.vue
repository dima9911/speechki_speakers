<template>
  <div
    class="voice-card"
    data-value="English (US)"
    @mouseleave="player.show = false"
    :style="{
      background: linearGradient,
    }"
  >
    <img
      src="../assets/images/audio-visualizer.svg"
      class="audio-visualizer svg-background-item"
    />
    <img
      class="svg-background-item voice-card__fill-line-one"
      src="../assets/images/voice-card__fill-line-one.svg"
    />
    <img
      class="svg-background-item voice-card__fill-line-two"
      src="../assets/images/voice-card__fill-line-two.svg"
    />

    <div
      class="voice-card__description"
      v-show="!player.show"
      @mouseover="player.show = true"
    >
      <div class="voice-card__name">{{ speaker.name.eng }}</div>
      <div class="voice-card__lang">{{ speaker.language.label.eng }}</div>
    </div>

    <div class="voice-card__player" v-show="player.show">
      <div data-type="play-btn" class="voice-card__play-btn">
        <audio
          ref="audio"
          v-once
          :src="speaker.sample"
          @ended="onAudioEnded"
          preload="none"
          data-type="audio"
        ></audio>
        <img
          src="../assets/images/pause.svg"
          class="pause"
          v-if="player.play == true"
          @click="pause"
        />
        <img
          src="../assets/images/play.svg"
          class="play"
          v-else
          @click="play"
        />
      </div>

      <div
        data-type="restart"
        class="voice-card__reset-player"
        @click="resetPlayer"
      >
        <img src="../assets/images/restart.svg" />
      </div>

      <a-select
        v-model="player.speed"
        size="small"
        class="speed-select"
        :showArrow="false"
        @change="onChangeSpeed"
        dropdownClassName="speed-select__dropdown"
      >
        <a-select-option
          v-for="speed in speedsList"
          :key="speed.value"
          :value="speed.value"
        >
          {{ speed.title }}
        </a-select-option>
      </a-select>
    </div>
  </div>
</template>

<script>
import randomcolor from "randomcolor";

export default {
  props: {
    speaker: {
      type: Object,
      required: true,
    },
    speedsList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      randomcolor,
      player: {
        show: false,
        play: false,
        speed: 1,
      },
    };
  },
  created() {
    // this.$accessModule("speaker_" + this.speaker.id, this);
    this.$root.$on("stopAnotherSpeakers", this.onStopWhenAnotherPlay);
  },
  beforeDestroy() {
    this.$root.$off("stopAnotherSpeakers", this.onStopWhenAnotherPlay);
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
  methods: {
    onStopWhenAnotherPlay(speaker_id) {
      if (speaker_id != this.speaker.id) {
        this.pause();
        this.player.show = false;
        this.player.play = false;
      }
    },
    resetAudio() {
      this.$refs.audio.currentTime = 0;
    },
    onAudioEnded() {
      this.resetAudio();
      this.pause();
    },
    onChangeSpeed() {
      this.$refs.audio.playbackRate = this.player.speed;
    },
    play() {
      this.$root.$emit("stopAnotherSpeakers", this.speaker.id);
      this.player.play = true;
      this.$refs.audio.play();
    },
    pause() {
      this.player.play = false;
      this.$refs.audio.pause();
    },
    resetPlayer() {
      this.resetAudio();
      this.play();
    },
    randomColor() {
      return this.randomcolor({
        luminosity: "bright",
        format: "rgb",
      });
    },
  },
};
</script>
