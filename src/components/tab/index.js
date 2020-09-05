import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { Text } from 'components/typography'

const TabContent = styled.div`
    flex: 1;
    width: 100%;
`

const TabButton = styled.button`
    z-index: 2;
    height: auto;
    padding: 0 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    cursor: pointer;
    background: transparent;
    outline: none;
    transition: border-color 0.2s ease-in;
    border: none;
    border-bottom: 2px solid ${({ theme }) => theme.divider};
    ${(props) =>
        props.selected &&
        css`
            border-color: ${({ theme }) => theme.color_secondary};
            ${Text} {
                color: ${({ theme }) => theme.color_secondary};
            }
        `}

    &:hover,
    &:focus,
    &:active {
        border-bottom: 2px solid
            ${(props) =>
                props.selected ? props.theme.color_secondary : props.theme.color_secondary_alpha};
    }
`

const TabList = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
    position: relative;
    @media (max-width: ${(props) => props.breakPoint}) {
        flex-direction: column;

        & > div,
        & > div > button {
            width: 100%;
        }
    }
`

const LineDivider = styled.div`
    bottom: 0;
    position: absolute;
    height: 2px;
    width: 100%;
    background: ${({ theme }) => theme.divider};
    z-index: 1;
`

const Content = styled.div`
    flex: 1;
    width: 100%;
    padding-top: 16px;
`

const Flex = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
`

const TabPanel = ({ children }) => (
    <TabContent role="tabpanel" tabindex="0">
        {children}
    </TabContent>
)

TabPanel.propTypes = {
    children: PropTypes.node,
}

const Tabs = ({ children, tab_break }) => {
    const [selected_tab, setSelectedTab] = React.useState(0)
    const selectTab = (tabIndex) => {
        setSelectedTab(tabIndex)
    }

    return (
        <Flex>
            <TabList breakPoint={tab_break} role="tablist">
                {React.Children.map(children, ({ props: { label } }, index) => (
                    <TabButton
                        role="tab"
                        selected={selected_tab === index}
                        aria-selected={selected_tab === index ? 'true' : 'false'}
                        onClick={() => selectTab(index)}
                    >
                        <Text align="center" size="var(--text-size-m)" color="red-2" weight="bold">
                            {label}
                        </Text>
                    </TabButton>
                ))}
                <LineDivider />
            </TabList>

            <Content>
                {React.Children.map(children, (el, index) =>
                    selected_tab === index ? el : undefined,
                )}
            </Content>
        </Flex>
    )
}

Tabs.Panel = TabPanel

Tabs.propTypes = {
    children: PropTypes.node,
    tab_break: PropTypes.string,
}

export default Tabs
