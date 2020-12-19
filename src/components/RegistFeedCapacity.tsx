import React from "react"
import styled, { useTheme } from 'styled-components/native'
import { DividerBlock, Text } from '../styles'
import * as Sentry from "@sentry/react-native";

function RegistFeedCapacity({
    feedPackingUnits,
    activeFeedPackingUnit,
    setActiveFeedPackingUnit,
}: {
    feedPackingUnits: string[]
    activeFeedPackingUnit: string
    setActiveFeedPackingUnit: React.Dispatch<React.SetStateAction<string>>
}) {
    if (!feedPackingUnits.length) {
        return null
    }
    const theme = useTheme()

    return (
        <RegistFeedCapacityBlock>
            <Text
                size={20}
            >
                등록하실 사료의 용량을 선택해주세요
            </Text>
            <DividerBlock height={8} />
            <Text
                color={theme.colors.placeholder}
            >
                회원님의 정보를 통해 적합한 사료만 노출됩니다.
            </Text>
            <DividerBlock height={30} />
            <UnitsBlock>
            {feedPackingUnits.map(unit =>
                <Chip
                    key={unit}
                    isActive={activeFeedPackingUnit === unit}
                    onPress={() => setActiveFeedPackingUnit(unit)}
                >
                    <Text>{unit}</Text>
                </Chip>
            )}
            </UnitsBlock>
        </RegistFeedCapacityBlock>
    )
}


export default RegistFeedCapacity

const RegistFeedCapacityBlock = styled.View`
    padding: 20px;
`

const UnitsBlock = styled.View`
    /* padding-horizontal: 20px;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-around; */
`

export const Chip = styled.TouchableOpacity<{isActive?: boolean}>`
    margin-top: 12px;
    padding: 24px;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    border-width: 2px;
    border-color: ${({ isActive, theme }) => isActive ? theme.colors.primary : '#e9e9e9'};
`

// const Chip = styled.TouchableOpacity<{isActive?: boolean}>`
//     /* padding: 30px; */
//     margin-top: 16px;
//     align-items: center;
//     justify-content: center;
//     flex-basis: 110px;
//     height: 110px;
//     border-radius: 8px;
//     ${({ isActive, theme }) => isActive && css`
//         border-width: 2px;
//         border-color: ${theme.colors.primary}
//     `};
//     /* border-color: ${({ isActive, theme }) => theme.colors.primary}; */
//     background-color: ${({ isActive, theme }) => isActive ? '#E6EEFA' : '#e9e9e9'};
// `
