import React from 'react'
import { ThemeProvider, Theme, StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'

import theme from 'helpers/muiTheme'
import Layout from 'hoc/Layout'
import 'helpers/firebaseConfig'
import useGlobalAuth from 'helpers/hooks/useGlobalAuth'



declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}



declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}


const Wrapper = (Component: React.FC) => {
  const PageWrapper = (props: any) => {
    useGlobalAuth()

    // MUTING REF ERRORS
    const originalError = console.error

    console.error = (...args) => {
      if (/Warning.*Function components cannot be given refs/.test(args[0])) {
        return
      }
      originalError.call(console, ...args)
    }

    return (
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Layout pageTitle={'CC Platform'}>
            <Component {...props} />
          </Layout>
          {/* <Alert /> */}
        </ThemeProvider>
      </StyledEngineProvider>
    );
  }

  return PageWrapper
}

export default Wrapper
