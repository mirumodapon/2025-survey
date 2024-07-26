import { FormConfig, FormItem, DataType } from '../types'
import { jumpToCOSCUPGuard, jumpToOtherRoleOrCOSCUP, jumpToRole, requiredAgree, requiredGuard, verifyCaptcha } from './Guards'

export const makeFormConfig: (t: (zh: string, en: string) => string, data: DataType) => FormConfig = (t, data) => {

  const makeOptions = (options: [zh: string, en: string][]) =>
    options.map((option) => ({ text: t(option[0], option[1]), value: option[0] }))

  const makeProOptions = (options: string[]) =>
    options.map((option) => ({ text: option, value: option }))

  const PROGRAMMING_LANGUAGE_OPTIONS = makeProOptions([
    'APL',
    'Assembly',
    'Bash/Shell',
    'C',
    'C#',
    'C++',
    'Clojure',
    'COBOL',
    'Crystal',
    'Dart',
    'Delphi',
    'Elixir',
    'Erlang',
    'F#',
    'Go',
    'Groovy',
    'Haskell',
    'HTML/CSS',
    'Java',
    'JavaScript',
    'Julia',
    'Kotlin',
    'LISP',
    'Matlab',
    'Markdown',
    'Node.js',
    'Objective-C',
    'Perl',
    'PHP',
    'PowerShell',
    'Python',
    'R',
    'Ruby',
    'Rust',
    'Scala',
    'SQL',
    'Swift',
    'TypeScript',
    'VBA',
    'Other'
  ])

  return [
    [{ type: 'FormStartup' }],
    [
      { type: 'Field', key: 'nickname', required: true, question: t('暱稱', 'Nickname'), config: { type: 'text', autocomplete: 'nickname' }, inline: true },
      { type: 'Explain', text: t('暱稱將只提供給這次 OPass APP 參與這次 COSCUP 活動使用，與問卷內容無關。', 'The nickname will only be used for this OPass APP to participate in this COSCUP event and is not related to the content of the survey.') },
      { type: 'Field', key: 'email', required: !!data['is_subscribe_newsletter'], question: 'Email', config: { type: 'email' }, inline: true },
      { type: 'Explain', text: t('Email 將只在使用者同意訂閱電子報時，提供給電子報系統使用，與問卷內容無關。', 'The email will only be provided to the newsletter system when the user agrees to subscribe to the newsletter and is not related to the content of the survey.') },
      { type: 'Field', key: 'is_subscribe_newsletter', question: '', config: { type: 'agree', question: t('是否願意訂閱電子報？', 'Would you like to subscribe to the COSCUP newsletter?') }, inline: true },
      { type: 'Explain', text: t('訂閱電子報將收到 COSCUP 未來的相關訊息。', 'Subscribe to the newsletter to receive future information about COSCUP.') },
      { type: 'Field', key: 'is_take', question: '', config: { type: 'agree', question: t('是否願意填寫 COSCUP 2024 參與者大調查問卷？', 'Would you like to take the COSCUP 2024 attendee survey?') }, inline: true },
      { type: 'Explain', text: t('歡迎每個會眾、社群夥伴、贊助夥伴還有「你」，一同動動手指，為拼湊出台灣社群的樣貌盡一份力！', 'Welcome every attendee, community partner, sponsor, and “you” to join us in piecing together the image of Taiwan’s community by moving your fingers and contributing!') },
      { type: 'Guard', to: jumpToCOSCUPGuard('is_take') }
    ],
    [
      {
        type: 'Field',
        key: 'age',
        required: true,
        question: t('你的年齡？', 'What\'s your Age?'),
        config: {
          type: 'single-option',
          options: makeOptions([
            ['18 歲以下', 'Under 18 years old'],
            ['19-24 歲', '19-24 years old'],
            ['25-34 歲', '25-34 years old'],
            ['35-44 歲', '35-44 years old'],
            ['45-54 歲', '45-54 years old'],
            ['55-64 歲', '55-64 years old'],
            ['65歲以上', '65 years or older'],
            ['不方便告知', 'Prefer not to say']
          ]),
        }
      },
      {
        type: 'Field',
        key: 'gender',
        required: true,
        question: t('你的性別？', 'What\'s your gender?'),
        config: {
          type: 'single-option',
          options:  makeOptions([
            ['男', 'Man'],
            ['女', 'Woman'],
            ['不方便告知', 'Prefer not to say'],
            ['非二元、性別酷兒、性別流動、間性別或無性別', 'Non-binary, genderqueer, or gender non-conforming']
          ]),
          other: { text: t('或專屬你的詞', 'Or, in your own words:') }
        }
      },
      {
        type: 'Field',
        key: 'education_level',
        required: true,
        question: t('你的教育程度？', 'What\'s your education level'),
        config: {
          type: 'single-option',
          options:  makeOptions([
            ['國小', 'Primary/elementary school'],
            ['國中', 'Junior high school'],
            ['高中/高職', 'Senior high school'],
            ['專科', 'Junior college'],
            ['學士', 'Bachelor\'s degree'],
            ['碩士', 'Master\'s degree'],
            ['博士', 'Doctor\'s degree'],
          ]),
          other: { text: t('其他', 'Other') }
        }
      },
      {
        type: 'Field',
        key: 'current_primary_residence',
        required: true,
        question: t('你目前的主要居住地？', 'What\'s your current primary residence?'),
        config: {
          type: 'single-option',
          options:  makeOptions([
            ['亞洲', 'Asia'],
            ['歐洲', 'Europe'],
            ['北美洲', 'North America'],
            ['中南美洲', 'Central and South America'],
            ['大洋洲', 'Oceania'],
            ['非洲', 'Africa'],
          ]),
          other: { text: t('其他', 'Other') }
        }
      },
      { 
        type: 'Field', 
        key: 'nationality', 
        required: true, 
        question: t('你的國籍？', 'What\'s your nationality?'), 
        config: { 
          type: 'single-option',
          options:  makeOptions([
            ['台灣', 'Taiwan'],
            ['香港', 'Hong Kong'],
            ['中國大陸', 'China'],
            ['英國', 'UK'],
            ['美國', 'U.S.A.'],
            ['加拿大', 'Canada'],
            ['日本', 'Japan'],
            ['韓國', 'Korea'],
            ['澳洲', 'Australia'],
            ['菲律賓', 'Philippines'],
            ['新加坡', 'Singapore'],
            ['法國', 'France'],
            ['德國', 'Germany']
          ]),
          other: { text: t('其他', 'Other') }
        }
      }
    ],
    [
      {
        type: 'Field',
        key: 'work_status',
        required: true,
        question: t('以下哪項最能形容你？請選擇所有適用的選項。', 'Which of the following describe you, if any? Please check all that apply.'),
        config: {
          type: 'multi-option',
          options:  makeOptions([
            ['全職員工', 'Employed full-time'],
            ['全職學生', 'Student, full-time'],
            ['自營商、SOHO 或 自由工作者',  'Independent contractor, freelancer, or self-employed'],
            ['目前未就業，但在找工作中', 'Not employed, but looking for work'],
            ['半職員工', 'Employed part-time'],
            ['半職學生', 'Student, part-time'],
            ['目前未就業，但對工作不感興趣', 'Not employed, and not looking for work'],
            ['不方便告知', 'I prefer not to say'],
            ['已退休', 'Retired'],
          ])
        }
      },
      {
        type: 'Field',
        key: 'work_job',
        required: true,
        question: t('以下哪項最能形容你目前的工作？請選擇所有適用的選項。', 'Which of the following describes your current job? Please select all that apply.'),
        config: {
          type: 'multi-option',
          options:  makeOptions([
            ['工程師/開發者, 前端', 'Developer, Front-end'],
            ['工程師/開發者, 後端', 'Developer, Back-end'],
            ['工程師/開發者, 全端', 'Developer, Full-stack'],
            ['工程師/開發者, 手機', 'Developer, Mobile'],
            ['工程師/開發者, 桌面或企業應用', 'Developer, Desktop or Enterprise Applications'],
            ['工程師/開發者, 嵌入式應用程序或設備', 'Developer, Embedded Applications or Devices'],
            ['工程師/開發者, 遊戲或圖像', 'Developer, Game or Graphics'],
            ['工程師/開發者, 品質保證或測試', 'Developer, QA or test'],
            ['工程師/開發者, 自動化', 'Developer, Automation'],
            ['開發運維工程師', 'DevOps Engineer'],
            ['資料工程師', 'Engineer, Data'],
            ['網站可靠性工程工程師', 'Engineer, Site Reliability'],
            ['數位電路設計工程師', 'Engineer, Digital Circuit Design'],
            ['工程師經理', 'Engineering Manager'],
            ['系統管理員', 'System Administrator'],
            ['資料庫管理員', 'Database Administrator'],
            ['資料科學家或機器學習人員', 'Data Scientist or Machine Learning specialist'],
            ['資料或商業分析人員', 'Data or Business Analyst'],
            ['設計師', 'Designer'],
            ['專案管理', 'Project Management'],
            ['產品經理', 'Product Manager'],
            ['行銷相關人員', 'Marketing-related Professional'],
            ['銷售業務人員', 'Business or Sales Professional'],
            ['金融相關人員', 'Finance-related Professional'],
            ['高層管理者（首席長、總經理等）', 'Senior Executive (C-Suite, VP, etc.)'],
            ['人力資源管理人員', 'Human Resources Professional'],
            ['總務行政人員', 'Administration Staff'],
            ['學術研究人員', 'Academic Researcher'],
            ['培訓講師/顧問', 'Training Instructor/Consultant'],
            ['教育人員', 'Educator'],
            ['技術員', 'Technician'],
            ['學生', 'Student'],
            ['目前未就業', 'Not employed']
          ]),
          other: { text: t('其他', 'Other') }
        }
      },
      {
        type: 'Field',
        key: 'job_time',
        required: true,
        question: t('你從事相關工作多久了？', 'How long have you been working in the industry?'),
        config: {
          type: 'single-option',
          options:  makeOptions([
            ['< 1 年', 'Less than 1 year'],
            ['1 - 4 年', '1 to 4 years'],
            ['5 - 9 年', '5 to 9 years'],
            ['10 - 14 年', '10 to 14 years'],
            ['15 - 19 年', '15 to 19 years'],
            ['20 - 24 年', '20 to 24 years'],
            ['25 to 29 年', '25 to 29 years'],
            ['>  30 年', 'More than 30 years']
          ])
        }
      },
      {
        type: 'Field',
        key: 'job_industry',
        required: true,
        question: t('你在哪個產業工作或是參與最多的產業？請選擇所有適用的選項。', 'Which industry do you work in or are most involved with? Please select all that apply.'),
        config: {
          type: 'multi-option',
          options:  makeOptions([
            ['電子資訊/軟體/半導體相關業 - 軟體及網路相關業', 'Software and network'],
            ['電子資訊/軟體/半導體相關業 - 電信及通訊相關業', 'Telecommunications and communications'],
            ['電子資訊/軟體/半導體相關業 - 電腦及消費性電子製造業', 'Computer and Consumer Electronics Manufacturing'],
            ['電子資訊/軟體/半導體相關業 - 光電及光學相關業', 'Optoelectronics and Optics'],
            ['電子資訊/軟體/半導體相關業 - 電子零組件相關業', 'Electronic components'],
            ['電子資訊/軟體/半導體相關業 - 半導體業', 'Semiconductor'],
            ['一般製造業', 'General Manufacturing'],
            ['一般服務業', 'General Service'],
            ['文教相關業', 'Culture and Education'],
            ['政府公共行政', 'Government and public services'],
            ['大眾傳播相關業', 'Media and Communication'],
            ['批發/零售業', 'Wholesale / Retail'],
            ['金融投顧及保險業', 'Financial Investment and Insurance'],
            ['運輸物流及倉儲業', 'Transportation logistics and warehousing'],
            ['醫療保健及社會福利', 'Healthcare and social welfare'],
            ['法律/會計/顧問/研發', 'Legal / Accounting / Consulting / R&D'],
            ['藝術/旅遊/娛樂休閒/運動業', 'Art / Travel / Entertainment & Leisure / Sports'],
            ['住宿/餐飲服務業', 'Accommodation / Food Service'],
            ['政治及宗教', 'Politics and Religion'],
            ['建築營造及不動產相關業', 'Construction and real estate'],
            ['農林漁牧水電資源業', 'Agriculture, Forestry, Fisheries, Livestock, Water, and Electronic Resources'],
          ]),
          other: { text: t('其他', 'Other') }
        }
      },
      {
        type: 'Field',
        key: 'job_salary',
        required: true,
        question: t('你目前的總年薪是多少（扣税前的薪資、獎金和年終）？如果你是按照小時計酬，請估算大約的年薪。(以臺幣為單位)', 'What is your current total compensation in TWD (salary, bonuses, and perks, before taxes and deductions)? If you are paid hourly, please estimate an equivalent yearly salary.'),
        config: {
          type: 'single-option',
          options:  makeOptions([
            ['0 - 36萬', '0 - 360,000 TWD'],
            ['36萬 - 60萬', '360,000 - 600,000 TWD'],
            ['60萬 - 84萬', '600,000 - 840,000 TWD'],
            ['84萬 - 108萬', '840,000 - 1,080,000 TWD'],
            ['108萬 - 132萬', '1,080,000 - 1,320,000 TWD'],
            ['132萬 - 156萬', '1,320,000 - 1,560,000 TWD'],
            ['156萬 - 180萬', '1,560,000 - 1,800,000 TWD'],
            ['180萬 - 204萬', '1,800,000 - 2,040,000 TWD'],
            ['204萬以上', '2,040,000 TWD or more'],
            ['不方便告知', 'Prefer not to say']
          ])
        }
      },
      { type: 'Explain', text: t('我們希望能分享最真實的業界薪資情報，因此邀請 COSCUP 會眾用匿名的方式分享薪資資訊，讓大家了解相似經驗與職位的市場行情，更清楚自己在市場上的價值。', 'We hope to share salary information anonymously through the experiences of COSCUP participants. By sharing the most realistic salary information in the industry, we can help people understand the market situation and better understand their value in the market.') }
    ],
    [
      {
        type: 'Field',
        key: 'is_hear_open_source',
        required: true,
        question: t('是否聽過開放原始碼？', 'Have you ever heard of Open Source'),
        config: {
          type: 'single-option',
          options: [
            { text: t('是', 'Yes'), value: true },
            { text: t('否', 'No'), value: false }
          ]
        }
      },
      { type: 'Guard', to: jumpToCOSCUPGuard('is_hear_open_source') }
    ],
    [
      {
        type: 'Field',
        key: 'how_know_open_source',
        required: true,
        question: t('你是如何認識開放原始碼？', 'How do you know Open Source? Please select all that apply.'),
        config: {
          type: 'multi-option',
          options:  makeOptions([
            ['親友介紹', 'Friends and Family'],
            ['學校老師/大學教授', 'School Teachers/ University Professors'],
            ['學校社團', 'School Clubs / Communities'],
            ['報章雜誌', 'Newspapers and Magazines'],
            ['電視新聞', 'TV News'],
            ['網路論壇', 'Online Forums'],
            ['網路新聞', 'Online News'],
            ['社群媒體(FB, IG, Twitter, Plurk...)', 'Social Media'],
            ['公司同事', 'Co-worker'],
            ['工作需求', 'Job requirements'],
            ['開源社群', 'Open-source community'],
            ['活動/講座', 'event/seminar'],
          ]),
          other: { text: t('其他', 'Other') }
        }
      },
      {
        type: 'Field',
        key: 'encounter_COSCUP',
        required: true,
        question: t('你在哪邊遇到了 COSCUP？', 'Where did you encounter COSCUP?'),
        config: {
          type: 'multi-option',
          options: makeOptions([
            ['參與 FOSDEM', 'Participate in FOSDEM'],
            ['參與 SCaLE', 'Participate in SCaLE'],
            ['參與 FOSSAISA', 'Participate in FOSSAISA'],
            ['參與 OSPN.jp 系列活動', 'Participate in OSPN.jp series events'],
            ['參與 中国开源年会', 'Participate in the China Open Source Annual Conference'],
            ['參與 香港開源年會', 'Participate in the Hong Kong Open Source Conference'],
            ['參與 HITCON', 'Participate in HITCON'],
            ['參與 g0v Summit', 'Participate in g0v Summit'],
            ['參與 SITCON 系列活動', 'Participate in SITCON series events'],
            ['參與 PyCON 系列活動', 'Participate in PyCon series events'],
            ['參與 MOPCON', 'Participate in MOPCON'],
          ]),
          other: { text: t('其他', 'Other') }
        }
      },
      {
        type: 'Field',
        key: 'reasons_to_come_to_COSCUP',
        required: true,
        question: t('你是看到、聽到或接觸了什麼而來 COSCUP 的呢？', 'What did you see, hear, or come into contact with that led you to COSCUP?'),
        config: {
          type: 'multi-option',
          options: makeOptions([
            ['我是老朋友！', 'I\'m an old friend!'],
            ['攤位介紹', 'Booth introduction'],
            ['演講宣傳', 'Presentation promotion'],
            ['看到傳單', 'Saw flyers'],
            ['電子報：OCF 每月電子報', 'E-newsletter: OCF monthly newsletter'],
            ['電子報：COSCUP', 'E-newsletter: COSCUP'],
            ['COSCUP 的 GitHub 專案', 'COSCUP\'s GitHub projects'],
            ['親友介紹', 'Introduced by friends or family'],
          ]),
          other: { text: t('其他', 'Other') }
        }
      },
      {
        type: 'Field',
        key: 'platforms_to_receive_updates',
        required: true,
        question: t('你有在使用哪些平臺持續接收開源新知呢？', 'What platforms are you using to continuously receive open-source updates?'),
        config: {
          type: 'multi-option',
          options: makeOptions([
            ['Faecbook', 'Faecbook'],
            ['X (過去的 Twitter)', 'X (formerly Twitter)'],
            ['LinkedIn', 'LinkedIn'],
            ['Mastodon', 'Mastodon'],
            ['Plurk', 'Plurk'],
            ['RSS Reader', 'RSS Reader'],
            ['關注社群討論 Mailing List', 'Follow community discussion mailing lists'],
            ['訂閱 原廠的電子報', 'Subscribe to the manufacturer\'s newsletter'],
            ['訂閱 GitHub/GitLab 等代管平臺的資訊', 'Subscribing to information from hosting platforms like GitHub/GitLab'],
          ]),
          other: { text: t('其他', 'Other') }
        }
      },
      {
        type: 'Field',
        key: 'open_source_role',
        required: true,
        question: t('你在開放原始碼的運動中扮演的角色？', 'What is your role in the Open Source movement?'),
        config: {
          type: 'multi-option',
          options: makeOptions([
            ['開發者', 'Coders'],
            ['使用者', 'Users'],
            ['推廣者', 'Promoters']
          ])
        }
      },
      { type: 'Guard', to: jumpToRole }
    ],
    [
      {
        type: 'Field',
        key: 'commonly_used_languages',
        required: true,
        question: t('過去一年中，你最常使用的程式、腳本、標記式語言是什麼？', 'Which programming, scripting, and markup languages have you done extensive development work in over the past year?'),
        config: {
          type: 'multi-option',
          options: PROGRAMMING_LANGUAGE_OPTIONS,
          maxChosen: 3,
          other: { text: t('其他', 'Other') }
        }
      },
      {
        type: 'Field',
        key: 'favorite_languages',
        required: true,
        question: t('喜歡的程式語言？', 'Favorite programming languages?'),
        config: {
          type: 'multi-option',
          options: PROGRAMMING_LANGUAGE_OPTIONS,
          maxChosen: 3,
          other: { text: t('其他', 'Other') }
        }
      },
      {
        type: 'Field',
        key: 'annoying_languages',
        required: true,
        question: t('討厭的程式語言？', 'Annoying programming languages?'),
        config: {
          type: 'multi-option',
          options: PROGRAMMING_LANGUAGE_OPTIONS,
          maxChosen: 3,
          other: { text: t('其他', 'Other') }
        }
      },
      {
        type: 'Field',
        key: 'commonly_develop_platforms',
        required: true,
        question: t('最常開發的平臺？', 'For which platforms do you develop?'),
        config: {
          type: 'multi-option',
          options: makeProOptions([
            'Web Backend',
            'Web Frontend',
            'Desktop',
            'Mobile',
            'Server/infrastructure',
            'Cloud',
            'IoT/Embedded',
            'WebAssembly',
            'AI (Deep Learning/Machine Learning)',
            'Consoles(Xbox/PlayStation/Nintendo)',
            'I don\'t develop anything'
          ]).map((el) => (
            el.value !== 'Consoles(Xbox/PlayStation/Nintendo)')
              ? el
              : { text: 'Consoles (Xbox/PlayStation/Nintendo)', value: 'Consoles(Xbox/PlayStation/Nintendo)' }
          ),
          maxChosen: 3,
          other: { text: t('其他', 'Other') }
        }
      },
      {
        type: 'Field',
        key: 'commonly_used_editors',
        required: true,
        question: t('最常使用的編輯器或 IDE ？', 'Most commonly used editors or IDEs?'),
        config: {
          type: 'multi-option',
          options: makeProOptions([
            'GNU nano',
            'Vim',
            'Emacs',
            'Sublime Text',
            'Visual Studio Code',
            'Visual Studio',
            'XCode',
            'Eclipse',
            'JetBrains Family (Intellij, PhpStorm, WebStorm)',
            'Android Studio',
            'Atom',
            'Notepad++'
          ]),
          maxChosen: 3,
          other: { text: t('其他', 'Other') }
        }
      },
      {
        type: 'Field',
        key: 'commonly_used_os',
        required: true,
        question: t('平常使用的作業系統？', 'Commonly used operating systems?'),
        config: {
          type: 'multi-option',
          options: makeProOptions([
            'Windows 10',
            'Windows 11',
            'Windows 7 or XP',
            'Ubuntu Linux',
            'Debian Linux',
            'Arch Linux',
            'Fedora Linux',
            'Redhat Linux',
            'Kali Linux',
            'alpine linux',
            'WSL2',
            'CentOS (including Stream & Rocky Linux)',
            'openSUSE Linux',
            'macOS',
            'Chrome OS Flex'
          ]),
          maxChosen: 3,
          other: { text: t('其他', 'Other') }
        }
      },
      {
        type: 'Field',
        key: 'commonly_used_web_browsers',
        required: true,
        question: t('最常使用的瀏覽器？', 'Commonly used web browsers?'),
        config: {
          type: 'multi-option',
          options: makeProOptions([
            'Google Chrome',
            'Mozilla Firefox',
            'Apple Safari',
            'Microsoft Edge',
            'Vivaldi',
            'Brave',
            'Opera',
            'Yandex',
            'Internet Explorer',
            'UC Browser',
            'Arc'
          ]),
          maxChosen: 3,
          other: { text: t('其他', 'Other') }
        }
      },
      {
        type: 'Field',
        key: 'commonly_used_database',
        required: true,
        question: t('最常使用的資料庫？', 'Commonly used database?'),
        config: {
          type: 'multi-option',
          options: makeProOptions([
            'MySQL',
            'MariaDB',
            'PostgreSQL',
            'Microsoft SQL Server',
            'MongoDB',
            'Redis',
            'SQLite',
            'Elasticsearch',
            'Oracle Database',
            'CouchDB',
            'Neo4j',
            'ClickHouse',
            'don’t use'
          ]),
          maxChosen: 3,
          other: { text: t('其他', 'Other') }
        }
      },
      { type: 'Guard', to: jumpToOtherRoleOrCOSCUP }
    ],
    [
      {
        type: 'Field',
        key: 'know_license',
        required: true,
        question: t('聽過與了解哪些常見自由及開放原始碼軟體授權條款？', 'What is some Free and Open Source Software license agreements you have heard of and know?'),
        config: {
          type: 'multi-option',
          options:  makeProOptions([
            'MIT',
            'ISC',
            'WTFPL',
            '(L/A)GPL 2.0',
            '(L/A)GPL 3.0',
            'MPL',
            'Apache 2.0',
            'BSD',
            'Creative Commons license',
          ]),
          other: { text: t('其他', 'Other') }
        }
      },
      {
        type: 'Field',
        key: 'is_sponsored_open_source',
        required: true,
        question: t('是否曾經付費或贊助過任何開源專案或貢獻者？', 'Have you ever paid for or sponsored any open source projects or contributors?'),
        config: {
          type: 'single-option',
          options: [
            { text: t('是', 'Yes'), value: true },
            { text: t('否', 'No'), value: false }
          ]
        }
      },
      {
        type: 'Field',
        key: 'is_open_source_no_paid',
        required: true,
        question: t('你知道開源不意味者一定要免費嗎？', 'Do you know that open source doesn\'t mean it has to be free?'),
        config: {
          type: 'single-option',
          options: [
            { text: t('是', 'Yes'), value: true },
            { text: t('否', 'No'), value: false }
          ]
        }
      },
      {
        type: 'Field',
        key: 'is_rely_open_source',
        required: true,
        question: t('你的工作中有使用或依賴開源嗎？', 'Do you use or rely on open source in your work?'),
        config: {
          type: 'single-option',
          options: [
            { text: t('是', 'Yes'), value: true },
            { text: t('否', 'No'), value: false }
          ]
        }
      },
      {
        type: 'Field',
        key: 'commonly_used_open_source_software',
        required: true,
        question: t('你最常使用的開源軟體是？', 'Commonly used open source software?'),
        config: {
          type: 'multi-option',
          options: makeProOptions([
            'Mozilla Firefox',
            'Chromium',
            'Mozilla Thunderbird',
            'Linux (Android)',
            'Libre Office',
            'Open Office',
            'GIMP',
            'Krita',
            'Blender'
          ]),
          maxChosen: 3,
          other: { text: t('其他', 'Other') }
        }
      },
      { type: 'Guard', to: jumpToOtherRoleOrCOSCUP }
    ],
    [
      {
        type: 'Field',
        key: 'why_promote_open_source',
        required: true,
        question: t('你為什麼願意推廣開放原始碼的精神？', 'Why are you willing to promote open source? Please select all that apply.'),
        config: {
          type: 'multi-option',
          options:  makeOptions([
            ['我為人人 人人為我', 'One for all, all for one'],
            ['對職業生涯有幫助', 'For professional growth'],
            ['被某些開發者感動', 'Moved by, inspired by some developers'],
            ['朋友強力推坑', 'It was highly recommend by a friend'],
            ['知識為人類共同資產應當共享得以最大化效益', 'Knowledge is a common asset of humanity and should be shared to maximize its benefits'],
          ]),
          other: { text: t('其他', 'Other') }
        }
      },
      {
        type: 'Field',
        key: 'how_promote_open_source',
        required: true,
        question: t('你平常如何推廣開放原始碼的精神？', 'How do you usually promote open source? Please select all that apply.'),
        config: {
          type: 'multi-option',
          options:  makeOptions([
            ['推廣大家使用開源軟體', 'Recommend people to use open source software'],
            ['與朋友科普何謂開源', 'Introduce friends to open source']
          ]),
          other: { text: t('其他', 'Other') }
        }
      },
    ],
    [
      {
        type: 'Field',
        key: 'what_hope_coscup',
        required: true,
        question: t('你希望能在 COSCUP 大會中有什麼收穫？', 'What do you hope to get out of COSCUP? Please select all that apply.'),
        config: {
          type: 'multi-option',
          options:  makeOptions([
            ['了解開放原始碼', 'Understand open source '],
            ['認識新朋友', 'Meet new people'],
            ['獲取新知', 'Gain new knowledge'],
            ['學習新技術', 'Learn new technologies'],
            ['與好朋友交流', 'Connect with friends'],
            ['與其他社群交流', 'Interact with other communities'],
          ]),
          other: { text: t('其他', 'Other') }
        }
      },
      {
        type: 'Field',
        key: 'what_swag_in_coscup',
        question: t('你想獲得的攤位小物？', 'What\'s a swag that you wish to get?'),
        config: {
          type: 'multi-text'
        }
      },
      {
        type: 'Field',
        key: 'what_from_booth_in_coscup',
        question: t('你希望在攤位獲得的資訊？', 'What do you want to learn the most from the booth?'),
        config: {
          type: 'multi-text'
        }
      },
      {
        type: 'Field',
        key: 'where_is_codepecker',
        question: t('你的小啄現在待在哪裡？你在 COSCUP 買的各種紀念品或者拿的小物有放在哪那邊或者使用嗎？', 'Where is your codepecker now? Have you placed or used the various souvenirs or small items you bought or received at COSCUP anywhere?'),
        config: {
          type: 'multi-text'
        }
      },
      {
        type: 'Field',
        key: 'technology_follow',
        question: t('你平常有接觸哪些科技、技術或開源的新聞來源呢？', 'What technology, technique, or open-source news sources do you usually follow?'),
        config: {
          type: 'multi-text'
        }
      },
      { type: 'Field', key: 'is_allow_coc', question: '', required: true, config: { type: 'agree', question: t('我已閱讀與瞭解 COSCUP 的 CoC', 'I have read and understood COSCUP’s Code of Conduct (CoC).') }, inline: true },
      { type: 'Coc' },
      { type: 'Captcha' },
      { type: 'Guard', to: requiredAgree(t) },
      { type: 'Guard', to: verifyCaptcha(t) }
    ]
  ]
}

export const getDefaultFormData = (config: FormConfig) => {
  const data: DataType = { captchaToken: '' }
  const makeData = (item: FormItem) => {
    if (
      item.type === 'FormStartup' ||
      item.type === 'Explain' ||
      item.type === 'FormEnd' ||
      item.type === 'Coc' ||
      item.type === 'Captcha' ||
      item.type === 'Guard'
    ) return
    data[item.key] = (() => {
      if (item.config.type === 'multi-option') return []
      if (item.config.type === 'agree') return false
      return ''
    })()
  }
  config.forEach((el) => {
    if (Array.isArray(el)) {
      el.forEach(makeData)
    } else {
      makeData(el)
    }
  })
  return data
}
