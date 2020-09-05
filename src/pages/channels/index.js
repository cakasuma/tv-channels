import React from 'react'
import styled, { keyframes } from 'styled-components'
import Popup from 'reactjs-popup'
import matchSorter from 'match-sorter'
import { observer } from 'mobx-react'
import { Filter } from '@styled-icons/bootstrap'
import { useStores } from 'stores'
import { Container } from 'components/container'
import { Text } from 'components/typography'
import { Button } from 'components/button'
import { Input } from 'components/input'
import { filter_constants } from 'utils/constants'
import Search from './_search'
import Filters from './_filters'
import Card from './_card'
import Pagination from './_pagination'

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
        let filter_arr = url_filters
            .split(',')
            .filter(
                (item) =>
                    filter_constants.category?.includes(item) ||
                    filter_constants.language?.includes(item) ||
                    filter_constants.resolution?.includes(item),
            )
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

const Channels = observer(() => {
    const { channel } = useStores()

    const filterChannel = (filters, search) => {
        const filter_channels = channel.getChannelsByFilters(filters)
        const search_channels = matchSorter(filter_channels, search.trim(), {
            keys: ['title', 'stbNumber'],
            threshold: matchSorter.rankings.WORD_STARTS_WITH,
        })
        return search_channels
    }

    const [filters, setFilters] = React.useState(initializeFilters())
    const [search, setSearch] = React.useState(initializeSearch)
    const [filtered_channels, setFilteredChannel] = React.useState(() =>
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
    }, [search, filters, channel.channels])

    return (
        <>
            <SectionContainer>
                {/* Search and filter */}
                <ChannelContainer>
                    <Text as="h2">Search and filter your favorite TV Channels</Text>
                    <FormGroup>
                        <Search search={search} setSearch={setSearch} />
                        <FilterPopup
                            trigger={
                                <FilterButton primary>
                                    <div>
                                        <Filter />
                                    </div>
                                    <span>Filter</span>
                                </FilterButton>
                            }
                            closeOnDocumentClick
                            position="bottom center"
                        >
                            <Filters filters={filters} setFilters={setFilters} />
                        </FilterPopup>
                    </FormGroup>
                </ChannelContainer>
            </SectionContainer>
            <ChannelSectionContainer>
                <Container>
                    {filtered_channels.length ? (
                        <Pagination page_limit={9}>
                            {filtered_channels.map((ch_item, index) => (
                                <Card
                                    key={index}
                                    channel_id={ch_item.id}
                                    channel_name={ch_item.title}
                                    channel_number={ch_item.stbNumber}
                                    today_schedule={ch_item.currentSchedule}
                                    image={ch_item.imageUrl}
                                    is_hd={ch_item.isHd}
                                />
                            ))}
                        </Pagination>
                    ) : (
                        <Text as="h4">No results found</Text>
                    )}
                </Container>
            </ChannelSectionContainer>
        </>
    )
})

const SectionContainer = styled.section`
    padding: 80px 0;
    background: ${({ theme }) => theme.background_secondary};
`

const ChannelSectionContainer = styled(SectionContainer)`
    background: ${({ theme }) => theme.background_primary};
`

const ChannelContainer = styled(Container)`
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

const FormGroup = styled.div`
    display: flex;
    margin-top: 32px;
    width: 80%;
    justify-content: center;

    ${Input} {
        margin-right: 16px;
        width: 100%;
    }
`

const FilterButton = styled(Button)`
    display: flex;
    border-width: 1px;
    align-items: center;

    & svg {
        width: 20px;
        height: 20px;
        margin-right: 4px;
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
const FilterPopup = styled(Popup)`
    &-arrow {
        color: ${({ theme }) => theme.background_primary};
    }
    &-content {
        animation: ${popupAnimation} 0.3s cubic-bezier(0.38, 0.1, 0.36, 0.9) forwards;
    }
`

export default Channels
