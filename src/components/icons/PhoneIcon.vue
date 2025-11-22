<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"
      :stroke="stroke"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      :fill="fill === 'none' ? 'none' : fill"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { colors } from '@/utils/color';

export default defineComponent({
  name: 'PhoneIcon',
  props: {
    size: { type: Number, default: 24 },
    stroke: { type: String, default: colors.secondary },
    fill: { type: String, default: 'none' },
  },
});
</script>

<style scoped></style>
