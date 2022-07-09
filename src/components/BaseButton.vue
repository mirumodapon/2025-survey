<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps({ modelValue: Boolean, color: String })
</script>

<template>
  <button
    ref="el"
    class="base"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.base {
  border: 1px solid v-bind(color);
  text-align: start;
  background: none;
  color: v-bind(color);
  padding: 6px;
  font-size: 1.2rem;
  overflow: hidden;
  position: relative;
  line-height: 34px;
  cursor: pointer;

  &:hover,
  &:active {
    color: var(--text-color);
    background: v-bind(color);
  }
}
</style>
