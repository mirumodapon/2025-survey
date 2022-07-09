<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({ modelValue: String, text: String, value: String })
const emit = defineEmits(['update:modelValue'])

const _value = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v)
})

const active = computed(() => props.value === _value.value)

</script>

<template>
  <label :class="{base: true, active}">
    <input v-model="_value" type="radio" :value="value" />
    <slot>{{ text }}</slot>
  </label>
</template>

<style lang="scss" scoped>
.base {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid var(--primary-color);
  text-align: start;
  background: none;
  color: var(--primary-color);
  padding: 6px;
  font-size: 1.2rem;
  overflow: hidden;
  position: relative;
  user-select: none;

  input[type=radio] {
    margin: 10px;
  }

  &.active {
    background: var(--primary-color);
    color: var(--text-color);
  }
}
</style>
