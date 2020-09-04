import React from 'react'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter as Router } from 'react-router-dom'
import { Routes } from 'utils/routes'
import { Header } from 'components/header'
import { light_theme, dark_theme, GlobalStyles } from 'themes'

const App = () => {
    const [theme, setTheme] = React.useState('light')
    const current_theme = theme === 'light' ? light_theme : dark_theme
    const themeToggler = () => {
        theme === 'light' ? setTheme('dark') : setTheme('light')
    }
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
