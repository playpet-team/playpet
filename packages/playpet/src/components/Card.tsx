import React, { useCallback, useState, useEffect } from 'react';
import styled, { css } from 'styled-components/native';
import { Video } from 'expo-av';
import { Animated, View, Text } from 'react-native';
import { Icon } from 'react-native-elements'

export interface CardType {
    uri: string;
    onPlayActiveRange?: boolean;
};
function Card({ uri, onPlayActiveRange = false }: CardType) {
    const [showDetail, setShowDetail] = useState(false);

    useEffect(() => {

        console.log('showDetail------', showDetail);
    }, [showDetail]);
    return (
        <CardBlock
            onPress={() => setShowDetail(!showDetail)}
        >
            <>
                <Video
                    source={{ uri }}
                    isMuted={true}
                    isLooping={true}
                    shouldPlay={onPlayActiveRange}
                    resizeMode={Video.RESIZE_MODE_COVER}
                    style={{ width: '100%', height: '100%', position: 'absolute', }}
                />
                <SectionBlock
                    showDetail={showDetail}
                >
                    <View style={{
                        flex: 1,
                        position: 'absolute',
                        right: 12,
                        top: -32,
                    }}>
                        <Icon
                            name="favorite-border"
                            color="#fff"
                            size={22}
                        />
                    </View>
                    <Header>
                        <TitleText header>[속보] (주) 플레이펫 시가 총액 2조 넘어서..</TitleText>
                    </Header>
                    <Content>
                        <Description>
                            <DescriptionText>
                                시가총액이 사상최대치를 경신했다.
                                12일 증권거래소에 따르면 이날 시가총액이 316조6천928억원으로 종전 기록인지
                                난 9월13일의 313조5천285억원을 넘어섰다.
                                이는 최근 담배인삼공사 등이 신규상장된데다 주가가 지속적으로 상승한데 따른
                        </DescriptionText>
                        </Description>
                    </Content>
                </SectionBlock>
            </>
        </CardBlock>
    );
};

const CardBlock = styled.TouchableOpacity`
    flex: 1;
    margin-bottom: 24px;
    
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