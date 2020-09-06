import styled from 'styled-components'
import { Text } from 'components/typography'
import Tabs from 'components/tab'
import { device } from 'themes/device'

export const SectionContainer = styled.section`
    padding: 80px 0;
    background: ${({ theme }) => theme.background_secondary};
`

export const ScheduleContainer = styled.section`
    padding: 80px 0;
    background: ${({ theme }) => theme.background_primary};
`

export const Breadcrumbs = styled.div`
    display: flex;
    align-items: center;

    span {
        margin-left: 4px;
        margin-right: 4px;
    }
`

export const Img = styled.img`
    width: 132px;
    height: 100px;
`

export const DetailItem = styled.article`
    display: flex;
    align-items: center;

    p:first-child {
        margin-right: 8px;
        color: ${({ theme }) => theme.color_secondary};
    }
`

export const MovieWrapper = styled.div`
    padding: 4px 8px;
    border-radius: 6px;
    display: grid;
    width: 100%;
    grid-template-columns: 90px 1fr;

    p:last-child {
        text-align: end;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
`

export const OnWrapper = styled(MovieWrapper)`
    background: ${({ theme }) => theme.color_secondary_alpha};
`

export const Contents = styled.div`
    display: contents;
`

export const Bold = styled(Text)`
    font-weight: bold;
`

export const TabsChannel = styled(Tabs)`
    max-width: 800px;
    margin: 0 auto;
`

export const Center = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 768px;
    margin: 64px auto 0;
`

export const Description = styled(Text)`
    text-align: center;
    margin-top: 16px;
    margin-bottom: 32px;
    font-style: italic;
    font-weight: normal;
    font-size: 14px;

    @media ${device.mobile} {
        font-size: 16px;
    }
`

export const Detail = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 24px;
    width: 80%;
    margin: 0 auto;
`

export const Empty = styled(Text)`
    text-align: center;
`
