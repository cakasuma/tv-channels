import React from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { Container } from 'components/container'
import { LinkText, Text } from 'components/typography'
import { API } from 'backend'

const SectionContainer = styled.section`
    padding: 80px 0;
    background: ${({ theme }) => theme.background_secondary};
`

const Breadcrumbs = styled.div`
    display: flex;
    align-items: center;

    span {
        margin-left: 4px;
        margin-right: 4px;
    }
`

const ChannelDetail = () => {
    const { channel_id } = useParams()
    const [channel, setChannel] = React.useState({})
    const [is_loading, setLoading] = React.useState(true)
    const [has_error, setHasError] = React.useState(false)

    const getChannelData = async () => {
        try {
            setLoading(true)
            const channel_response = await API.get(`/${channel_id}.json`)
            setChannel(channel_response?.data?.response)
            console.log(channel_response)
        } catch (err) {
            console.error(err)
            setHasError(true)
        }

        setLoading(false)
    }

    React.useEffect(() => {
        getChannelData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <SectionContainer>
            <Container>
                <Breadcrumbs>
                    <LinkText to="/">Channel</LinkText> <span>{`>`}</span>{' '}
                    <Text>{channel?.title}</Text>
                </Breadcrumbs>
            </Container>
        </SectionContainer>
    )
}

export default ChannelDetail
