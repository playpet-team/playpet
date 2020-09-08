import React, { useState, useCallback } from 'react'
import styled from 'styled-components/native'
import Card from '../components/Card'
import Carousel from 'react-native-snap-carousel'
import { deviceSize, CardModel } from '../utils'
import { useDispatch, useSelector } from 'react-redux'
import { playgroundActions } from '../store/playgroundReducer'
import { RootState } from '../store/rootReducers'
import useCardAdditionalInformation from '../hooks/useCardAdditionalInformation'
import { Text } from 'react-native'
import PlaypetModal from '../components/PlaypetModal'
import useLoadPlaygroundCards from '../hooks/useLoadPlaygroundCards'
import useLoadingIndicator from '../hooks/useLoadingIndicator'

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
    useCardAdditionalInformation()
    const { loading } = useLoadPlaygroundCards()
    const { Indicator } = useLoadingIndicator()

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
            {loading && <Indicator />}
            <Carousel
                data={cards}
                renderItem={renderItem}
                sliderHeight={SLIDER_HEIGHT}
                itemHeight={SLIDER_HEIGHT}
                vertical={true}
                keyExtractor={card => card.id}
                onScrollIndexChanged={useCallback((slideIndex: number) => {
                    console.log('slideIndex---', slideIndex)
                    setActiveIndex(slideIndex)
                }, [])}
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
