import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Container } from 'components/container'
import { Text } from 'components/typography'
import { Button } from 'components/button'
import { device } from 'themes/device'

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
`

const SLink = styled(Link)`
    text-decoration: none;
    color: ${({ theme }) => theme.color_primary};
`

const ResText = styled(Text)`
    font-size: 16px;

    @media ${device.mobile} {
        font-size: 24px;
    }
`

const ResButton = styled(Button)`
    font-size: 14px;

    @media ${device.mobile} {
        font-size: 16px;
    }
`

export const Header = ({ themeToggler }) => {
    return (
        <Nav>
            <NavContainer>
                <SLink to="/">
                    <ResText as="h3">TV Channels</ResText>
                </SLink>
                <ResButton primary onClick={themeToggler}>
                    Toggle theme
                </ResButton>
            </NavContainer>
        </Nav>
    )
}
