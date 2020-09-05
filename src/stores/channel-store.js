import { decorate, observable, action, computed } from 'mobx'
import { computedFn } from 'mobx-utils'
import { API } from 'backend'

class ChannelStore {
    channels = []
    is_loading = true
    has_error = false

    getChannelData = async () => {
        const client_channels = window.localStorage.getItem('channels')
        if (client_channels) {
            this.channels = JSON.parse(client_channels)
        }
        // Check if we have cached channel data, don't need to set loading to render loading view
        if (this.has_loaded || client_channels) {
            this.is_loading = false
        }
        try {
            const channel_response = await API.get('/all.json')
            this.channels = channel_response?.data?.response
            window.localStorage.setItem(
                'channels',
                JSON.stringify(channel_response?.data?.response),
            )
        } catch (err) {
            this.has_error = true
        }

        this.is_loading = false
    }

    getChannelsByFilters = computedFn(function getChannelsByFilters(filters) {
        const current_channels = [...this.channels]
        if (!filters.length) return current_channels

        return current_channels.filter((channel) => {
            return (
                filters.includes(channel.category) ||
                filters.includes(channel.language) ||
                filters.includes(channel.isHd ? 'HD' : 'SD')
            )
        })
    })

    get has_loaded() {
        return this.channels?.length > 0
    }
}

decorate(ChannelStore, {
    channels: observable,
    is_loading: observable,
    has_error: observable,
    getChannelData: action,
    has_loaded: computed,
})
export default ChannelStore
