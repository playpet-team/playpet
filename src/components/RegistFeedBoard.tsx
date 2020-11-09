import React, { useState } from "react"
import { SafeAreaView } from 'react-native-safe-area-context'
import styled, { useTheme } from 'styled-components/native'
import PlaypetModal from '../components/PlaypetModal'
import { deviceSize } from "../utils"
import { DividerBlock, Layout, Text } from '../styles'
import RegistFeedBrand from "./RegistFeedBrand"
import RegistFeedItems from "./RegistFeedItems"
const DEVICE_WIDTH = deviceSize().width
const DEVICE_HEIGHT = deviceSize().height

enum REGIST_FEED_STEPS {
    BRANDS = 'BRANDS',
    ITEMS = 'ITEMS'
}
function RegistFeedBoard({ setShowFeedBoard }: {
    setShowFeedBoard: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const [step, setStep] = useState<REGIST_FEED_STEPS>(REGIST_FEED_STEPS.BRANDS)
    const [activeFeedItem, setActiveFeedItem] = useState('')
    const [activeFeedBrand, setActiveFeedBrand] = useState('')
    const theme = useTheme()

    const nextSteps = () => {
        switch (step) {
            case REGIST_FEED_STEPS.BRANDS: {
                setStep(REGIST_FEED_STEPS.ITEMS);
                break;
            }
            case REGIST_FEED_STEPS.ITEMS: {
                // TODO DB에 등록
                setShowFeedBoard(false);
                break;
            }
        }
    }

    const prevSteps = () => {
        switch (step) {
            case REGIST_FEED_STEPS.BRANDS: {
                setShowFeedBoard(false);
                break;
            }
            case REGIST_FEED_STEPS.ITEMS: {
                setStep(REGIST_FEED_STEPS.BRANDS);
                break;
            }
        }
    }

    return (
        <PlaypetModal
            modalVisible
            isHideCloseButton
            containerStyle={{
                width: DEVICE_WIDTH,
                height: DEVICE_HEIGHT,
            }}
        >
            <FeedBoardBlock>
                {step === REGIST_FEED_STEPS.BRANDS && <RegistFeedBrand
                    activeFeedBrand={activeFeedBrand}
                    setActiveFeedBrand={setActiveFeedBrand}
                />}
                {step === REGIST_FEED_STEPS.ITEMS && <RegistFeedItems
                    activeFeedItem={activeFeedItem}
                    setActiveFeedItem={setActiveFeedItem}
                />}
                <FeedNavigateBlock>
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
                </FeedNavigateBlock>
            </FeedBoardBlock>
        </PlaypetModal>
    )
}

const RegistFeedBoardBlock = styled.View`
  
`

export default RegistFeedBoard

const FeedBoardBlock = styled.View`
    padding-vertical: 40px;
    flex-direction: column;
    height: 100%;
`

const GridLayout = styled.View`
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

const FeedNavigateBlock = styled.View`
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

const NextButton = styled(Button)`
    flex: 1;
    background-color: ${(props) => props.theme.colors.primary};
`

const BackButton = styled(Button)`
    flex-basis: 120px;
`
