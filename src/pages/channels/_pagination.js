import React from 'react'
import styled from 'styled-components'
import { Text } from 'components/typography'
import { Button } from 'components/button'

const Flex = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 32px;
    align-items: center;
`

const BottomFlex = styled(Flex)`
    margin-top: 32px;
    margin-bottom: 0;
`

const AutoFlex = styled.div`
    display: flex;
    width: auto;
`

const TopText = styled(Text)`
    font-size: 14px;
`

const ButtonLeft = styled(Button)`
    margin-right: 1.6rem;
`

const MainGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 16px;
`

const Pagination = ({ children, page_limit }) => {
    const all_records = React.Children.toArray(children)
    const total_records = all_records.length
    const needs_pagination = total_records > page_limit

    const [section_selection, setSectionSelection] = React.useState(page_limit)
    const [start_index, setStartIndex] = React.useState(section_selection - page_limit)

    const has_next = section_selection < total_records
    const has_previous = section_selection > page_limit
    const end_index = needs_pagination ? section_selection : total_records

    const current_records = all_records.slice(start_index, end_index)

    const resetToFirstPage = () => {
        setSectionSelection(page_limit)
        setStartIndex(0)
    }

    React.useEffect(() => {
        resetToFirstPage()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [children])

    const handleNext = () => {
        const next_selection = section_selection + page_limit
        if (has_next) {
            if (next_selection > total_records) {
                setSectionSelection(total_records)
                setStartIndex(section_selection)
            } else {
                setSectionSelection(next_selection)
                setStartIndex(next_selection - page_limit)
            }
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    const handlePrevious = () => {
        const previous_selection = section_selection - page_limit
        if (has_previous) {
            if (previous_selection < page_limit) {
                setSectionSelection(page_limit)
                setStartIndex(0)
            } else {
                setSectionSelection(previous_selection)
                setStartIndex(previous_selection - page_limit)
            }
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    return (
        <>
            <Flex>
                <TopText>{`Viewing ${start_index + 1}-${end_index} of ${total_records}`}</TopText>
                {needs_pagination && (
                    <AutoFlex>
                        <ButtonLeft secondary onClick={handlePrevious} disabled={!has_previous}>
                            Previous
                        </ButtonLeft>
                        <Button secondary onClick={handleNext} disabled={!has_next}>
                            Next
                        </Button>
                    </AutoFlex>
                )}
            </Flex>
            <MainGrid>{current_records.map((record) => record)}</MainGrid>
            {needs_pagination && (
                <BottomFlex>
                    <TopText>{`Viewing ${
                        start_index + 1
                    }-${end_index} of ${total_records}`}</TopText>
                    {needs_pagination && (
                        <AutoFlex>
                            <ButtonLeft secondary onClick={handlePrevious} disabled={!has_previous}>
                                Previous
                            </ButtonLeft>
                            <Button secondary onClick={handleNext} disabled={!has_next}>
                                Next
                            </Button>
                        </AutoFlex>
                    )}
                </BottomFlex>
            )}
        </>
    )
}

export default Pagination
