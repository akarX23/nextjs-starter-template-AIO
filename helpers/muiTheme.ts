import { createTheme } from '@mui/material/styles'

// THIS OBJECT SHOULD BE SIMILAR TO ../tailwind.config.js
const themeConstants = {
  paper: '#E5E5E5',
  primary: {
    main: '#36C658',
    dark: '#00A828',
  },
  secondary: { main: '#353F39', dark: '#2C3530' },
  error: {
    main: '#ff5724',
    dark: '#ff5724',
  },
  fg: { main: '#fff', dark: '#292929' },
  breakpoints: {
    xs: 0,
    mb: 350,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  },
}

// Check here for more configurations https://material-ui.com/customization/default-theme/
const theme = createTheme({
  palette: {
    primary: themeConstants.primary,
    secondary: themeConstants.secondary,
    background: { paper: themeConstants.paper },
    text: {
      primary: themeConstants.fg.main,
      secondary: themeConstants.fg.dark,
    },
    error: themeConstants.error,
  },
  breakpoints: {
    values: themeConstants.breakpoints,
  },
  typography: {
    button: {
      textTransform: 'none',
    },
  },
})

export default theme
