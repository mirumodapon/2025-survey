<script lang="ts" setup>
import { PropType, computed, ref, watch } from 'vue'
import { BaseFieldConfig } from '../types'
import BaseCheckbox from './BaseCheckbox.vue'
import BaseOther from './BaseOther.vue'
import BaseRadio from './BaseRadio.vue'
import BaseText from './BaseText.vue'
import BaseTextarea from './BaseTextarea.vue'
import BaseEmail from './BaseEmail.vue'

const props = defineProps({
  lang: {
    type: String,
    required: true
  },
  modelValue: {
    required: true
  },
  inline: {
    type: Boolean,
    default: false
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

const otherSymbol = 'iKoUaUTvgFpV4p'

const defaultValue = computed(() => {
  if (props.config.type === 'text' || props.config.type === 'multi-text') return ''
  if (props.config.type === 'multi-option') return []
  if (props.config.type === 'agree') return false
  return null
})

const _value = computed({
  get: () => {
    let v = props.modelValue ?? defaultValue.value
    if (props.config.type === 'single-option' && !props.config.options.map((o) => o.value).includes(v as string) && v !== '') {
      other.value = v as string
      return otherSymbol
    }
    if (props.config.type === 'multi-option' && Array.isArray(v)) {
      v = v.map((el) => {
        if (props.config.type === 'multi-option' && !props.config.options.map((o) => o.value).includes(el as string) && el !== ''){
          other.value = el
          return otherSymbol
        }
        return el
      })
    }
    return v
  },
  set: (v) => {
    let newVal = v
    if (props.config.type === 'single-option' && v === otherSymbol) {
      newVal = other.value
    }
    if (props.config.type === 'multi-option') {
      if (Array.isArray(newVal)) {
        if (newVal.length > (props.config.maxChosen ?? Number.MAX_SAFE_INTEGER)) {
          newVal.splice(0, 1)
        }
        newVal = newVal.map((el) => el === otherSymbol ? other.value : el)
      }
      emit('update:modelValue', newVal)
      return
    }
    emit('update:modelValue', newVal)
  }
})

const other = ref('')

watch(other, (newVal, oldVal) => {
  if (props.config.type === 'single-option' && oldVal === _value.value) _value.value = newVal
  if (props.config.type === 'multi-option' && Array.isArray(_value.value)) {
    _value.value = _value.value.map((el) => el === oldVal ? newVal : el)
  }
})

const comp = computed(() => {
  if (props.config.type === 'text') return { is: BaseText, max: props.config.maxLength, inputType: props.config.inputType, autocomplete: props.config.autocomplete }
  if (props.config.type === 'multi-text') return { is: BaseTextarea, max: props.config.maxLength }
  if (props.config.type === 'agree') return { is: BaseCheckbox, text: props.config.question }
  if (props.config.type === 'email') return { is: BaseEmail, lang: props.lang }

  return [
    ...props.config.options.map((option) => {
      return {
        is: props.config.type === 'single-option' ? BaseRadio : BaseCheckbox,
        text: option.text,
        value: option.value
      }
    }),
    ...(props.config.other ? [{
      is: props.config.type === 'single-option' ? BaseRadio : BaseCheckbox,
      text: BaseOther,
      textProps: { text: props.config.other.text },
      value: otherSymbol
    }] : [])
  ] as const
})

const isVueComp = (c: unknown) => {
  return typeof c !== 'string'
}

</script>

<template>
  <section :class="{base: true, inline}">
    <h3 v-if="question" class="question">
      <slot>{{ question }}</slot>
      <span v-if="required" class="required">*</span>
    </h3>
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
            <component v-if="isVueComp(c.text)" :is="c.text" v-bind="c.textProps" v-model="other" />
          </component>
        </div>
      </template>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.base {
  &.inline {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 5px 10px;

    .question {
      margin: 0 10px;
      flex: 1 1 40px
    }

    .answer {
      flex: 4 4 200px;
    }

    .answer > * {
      flex: 1;
      max-width: unset;
      padding: 5px;
    }
  }

  .question {
    color: var(--text-color);
    font-size: 1.2rem;
    white-space: pre-line;
  }
  .required {
    color: red;
    font-size: 1.2rem;
  }
  .answer {
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    flex-wrap: wrap;
    padding: 0;

    >* {
      box-sizing: border-box;
      flex: 1 1 25%;
      padding: 10px;

      >* {
        box-sizing: border-box;
        height: 100%;
      }
    }

    @media screen and (max-width: 600px) {
      >* {
        box-sizing: border-box;
        flex: 1 1 50%;
        padding: 10px;
      }
    }
  }
}
</style>
