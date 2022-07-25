import { GoogleSpreadsheet } from 'google-spreadsheet'
import { config } from 'dotenv'
import { join } from 'path'
import { FormField, DataType } from '../src/types'
import { makeFormConfig } from '../src/modules/Form'
import { writeFile } from 'fs/promises'
import palette from 'google-palette'

config({ path: join(__dirname, '../.env.local') })
const SPREADSHEET_ID = '1AYf_qzrxlp7K2SdsgUfjpqIY7qiPOG710zsMpyhpCCo'

async function getSource () {
  const doc = new GoogleSpreadsheet(SPREADSHEET_ID)
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  })

  await doc.loadInfo()

  const sheet = doc.sheetsById[0]
  const rows = await sheet.getRows()
  return rows.map((r) => JSON.parse(r.original))
}

const DEFAULT_CHART_TYPE_TABLE = {
  'single-option': 'pie',
  'multi-option': 'bar',
  'agree': 'pie'
} as const

const DEFAULT_CHART_TYPES = Object.values(DEFAULT_CHART_TYPE_TABLE)

function getChartType (item: FormField): (typeof DEFAULT_CHART_TYPES)[number] | null {
  return DEFAULT_CHART_TYPE_TABLE?.[item.config.type] ?? null
}

const uniq = <T>(input: T[]) => [...new Set(input)]
const useT = (lang) => (zh: string, en: string) => lang === 'zh' ? zh : en
const calcSum = (labelValues: Array<string | boolean>, field: string, source: DataType[]) => {
  const table = new Map<string | boolean, number>()

  const add = (v: string | boolean) => {
    const t = table.get(v) ?? 0
    table.set(v, t + 1)
  }

  source.forEach((s) => {
    const value = s[field]
    if (Array.isArray(value)) {
      value.forEach((v) => add(v))
    } else {
      add(value)
    }
  })

  return labelValues.map((lv) => table.get(lv) ?? 0)
}

const generateColors = (num: number) => {
  return palette('tol-dv', num).map((c) => `#${c}`)
}

const getLabelText = (text: string) => {
  if (text.length > 20) {
    const [t1, ...t2] = text.split(' ')
    return [t1, t2.join(' ')]
  }
  return text
}

function getChartConfig (t: (zh: string, en: string) => string, field: FormField, source: DataType[]) {
  const type = getChartType(field)
  if (!type) return null

  if (field.key === 'is_allow_coc') return null

  if (type === 'pie') {
    const makeLabels = () => {
      if (field.config.type === 'agree') {
        return [
          { text: t('是', 'Yes'), value: true },
          { text: t('否', 'No'), value: false }
        ]
      }
      if (field.config.type === 'single-option') {
        const options = field.config.options
        const optionValues = options.map((o) => o.value)
        const possibleValues = uniq(source.map((s) => s[field.key] as string))

        return [
          ...options,
          ...possibleValues.filter((r) => !optionValues.includes(r)).map((v) => ({ text: v !== '' ? v : t('無資料', 'No data'), value: v }))
        ]
      }
      return []
    }

    const labels = makeLabels()
    const data = calcSum(labels.map((l) => l.value), field.key, source)

    return {
      key: field.key,
      type,
      question: (field.config.type === 'agree') ? field.config.question : field.question,
      data: {
        labels: labels.map((l) => l.text),
        datasets: [{
          data,
          backgroundColor: generateColors(data.length),
        }]
      },
      options: {
        layout: {
          padding: 10
        }
      }
    }
  }

  if (type === 'bar') {
    const makeLabels = () => {
      if (field.config.type === 'multi-option') {
        const options = field.config.options
        const optionValues = options.map((o) => o.value)
        const possibleValues = uniq(source.map((s) => s[field.key] as string[])).flat()

        return [
          ...options,
          ...possibleValues.filter((r) => !optionValues.includes(r)).map((v) => ({ text: v !== '' ? v : t('無資料', 'No data'), value: v }))
        ]
      }
      return []
    }

    const labels = makeLabels()
    const data = calcSum(labels.map((l) => l.value), field.key, source)
    const mixed = labels.map((label, i) => ({ label, data: data[i] })).sort((a, b) => b.data - a.data)

    return {
      key: field.key,
      type,
      question: (field.config.type === 'agree') ? field.config.question : field.question,
      data: {
        labels: mixed.map((l) => getLabelText(l.label.text)),
        datasets: [{
          label: field.question,
          data: mixed.map((d) => d.data),
          backgroundColor: generateColors(data.length)
        }]
      },
      options: {
        aspectRatio: mixed.length > 15 ? 0.5 : 1,
        indexAxis: 'y',
        layout: {
          padding: 5
        },
        scales: {
          x: {
            stacked: false
          }
        }
      },
      custom: {
        limit: 20,
        skipZero: true
      }
    }
  }
}


(async () => {
  const source = await getSource()

  const langs = ['zh', 'en'] as const
  const [zh, en] = langs.map((lang) => {
    const t = useT(lang)
    const formConfig = makeFormConfig(t, { captchaToken: '' })

    return formConfig
      .flat()
      .filter((item) => item.type === 'Field')
      .map((item) => getChartConfig(t, item as FormField, source))
      .filter((item) => item !== null)
  })

  await writeFile(join(__dirname, '../public/result.json'), JSON.stringify({ zh, en }))
})()


