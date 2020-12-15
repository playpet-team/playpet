import React, { useEffect, useMemo, useState } from "react"
import styled, { css, useTheme } from 'styled-components/native'
import { DividerBlock, Text } from '../styles'
import * as Sentry from "@sentry/react-native";

type BUY = 0 | 7 | 14 | 21 | 28 | -1
const buyItems: {
    at: BUY
    title: string
}[] = [
    {
        at: 0,
        title: '새로 구매했어요',

    },
    {
        at: 7,
        title: '1주일 됐어요',

    },
    {
        at: 14,
        title: '2주일 됐어요',

    },
    {
        at: 21,
        title: '3주일 됐어요',

    },
    {
        at: 28,
        title: '4주일 됐어요',

    },
    {
        at: -1,
        title: '아직 구매 안했어요',

    },
]

function RegistFeedLastBuyAt({
    activeFeedLastBuyAt,
    setActiveFeedLastBuyAt,
}: {
    activeFeedLastBuyAt: number
    setActiveFeedLastBuyAt: React.Dispatch<React.SetStateAction<number>>
}) {
    const theme = useTheme()

    return (
        <RegistFeedLastBuyAtBlock>
            <Text
                size={20}
            >
                마지막으로 구매한 날짜
            </Text>
            <DividerBlock height={8} />
            <Text
                color={theme.colors.placeholder}
            >
                대충 언제쯤 구매하셨나요?
            </Text>
            <DividerBlock height={30} />
            <UnitsBlock>
                {buyItems.map(unit =>
                    <Chip
                        key={unit.at}
                        isActive={activeFeedLastBuyAt === unit.at}
                        onPress={() => setActiveFeedLastBuyAt(unit.at)}
                    >
                        <Text>{unit.title}</Text>
                    </Chip>
                )}
            </UnitsBlock>
        </RegistFeedLastBuyAtBlock>
    )
}


export default RegistFeedLastBuyAt

const RegistFeedLastBuyAtBlock = styled.View`
    padding: 20px;
`

const UnitsBlock = styled.View`
    padding-horizontal: 20px;
    /* flex-wrap: wrap; */
    /* flex-direction: row; */
    /* justify-content: space-around; */
`

const Chip = styled.TouchableOpacity<{isActive?: boolean}>`
    /* padding: 30px; */
    margin-top: 8px;
    padding: 12px;
    align-items: center;
    justify-content: center;
    /* flex-basis: 110px; */
    /* height: 110px; */
    border-radius: 8px;
    /* ${({ isActive, theme }) => isActive && css`
        border-width: 2px;
        border-color: ${theme.colors.primary}
    `}; */
    border-width: 2px;
    border-color: ${({ isActive, theme }) => isActive ? theme.colors.primary : '#e9e9e9'};
    /* background-color: ${({ isActive, theme }) => isActive ? '#E6EEFA' : '#e9e9e9'}; */
`
