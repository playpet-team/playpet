import React, { useState } from 'react';
import styled, { css } from 'styled-components/native';
import { Video } from 'expo-av';
import FitImage from 'react-native-fit-image';
import { Icon } from 'react-native-elements'
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
        <CardBlock onPress={() => setShowDetail(!showDetail)}>
            {media.isVideo ?
                <Video
                    source={{ uri: media.firebaseUrl }}
                    isMuted={true}
                    isLooping={true}
                    shouldPlay={onPlayActiveRange}
                    resizeMode={Video.RESIZE_MODE_CONTAIN}
                    style={{ width: '100%', height: '100%', position: 'absolute', }}
                />
                :
                <FitImage
                    source={{ uri: media.firebaseUrl }}
                    style={{ flex: 1 }}
                />
            }
            <SectionBlock showDetail={showDetail}>
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
                {/* <Content>
                </Content> */}
            </SectionBlock>
        </CardBlock>
    );
};

const CardBlock = styled.TouchableOpacity`
    flex: 1;
    margin-bottom: 8px;
    background-color: #000;
    
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