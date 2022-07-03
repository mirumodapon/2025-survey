<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps({ modelValue: Boolean })
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
  border: 1px solid var(--primary-color);
  text-align: start;
  background: none;
  color: var(--primary-color);
  padding: 6px;
  font-size: 1.2rem;
  overflow: hidden;
  position: relative;
  line-height: 34px;
  cursor: pointer;

  &:hover,
  &:active {
    color: #fff;
    background: var(--primary-color);
  }
}
</style>
