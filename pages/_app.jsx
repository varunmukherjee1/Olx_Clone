import { Toaster } from 'react-hot-toast'
import { SessionProvider } from "next-auth/react"

import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Toaster position="top-center"/>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
