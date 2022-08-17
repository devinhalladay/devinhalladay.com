import '../styles/main.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Component {...pageProps} />
    <script src="https://replit.com/public/js/replit-badge.js" theme="dark" defer></script>
  </>
}

export default MyApp
