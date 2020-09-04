import React from 'react'
import matchSorter from 'match-sorter'
import { useObserver } from 'mobx-react'
import { useStores } from 'stores'

const pushToQueryParams = (filters, search) => {
    let current_query = ['?filter=']
    if (Array.isArray(filters)) {
        if (filters.length) {
            filters.forEach((query, idx) => {
                if (idx === 0) {
                    current_query.push(query)
                } else {
                    current_query.push(`,${query}`)
                }
            })
        } else {
            current_query.splice(1, current_query.length)
        }
    }
    current_query.push(`&search=${search}`)

    window.history.pushState(null, null, current_query.join(''))
}

const debounce = (func, wait, immediate) => {
    let timeout
    return function () {
        const context = this
        const args = arguments

        const later = function () {
            timeout = null
            if (!immediate) func.apply(context, args)
        }

        const callNow = immediate && !timeout

        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
        if (callNow) func.apply(context, args)
    }
}

const debouncedUpdateQueryParams = debounce(
    (filter, search) => pushToQueryParams(filter, search),
    400,
)

const initializeFilters = () => {
    var url_params = new URLSearchParams(window.location.search)
    const url_filters = url_params.get('filter')

    if (url_filters) {
        let filter_arr = url_filters.split(',')
        return filter_arr
    }

    return []
}

const initializeSearch = () => {
    var url_params = new URLSearchParams(window.location.search)
    const url_search = url_params.get('search')

    if (url_search) {
        return url_search
    }
    return ''
}

const Channels = () => {
    const { channel } = useStores()

    const filterChannel = (filters, search) => {
        const filter_positions = channel.getChannelsByFilters(filters)
        const search_positions = matchSorter(filter_positions, search.trim(), {
            keys: ['title', 'description', 'category', 'language'],
            threshold: matchSorter.rankings.CONTAINS,
        })
        return search_positions
    }

    const [filters, setFilters] = React.useState(initializeFilters())
    const [search, setSearch] = React.useState(initializeSearch)
    const [filtered_positions, setFilteredChannel] = React.useState(() =>
        filterChannel(filters, search),
    )

    React.useEffect(() => {
        channel.getChannelData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    React.useEffect(() => {
        debouncedUpdateQueryParams(filters, search)

        const filtered = filterChannel(filters, search)
        setFilteredChannel(filtered)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, filters])

    return useObserver(() => (
        <div>
            <section>Filters</section>
            <div>divider</div>
            <div>
                <section>Search form</section>
                <div>badges</div>
                <div>pagination datas</div>
            </div>
        </div>
    ))
}

export default Channels
