import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import styled, { css } from 'styled-components/native'
import { Video } from 'expo-av'
import { Icon } from 'react-native-elements'
import { deviceSize, CardModel, setCardLike } from '../utils'
import { TouchableWithoutFeedback, View, Animated, Image } from 'react-native'
// import { DividerBlock } from '../styles'
// import usePlayOptions from '../hooks/usePlayOptions'

const DEVICE_WIDTH = deviceSize().width
const DEVICE_HEIGHT = deviceSize().height
export interface CardType extends CardModel {
    onPlayActive: boolean
    renderRange: boolean
    isLike: boolean
}

const containerWidth: string = '100%'

function Card({
    id,
    title,
    tags,
    uid,
    likes,
    contents,
    updatedAt,
    onPlayActive, // 현재 액티브 된 카드인지 여부
    renderRange, // Carousel 에 렌더까지 된 대기중인 카드인지 여부
    isLike,
}: CardType) {
    const [showDetail, setShowDetail] = useState(false)
    // const { isPlaySound, toggleIsPlaySound } = usePlayOptions()
    const videoRef = useRef<any>(null)
    const bounceValue = useRef(new Animated.Value(0)).current

    useEffect(() => {
        if (!onPlayActive) {
            videoRef.current?.pauseAsync()
            return
        }
        if (showDetail) {
            videoRef.current?.pauseAsync()
        } else {
            videoRef.current?.playAsync()
        }
        Animated.timing(
            bounceValue,
            {
                toValue: showDetail ? 1 : 0,
                useNativeDriver: false,
                duration: 250,
            }
        ).start()
    }, [showDetail, onPlayActive])

    const media = contents[0]

    const RenderMedia = useCallback(() => {
        if (!media || !media.isVideo) {
            return null
        }
        return (
            <Video
                ref={videoRef}
                source={{ uri: media.url }}
                // isMuted={!isPlaySound}
                isLooping={true}
                shouldPlay={!showDetail}
                resizeMode={Video.RESIZE_MODE_COVER}
                style={{ width: '100%', height: '100%', position: 'absolute', }}
            />
        )

    }, [renderRange, videoRef])

    return (
        <CardTouchable onPress={() => setShowDetail(!showDetail)}>
            <CardBlock
                containerHeight={getContainerHeight(DEVICE_WIDTH)}
            >
                {renderRange && <RenderMedia />}
                <AnimatedOverlayBackground
                    style={{
                        opacity: bounceValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 1],
                        }),
                    }}
                />
                <SectionBlock
                    style={{
                        height: bounceValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: [150, 500],
                        })
                    }}
                >
                    <FloatingButtonGroup>
                        {/* <Icon
                            onPress={toggleIsPlaySound}
                            name={isPlaySound ? 'volume-up' : 'volume-off'}
                            color="#fff"
                            size={22}
                            style={{
                                padding: 8
                            }}
                        /> */}
                        {/* <DividerBlock marginTop={8} /> */}
                        <Icon
                            onPress={() => setCardLike({ uid, id, methods: isLike ? 'remove' : 'add' })}
                            name={isLike ? 'favorite' : 'favorite-border'}
                            color="#fff"
                            size={22}
                        />
                        <LikeNumber>{likes}</LikeNumber>
                    </FloatingButtonGroup>
                    <Header>
                        <TitleText header>{title}</TitleText>
                    </Header>
                </SectionBlock>
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
`

const FloatingButtonGroup = styled.View`
    position: absolute;
    right: 16px;
    top: 16px;
    z-index: 100;
`

const AnimatedOverlayBackground = styled(Animated.View)`
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
`
// interface ContentBlockProps {
//     showDetail: boolean;
// }
const SectionBlock = styled(Animated.View)`
    overflow: visible;
    position: absolute;
    min-height: 120px;
    bottom: 0;
    width: 100%;
    padding: 24px;
    background-color: rgba(0, 0, 0, 0.4);
`

const Content = styled.View`
    position: relative;
    margin-top: 16px;
`

const LikeNumber = styled.Text``

const Header = styled.View`
    position: relative;
`

interface TitleProps {
    header?: boolean;
};
const TitleText = styled.Text<TitleProps>`
    color: #fff;
    width: 85%;
    ${({ header }) => header && css`
        font-size: 22px;
        font-weight: 800;
    `};
`

export default Card;