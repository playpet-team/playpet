import { useIsFocused, useNavigation } from '@react-navigation/native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import styled, { useTheme } from 'styled-components/native'
import { MyFeed, MyPet } from '../../models'
import PlaypetModal from '../../components/PlaypetModal'
import { RootState } from '../../store/rootReducers'

import { DividerBlock, Layout, Text } from '../../styles'
import { deviceSize, getFeedsDoc, getPetDoc, getProductItem, updateFeedPercentage } from '../../utils'
import FeedModal, { getFeedStatusSrcMap } from './FeedModal'
import FeedProfileSection from '../../components/FeedProfileSection'
import NoFeed from './NoFeed'
import { StatusDescription } from './FeedSection'

function FeedCards({ myFeed }: {
    myFeed: MyFeed | undefined
}) {
    // const navigation = useNavigation()
    // const isFocus = useIsFocused()
    const themes = useTheme()
    const [openStatusModal, setOpenStatusModal] = useState(false)
    const [sliderValue, setSliderValue] = useState(-1)

    const {
        uid,
    } = useSelector((state: RootState) => state.auth)

    useEffect(() => {
        if (myFeed) {
            setSliderValue(myFeed.percentage || 100);
        }
    }, [myFeed])

    useEffect(() => {
        if (!uid || openStatusModal || !sliderValue || !myFeed?.percentage) {
            return
        }
        if (sliderValue !== myFeed.percentage) {
            updateFeedPercentage(uid, sliderValue)
        }
    }, [uid, openStatusModal])
    
    const handleStatus = () => {
        if (myFeed) {
            setOpenStatusModal(!openStatusModal);
        }
    };

    if (!myFeed) {
        return <NoFeed />
    }

    return (
        <FeedCardsBlock
            style={{
                // shadowColor: "#000",
                // shadowOffset: {
                //     width: 0,
                //     height: 2,
                // },
                // shadowOpacity: 0.25,
                // shadowRadius: 3.84,
                // elevation: 5,
            }}
        >
            <FeedHeader>
                <FeedProfileSection
                    image={myFeed.feedItem.image || ''}
                    feedName={myFeed.feedItem.feedName}
                    unit={myFeed.feedPackingUnit}
                />
            </FeedHeader>
            <FeedStatus>
                <FeedPercentageFullImageWrapper>
                    <FeedPercentageFullImage
                        source={getFeedStatusSrcMap("feed", sliderValue)}
                        resizeMode="contain"
                    />
                    <FeedPercentageFullBoxImage
                        source={getFeedStatusSrcMap("box", sliderValue)}
                        resizeMode="contain"
                    />
                </FeedPercentageFullImageWrapper>
                {/* <DividerBlock height={8} /> */}
                <StatusDescription>
                    {/* <DividerBlock marginTop={10} /> */}
                    {getFeedStatusSrcMap('wording', sliderValue).map((tag: string, i: number) => {
                        return (
                            <Chip key={i}>
                                <Text
                                    size={16}
                                    color={getFeedStatusSrcMap("color", sliderValue)}
                                >
                                    {tag}
                                </Text>
                            </Chip>
                        )
                    })}
                </StatusDescription>
                <DividerBlock height={24} />
            </FeedStatus>
            <FeedFillUp onPress={handleStatus}>
                <Text
                    color={themes.colors.primary}
                    bold
                    size={16}
                >
                    사료 채우기
                </Text>
            </FeedFillUp>
            {openStatusModal && <FeedModal
                setOpenStatusModal={setOpenStatusModal}
                setSliderValue={setSliderValue}
                sliderValue={sliderValue}
            />}
        </FeedCardsBlock>
    )
}

export default FeedCards

const FeedCardsBlock = styled.View`
    flex-direction: column;
    padding-top: 24px;
    border-radius: 14px;
    margin-top: 20px;
    background-color: ${({ theme }) => theme.colors.white};
    border-width: 1px;
    border-color: #e9e9e9;

`

const FeedStatus = styled.View`
    padding-horizontal: 24px;
    margin-top: 24px;
    flex-direction: row;

`

const FeedHeader = styled.View`
    flex-direction :row;
    padding-horizontal: 24px;
`

const FeedPercentageFullImageWrapper = styled.View`
    margin-right: 24px;
    /* margin-top: 48px; */
    width: 75px;
    height: 130px;
    top: 48px;
    position: relative;
`;

const FeedPercentageFullImage = styled.Image`
    width: 75px;
    height: 110px;
    position: absolute;
    top: -50px;
    left: 0;
`;

const FeedPercentageFullBoxImage = styled.Image`
    width: 75px;
    height: 110px;
    position: absolute;
    top: -50px;
    left: 0;
`


const Chip = styled.TouchableOpacity`
    padding: 8px;
    border-radius: 12px;
    /* border-width: 1px; */
    /* border-color: ${({ theme }) => theme.colors.border}; */
    background-color: #eee;
`

const FeedFillUp = styled.TouchableOpacity`
    padding: 16px;
    align-items: center;
    border-top-width: 1px;
    border-top-color: #e9e9e9;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    justify-content: center;
    /* background-color: ${({ theme }) => theme.colors.primary}; */
    width: 100%;
`
