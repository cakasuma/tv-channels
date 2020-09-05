import React from 'react'
import { useParams } from 'react-router-dom'

const ChannelDetail = () => {
    const { channel_id } = useParams()
    return <div>Hi channel {channel_id}</div>
}

export default ChannelDetail
