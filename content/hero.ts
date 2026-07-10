/**
 * Hero section content — data-driven so copy, welcome sequence, and the
 * background video asset can be swapped without touching component logic.
 */

export type WelcomeVariant = {
  /** BCP-47-ish language tag for reference / future i18n */
  lang: string
  /** Human label for the script (for aria + tooling) */
  script: string
  /** The full line rendered in the hero welcome sequence */
  text: string
  /** Text direction for correct rendering of RTL scripts */
  dir: 'ltr' | 'rtl'
  /** How long this variant stays fully visible, in ms */
  hold: number
}

/**
 * Ordered multilingual "Welcome to G-Lang" greeting sequence.
 * Kept readable and curated — a calm identity reveal, not a glitch demo.
 */
export const welcomeVariants: WelcomeVariant[] = [
  { lang: 'en', script: 'Latin',       text: 'Welcome to G-Lang',                dir: 'ltr', hold: 2000 },
  { lang: 'id', script: 'Latin',       text: 'Selamat datang di G-Lang',          dir: 'ltr', hold: 2000 },
  { lang: 'ja', script: 'Japanese',    text: 'G-Langへようこそ',                   dir: 'ltr', hold: 2000 },
  { lang: 'ko', script: 'Hangul',      text: 'G-Lang에 오신 것을 환영합니다',      dir: 'ltr', hold: 2000 },
  { lang: 'zh', script: 'Han',         text: '欢迎来到 G-Lang',                    dir: 'ltr', hold: 2000 },
  { lang: 'ar', script: 'Arabic',      text: 'مرحبًا بك في G-Lang',               dir: 'rtl', hold: 2000 },
  { lang: 'hi', script: 'Devanagari',  text: 'G-Lang में आपका स्वागत है',        dir: 'ltr', hold: 2000 },
  { lang: 'ru', script: 'Cyrillic',    text: 'Добро пожаловать в G-Lang',         dir: 'ltr', hold: 2000 },
  { lang: 'th', script: 'Thai',        text: 'ยินดีต้อนรับสู่ G-Lang',             dir: 'ltr', hold: 2000 },
  { lang: 'el', script: 'Greek',       text: 'Καλώς ήρθατε στο G-Lang',           dir: 'ltr', hold: 2000 },
]

export type HeroBackgroundAsset = {
  /** Background image/gif source */
  src: string
  /** Type: 'video', 'image', or 'gif' */
  type: 'video' | 'image' | 'gif'
  /** Poster / fallback still shown before load or when video unavailable. */
  poster?: string
  /** Loop length in seconds (asset is authored as a seamless 7s loop). */
  duration?: number
  loop?: boolean
  muted?: boolean
}

export const heroBackground: HeroBackgroundAsset = {
  src: '/images/hero/playback-loop.mp4',
  type: 'video',
  poster: '/hero-loop-poster.png',
  duration: 7,
  loop: true,
  muted: true,
}

export const heroContent = {
  /** Logo path to display in hero */
  logo: '/logo-wht.png',
  /** Body copy beneath the logo. */
  subtitle: 'A personal tale of Gilang Pratama Putra Siswanto artworks.',
  welcome: welcomeVariants,
  background: heroBackground,
} as const
