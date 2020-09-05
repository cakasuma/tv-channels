import React from 'react'
import styled from 'styled-components'

const CheckboxContainer = styled.div`
    display: inline-block;
    vertical-align: middle;
`

const Icon = styled.svg`
    fill: none;
    stroke: white;
    stroke-width: 2px;
`
// Hide checkbox visually but remain accessible to screen readers.
const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
    border: 0;
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
`

const StyledCheckbox = styled.div`
    display: inline-block;
    width: 16px;
    height: 16px;
    background: ${(props) =>
        props.checked ? props.theme.color_secondary : props.theme.background_primary};
    border-radius: 3px;
    transition: all 150ms;
    border: 1px solid ${({ theme }) => theme.color_secondary};

    ${HiddenCheckbox}:focus + & {
        box-shadow: 0 0 0 3px rgba(235, 21, 140, 0.08);
    }
`

export const Checkbox = ({ className, checked, ...props }) => (
    <CheckboxContainer className={className}>
        <HiddenCheckbox checked={checked} {...props} />
        <StyledCheckbox checked={checked}>
            <Icon viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12" />
            </Icon>
        </StyledCheckbox>
    </CheckboxContainer>
)
