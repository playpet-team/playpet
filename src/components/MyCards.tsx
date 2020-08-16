import React, { useCallback, useState } from 'react';
import styled from 'styled-components/native';
import Card from '../components/Card';
import { currentUser, deviceSize } from '../utils';
import useCardLikes from '../hooks/useCardLikes';
import useLoadMyCards from '../hooks/useLoadMyCards';
import { ListBlock } from '../styles';
import { Image } from 'react-native';
import { ItemList } from '../screens/AuthScreen';

function MyCards({ listType }: { listType: ItemList; }) {
    const { myCards } = useLoadMyCards({});

    const renderCards = useCallback(() => {
        if (listType === ItemList.MEDIA) {
            return myCards.map(card => {
                return (
                    <Image
                        key={card.id}
                        source={{
                            uri: card.uploadMedia[0].videoThumbnails,
                        }}
                        resizeMode="cover"
                        style={{
                            width: deviceSize().width / 2,
                            height: 100,
                        }}
                    />
                )
            });
        } else if (listType === ItemList.ITEM) {
            return <Text>올린 영상이 없습니다.</Text>;
        }
    }, [myCards, listType]);

    return (
        <ListBlock>
            {renderCards()}
        </ListBlock>
    );
};

export default MyCards;

const Text = styled.Text`
    font-size: 16px;
`;
