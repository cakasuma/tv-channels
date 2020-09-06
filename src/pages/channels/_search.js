import React from 'react'
import styled from 'styled-components'
import { Input } from 'components/input'
import { XCircle } from '@styled-icons/bootstrap'
import { device } from 'themes/device'

const WithReset = styled(Input)`
    &:focus ~ svg,
    &:active ~ svg {
        opacity: 1;
        cursor: pointer;
        pointer-events: auto;
        user-select: auto;
    }
`

const Form = styled.form`
    display: flex;
    width: 100%;
    align-items: center;

    @media ${device.tablet} {
        width: 60%;
    }
`

const Reset = styled(XCircle)`
    opacity: 0;
    transition: opacity 0.25s;
    width: 24px;
    height: 24px;
    margin-left: -45px;
    margin-right: 25px;
    fill: ${({ theme }) => theme.color_secondary};
    cursor: text;
    pointer-events: none;
    user-select: none;
`

const Search = ({ search, setSearch }) => {
    const [input_value, setInputValue] = React.useState(search)
    return (
        <Form
            onSubmit={(e) => {
                e.preventDefault()
                setSearch(input_value)
            }}
        >
            <WithReset
                placeholder="'Enter to search'"
                value={input_value}
                onChange={(e) => setInputValue(e.target.value)}
                autoFocus
            />
            <Reset
                onClick={() => {
                    setSearch('')
                    setInputValue('')
                }}
            />
        </Form>
    )
}

export default Search
