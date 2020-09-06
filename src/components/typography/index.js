import React from 'react'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

const createElement = React.createElement

export const Text = styled(({ as = 'p', size = 'm', children, ...props }) =>
    createElement(as, props, children),
)`
    ${(props) => {
        if (props.as?.startsWith('h')) {
            return css`
                font-weight: bold;
            `
        }
    }};
    font-size: ${(props) => {
        if (props.type === 's') return '14px'
        if (props.type === 'm') return '16px'
        if (props.type === 'l') return '24px'
        if (props.type === 'xl') return '32px'
        if (props.as === 'p') return '16px'
        if (props.as === 'h1') return '64px'
        if (props.as === 'h2') return '32px'
        if (props.as === 'h3') return '24px'
        if (props.as === 'h4') return '16px'
        if (props.as === 'h5') return '14px'

        return '16px'
    }};
    line-height: 1.5;
`

export const LinkText = styled(Link)`
    font-size: 16px;
    line-height: 1.5;
    text-decoration: none;
    color: ${({ theme }) => theme.color_secondary};

    &:hover {
        text-decoration: underline;
        text-decoration-color: ${({ theme }) => theme.color_secondary};
    }
`
