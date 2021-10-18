<template>
  <div class="voice-card__description">
    <div class="voice-card__name">{{ speaker.name.eng }}</div>
    <div class="voice-card__lang">{{ speaker.language.label.eng }}</div>
  </div>
</template>

<script>
export default {
  props: {
    speaker: {
      type: Object,
      required: true,
    },
  },
};
</script>
