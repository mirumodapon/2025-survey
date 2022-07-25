export type Option = { text: string, value: string | boolean }

export type BaseFieldConfig ={
  type: 'email'
} | {
  type: 'text',
  inputType?: string
  autocomplete?: string
  maxLength?: number
} | {
  type: 'multi-text'
  maxLength?: number
} | {
  type: 'single-option'
  options: Array<Option>,
  other?: { text: string }
} | {
  type: 'multi-option'
  options: Array<Option>
  maxChosen?: number,
  other?: { text: string }
} | {
  type: 'agree',
  question: string
}

export type FormGuard = (data: DataType, step: number, config: FormConfig) => number | boolean

export type FormField = { type: 'Field', key: string, required?: boolean, question: string, config: BaseFieldConfig }

export type FormItem = { type: 'FormStartup' }
  | FormField
  | { type: 'Explain', text: string }
  | { type: 'Captcha' }
  | { type: 'FormEnd' }
  | { type: 'Coc' }
  | { type: 'Guard', to: FormGuard }

export type FormConfig = FormItem[][]

export type DataType = {
  [key: string]: string | boolean | string[]
  captchaToken: string
}
