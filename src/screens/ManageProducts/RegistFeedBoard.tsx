import React, { useState } from "react"
import styled, { useTheme } from 'styled-components/native'
import { Text } from '../../styles'
import RegistFeedBrand from "../../components/RegistFeedBrand"
import RegistFeedItems from "../../components/RegistFeedItems"
import { useNavigation } from "@react-navigation/native"
import { currentUser, updateFeedItems } from "../../utils"
import RegistFeedCapacity from "../../components/RegistFeedCapacity"
import RegistFeedRecommandedAmount from "../../components/RegistFeedRecommandedAmount"
import RegistFeedLastBuyAt from "../../components/RegistFeedLastBuyAt"

enum REGIST_FEED_STEPS {
    BRANDS = 'BRANDS',
    ITEMS = 'ITEMS',
    CAPACITY = 'CAPACITY',
    RECOMMANDED_AMOUNT = 'RECOMMANDED_AMOUNT',
    LAST_BUY_AT = 'LAST_BUY_AT',
}
function RegistFeedBoard() {
    const [step, setStep] = useState<REGIST_FEED_STEPS>(REGIST_FEED_STEPS.BRANDS)

    const [activeFeedBrandId, setActiveFeedBrandId] = useState('')
    const [activeFeedItemId, setActiveFeedItemId] = useState('')
    const [activeFeedPackingUnit, setActiveFeedPackingUnit] = useState('')
    const [activeFeedRecommanedAmount, setActiveFeedRecommanedAmount] = useState(0)
    const [activeFeedLastBuyAt, setActiveFeedLastBuyAt] = useState(-1)

    const [feedPackingUnits, setFeedPackingUnits] = useState<string[]>([])

    const theme = useTheme()
    const navigation = useNavigation()
    const handleLater = () => navigation.goBack()
    
    const handleUpdateFeeds = async () => {
        const user = currentUser()
        if (!user) {
            return
        }
        await updateFeedItems(user.uid, {
            feedItemId: activeFeedItemId,
            feedBrandId: activeFeedBrandId,
            feedPackingUnit: activeFeedPackingUnit,
            feedRecommanedAmount: activeFeedRecommanedAmount,
            feedLastBuyAt: activeFeedLastBuyAt,
        })

        navigation.navigate('ManageProducts', {
            needRefresh: true,
            pushModal: true,
        })
    }

    const nextSteps = () => {
        switch (step) {
            case REGIST_FEED_STEPS.BRANDS: {
                if (activeFeedBrandId) {
                    setStep(REGIST_FEED_STEPS.ITEMS);
                }
                break;
            }
            case REGIST_FEED_STEPS.ITEMS: {
                if (activeFeedBrandId) {
                    setStep(REGIST_FEED_STEPS.CAPACITY);
                }
                break;
            }
            case REGIST_FEED_STEPS.CAPACITY: {
                if (activeFeedBrandId) {
                    setStep(REGIST_FEED_STEPS.RECOMMANDED_AMOUNT);
                }
                break;
            }
            case REGIST_FEED_STEPS.RECOMMANDED_AMOUNT: {
                if (activeFeedBrandId) {
                    setStep(REGIST_FEED_STEPS.LAST_BUY_AT);
                }
                break;
            }
            case REGIST_FEED_STEPS.LAST_BUY_AT: {
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
            case REGIST_FEED_STEPS.CAPACITY: {
                setStep(REGIST_FEED_STEPS.ITEMS);
                break;
            }
            case REGIST_FEED_STEPS.RECOMMANDED_AMOUNT: {
                setStep(REGIST_FEED_STEPS.CAPACITY);
                break;
            }
            case REGIST_FEED_STEPS.LAST_BUY_AT: {
                setStep(REGIST_FEED_STEPS.RECOMMANDED_AMOUNT);
                break;
            }
        }
    }

    return (
        <RegistFeedBoardBlock>
            {step === REGIST_FEED_STEPS.BRANDS && <RegistFeedBrand
                activeFeedBrandId={activeFeedBrandId}
                setActiveFeedBrandId={setActiveFeedBrandId}
            />}
            {step === REGIST_FEED_STEPS.ITEMS && <RegistFeedItems
                activeFeedItemId={activeFeedItemId}
                setActiveFeedItemId={setActiveFeedItemId}
                setFeedPackingUnits={setFeedPackingUnits}
            />}
            {step === REGIST_FEED_STEPS.CAPACITY && <RegistFeedCapacity
                feedPackingUnits={feedPackingUnits}
                activeFeedPackingUnit={activeFeedPackingUnit}
                setActiveFeedPackingUnit={setActiveFeedPackingUnit}
            />}
            {step === REGIST_FEED_STEPS.RECOMMANDED_AMOUNT && <RegistFeedRecommandedAmount
                activeFeedRecommanedAmount={activeFeedRecommanedAmount}
                setActiveFeedRecommanedAmount={setActiveFeedRecommanedAmount}
            />}
            {step === REGIST_FEED_STEPS.LAST_BUY_AT && <RegistFeedLastBuyAt
                activeFeedLastBuyAt={activeFeedLastBuyAt}
                setActiveFeedLastBuyAt={setActiveFeedLastBuyAt}
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
                        {step === REGIST_FEED_STEPS.LAST_BUY_AT ? '등록' : '다음'}
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
