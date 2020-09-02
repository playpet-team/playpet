import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import styled, { css } from 'styled-components/native'
import { Video } from 'expo-av'
import { Icon, Button, Image } from 'react-native-elements'
import { deviceSize, CardModel, setCardLike } from '../utils'
import { TouchableWithoutFeedback, View, Animated, } from 'react-native'
import useShare from '../hooks/useShare'
import { useIsFocused, useTheme } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'

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
    const { popupShare } = useShare({ id, title, })
    const isFocus = useIsFocused()
    const themes = useTheme()

    useEffect(() => {
        if (!isFocus) {
            videoRef.current?.pauseAsync()
            return
        }

        if (!onPlayActive) {
            console.log('onPlayActive')
            videoRef.current?.pauseAsync()
            return
        }

    }, [isFocus, onPlayActive])

    useEffect(() => {
        if (!onPlayActive) {
            return
        }

        if (showDetail) {
            videoRef.current?.pauseAsync()
        } else {
            // videoRef.current?.playAsync()
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

    const handleProduct = () => {
        alert('상품클릭')
    }

    const media = contents[0]

    return (
        <CardTouchable onPress={() => setShowDetail(!showDetail)}>
            <CardBlock containerHeight={getContainerHeight(DEVICE_WIDTH)}>
                {renderRange &&
                    <Video
                        ref={videoRef}
                        // isMuted={!isPlaySound}
                        source={{ uri: media.url }}
                        isLooping={true}
                        // shouldPlay={onPlayActive && !showDetail}
                        shouldPlay={false}
                        resizeMode={Video.RESIZE_MODE_COVER}
                        style={{ width: DEVICE_WIDTH, height: '100%', position: 'absolute', }}
                    />
                }
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
                            outputRange: [150, DEVICE_HEIGHT / 2],
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
                            containerStyle={{
                                marginRight: 20,
                            }}
                        />
                        <Icon
                            onPress={popupShare}
                            name='share'
                            color="#fff"
                            size={22}
                        />
                        {/* <LikeNumber>{likes}</LikeNumber> */}
                    </FloatingButtonGroup>
                    <Content>
                        <BodySection>
                            <Header>
                                <TitleText header>바우와우</TitleText>
                                <Button
                                    title="+팔로우"
                                    titleStyle={{
                                        color: themes.colors.primary,
                                        fontSize: 12,
                                    }}
                                    buttonStyle={{
                                        backgroundColor: themes.colors.background,
                                        padding: 4,
                                    }}
                                />
                            </Header>
                            <Main>
                                <TitleText>{title}</TitleText>
                            </Main>
                        </BodySection>
                        <Aside>
                            <Image
                                onPress={handleProduct}
                                source={{ uri: 'https://contents.lotteon.com/itemimage/LM/88/01/11/51/14/13/0_/00/1/LM8801115114130_001_1.jpg/dims/resizef/824X824' }}
                                style={{ width: 65, height: 65 }}
                                resizeMode="cover"
                            />
                        </Aside>
                    </Content>
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
    flex-direction: row;
`

const AnimatedOverlayBackground = styled(Animated.View)`
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
`

const SectionBlock = styled(Animated.View)`
    overflow: visible;
    position: absolute;
    flex-direction: column;
    min-height: 180px;
    bottom: 8px;
    width: 100%;
    padding: 16px;
    background-color: rgba(0, 0, 0, 0.05);
`

const Content = styled.View`
    margin-top: 20px;
    flex-direction: row;
`

const LikeNumber = styled.Text``

const BodySection = styled.View`
    flex-direction: column;
    flex: 2;
`

const Header = styled.View`
    flex-direction: row;
`

const Main = styled.View`
    margin-top: 16px;
    flex-direction: row;
    font-size: 12px;
    line-height: 14px;
`

const Aside = styled.View`
    flex: 1;
    align-items: flex-end;
    /* justify-content: center; */
`

const TitleText = styled.Text<{ header?: boolean }>`
    color: #fff;
    flex: 1;
    ${({ header }) => header && css`
        font-size: 18px;
        font-weight: 800;
    `};
`

export default Card