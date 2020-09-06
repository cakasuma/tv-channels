import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Channels from 'pages/channels'
import ChannelDetail from 'pages/channel-detail'
import NotFound from 'pages/404'

export const Routes = () => (
    <Switch>
        <Route exact path="/" children={<Channels />} />
        <Route path="/channel/:channel_id" children={<ChannelDetail />} />
        <Route path="/404" children={<NotFound />} />
        {/* Handle 404 page */}
        <Redirect to="404" />
    </Switch>
)
