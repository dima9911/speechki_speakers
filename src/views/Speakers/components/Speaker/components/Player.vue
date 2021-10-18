<template>
  <div class="voice-card__player">
    <div data-type="play-btn" class="voice-card__play-btn" @click="action">
      <audio
        ref="audio"
        v-once
        :src="speaker.sample"
        @ended="onAudioEnded"
        preload="none"
        data-type="audio"
      ></audio>
      <transition name="fade" tag="img" :duration="150">
        <img
          key="pause"
          src="../assets/images/pause.svg"
          class="pause"
          v-if="isPlay"
        />
        <img key="play" src="../assets/images/play.svg" class="play" v-else />
      </transition>
    </div>

    <div
      data-type="restart"
      class="voice-card__reset-player"
      @click="resetPlayer"
    >
      <img src="../assets/images/restart.svg" />
    </div>

    <a-select
      v-model="currentSpeed"
      size="small"
      ref="speedSelect"
      placement="top"
      class="speed-select"
      :getPopupContainer="() => $refs.speedSelectDropdown"
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
    <div ref="speedSelectDropdown"></div>
  </div>
</template>

<script>
export default {
  inject: ["speedsList"],
  props: {
    speaker: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      currentSpeed: 1,
      isPlay: false,
    };
  },
  created() {
    this.$accessModule("speaker_player_" + this.speaker.id, this);
    this.$root.$on("stopAnotherSpeakers", this.onStopWhenAnotherPlay);
  },
  beforeDestroy() {
    this.$root.$off("stopAnotherSpeakers", this.onStopWhenAnotherPlay);
  },
  methods: {
    action() {
      this.isPlay ? this.pause() : this.play();
    },
    onStopWhenAnotherPlay(speaker_id) {
      if (speaker_id != this.speaker.id) {
        this.pause();
        this.isPlay = false;
      }
    },
    resetAudio() {
      this.$refs.audio.currentTime = 0;
    },
    onAudioEnded() {
      this.resetAudio();
      this.$debug(
        "Аудио закончилось для " + this.speaker.name.eng + ", плеер ресетнут",
        "warning"
      );
      this.pause();
    },
    onChangeSpeed() {
      this.$refs.audio.playbackRate = this.currentSpeed;
      this.$debug(
        "Изменена скорость аудио для " +
          this.speaker.name.eng +
          ", текущая скорость: " +
          this.currentSpeed,
        "warning"
      );
    },
    play() {
      this.$root.$emit("stopAnotherSpeakers", this.speaker.id);
      this.isPlay = true;
      this.$refs.audio.play();
    },
    pause() {
      this.isPlay = false;
      this.$refs.audio.pause();
    },
    resetPlayer() {
      this.resetAudio();
      this.play();
    },
  },
};
</script>
