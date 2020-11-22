import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import styled, { useTheme } from 'styled-components/native'
import { MyFeed } from '../../models'
import PlaypetModal from '../../components/PlaypetModal'
import { RootState } from '../../store/rootReducers'
import { Slider } from 'react-native-elements';

import { DividerBlock, Layout, Text } from '../../styles'
import { deviceSize, getFeedsDoc, getProductItem } from '../../utils'

const DEVICE_WIDTH = deviceSize().width

export default function FeedSection() {
    const navigation = useNavigation()
    const themes = useTheme()
    const [myFeed, setMyFeed] = useState<MyFeed>()
    const [openStatusModal, setOpenStatusModal] = useState(false)
    const [sliderValue, setSliderValue] = useState(0)

    const {
        uid,
    } = useSelector((state: RootState) => state.auth)

    useEffect(() => {
        loadMyFeeds()
        async function loadMyFeeds() {
            if (!uid) {
                return
            }
            const feeds = await getFeedsDoc(uid)
            setMyFeed(feeds)
        }
    }, [uid])

    const getFeedImageUrl = (url: string) => {
        if (url) {
            return {
                uri: url
            }
        }
        return require('../../../assets/images/dog_default_thumb.jpg')
    }

    const handleStatus = () => {
        if (myFeed) {
            console.log("myFeed.percentage222", myFeed.percentage)
            setSliderValue(myFeed.percentage)
            setOpenStatusModal(!openStatusModal)
        }
    }
    console.log('sliderValue', sliderValue)
    return (
        <FeedSectionBlock>
            <Header>
                <Text size={20}>사료</Text>
                <MoreButton onPress={() => navigation.navigate('ManageProducts')}>
                    <Text
                        color={themes.colors.primary}
                        size={14}
                        align="center"
                    >
                        등록하기 {'>'}
                    </Text>
                </MoreButton>
            </Header>
            <Main>
                {myFeed && 
                    <FeedBlock>
                        <FeedHeader>
                            <Image source={getFeedImageUrl(myFeed.feedItem.image || '')} />
                            <Text size={16} bold>{myFeed.feedItem.feedName || '사료이름'}</Text>
                        </FeedHeader>
                        <FeedStatus onPress={handleStatus}>
                            <FeedPercentageImage
                                source={require('../../../assets/images/feed_100.jpg')}
                                resizeMode="contain"
                            />
                            <DividerBlock height={8} />
                            <StatusDescription>
                                <Text size={16}>현재 사료량</Text>
                                <Text bold size={32}>{myFeed.percentage}%</Text>
                            </StatusDescription>
                        </FeedStatus>
                    </FeedBlock>
                }
            </Main>
            <DividerBlock marginTop={24} />
            <PlaypetModal
                modalVisible={openStatusModal}
                setModalVisible={setOpenStatusModal}
                containerStyle={{
                    width: DEVICE_WIDTH,
                }}
                header="사료량 조절"
            >
                <FeedStatusModal>
                    <StatusDescription>
                        <Text bold size={65}>{sliderValue}%</Text>
                    </StatusDescription>
                    <FeedPercentageFullImage
                        source={require('../../../assets/images/feed_100.jpg')}
                        resizeMode="contain"
                    />
                    <Slider
                        value={sliderValue}
                        onValueChange={setSliderValue}
                        maximumValue={100}
                        minimumValue={0}
                        step={1}
                        thumbStyle={{ backgroundColor: themes.colors.primary }}
                        minimumTrackTintColor={themes.colors.primary}
                        maximumTrackTintColor={themes.colors.border}
                        style={{
                            width: '80%',
                        }}
                    />
                </FeedStatusModal>
            </PlaypetModal>
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

const FeedBlock = styled.View`
    flex-direction: column;
    padding: 24px;
    border-radius: 14px;
    border-color: ${({ theme }) => theme.colors.border};
    border-width: 1px;

`

const Image = styled.Image`
    width: 50px;
    height: 50px;
    margin-right: 16px;
    border-radius: 8px;
`

const FeedStatus = styled.TouchableOpacity`
    padding: 18px;
    flex-direction: row;

`

const FeedHeader = styled.View`
    flex-direction :row;
`

const FeedPercentageImage = styled.Image`
    width: 120px;
    height: 200px;
`

const FeedPercentageFullImage = styled.Image`
    margin: 24px 0;
    width: 250px;
    height: 400px;
`

const StatusDescription = styled.View`
    /* flex: 1; */
    flex-direction: column;
    align-items: center;
`

const FeedStatusModal = styled.View`
    flex-direction: column;
    padding: 24px;
    align-items: center;
    /* flex: 1; */
    /* height: 500px; */
`