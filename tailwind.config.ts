import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0a0e27',
        secondary: '#1a1f3a',
        accent: '#00d9ff',
      },
    },
  },
  plugins: [],
}
export default config
