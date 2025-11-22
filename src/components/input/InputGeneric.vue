<template>
  <div class="input-wrapper">
    <input
      :type="type"
      :value="modelValue"
      @input="handleInput"
      :placeholder="placeHolder"
      :maxlength="maxlength"
      class="input-field"
    />
    <slot name="icon" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: 'InputGeneric',
  emits: ['update:modelValue'],
  props: {
    type: { type: String, default: 'text' },
    modelValue: { type: String, default: '' },
    placeHolder: { type: String, default: '' },
    maxlength: { type: Number, default: 22 }
  },
  setup(_, { emit }) {
    const handleInput = (event: Event) => {
      const target = event.target as HTMLInputElement;
      emit('update:modelValue', target.value);
    }

    return {
      handleInput,
    }
  }
})
</script>

<style scoped>
.input-field {
  display: flex;
  border-radius: 4px;
  padding: 8px;
  width: 100%;
  color: var(--secondary);
  color-scheme: dark;
  border: 1px solid var(--accent);
  background-color: var(--primary);

  &:hover {
    border-color: var(--secondary);
  }

  &:focus {
    border-color: var(--secondary);
    outline: none;
  }
}

.input-wrapper {
  display: flex;
  position: relative;
  width: 100%;
}

input[type="time"]::-webkit-calendar-picker-indicator,
input[type="date"]::-webkit-calendar-picker-indicator {
  opacity: 0;
  cursor: pointer;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  position: absolute;
}
</style>