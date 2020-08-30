import React, { useCallback, } from 'react';
import styled from 'styled-components/native';
import { deviceSize } from '../utils';
import useLoadMyCards from '../hooks/useLoadMyCards';
import { ListBlock, Text } from '../styles';
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
                            uri: card.contents[0].videoThumbnails,
                        }}
                        resizeMode="cover"
                        style={{
                            width: '49%',
                            height: 200,
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
