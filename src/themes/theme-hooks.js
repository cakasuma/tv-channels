import React from 'react'

export const useThemeHooks = () => {
    const [theme, setTheme] = React.useState('light')
    const [is_component_mounted, setMountedComponent] = React.useState(false)
    const setMode = (mode) => {
        window.localStorage.setItem('theme', mode)
        setTheme(mode)
    }
    const themeToggler = () => {
        theme === 'light' ? setMode('dark') : setMode('light')
    }

    React.useEffect(() => {
        const localTheme = window.localStorage.getItem('theme')
        localTheme ? setTheme(localTheme) : setMode('light')
        setMountedComponent(true)
    }, [])

    return [theme, themeToggler, is_component_mounted]
}
