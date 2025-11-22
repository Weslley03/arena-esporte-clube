<template>
  <svg 
    :width="size" 
    :height="size" 
    viewBox="0 0 24 24" 
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M5 12h14" 
      :stroke="stroke" 
      stroke-width="2" 
      stroke-linecap="round" 
      stroke-linejoin="round" 
    />
    <path 
      d="M12 5v14" 
      :stroke="stroke" 
      stroke-width="2" 
      stroke-linecap="round" 
      stroke-linejoin="round" 
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { colors } from '@/utils/color';

export default defineComponent({
  name: 'PlusIcon',
  props: {
    size: { type: Number, default: 24 },
    stroke: { type: String, default: colors.secondary },
  },
});
</script>

<style scoped></style>
