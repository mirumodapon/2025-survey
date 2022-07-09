<script setup lang="ts">
import { computed, ref } from 'vue'
import BaseButton from './components/BaseButton.vue'
import BaseField from './components/BaseField.vue'
import BaseProgress from './components/BaseProgress.vue'
import FormStartup from './components/FormStartup.vue'
import { getDefaultFormData, makeFormConfig } from './modules/Form'
import { requiredGuard } from './modules/Guards'
import { FormGuard } from './types'
import FormEnd from './components/FormEnd.vue'
import FormLoading from './components/FormLoading.vue'

const getUserDefaultLang = () => {
  const userLanguage = window.navigator.language
  if (userLanguage.includes('zh')) return 'zh'
  return 'en'
}

const lang = ref(getUserDefaultLang())
const step = ref(0)


const t = (zh: string, en: string) => lang.value === 'zh' ? zh : en

const questions = computed(() => makeFormConfig(t, data.value, lang.value))

const data = ref(getDefaultFormData(makeFormConfig(t, { captchaToken: '' }, lang.value)))

const current = computed(() => questions.value[step.value])

const progress = computed(() => Math.floor(step.value / questions.value.length * 100))

const loading = ref('')
const token = ref(window.localStorage.getItem('ccip_token') ?? '')

const sitekey = import.meta.env.VITE_HCAPTCHA_SITE_KEY
const verifyCaptcha = (token: string) => {
  data.value.captchaToken = token
}
const histories = ref<number[]>([])
const next = () => {
  if ((step.value + 1) >= questions.value.length) return

  const guards = [requiredGuard(lang.value), ...(current.value.filter((c) => c.type === 'Guard') as Array<{ type: 'Guard', to: FormGuard }>).map((c) => c.to)]
  let nextStep = step.value + 1
  for (const guard of guards) {
    const result = guard(data.value, step.value, questions.value)
    if (typeof result === 'boolean' && !result) {
      return
    } else if (result !== true) {
      nextStep = result
    }
  }
  histories.value.push(step.value)
  step.value = nextStep
  window.scrollTo(0, 0)
}
const previous = () => {
  if (histories.value.length === 0) return
  const index = histories.value.length - 1
  step.value = histories.value[index]
  histories.value.splice(index, 1)
  window.scrollTo(0, 0)
}

const submit = async () => {
  const guards = [requiredGuard(lang.value), ...(current.value.filter((c) => c.type === 'Guard') as Array<{ type: 'Guard', to: FormGuard }>).map((c) => c.to)]
  for (const guard of guards) {
    const result = guard(data.value, step.value, questions.value)
    if (typeof result === 'boolean' && !result) {
      return
    }
  }

  if (loading.value) return
  loading.value = t('送出表單中 ...', 'Send form ...')
  const res = await fetch(import.meta.env.VITE_BACKEND_URL, { method: 'POST', body: JSON.stringify(data.value) })
  const result = await res.json()
  if (result.success) {
    token.value = result.token
    window.localStorage.setItem('ccip_token', result.token)
  } else {
    alert(t('系統錯誤', 'System failed'))
  }
  loading.value = ''
}
</script>

