import { createGlobalStyle } from 'styled-components'
import { reset_style } from './reset'

export const GlobalStyles = createGlobalStyle`
    ${reset_style}

    body {
        background: ${({ theme }) => theme.background_primary};
        color: ${({ theme }) => theme.color_primary};
        font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
        transition: all 0.50s linear;
    }
`
