import React, { useCallback, useEffect, useState } from "react"
import styled, { useTheme } from 'styled-components/native'
import { Text } from '../../styles'
import RegistFeedBrand from "../../components/RegistFeedBrand"
import RegistFeedItems from "../../components/RegistFeedItems"
import { useNavigation } from "@react-navigation/native"
import { currentUser, getProductList, ProductItem, updateFeedItems } from "../../utils"

enum REGIST_FEED_STEPS {
    BRANDS = 'BRANDS',
    ITEMS = 'ITEMS'
}
function RegistFeedBoard() {
    const [step, setStep] = useState<REGIST_FEED_STEPS>(REGIST_FEED_STEPS.BRANDS)
    const [activeFeedItem, setActiveFeedItem] = useState('')
    const [activeFeedName, setActiveFeedName] = useState('')
    const [activeFeedThumbnail, setActiveFeedThumbnail] = useState('')
    const [activeFeedBrand, setActiveFeedBrand] = useState('')

    const [feeds, setFeeds] = useState<ProductItem[]>([])

    const theme = useTheme()
    const navigation = useNavigation()
    const handleLater = () => navigation.goBack()

    useEffect(() => {
        async function loadProduct() {
            const data = await getProductList('DOG')
            console.log("data---", data);
            setFeeds(data)
        }
        loadProduct();
    }, [])

    const handleUpdateFeeds = async () => {
        const user = currentUser()
        console.log("1", activeFeedItem, activeFeedBrand)
        if (!user || !activeFeedItem || !activeFeedBrand) {
            return
        }
        const findFeed = feeds.find(feed => feed.id === activeFeedItem)
        if (!findFeed) {
            return
        }
        console.log('findFeed', findFeed)
        updateFeedItems(user.uid, {
            feedItem: findFeed,
            feedBrand: activeFeedBrand,
        })

        navigation.goBack()
    }

    const nextSteps = () => {
        switch (step) {
            case REGIST_FEED_STEPS.BRANDS: {
                setStep(REGIST_FEED_STEPS.ITEMS);
                break;
            }
            case REGIST_FEED_STEPS.ITEMS: {
                // TODO DB에 등록
                handleUpdateFeeds()
                handleLater()
                break;
            }
        }
    }

    const prevSteps = () => {
        switch (step) {
            case REGIST_FEED_STEPS.BRANDS: {
                handleLater()
                break;
            }
            case REGIST_FEED_STEPS.ITEMS: {
                setStep(REGIST_FEED_STEPS.BRANDS);
                break;
            }
        }
    }

    return (
        <RegistFeedBoardBlock>
            {step === REGIST_FEED_STEPS.BRANDS && <RegistFeedBrand
                activeFeedBrand={activeFeedBrand}
                setActiveFeedBrand={setActiveFeedBrand}
            />}
            {step === REGIST_FEED_STEPS.ITEMS && <RegistFeedItems
                activeFeedItem={activeFeedItem}
                setActiveFeedItem={setActiveFeedItem}
                setActiveFeedName={setActiveFeedName}
                setActiveFeedThumbnail={setActiveFeedThumbnail}
                
            />}
            <NavigateBlock>
                <BackButton onPress={prevSteps}>
                    <Text
                        color={theme.colors.border}
                        size={16}
                        bold
                    >
                        이전
                    </Text>
                </BackButton>
                <NextButton onPress={nextSteps}>
                    <Text
                        color={theme.colors.background}
                        size={16}
                        bold
                    >
                        {step === REGIST_FEED_STEPS.ITEMS ? '등록' : '다음'}
                    </Text>
                </NextButton>
            </NavigateBlock>
        </RegistFeedBoardBlock>
    )
}

const RegistFeedBoardBlock = styled.View`
    flex-direction: column;
    height: 100%;
`

export default RegistFeedBoard

export const NavigateBlock = styled.View`
    flex-direction: row;
    position: absolute;
    bottom: 0;
    width: 100%;
`

const Button = styled.TouchableOpacity`
    padding: 16px;
    background-color: ${(props) => props.theme.colors.background};
    align-items: center;
    justify-content: center;
`

export const NextButton = styled(Button)`
    flex: 1;
    background-color: ${(props) => props.theme.colors.primary};
`

export const BackButton = styled(Button)`
    flex-basis: 120px;
`
