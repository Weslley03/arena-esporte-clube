<template>
  <button :class="['default-button', ...classes]">
    <span v-if="text" class="text"> {{ text }} </span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: 'DefaultButton',
  props: {
    classes: {
      type: Array as () => string[],
      default: () => [] 
    },
    text: {
      type: String,
      required: false,
      default: null,
    }

  },
  setup() {
    return {}
  }
})
</script>

<style scoped>
.default-button {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 8px;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  cursor: pointer;
  color: var(--secondary);
  background-color: var(--tertiary);
  border: none;
  padding: 8px 14px;
  user-select: none;
  font-weight: 600;
}
</style>