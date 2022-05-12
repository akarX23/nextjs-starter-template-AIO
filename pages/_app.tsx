import React, { useEffect } from 'react'
import NextNProgress from 'nextjs-progressbar'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'

import 'styles/globals.css'
import { store } from 'redux/store'

function CcWeb({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

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
        <Component {...pageProps} />
      </Provider>
    </>
  )
}

export default CcWeb
