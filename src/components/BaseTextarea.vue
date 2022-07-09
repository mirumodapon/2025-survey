<script lang="ts" setup>
import { computed } from 'vue'
const props = defineProps({ modelValue: String, max: { type: Number, default: 400 } })
const emit = defineEmits(['update:modelValue'])

const _value = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v)
})
</script>

<template>
  <div class="base">
    <textarea v-model="_value" :maxlength="max" />
    <span>{{ `${_value?.length}/${max}` }}</span>
  </div>
</template>

<style lang="scss" scoped>
.base {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;

  textarea {
    border: 1px solid var(--primary-color);
    background: none;
    color: var(--primary-color);
    padding: 6px;
    font-size: 1.2rem;
    line-height: 34px;
  }
  span {
    margin-left: 2px;
    font-size: 0.8rem;
    text-align: end;
  }
}
</style>
