<script lang="ts" setup>
import { computed } from 'vue'
const props = defineProps({ modelValue: String, max: { type: Number, default: 20 }, inputType: { type: String, default: 'text' }, readonly: { type: Boolean, default: false }, autocomplete: String })
const emit = defineEmits(['update:modelValue'])

const _value = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v)
})
</script>

<template>
  <div class="base">
    <input :type="inputType" :autocomplete="autocomplete" v-model="_value" :maxlength="max" :readonly="readonly" /><span v-if="!readonly">{{ `${_value?.length}/${max}` }}</span>
  </div>
</template>

<style lang="scss" scoped>
.base {
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;

  input {
    width: 100%;
    border: 1px solid var(--primary-color);
    background: var(--background-color);
    color: var(--primary-color);
    padding: 6px;
    font-size: 1.2rem;
    line-height: 34px;
  }
  span {
    margin-left: 2px;
    font-size: 0.8rem;
  }
}
</style>
