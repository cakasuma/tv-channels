import React from 'react'
import styled from 'styled-components'
import { Container } from 'components/container'
import { Text } from 'components/typography'
import { Button } from 'components/button'

const Nav = styled.nav`
    background: ${({ theme }) => theme.background_primary};
    box-shadow: rgba(0, 0, 0, 0.2) 0px 8px 20px 0px;
    color: ${({ theme }) => theme.color_primary};
    padding: 16px 0;
`

const NavContainer = styled(Container)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
`

export const Header = ({ themeToggler }) => {
    return (
        <Nav>
            <NavContainer>
                <Text as="h3">My Channels</Text>
                <Button primary onClick={themeToggler}>
                    Toggle theme
                </Button>
            </NavContainer>
        </Nav>
    )
}
