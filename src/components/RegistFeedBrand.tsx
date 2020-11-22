import React from "react"
import styled, { useTheme } from 'styled-components/native'
import { DividerBlock, Text } from '../styles'

function RegistFeedBrand({
    setActiveFeedBrand,
    activeFeedBrand
}: {
    setActiveFeedBrand: React.Dispatch<React.SetStateAction<string>>;
    activeFeedBrand: string;
}) {

    const theme = useTheme()

    return (
        <RegistFeedBrandBlock>
            <Text
                size={20}
                align="center"
                color={theme.colors.text}
            >
                등록하실 사료를 선택해주세요
            </Text>
            <DividerBlock height={8} />
            <Text
                color={theme.colors.placeholder}
                align="center"
            >
                사료 중에서 가장 엄선한 브랜드만 선별하였습니다
            </Text>
            <GridLayout>
                {['1', '2', '3', '4', '5'].map(item => (
                    <Item
                        key={item}
                        onPress={() => setActiveFeedBrand(item)}
                        isActive={activeFeedBrand === item}
                    >
                        {/* <Text>{item}</Text> */}
                    </Item>
                ))}
            </GridLayout>
        </RegistFeedBrandBlock>
    )
}

const RegistFeedBrandBlock = styled.View`
    padding: 20px;
`

export default RegistFeedBrand

const GridLayout = styled.View`
    margin-top: 24px;
    flex-wrap: wrap;
    flex: 1;
    flex-direction: row;
`

const Item = styled.TouchableOpacity<{isActive: boolean}>`
    flex: 1;
    margin: 8px 8px 0 0;
    flex-basis: 110px;
    height: 110px;
    border-width: 2px;
    border-radius: 8px;
    border-color: ${({ isActive }) => isActive ? '#0559D1' : '#E9E9E9'};
    background-color: #E9E9E9;
`
