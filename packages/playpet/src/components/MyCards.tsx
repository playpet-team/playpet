import React, { useCallback } from 'react';
import styled from 'styled-components/native';
import Card from '../components/Card';
import { currentUser } from '../utils';
import useCardLikes from '../hooks/useCardLikes';
import useLoadMyCards from '../hooks/useLoadMyCards';

function MyCards() {

    const { myLikes } = useCardLikes();
    const { myCards } = useLoadMyCards({});

    const renderCards = useCallback(() => {
        return myCards.map(card => {
            return (
                <Card
                    {...card}
                    key={card.id}
                    onPlayActive={false}
                    renderRange={true}
                    containerWidth='32%'
                    isLike={myLikes.includes(card.id)}
                />
            )
        });
    }, [myCards, myLikes]);

    return (
        <MyCardsBlock>
            {myCards.length ? renderCards() : <Text>올린 영상이 없습니다.</Text>}
        </MyCardsBlock>
    );
};

export default MyCards;

const MyCardsBlock = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;
    padding-horizontal: 8px;
    width: 100%;
`;

const Text = styled.Text`
    font-size: 16px;
`;
