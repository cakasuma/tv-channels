import React from 'react'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter as Router } from 'react-router-dom'
import { Routes } from 'utils/routes'
import { Header } from 'components/header'
import { light_theme, dark_theme, GlobalStyles, useThemeHooks } from 'themes'

const App = () => {
    const [theme, themeToggler, is_component_mounted] = useThemeHooks()
    const current_theme = theme === 'light' ? light_theme : dark_theme

    if (!is_component_mounted) return <div />
    return (
        <Router>
            <ThemeProvider theme={current_theme}>
                <GlobalStyles />
                <Header themeToggler={themeToggler} />
                <Routes />
            </ThemeProvider>
        </Router>
    )
}

export default App
