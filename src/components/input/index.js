import styled from 'styled-components'

export const Input = styled.input`
    font-size: 18px;
    padding: 10px 16px;
    border: 1px solid ${({ theme }) => theme.color_secondary};
    border-radius: 6px;

    &:hover {
        outline: 1px auto ${({ theme }) => theme.color_secondary};
    }

    &:focus,
    &:active {
        outline-color: ${({ theme }) => theme.color_secondary};
        box-shadow: 0 0 0 3px rgba(235, 21, 140, 0.08);
    }
`
