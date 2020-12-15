import React, { useEffect, useMemo, useState } from "react"
import styled, { css, useTheme } from 'styled-components/native'
import { DividerBlock, Text } from '../styles'
import * as Sentry from "@sentry/react-native";

function RegistFeedRecommandedAmount({
    activeFeedRecommanedAmount,
    setActiveFeedRecommanedAmount,
}: {
    activeFeedRecommanedAmount: number
    setActiveFeedRecommanedAmount: React.Dispatch<React.SetStateAction<number>>
}) {
    const theme = useTheme()

    return (
        <RegistFeedRecommandedAmountBlock>
            <Text
                size={20}
            >
                등록하실 사료의 하루 급여량을 선택해주세요
            </Text>
            <DividerBlock height={8} />
            <Text
                color={theme.colors.placeholder}
            >
                일일 사료 급여량에 따라서 사료 재고량이 감소합니다
            </Text>
            <DividerBlock height={30} />
            <Text
                color={theme.colors.placeholder}
            >
                해당 사료의 추천 하루 권장 급여량
            </Text>
            <DividerBlock height={8} />
            <UnitsBlock>
                {[].map(unit =>
                    <Chip
                        key={unit}
                        isActive={activeFeedRecommanedAmount === unit}
                        onPress={() => setActiveFeedRecommanedAmount(unit)}
                    >
                        <Text>{unit}</Text>
                    </Chip>
                )}
            </UnitsBlock>
        </RegistFeedRecommandedAmountBlock>
    )
}


export default RegistFeedRecommandedAmount

const RegistFeedRecommandedAmountBlock = styled.View`
    padding: 20px;
`

const UnitsBlock = styled.View`
    padding-horizontal: 20px;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-around;
`

const Chip = styled.TouchableOpacity<{isActive?: boolean}>`
    /* padding: 30px; */
    margin-top: 16px;
    align-items: center;
    justify-content: center;
    flex-basis: 110px;
    height: 110px;
    border-radius: 8px;
    ${({ isActive, theme }) => isActive && css`
        border-width: 2px;
        border-color: ${theme.colors.primary}
    `};
    /* border-color: ${({ isActive, theme }) => theme.colors.primary}; */
    background-color: ${({ isActive, theme }) => isActive ? '#E6EEFA' : '#e9e9e9'};
`
