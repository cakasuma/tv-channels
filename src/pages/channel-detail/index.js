import React from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { Container } from 'components/container'
import { LinkText, Text } from 'components/typography'
import Tabs from 'components/tab'
import { API } from 'backend'
import { day_constants } from 'utils/constants'

const SectionContainer = styled.section`
    padding: 80px 0;
    background: ${({ theme }) => theme.background_secondary};
`

const ScheduleContainer = styled.section`
    padding: 80px 0;
    background: ${({ theme }) => theme.background_primary};
`

const Breadcrumbs = styled.div`
    display: flex;
    align-items: center;

    span {
        margin-left: 4px;
        margin-right: 4px;
    }
`

const Img = styled.img`
    width: 132px;
    height: 100px;
`

const DetailItem = styled.article`
    display: flex;
    align-items: center;

    p:first-child {
        margin-right: 8px;
        color: ${({ theme }) => theme.color_secondary};
    }
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

const Bold = styled(Text)`
    font-weight: bold;
`

const TabsChannel = styled(Tabs)`
    max-width: 800px;
    margin: 0 auto;
`

const Center = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 768px;
    margin: 64px auto 0;
`

const Description = styled(Text)`
    text-align: center;
    margin-top: 16px;
    margin-bottom: 32px;
    font-style: italic;
`

const Detail = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 24px;
    width: 80%;
    margin: 0 auto;
`

const ChannelDetail = () => {
    const { channel_id } = useParams()
    const [channel, setChannel] = React.useState({})

    const getChannelData = async () => {
        try {
            const channel_response = await API.get(`/${channel_id}.json`)
            setChannel(channel_response?.data?.response)
        } catch (err) {
            console.error(err)
        }
    }

    React.useEffect(() => {
        getChannelData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            <SectionContainer>
                <Container>
                    <Breadcrumbs>
                        <LinkText to="/">Channels</LinkText> <span>{`>`}</span>{' '}
                        <Text>{channel.title}</Text>
                    </Breadcrumbs>
                    <Center>
                        <Img src={channel.imageUrl} alt={channel.title} />
                        <Description as="h4">{channel.description}</Description>
                        <Detail>
                            <DetailItem>
                                <Text type="s">Category:</Text>
                                <Text type="s">{channel.category}</Text>
                            </DetailItem>
                            <DetailItem>
                                <Text type="s">Language: </Text>
                                <Text type="s">{channel.language}</Text>
                            </DetailItem>
                            <DetailItem>
                                <Text type="s">Channel: </Text>
                                <Text type="s">{channel.stbNumber}</Text>
                            </DetailItem>
                            <DetailItem>
                                <Text type="s">Resolution: </Text>
                                <Text type="s">{channel.isHd ? 'HD' : 'SD'}</Text>
                            </DetailItem>
                            <DetailItem>
                                <Text type="s">Astro Go exclusive: </Text>
                                <Text type="s">{channel.isAstroGoExclusive ? 'Yes' : 'No'}</Text>
                            </DetailItem>
                        </Detail>
                    </Center>
                </Container>
            </SectionContainer>
            <ScheduleContainer>
                <Container>
                    <TabsChannel tab_break="560px">
                        {channel.schedule ? (
                            Object.keys(channel.schedule).map((schedule, index) => {
                                const day_num = new Date(schedule).getDay()
                                const day = day_constants[day_num]
                                return (
                                    <TabsChannel.Panel key={index} label={day}>
                                        {channel.schedule[schedule].map((movies, idx) => {
                                            const lower_boundary_date = new Date(movies.datetime)
                                            const upper_boundary_date = new Date(movies.datetime)
                                            const current_date = new Date()
                                            const duration_array = movies.duration.split(':')
                                            const hours = +duration_array[0]
                                            const minutes = +duration_array[1]
                                            const seconds = +duration_array[2]
                                            upper_boundary_date.setHours(
                                                upper_boundary_date.getHours() + hours,
                                            )
                                            upper_boundary_date.setMinutes(
                                                upper_boundary_date.getMinutes() + minutes,
                                            )
                                            upper_boundary_date.setSeconds(
                                                upper_boundary_date.getSeconds() + seconds,
                                            )

                                            const lower_boundary_time = lower_boundary_date.getTime()
                                            const upper_boundary_time = upper_boundary_date.getTime()
                                            const current_time = current_date.getTime()

                                            const is_on_now =
                                                current_time >= lower_boundary_time &&
                                                current_time <= upper_boundary_time

                                            const format_time = lower_boundary_date.toLocaleString(
                                                'en-US',
                                                {
                                                    hour: 'numeric',
                                                    minute: 'numeric',
                                                    hour12: true,
                                                },
                                            )
                                            const schedule_time = is_on_now ? 'On now' : format_time

                                            return (
                                                <Contents key={idx}>
                                                    {is_on_now ? (
                                                        <OnWrapper>
                                                            <Bold type="s">{schedule_time}</Bold>
                                                            <Bold type="s">{movies.title}</Bold>
                                                        </OnWrapper>
                                                    ) : (
                                                        <MovieWrapper>
                                                            <Text type="s">{schedule_time}</Text>
                                                            <Text type="s">{movies.title}</Text>
                                                        </MovieWrapper>
                                                    )}
                                                </Contents>
                                            )
                                        })}
                                    </TabsChannel.Panel>
                                )
                            })
                        ) : (
                            <Text label="-" as="h4">
                                No schedule available
                            </Text>
                        )}
                    </TabsChannel>
                </Container>
            </ScheduleContainer>
        </>
    )
}

export default ChannelDetail
