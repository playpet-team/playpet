import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components/native'
import Card from '../components/Card'
import Carousel from 'react-native-snap-carousel'
import { deviceSize, loadPlaygroundCards, CardModel } from '../utils'
import { useDispatch, useSelector } from 'react-redux'
import { playgroundActions } from '../store/playgroundReducer'
import { RootState } from '../store/rootReducers'
import { useIsFocused } from '@react-navigation/native'
import useCardAdditionalInformation from '../hooks/useCardAdditionalInformation'
import { Text } from 'react-native'
import PlaypetModal from '../components/PlaypetModal'

const DEVICE_WIDTH = deviceSize().width
const SLIDER_HEIGHT = deviceSize().height
export interface RenderItemProps {
    item: CardModel
    index: number
}
export default function PlayGroundScreen() {
    const dispatch = useDispatch()
    const [activeIndex, setActiveIndex] = useState(0)
    const { cards, selectedProfileId } = useSelector((state: RootState) => state.playground)
    const isFocused = useIsFocused()
    useCardAdditionalInformation()

    useEffect(() => {
        if (!isFocused) {
            return
        }
        const loadCards = async () => {
            const response = await loadPlaygroundCards({})
            dispatch(playgroundActions.setCards(response))
        }
        loadCards()
    }, [isFocused])

    const renderItem = useCallback(({ item, index }: RenderItemProps) => {
        if (!item.contents.length) {
            return null
        }
        return (
            <Card
                {...item}
                renderRange={renderRange(activeIndex, index)}
                onPlayActive={activeIndex === index}
            />
        )
    }, [activeIndex])

    return (
        <PlayGroundBlock>
            <Carousel
                data={cards}
                renderItem={renderItem}
                sliderHeight={SLIDER_HEIGHT}
                itemHeight={SLIDER_HEIGHT}
                vertical={true}
                onScrollIndexChanged={useCallback((slideIndex: number) => setActiveIndex(slideIndex), [])}
            />
            <PlaypetModal
                modalVisible={Boolean(selectedProfileId)}
                setModalVisible={() => dispatch(playgroundActions.setSelectedProfileId(''))}
                containerStyle={{
                    // width: DEVICE_WIDTH,
                    // padding: '0',
                }}
            >
                <Text>프로필</Text>
            </PlaypetModal>
        </PlayGroundBlock>
    )
}

const renderRange = (activeIndex: number, index: number) => {
    // [1~10]
    // index: 2
    // activeIndex : 8
    // range 는 +-2 총 5카드
    // 총 7카드만이 component가 load 된다
    return true
    // return (
    //     activeIndex === (index - 2)
    //     || activeIndex === (index - 1)
    //     || activeIndex === index
    //     || activeIndex === (index + 1)
    //     || activeIndex === (index + 2)
    // )
    // index activeIndex
}

const PlayGroundBlock = styled.View`
    flex: 1;
    background-color: #000;
`
