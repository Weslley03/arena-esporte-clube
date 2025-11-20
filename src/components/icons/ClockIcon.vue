<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle 
      cx="12" 
      cy="12" 
      r="10" 
      :stroke="stroke" 
      stroke-width="2" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    />
    <path 
      d="M12 6v6l4 2" 
      :stroke="stroke" 
      stroke-width="2" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    />
  </svg>
</template>

<script lang="ts">
import { colors } from '@/utils/color';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ClockIcon',
  props: {
    size: { type: Number, default: 24 },
    stroke: { type: String, default: colors.secondary },
    fill: { type: String, default: 'none' },
  },
});
</script>

<style scoped></style>
