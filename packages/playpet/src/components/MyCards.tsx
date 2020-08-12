import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Avatar } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { RootState } from '../store/rootReducers';
import { getMyCards, currentUser, CardModel } from '../utils';

const user = currentUser();
function MyCards() {
    const [myCards, setMyCards] = useState<CardModel[]>([]);
    const [maxLength, setMaxLength] = useState(10);

    useEffect(() => {
        async function loadMyCards(uid: string) {
            setMyCards(await getMyCards(uid));
        }
        if (user) {
            loadMyCards(user.uid);
        }
    }, []);

    return (
        <MyCardsBlock>

        </MyCardsBlock>
    );
};

export default MyCards;

const MyCardsBlock = styled.View`
    padding: 16px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;

const Text = styled.Text`
    font-size: 16px;
`;