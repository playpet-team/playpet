import { useIsFocused, useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled, { useTheme } from 'styled-components/native'
import { MyFeed } from '../../models'
import { RootState } from '../../store/rootReducers'
import { Text } from '../../styles'
import { getFeedsDoc } from '../../utils'
import FeedCards from './FeedCards'

export default function FeedSection() {
    const [myFeed, setMyFeed] = useState<MyFeed>()

    const navigation = useNavigation()
    const themes = useTheme()
    const isFocus = useIsFocused()
    
    const {
        uid,
    } = useSelector((state: RootState) => state.auth)

    useEffect(() => {
        if (!isFocus) {
            return
        }
        loadMyFeeds()
        async function loadMyFeeds() {
            if (!uid) {
                return
            }
            const feeds = await getFeedsDoc(uid)
            if (!feeds) {
                return
            }
            setMyFeed(feeds)
        }
    }, [uid, isFocus])

    return (
        <FeedSectionBlock>
            {myFeed && <Header>
                <Text size={20}>사료</Text>
                <MoreButton onPress={() => navigation.navigate('ManageProducts')}>
                    <Text
                        bold
                        color={themes.colors.primary}
                        size={16}
                        align="center"
                    >
                        등록하기
                    </Text>
                </MoreButton>
            </Header>}
            <Main>
                <FeedCards myFeed={myFeed} />
            </Main>
            
        </FeedSectionBlock>
    )
}

const FeedSectionBlock = styled.View`
    padding: 20px;
`

const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const MoreButton = styled.TouchableOpacity`
    flex-direction: row;
    padding: 10px 16px;
    align-items: center;
`

const Main = styled.View`
`

export const StatusDescription = styled.View`
    flex-wrap: wrap;
`
export const FeedFillUp = styled.TouchableOpacity`
    padding: 16px;
    align-items: center;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    justify-content: center;
    background-color: ${({ theme }) => theme.colors.primary};
    width: 100%;
`
