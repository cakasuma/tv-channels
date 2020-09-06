import React from 'react'
import matchSorter from 'match-sorter'
import { observer } from 'mobx-react'
import { Filter } from '@styled-icons/bootstrap'
import { useStores } from 'stores'
import { Container } from 'components/container'
import { Text } from 'components/typography'
import Search from './_search'
import Filters from './_filters'
import Card from './_card'
import Pagination from './_pagination'
import Badges from './_badges'
import {
    SectionContainer,
    ChannelSectionContainer,
    ChannelContainer,
    FormGroup,
    FilterButton,
    FilterPopup,
    ToggleContainer,
    SToggle,
    SText,
    ResTitle,
} from './_styles'
import { debouncedUpdateQueryParams, initializeFilters, initializeSearch } from './_utils'

const Channels = observer(() => {
    const { channel } = useStores()

    const filterChannel = (filters, search, sort) => {
        const filter_channels = channel.getChannelsByFilters(filters)

        const search_channels = matchSorter(filter_channels, search.trim(), {
            keys: ['title', 'stbNumber'],
            threshold: matchSorter.rankings.WORD_STARTS_WITH,
        })
        const sort_channels =
            sort === 'stbNumber'
                ? search_channels.sort((a, b) => +a[sort]?.localeCompare(+b[sort]))
                : search_channels.sort((a, b) => a[sort]?.localeCompare(b[sort]))
        return sort_channels
    }

    const [filters, setFilters] = React.useState(initializeFilters())
    const [search, setSearch] = React.useState(initializeSearch)
    const [sort, setSort] = React.useState('title')
    const [filtered_channels, setFilteredChannel] = React.useState(() =>
        filterChannel(filters, search),
    )

    React.useEffect(() => {
        channel.getChannelData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    React.useEffect(() => {
        debouncedUpdateQueryParams(filters, search)

        const filtered = filterChannel(filters, search, sort)
        setFilteredChannel(filtered)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, filters, sort, channel.channels])

    return (
        <>
            <SectionContainer>
                {/* Search and filter */}
                <ChannelContainer>
                    <ResTitle as="h2">Search and filter your favorite TV Channels</ResTitle>
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
                    <Badges filters={filters} setFilters={setFilters} />
                </ChannelContainer>
            </SectionContainer>
            <ChannelSectionContainer>
                <Container>
                    {filtered_channels.length ? (
                        <>
                            <ToggleContainer>
                                <SText selected={sort === 'title'} onClick={() => setSort('title')}>
                                    Sort title
                                </SText>
                                <SToggle />
                                <SText
                                    selected={sort === 'stbNumber'}
                                    onClick={() => setSort('stbNumber')}
                                >
                                    Sort number
                                </SText>
                            </ToggleContainer>
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
                        </>
                    ) : (
                        <Text as="h4">No results found</Text>
                    )}
                </Container>
            </ChannelSectionContainer>
        </>
    )
})

export default Channels
