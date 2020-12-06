import React, { useEffect, useMemo, useState } from "react"
import styled, { css, useTheme } from 'styled-components/native'
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
    return (
        <RegistFeedCapacityBlock>
            {feedPackingUnits.map(unit =>
                <Chip
                    key={unit}
                    isActive={activeFeedPackingUnit === unit}
                    onPress={() => setActiveFeedPackingUnit(unit)}
                >
                    <Text>{unit}</Text>
                </Chip>
            )}
        </RegistFeedCapacityBlock>
    )
}


export default RegistFeedCapacity

const RegistFeedCapacityBlock = styled.View`
    padding: 20px;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
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
