import React, { useCallback, useEffect, useState } from "react"
import styled, { useTheme } from 'styled-components/native'
import { Text } from '../../styles'
import RegistFeedBrand from "../../components/RegistFeedBrand"
import RegistFeedItems from "../../components/RegistFeedItems"
import { useNavigation } from "@react-navigation/native"
import { currentUser, getProductList, ProductItem, updateFeedItems } from "../../utils"
import RegistFeedCapacity from "../../components/RegistFeedCapacity"

enum REGIST_FEED_STEPS {
    BRANDS = 'BRANDS',
    ITEMS = 'ITEMS',
    CAPACITY = 'CAPACITY',
}
function RegistFeedBoard() {
    const [step, setStep] = useState<REGIST_FEED_STEPS>(REGIST_FEED_STEPS.BRANDS)
    const [activeFeedItemId, setActiveFeedItemId] = useState('')
    const [feedPackingUnits, setFeedPackingUnits] = useState<string[]>([])
    const [activeFeedPackingUnit, setActiveFeedPackingUnit] = useState('')
    const [activeFeedBrandId, setActiveFeedBrandId] = useState('')
    const theme = useTheme()
    const navigation = useNavigation()
    const handleLater = () => navigation.goBack()
    console.log('activeFeedPackingUnit------', activeFeedPackingUnit)
    
    const handleUpdateFeeds = async () => {
        const user = currentUser()
        console.log('activeFeedPackingUnit------update-', activeFeedPackingUnit)
        if (!user) {
            return
        }
        await updateFeedItems(user.uid, {
            feedItemId: activeFeedItemId,
            feedBrandId: activeFeedBrandId,
            feedPackingUnit: activeFeedPackingUnit,
        })

        navigation.navigate('ManageProducts', {
            needRefresh: true,
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
                console.log('?')
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
                        {step === REGIST_FEED_STEPS.CAPACITY ? '등록' : '다음'}
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
