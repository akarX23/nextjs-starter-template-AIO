import React from 'react'
import NextNProgress from 'nextjs-progressbar'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { SessionProvider } from 'next-auth/react'

import { CacheProvider, EmotionCache } from '@emotion/react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import theme from 'helpers/muiTheme'
import 'styles/globals.css'
import { store } from 'redux/store'
import createEmotionCache from 'helpers/createEmotionCache'
import { Session } from 'next-auth'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
  session?: Session
}

function CcWeb(props: MyAppProps) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
    session,
  } = props

  return (
    <>
      <NextNProgress
        color="#36C658"
        startPosition={0.3}
        stopDelayMs={200}
        height={1.5}
        showOnShallow={true}
        options={{ easing: 'ease', speed: 500 }}
      />
      <Provider store={store}>
        <SessionProvider session={session}>
          <CacheProvider value={emotionCache}>
            <ThemeProvider theme={theme}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeProvider>
          </CacheProvider>
        </SessionProvider>
      </Provider>
    </>
  )
}

export default CcWeb
