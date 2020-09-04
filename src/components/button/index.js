import styled, { css } from 'styled-components'

const SharedButtonStyle = css`
    border-radius: 6px;
    padding: 10px 16px;
    font-size: 16px;
    transition: all 0.25s;
    font-weight: bold;
    ${(props) => {
        if (props.primary)
            return css`
                border: 2px solid ${({ theme }) => theme.color_secondary};
                color: ${({ theme }) => theme.color_secondary};
                background: transparent;

                &:hover {
                    background-color: ${({ theme }) => theme.color_secondary};
                    color: ${({ theme }) => theme.color_white};
                }
            `
        if (props.secondary)
            return css`
                background: transparent;
                color: ${({ theme }) => theme.color_secondary};
                border: none;

                &:hover {
                    background: rgba(235, 21, 140, 0.08);
                }
            `
    }}

    &:focus,
    &:active {
        outline: none;
        transform: scale(0.95);
    }
`

export const Button = styled.button`
    ${SharedButtonStyle}

    &:hover {
        cursor: pointer;
    }

    ${(props) => {
        if (props.disabled)
            return css`
                pointer-events: none;
                opacity: 0.32;
            `
        if (props.loading)
            return css`
                border-radius: 50%;
                animation: sweep 1s linear alternate infinite, rotates 0.8s linear infinite;
            `
    }}
`
