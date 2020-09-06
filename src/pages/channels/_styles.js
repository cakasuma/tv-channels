import styled, { keyframes } from 'styled-components'
import Popup from 'reactjs-popup'
import { Toggles } from '@styled-icons/bootstrap'
import { Button } from 'components/button'
import { Input } from 'components/input'
import { device } from 'themes/device'
import { Text } from 'components/typography'
import { Container } from 'components/container'

export const SectionContainer = styled.section`
    padding: 40px 0;
    background: ${({ theme }) => theme.background_secondary};

    @media ${device.tablet} {
        padding: 80px 0;
    }
`

export const ChannelSectionContainer = styled(SectionContainer)`
    background: ${({ theme }) => theme.background_primary};
`

export const ChannelContainer = styled(Container)`
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

export const FormGroup = styled.div`
    display: flex;
    margin-top: 32px;
    margin-bottom: 24px;
    width: 90%;
    justify-content: center;
    flex-direction: column;

    ${Input} {
        width: 100%;
        font-size: 14px;

        @media ${device.mobile} {
            font-size: 16px;
            margin-right: 16px;
        }
    }

    @media ${device.mobile} {
        flex-direction: row;
    }
`

export const FilterButton = styled(Button)`
    display: flex;
    border-width: 1px;
    align-items: center;
    padding: 10px 8px;
    width: fit-content;
    align-self: center;
    margin-top: 16px;

    @media ${device.mobile} {
        margin-top: 0;
        padding: 10px 16px;
        & span {
            display: inline-block;
        }

        & svg {
            margin-right: 4px;
        }
    }

    & svg {
        width: 20px;
        height: 20px;
    }

    & span {
        display: none;
    }
`

const popupAnimation = keyframes`
  0% {
    transform: scale(1) translateY(0px);
    opacity: 0;
    box-shadow: 0 0 0 rgba(241, 241, 241, 0);
  }
  1% {
    transform: scale(0.96) translateY(10px);
    opacity: 0;
    box-shadow: 0 0 0 rgba(241, 241, 241, 0);
  }
  100% {
    transform: scale(1) translateY(0px);
    opacity: 1;
    box-shadow: 0 0 500px rgba(241, 241, 241, 0);
  }
`
export const FilterPopup = styled(Popup)`
    &-arrow {
        color: ${({ theme }) => theme.background_primary};
    }
    &-content {
        animation: ${popupAnimation} 0.3s cubic-bezier(0.38, 0.1, 0.36, 0.9) forwards;
    }
`

export const ToggleContainer = styled.div`
    cursor: pointer;
    background: ${({ theme }) => theme.color_secondary};
    padding: 10px 16px;
    border-radius: 18px;
    width: fit-content;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.color_white};
    margin-bottom: 16px;
`

export const SToggle = styled(Toggles)`
    width: 16px;
    height: 16px;
    margin: 0 8px;
`

export const SText = styled(Text)`
    opacity: ${(props) => (props.selected ? 1 : 0.6)};
    font-size: 14px;

    @media ${device.mobile} {
        font-size: 16px;
    }
`

export const ResTitle = styled(Text)`
    font-size: 24px;

    @media ${device.mobile} {
        font-size: 32px;
    }
`
