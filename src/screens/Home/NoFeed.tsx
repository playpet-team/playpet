import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image } from 'react-native'
import styled, { useTheme } from 'styled-components/native'

import { DividerBlock, Text } from '../../styles'

function NoFeed() {
    const navigation = useNavigation()
    const theme = useTheme()

    return (
        <NoFeedBlock>
            <Text
                size={16}
                bold
            >
                사료 재고 걱정 끝!
            </Text>
            <DividerBlock height={8} />
            <Text size={14}>
                등록한번으로 사료 재고 관리가
                편리해집니다
            </Text>
            <DividerBlock height={50} />
            <Image
                source={require('../../../assets/images/no-feed.png')}
                style={{
                    resizeMode: 'contain',
                    width: 160,
                    height: 80,
                }}
            />
            <DividerBlock height={30} />
            <MoreButton onPress={() => navigation.navigate('ManageProducts')}>
                <Text
                    bold
                    color={theme.colors.white}
                    size={16}
                >
                    사료 등록하기
                </Text>
            </MoreButton>
        </NoFeedBlock>
    )
}

export default NoFeed;

const NoFeedBlock = styled.View`
    align-items: center;
`

const MoreButton = styled.TouchableOpacity`
    flex-direction: row;
    padding: 16px;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 4px;
`