<template>
  <main class="main">
    <img class="banner" src="@/assets/banner.png" alt="COSCUP 2022 Developer Survey">
    <div
      v-if="!token && !loading"
      class="block"
    >
      <template v-for="item in current">
        <div
          v-if="item.type === 'Explain'"
          class="explain"
        >
          {{ item.text }}
        </div>
        <FormStartup v-else-if="item.type === 'FormStartup'" v-model="lang" />
        <BaseField
          v-else-if="item.type === 'Field'"
          :lang="lang"
          v-model="data[item.key]"
          v-bind="item"
        />
        <VueHcaptcha
          v-else-if="item.type === 'Captcha'"
          :sitekey="sitekey"
          theme="dark"
          @verify="verifyCaptcha"
        />
        <div v-else-if="item.type === 'Coc'" class="coc">
          <template v-if="lang === 'zh'">
            請<a href="https://hackmd.io/@coscup/cococo-zh#%E9%97%9C%E6%96%BC%E3%80%8C%E5%B0%8A%E9%87%8D%E3%80%8D">尊重</a>所有人。 如果覺得被冒犯或不受尊重時，請明確<a href="https://hackmd.io/@coscup/cococo-zh#%E9%97%9C%E6%96%BC%E3%80%8C%E5%8B%B8%E5%91%8A%E3%80%8D">勸告</a>對方停手，仍無法解決時請<a href="#%E9%97%9C%E6%96%BC%E3%80%8C%E6%89%BE%E7%A4%BE%E7%BE%A4%E5%A4%A5%E4%BC%B4%E5%8D%94%E5%8A%A9%E3%80%8D">找社群夥伴協助</a>，或<a href="https://hackmd.io/@coscup/cococo-zh#%E9%97%9C%E6%96%BC%E3%80%8C%E6%89%BE%E7%A4%BE%E7%BE%A4%E5%A4%A5%E4%BC%B4%E5%8D%94%E5%8A%A9%E3%80%8D">聯繫大會工作人員</a>。 如經大會判斷確實為冒犯騷擾情事，大會將明確公告並請其離場。
            <div style="text-align: center;">
              <a style="text-align: center;" target="_blank" href="https://hackmd.io/@coscup/cococo-zh">更多內容請看完整 CoC</a>
            </div>
          </template>
          <template v-else>
            <p><a href="https://hackmd.io/@coscup/cococo-en#Respect"><span>Be respectful</span></a><span> of other people. </span><a href="https://hackmd.io/@coscup/cococo-en#Resolve-Peacefully"><span>Respectfully ask people to stop</span></a><span> if you are bothered, and if you can’t resolve an issue, </span><a href="https://hackmd.io/@coscup/cococo-en#Ally"><span>contact any ally</span></a><span> you may know, or </span><a href="https://hackmd.io/@coscup/cococo-en#Contact-Staff"><span>the event staff</span></a><span>. If you engage in that behavior (offensive or disruptive), you’ll be asked to leave.</span></p>
            <div style="text-align: center;">
              <a style="text-align: center;" target="_blank" href="https://hackmd.io/@coscup/cococo-en">For more information, please see the full CoC.</a>
            </div>
          </template>
        </div>
      </template>
    </div>
    <FormLoading
      v-else-if="loading"
      :text="loading"
    />
    <FormEnd
      v-else-if="token"
      :t="t"
      :token="token"
    />
    <div
      v-if="!loading && !token"
      class="footer"
    >
      <BaseProgress :model-value="progress" />
      <div class="action">
        <BaseButton v-show="step !== 0" color="#FFF307" @click="previous">&lt;&lt; Previous</BaseButton>
        <BaseButton v-show="(step + 1) < questions.length" color="#94E73A" style="text-align: end" @click="next">Next >></BaseButton>
        <BaseButton v-show="(step + 1) >= questions.length" color="#94E73A" style="text-align: end" @click="submit">Submit</BaseButton>
      </div>
    </div>
  </main>
</template>

<style lang="scss">
:root {
  --primary-color: #25C2A5;
  --text-color: #fff;
  --accent-color: #94E73A;
  --background-color: #282635;
}

html, body {
  height: 100%;
  min-height: 100%;
  max-width: 1200px;
  margin: 0 auto;
  font-size: 14px;
  background-color: var(--background-color);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--text-color);
  text-align: center;
  height: 100%;
  min-height: 100%;

  .main {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    height: 100%;
    min-height: 100%;

    a {
      color: var(--primary-color);
    }

    .block {
      flex: 1;
    }

    .explain {
      text-align: start;
      margin: 0 10px;
      padding: 5px;
      background: gray;
      font-size: 0.9rem;
    }

    .coc {
      text-align: start;
      margin: 0 10px 5px 10px;
      padding: 5px;
      background: gray;
      font-size: 0.9rem;

      a {
        color: var(--accent-color);
        text-decoration: none;
      }
    }
  }

  .banner {
    width: 100%;
  }

  .footer {
    padding: 10px;

    .action {
      display: flex;

      >* {
        flex: 1 1;
        margin: 10px;
      }
    }
  }
}
</style>
