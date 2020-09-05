import React from 'react'
import styled from 'styled-components'
import { BadgeHdFill } from '@styled-icons/bootstrap'
import { Text } from 'components/typography'
import { LinkButton } from 'components/button'

const StyledCard = styled.article`
    box-shadow: rgba(0, 0, 0, 0.12) 0px 8px 16px 0px;
    background: ${({ theme }) => theme.background_tertiary};
    padding: 10px 16px 62px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    border-radius: 6px;
    min-height: 220px;
    position: relative;
`

const Img = styled.img`
    width: 82px;
    height: 50px;
`

const HdBadge = styled(BadgeHdFill)`
    position: absolute;
    top: 10px;
    left: 16px;
    fill: ${({ theme }) => theme.color_secondary};
    height: 24px;
    width: 24px;
`

const NumWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 8px;
`

const Italic = styled(Text)`
    font-style: italic;
    color: ${({ theme }) => theme.color_secondary};
`

const Divider = styled.hr`
    width: 100%;
    height: 1px;
    border: none;
    background: ${({ theme }) => theme.divider};
`

const Bold = styled(Text)`
    font-weight: bold;
`

const MovieWrapper = styled.div`
    padding: 4px 8px;
    border-radius: 6px;
    display: grid;
    width: 100%;
    grid-template-columns: 90px 1fr;

    p:last-child {
        text-align: end;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
`

const OnWrapper = styled(MovieWrapper)`
    background: ${({ theme }) => theme.color_secondary_alpha};
`

const Contents = styled.div`
    display: contents;
`

const CardButton = styled(LinkButton)`
    position: absolute;
    bottom: 10px;
    width: 85%;
`

const Card = ({ image, channel_id, channel_name, channel_number, today_schedule = [], is_hd }) => {
    return (
        <StyledCard>
            {is_hd && <HdBadge />}
            <Img src={image} alt={channel_name} />
            <NumWrapper>
                <Text type="s">{channel_name}</Text>
                <Italic type="s">CH{channel_number}</Italic>
            </NumWrapper>
            <Divider />
            {today_schedule.length ? (
                today_schedule.map((item, index) => {
                    const format_time = new Date(item.datetime).toLocaleString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                    })
                    const on_now = index === 0
                    const schedule_time = on_now ? 'On now' : format_time
                    return (
                        <Contents key={index}>
                            {on_now ? (
                                <OnWrapper>
                                    <Bold type="s">{schedule_time}</Bold>
                                    <Bold type="s">{item.title}</Bold>
                                </OnWrapper>
                            ) : (
                                <MovieWrapper>
                                    <Text type="s">{schedule_time}</Text>
                                    <Text type="s">{item.title}</Text>
                                </MovieWrapper>
                            )}
                        </Contents>
                    )
                })
            ) : (
                <Text as="h5">No information available</Text>
            )}
            <CardButton to={`/channel/${channel_id}`} secondary="true">
                View details
            </CardButton>
        </StyledCard>
    )
}

export default Card
