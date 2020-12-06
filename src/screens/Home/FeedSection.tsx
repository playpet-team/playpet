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

export default function FeedSection() {
    const navigation = useNavigation()
    const isFocus = useIsFocused()
    const themes = useTheme()
    const [myFeed, setMyFeed] = useState<MyFeed>()
    // const [myPets, setMyPets] = useState<MyPet>()
    const [openStatusModal, setOpenStatusModal] = useState(false)
    const [sliderValue, setSliderValue] = useState(-1)

    const {
        uid,
        // activePetDocId,
    } = useSelector((state: RootState) => state.auth)

    useEffect(() => {
        if (openStatusModal || !sliderValue || !myFeed?.percentage) {
            return
        }
        if (sliderValue !== myFeed.percentage) {
            updateFeedPercentage(uid, sliderValue)
        }
    }, [openStatusModal])

    // useEffect(() => {
    //     loadMyPet()
    //     async function loadMyPet() {
    //         if (!activePetDocId || !uid) {
    //             return
    //         }
    //         const pet = await getPetDoc(uid, activePetDocId)
    //         if (pet) {
    //             setMyPets(pet)
    //         }
    //     }
    // }, [activePetDocId, uid])
    
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
            console.log('feeds-------', feeds);
            console.log('feeds?.feedPackingUnit-------', feeds?.feedPackingUnit);
            if (!feeds) {
                return
            }
            setSliderValue(feeds.percentage || 100);
            setMyFeed(feeds)
        }
    }, [uid, isFocus])

    const handleStatus = () => {
        if (myFeed) {
            setOpenStatusModal(!openStatusModal);
        }
    };

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
                    <FeedBlock
                        style={{
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                        }}
                    >
                        <FeedHeader>
                            <FeedProfileSection
                                image={myFeed.feedItem.image || ''}
                                feedName={myFeed.feedItem.feedName}
                                unit={myFeed.feedPackingUnit}
                            />
                        </FeedHeader>
                        {/* <DividerBlock
                            marginTop={20}
                            marginBottom={24}
                            height={1}
                            backgroundColor="#eee"
                        /> */}
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
                            <DividerBlock height={8} />
                            <StatusDescription>
                                {/* <Text size={16}>현재 사료량</Text> */}
                                <DividerBlock marginTop={10} />
                                {getFeedStatusSrcMap('wording', sliderValue).map((tag: string, i: number) => {
                                    return (
                                        <Chip key={i}>
                                            <Text
                                                size={16}
                                                color={getFeedStatusSrcMap("color", sliderValue)}
                                            >
                                                {getFeedStatusSrcMap('wording', sliderValue)}
                                            </Text>
                                        </Chip>
                                    )
                                })}
                            </StatusDescription>
                            <DividerBlock height={24} />
                        </FeedStatus>
                        <FeedFillUp onPress={handleStatus}>
                            <Text
                                color={themes.colors.white}
                                bold
                                size={16}
                            >
                                채우기
                            </Text>
                        </FeedFillUp>
                    </FeedBlock>
                }
            </Main>
            <DividerBlock marginTop={24} />
            {openStatusModal && <FeedModal
                setOpenStatusModal={setOpenStatusModal}
                setSliderValue={setSliderValue}
                sliderValue={sliderValue}
            />}
            
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
    padding-top: 24px;
    border-radius: 14px;
    /* border-color: ${({ theme }) => theme.colors.border}; */
    /* border-width: 1px; */
    margin-top: 20px;
    background-color: ${({ theme }) => theme.colors.white};

`

const FeedStatus = styled.View`
    /* padding: 18px; */
    flex-direction: column;
    align-items: center;

`

const FeedHeader = styled.View`
    flex-direction :row;
    padding-horizontal: 24px;
`

const FeedPercentageFullImageWrapper = styled.View`
  margin: 48px 0;
  width: 150px;
  height: 100px;
  position: relative;
`;

const FeedPercentageFullImage = styled.Image`
  width: 150px;
  height: 200px;
  position: absolute;
  top: -50px;
  left: 0;
`;

const FeedPercentageFullBoxImage = styled.Image`
    width: 150px;
    height: 200px;
    position: absolute;
    top: -50px;
    left: 0;
`

export const StatusDescription = styled.View`
    /* flex: 1; */
    /* margin-left: 32px; */
    flex-wrap: wrap;
    /* flex-direction: column; */
    /* align-items: center; */
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

const Chip = styled.TouchableOpacity`
    padding: 8px;
    border-radius: 8px;
    /* border-width: 1px; */
    /* border-color: ${({ theme }) => theme.colors.border}; */
    background-color: #eee;
`
