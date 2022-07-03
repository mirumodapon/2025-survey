<script lang="ts" setup>
import { PropType, computed } from 'vue'
import BaseCheckbox from './BaseCheckbox.vue'
import BaseRadio from './BaseRadio.vue'
import BaseText from './BaseText.vue'
import BaseTextarea from './BaseTextarea.vue'

type BaseFieldConfig = {
  type: 'text',
  maxLength?: number
} | {
  type: 'multi-text'
  maxLength?: number
} | {
  type: 'single-option'
  options: Array<{ text: string, value: string }>
} | {
  type: 'multi-option'
  options: Array<{ text: string, value: string }>
  maxChosen?: number
}

const props = defineProps({
  modelValue: {
    required: true
  },
  required: {
    type: Boolean,
    default: false
  },
  question: {
    type: String
  },
  config: {
    type: Object as PropType<BaseFieldConfig>,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const defaultValue = computed(() => {
  if (props.config.type === 'text' || props.config.type === 'multi-text') return ''
  if (props.config.type === 'multi-option') return []
  return null
})

const _value = computed({
  get: () => props.modelValue ?? defaultValue.value,
  set: (v) => {
    if (props.config.type === 'multi-option') {
      let newVal = v
      if (Array.isArray(newVal)) {
        if (newVal.length > (props.config.maxChosen ?? Number.MAX_SAFE_INTEGER)) {
          newVal.splice(0, 1)
        }
      }
      emit('update:modelValue', newVal)
      return
    }
    emit('update:modelValue', v)
  }
})

const comp = computed(() => {
  if (props.config.type === 'text') return { is: BaseText, max: props.config.maxLength }
  if (props.config.type === 'multi-text') return { is: BaseTextarea, max: props.config.maxLength }
  return props.config.options.map((option) => {
    return {
      is: props.config.type === 'single-option' ? BaseRadio : BaseCheckbox,
      text: option.text,
      value: option.value
    }
  })
})

const isVueComp = (c: unknown) => {
  return typeof c !== 'string'
}

</script>

<template>
  <section class="base">
    <h3 class="question">
      <slot>{{ question }}</slot>
    </h3>
    <span v-if="required" class="required">*</span>
    <div class="answer">
      <component
        v-if="!Array.isArray(comp)"
        v-bind="comp"
        :is="comp.is"
        v-model="_value"
      />
      <template v-else>
        <div v-for="c in comp">
          <component
            v-bind="c"
            :is="c.is"
            v-model="_value"
          >
            <component v-if="isVueComp(c.text)" :is="c.text" />
          </component>
        </div>
      </template>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.base {
  .question {
    color: #fff;
    font-size: 1.2rem;
    white-space: pre-line;
  }
  .required {
    color: red;
    font-size: 0.8rem;
  }
  .answer {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    padding: 0;

    >* {
      box-sizing: border-box;
      flex: 0 0 25%;
      max-width: 25%;
      padding: 10px;
    }

    @media screen and (max-width: 600px) {
      >* {
        box-sizing: border-box;
        flex: 0 0 50%;
        max-width: 50%;
        padding: 10px;
      }
    }
  }
}
</style>
