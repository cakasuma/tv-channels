import React from 'react'
import styled from 'styled-components'
import { Text } from 'components/typography'
import { XCircle } from '@styled-icons/bootstrap'

const CrossIconStyled = styled(XCircle)`
    height: 16px;
    width: 16px;
    fill: ${({ theme }) => theme.color_white};
`

const BadgeContainer = styled.div`
    border-radius: 12px;
    background-color: ${({ theme }) => theme.color_secondary};
    color: ${({ theme }) => theme.color_white};
    padding: 3px 8px;
    margin: 0.4rem;
    display: flex;
    align-items: center;

    svg {
        margin-left: 8px;
        cursor: pointer;
    }
`

const BadgeWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    > *:not(:last-child) {
        margin-right: 0.8rem;
    }
`

const Badge = ({ text, onClick }) => {
    return (
        <BadgeContainer>
            <Text type="xs">{text}</Text>
            <CrossIconStyled onClick={onClick} />
        </BadgeContainer>
    )
}

const Badges = ({ filters, setFilters }) => {
    const removeFilter = (name) => {
        setFilters(filters.filter((filter) => filter !== name))
    }
    return (
        <BadgeWrapper>
            {filters.map((filter, idx) => (
                <Badge onClick={() => removeFilter(filter)} key={idx} text={filter} />
            ))}
        </BadgeWrapper>
    )
}

export default Badges
