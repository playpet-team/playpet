import React, { useState, useEffect, useRef, useMemo } from 'react'
import styled from 'styled-components/native'
import { Video, AVPlaybackStatus } from 'expo-av'
import Animated, { Value, interpolate, Easing } from 'react-native-reanimated'
import { useIsFocused } from '@react-navigation/native'
import CardCoveredImage from './Card/CardCoveredImage'
import { deviceSize, CardModel } from '../utils'
import { TouchableWithoutFeedback } from 'react-native'
import CardContentSection from './Card/CardContentSection'

const DEVICE_WIDTH = deviceSize().width
const DEVICE_HEIGHT = deviceSize().height
export interface CardType extends CardModel {
    onPlayActive?: boolean
    renderRange?: boolean
    myCards?: boolean
}

const containerWidth: string = '100%'

function Card({
    id,
    title,
    contents,
    onPlayActive = true, // 현재 액티브 된 카드인지 여부
    renderRange = true, // Carousel 에 렌더까지 된 대기중인 카드인지 여부
    myCards = false,
    // isLike,
}: CardType) {
    const [getReadyPlay, setGetReadyPlay] = useState(false)
    const [showDetail, setShowDetail] = useState(false)
    // const { isPlaySound, toggleIsPlaySound } = usePlayOptions()
    const videoRef = useRef<null | Video>(null)
    const bounceValue = useRef(new Value(0)).current
    // const { popupShare } = useShare({ id, title, })
    const isFocus = useIsFocused()

    const trackingVideoStatus = (status: AVPlaybackStatus) => setGetReadyPlay(status.isLoaded)
    // 재생 조건
    useEffect(() => {
        videoRef.current?.setOnPlaybackStatusUpdate(trackingVideoStatus)

        if (!isFocus) {
            videoRef.current?.stopAsync()
            return
        }

        if (!onPlayActive) {
            videoRef.current?.pauseAsync()
            return
        }

    }, [isFocus, onPlayActive])

    // detail 열렸을때 액션
    useEffect(() => {
        if (!onPlayActive) {
            return
        }

        if (showDetail) {
            videoRef.current?.pauseAsync()
        }

        Animated.timing(
            bounceValue,
            {
                toValue: showDetail ? 1 : 0,
                duration: 250,
                easing: Easing.inOut(Easing.ease)
            }
        ).start()
    }, [showDetail, onPlayActive])

    const shouldPlay = useMemo(() => getReadyPlay && onPlayActive && !showDetail, [getReadyPlay && onPlayActive && !showDetail])

    const content = contents[0]

    return (
        <CardTouchable onPress={() => setShowDetail(!showDetail)}>
            <CardBlock containerHeight={getContainerHeight(DEVICE_WIDTH)}>
                {!getReadyPlay && <CardCoveredImage contents={contents} />}
                {renderRange &&
                    <Video
                        ref={videoRef}
                        // isMuted={!isPlaySound}
                        source={{ uri: content.url }}
                        isLooping={true}
                        shouldPlay={shouldPlay}
                        resizeMode={Video.RESIZE_MODE_COVER}
                        style={{
                            width: DEVICE_WIDTH,
                            height: DEVICE_HEIGHT,
                            display: getReadyPlay && onPlayActive ? 'flex' : 'none',
                            zIndex: 1,
                        }}
                    />
                }
                <AnimatedOverlayBackground
                    style={{
                        opacity: interpolate(bounceValue, {
                            inputRange: [0, 1],
                            outputRange: [0, 1],
                        }),
                    }}
                />
                <CardContentSection
                    myCards={myCards}
                    bounceValue={bounceValue}
                    id={id}
                    title={title}
                />
            </CardBlock>
        </CardTouchable>
    )
}

const getContainerHeight = (DEVICE_WIDTH: number): string => {
    if (containerWidth === '100%') {
        return '100%'
    }
    return `${DEVICE_WIDTH * (Number(containerWidth.replace(/[^0-9]/g, '')) / 100)}px`
}

const CardTouchable = styled(TouchableWithoutFeedback)`
    margin-bottom: 8px;
`

interface CardContainer {
    containerHeight: string;
}
const CardBlock = styled.View<CardContainer>`
    width: ${containerWidth};
    height: ${({ containerHeight }) => containerHeight};
    position: relative;
`

const AnimatedOverlayBackground = styled(Animated.View)`
    position: absolute;
    top: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
`

export default Card