import React from 'react'
import { useParams } from 'react-router-dom'
import { Container } from 'components/container'
import { LinkText, Text } from 'components/typography'
import { API } from 'backend'
import { day_constants } from 'utils/constants'
import { getFormattedTime } from 'utils/functions'
import {
    SectionContainer,
    ScheduleContainer,
    Breadcrumbs,
    Img,
    DetailItem,
    MovieWrapper,
    OnWrapper,
    Contents,
    Bold,
    TabsChannel,
    Center,
    Description,
    Detail,
    Empty,
} from './_styles'

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
                        {channel.schedule && Object.keys(channel.schedule)?.length ? (
                            Object.keys(channel.schedule).map((schedule, index) => {
                                const day_num = new Date(schedule).getDay()
                                const day = day_constants[day_num]
                                return (
                                    <TabsChannel.Panel key={index} label={day}>
                                        {channel.schedule[schedule]?.length ? (
                                            channel.schedule[schedule].map((movies, idx) => {
                                                /*
                                                    the goal is to determine whether the current time
                                                    is fall under the current looped movie
                                                */
                                                // Lower boundary will be the start time of movie
                                                const lower_boundary_date = new Date(
                                                    movies.datetime,
                                                )
                                                // Upper boundary will be the start time + duration of movie
                                                const upper_boundary_date = new Date(
                                                    movies.datetime,
                                                )
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

                                                // Check if current epoch time is in between or equal to lower and upper boundary time
                                                const is_on_now =
                                                    current_time >= lower_boundary_time &&
                                                    current_time <= upper_boundary_time

                                                const format_time = getFormattedTime(
                                                    lower_boundary_date,
                                                )
                                                const schedule_time = is_on_now
                                                    ? 'On now'
                                                    : format_time

                                                return (
                                                    <Contents key={idx}>
                                                        {is_on_now ? (
                                                            <OnWrapper>
                                                                <Bold type="s">
                                                                    {schedule_time}
                                                                </Bold>
                                                                <Bold type="s">{movies.title}</Bold>
                                                            </OnWrapper>
                                                        ) : (
                                                            <MovieWrapper>
                                                                <Text type="s">
                                                                    {schedule_time}
                                                                </Text>
                                                                <Text type="s">{movies.title}</Text>
                                                            </MovieWrapper>
                                                        )}
                                                    </Contents>
                                                )
                                            })
                                        ) : (
                                            <Empty label="Schedule" as="h4">
                                                No schedule available
                                            </Empty>
                                        )}
                                    </TabsChannel.Panel>
                                )
                            })
                        ) : (
                            <Empty label="Schedule" as="h3">
                                No schedule available
                            </Empty>
                        )}
                    </TabsChannel>
                </Container>
            </ScheduleContainer>
        </>
    )
}

export default ChannelDetail
