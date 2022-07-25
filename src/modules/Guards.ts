import { FormConfig, FormGuard } from '../types'

export const requiredGuard = (lang: string): FormGuard => (data, step, config) => {
  const keys = config[step].filter((c) => c.type === 'Field' && c.required).map((c) => (c as { key: string }).key)
  const result = keys.every((key) => {
    const v = data[key]
    if (typeof v === 'string') return v !== ''
    if (Array.isArray(v)) return v.length > 0
    if (typeof v === 'boolean') return true
    return !!v
  })
  if (!result) alert(lang === 'zh' ? '請填寫必填欄位。' : 'Please fill in the required fields.')
  return result
}

export const jumpToCOSCUPGuard = (key: string): FormGuard => (data, step, config) => {
  if (!data[key]) {
    const nextStep = config.findIndex((el) => el.find((e) => e.type === 'Field' && e.key === 'what_hope_coscup'))
    return nextStep
  }
  return true
}

export const jumpToRole: FormGuard = (data, step, config) => {
  const codersStep = config.findIndex((el) => el.find((e) => e.type === 'Field' && e.key === 'commonly_used_languages'))
  const usersStep = config.findIndex((el) => el.find((e) => e.type === 'Field' && e.key === 'know_license'))
  const promotersStep = config.findIndex((el) => el.find((e) => e.type === 'Field' && e.key === 'why_promote_open_source'))

  if (Array.isArray(data.open_source_role) && data.open_source_role.includes('開發者')) return codersStep
  if (Array.isArray(data.open_source_role) && data.open_source_role.includes('使用者')) return usersStep
  if (Array.isArray(data.open_source_role) && data.open_source_role.includes('推廣者')) return promotersStep
  return false
}

export const jumpToOtherRoleOrCOSCUP: FormGuard = (data, step, config) => {
  const codersStep = config.findIndex((el) => el.find((e) => e.type === 'Field' && e.key === 'commonly_used_languages'))
  const usersStep = config.findIndex((el) => el.find((e) => e.type === 'Field' && e.key === 'know_license'))
  const promotersStep = config.findIndex((el) => el.find((e) => e.type === 'Field' && e.key === 'why_promote_open_source'))
  const coscupStep = config.findIndex((el) => el.find((e) => e.type === 'Field' && e.key === 'what_hope_coscup'))

  if (step === codersStep) {
    if (Array.isArray(data.open_source_role) && data.open_source_role.includes('使用者')) return usersStep
    if (Array.isArray(data.open_source_role) && data.open_source_role.includes('推廣者')) return promotersStep
  } else if (step === usersStep) {
    if (Array.isArray(data.open_source_role) && data.open_source_role.includes('推廣者')) return promotersStep
  }
  return coscupStep
}

export const verifyCaptcha =  (t: (zh: string, en: string) => string): FormGuard => (data) => {
  const result = !!(data.captchaToken)
  if (!result) alert(t('請完成驗證', 'Please finish captcha'))
  return result
}

export const requiredAgree = (t: (zh: string, en: string) => string): FormGuard => (data) => {
  const result = !!data.is_allow_coc
  if (!result) alert(t('請同意 CoC', 'Please agree CoC'))
  return result
}

