import React, { useCallback, useState, useEffect } from 'react';
import styled, { css } from 'styled-components/native';
import { Video } from 'expo-av';
import FitImage from 'react-native-fit-image';
import { Animated, View, Text } from 'react-native';
import { Icon } from 'react-native-elements'
import { useDispatch } from 'react-redux';
import { CardModel } from '../utils';

export interface CardType extends CardModel {
    onPlayActiveRange?: boolean;
};
function Card({
    title,
    tags,
    uid,
    uploadMedia,
    createdAt,
    updatedAt,
    onPlayActiveRange = false }: CardType) {
    const [showDetail, setShowDetail] = useState(false);

    // useEffect(() => {
    // }, [showDetail]);

    const media = uploadMedia[0];

    return (
        <CardBlock
            onPress={() => setShowDetail(!showDetail)}
        >
            <>
                {media.isVideo ?
                    <Video
                        source={{ uri: media.firebaseUrl }}
                        isMuted={true}
                        isLooping={true}
                        shouldPlay={onPlayActiveRange}
                        resizeMode={Video.RESIZE_MODE_COVER}
                        style={{ width: '100%', height: '100%', position: 'absolute', }}
                    />
                    :
                    <FitImage
                        source={{ uri: media.firebaseUrl }}
                        style={{
                            flex: 1,
                        }}
                    />
                }
                <SectionBlock
                    showDetail={showDetail}
                >
                    <FloatingButtonGroup>
                        <Icon
                            name="favorite-border"
                            color="#fff"
                            size={22}
                        />
                    </FloatingButtonGroup>
                    <Header>
                        <TitleText header>{title}</TitleText>
                    </Header>
                    <Content>
                        {/* <Description>
                            <DescriptionText>
                                시가총액이 사상최대치를 경신했다.
                                12일 증권거래소에 따르면 이날 시가총액이 316조6천928억원으로 종전 기록인지
                                난 9월13일의 313조5천285억원을 넘어섰다.
                                이는 최근 담배인삼공사 등이 신규상장된데다 주가가 지속적으로 상승한데 따른
                        </DescriptionText>
                        </Description> */}
                    </Content>
                </SectionBlock>
            </>
        </CardBlock>
    );
};

const CardBlock = styled.TouchableOpacity`
    flex: 1;
    margin-bottom: 8px;
    
`;

const FloatingButtonGroup = styled.View`
    position: absolute;
    right: 12px;
    top: -32px;
`;

interface ContentBlockProps {
    showDetail: boolean;
}
const SectionBlock = styled.View<ContentBlockProps>`
    overflow: visible;
    padding: 24px;
    position: absolute;
    bottom: 0;
    width: 100%;

    ${({ showDetail }) => !showDetail && css`
        background-color: rgba(0, 0, 0, 0.6);
    `}
`;

const Content = styled.View`
    margin-top: 16px;
`;

const Description = styled.View``;
const DescriptionText = styled.Text`
    color: #fff;
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