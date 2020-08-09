import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled, { css } from 'styled-components/native';
import { Video } from 'expo-av';
import FitImage from 'react-native-fit-image';
import { Icon } from 'react-native-elements'
import { CardModel, setCardLike } from '../utils';
import { TouchableWithoutFeedback, View, Animated } from 'react-native';
import { DividerBlock } from '../styles';

const DETAIL_SECTION_HEIGHT = 100;
export interface CardType extends CardModel {
    onPlayActive: boolean;
    renderRange: boolean;
    isLike: boolean;
};
function Card({
    id,
    title,
    tags,
    uid,
    uploadMedia,
    updatedAt,
    onPlayActive,
    renderRange,
    isLike,
}: CardType) {
    const [showDetail, setShowDetail] = useState(false);
    const [isSoundOn, setIsSoundOn] = useState(false);
    const videoRef = useRef<any>(null);
    const bounceValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (showDetail) {
            videoRef.current?.pauseAsync();
        } else {
            videoRef.current?.playAsync();
        }
        Animated.timing(
            bounceValue,
            {
                toValue: showDetail ? 1 : 0,
                useNativeDriver: false,
                duration: 250,
            }
        ).start();
    }, [showDetail]);

    const media = uploadMedia[0];

    const RenderMedia = useCallback(() => {
        return (
            <>
                {media.isVideo ?
                    <Video
                        ref={videoRef}
                        source={{ uri: media.firebaseUrl }}
                        isMuted={!isSoundOn}
                        isLooping={true}
                        shouldPlay={onPlayActive && !showDetail}
                        resizeMode={Video.RESIZE_MODE_CONTAIN}
                        style={{ width: '100%', height: '100%', position: 'absolute', }}
                    />
                    :
                    <FitImage
                        source={{ uri: media.firebaseUrl }}
                        style={{ flex: 1 }}
                    />
                }
            </>
        );

    }, [renderRange]);

    return (
        <CardBlock onPress={() => setShowDetail(!showDetail)}>
            <View style={{ flex: 1, backgroundColor: '#000', }}>
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
                    showDetail={showDetail}
                    style={{}}
                >
                    <Content>
                        <FloatingButtonGroup>
                            <Icon
                                onPress={() => setIsSoundOn(!isSoundOn)}
                                name={isSoundOn ? 'volume-up' : 'volume-off'}
                                color="#fff"
                                size={22}
                            />
                            <DividerBlock marginTop={8} />
                            <Icon
                                onPress={() => setCardLike({ uid, id, methods: isLike ? 'remove' : 'add' })}
                                name={isLike ? 'favorite' : 'favorite-border'}
                                color="#fff"
                                size={22}
                            />
                        </FloatingButtonGroup>
                        <Header>
                            <TitleText header>{title}</TitleText>
                        </Header>
                    </Content>
                </SectionBlock>
            </View>
        </CardBlock >
    );
};

const CardBlock = styled(TouchableWithoutFeedback)`
    flex: 1;
    margin-bottom: 8px;
    
    
`;

const FloatingButtonGroup = styled.View`
    position: absolute;
    right: 0px;
    top: -56px;
`;

const AnimatedOverlayBackground = styled(Animated.View)`
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
`;
interface ContentBlockProps {
    heightAnim: number;
    showDetail: boolean;
}
const SectionBlock = styled(View) <ContentBlockProps>`
    overflow: visible;
    flex: 1;
    justify-content: flex-end;
    padding: 24px;
    /* ${({ showDetail }) => showDetail && css``} */
`;

const Content = styled.View`
    position: relative;
    margin-top: 16px;
`;

const Header = styled.View`
    position: relative;
`;

interface TitleProps {
    header?: boolean;
};
const TitleText = styled.Text<TitleProps>`
    width: 85%;
    ${({ header }) => header && css`
        font-size: 22px;
        font-weight: 800;
    `};
    color: #fff;
`;

export default Card;