import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components/native';
import Card from '../components/Card';
import { getMyCards, currentUser, CardModel } from '../utils';
import useCardLikes from '../hooks/useCardLikes';
import { ScrollView } from 'react-native-gesture-handler';

const user = currentUser();
function MyCards() {
    const [myCards, setMyCards] = useState<CardModel[]>([]);
    const { myLikes } = useCardLikes();
    const [maxLength, setMaxLength] = useState(10);

    useEffect(() => {
        async function loadMyCards(uid: string) {
            setMyCards(await getMyCards(uid));
        }
        if (user) {
            loadMyCards(user.uid);
        }
    }, []);

    const renderCards = useCallback(() => {
        console.log('myCards------', myCards.length);
        return myCards.map(card => (
            <Card
                {...card}
                key={card.id}
                onPlayActive={false}
                renderRange={true}
                containerWidth='32%'
                isLike={myLikes.includes(card.id)}
            />
        ));
    }, [myCards.length]);

    return (
        <MyCardsBlock>
            {myCards.length ? renderCards() : <Text>올린 영상이 없습니다.</Text>}
        </MyCardsBlock>
    );
};

export default MyCards;

const MyCardsBlock = styled.View`
    /* flex: 1; */
    flex-direction: row;
    flex-wrap: wrap;
    /* align-content: flex-start; */
    align-items: flex-start;
    justify-content: space-between;
    padding-horizontal: 8px;
    width: 100%;
    height: 500px;
    /* height: 300px; */
`;

const Text = styled.Text`
    font-size: 16px;
`;
