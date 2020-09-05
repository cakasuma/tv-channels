import React from 'react'
import styled from 'styled-components'
import { Checkbox } from 'components/checkbox'
import { Text } from 'components/typography'
import { Button } from 'components/button'
import { filter_constants } from 'utils/constants'

const ModalContent = styled.article`
    box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 16px 0px;
    background: ${({ theme }) => theme.background_primary};
    padding: 0.8rem 1.6rem;
    border-radius: 6px;
`

const Divider = styled.hr`
    width: 100%;
    height: 1px;
    border: none;
    background-color: ${({ theme }) => theme.color_secondary};
`

const CheckboxGroup = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    width: fit-content;

    ${Text} {
        margin-left: 8px;
    }
`

const Capitalize = styled(Text)`
    text-transform: capitalize;
    margin-top: 12px;

    &:first-child {
        margin-top: 0;
    }
`

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
`

const ButtonWrapper = styled.div`
    display: flex;
    margin-top: 16px;

    ${Button} {
        font-size: 14px;
    }
`

const MarButton = styled(Button)`
    margin-right: 8px;
`

const Filters = ({ filters, setFilters }) => {
    const [currentFilters, setCurrentFilters] = React.useState(filters)
    const toggleCheck = (name) => {
        // If the name already inside filters, remove it
        if (currentFilters.includes(name)) {
            setCurrentFilters(currentFilters.filter((filter) => filter !== name))
        } else {
            setCurrentFilters([...currentFilters, name])
        }
    }

    return (
        <ModalContent>
            {Object.keys(filter_constants).map((type, index) => (
                <React.Fragment key={index}>
                    <Capitalize as="h5">{type}</Capitalize>
                    <Divider />
                    <Grid>
                        {filter_constants[type].map((filter_name, idx) => (
                            <CheckboxGroup onClick={() => toggleCheck(filter_name)} key={idx}>
                                <Checkbox
                                    checked={currentFilters.includes(filter_name)}
                                    onChange={() => toggleCheck(filter_name)}
                                />
                                <Text>{filter_name}</Text>
                            </CheckboxGroup>
                        ))}
                    </Grid>
                </React.Fragment>
            ))}
            <Divider />
            <ButtonWrapper>
                <MarButton onClick={() => setFilters(currentFilters)} primary>
                    Apply
                </MarButton>
                <Button
                    onClick={() => {
                        setCurrentFilters([])
                    }}
                    secondary
                >
                    Clear filters
                </Button>
            </ButtonWrapper>
        </ModalContent>
    )
}

export default Filters
