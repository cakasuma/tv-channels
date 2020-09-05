import styled from 'styled-components'

export const Code = styled.code`
    font-size: 4rem;
    color: ${({ theme }) => theme.color_secondary};
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: calc(100vh - 74px);
    text-shadow: 0 0 35px ${({ theme }) => theme.color_secondary};

    span {
        color: ${({ theme }) => theme.color_primary};
    }
`
