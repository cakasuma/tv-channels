import React from 'react'

export const useThemeHooks = () => {
    const [theme, setTheme] = React.useState('light')
    const [is_component_mounted, setMountedComponent] = React.useState(false)

    // Store the theme preference on local storage
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

        // For seamless transition first load of page
        setMountedComponent(true)
    }, [])

    return [theme, themeToggler, is_component_mounted]
}
