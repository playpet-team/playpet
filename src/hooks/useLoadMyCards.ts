import { getMyCards, CardModel } from './../utils/cards/index';
import React, { useState, useEffect, useCallback } from 'react';
import { currentUser } from '../utils';

const user = currentUser();

interface LoadCards {
    sort?: 'updatedAt';
    searchUid?: string;
    type?: 'all' | 'image' | 'video';
}

function useLoadMyCards({
    sort = 'updatedAt',
    searchUid = 'my',
    type = 'video',
}: LoadCards): { myCards: CardModel[] } {

    const [myCards, setMyCards] = useState<CardModel[]>([]);

    useEffect(() => {
        async function loadMyCards(uid: string) {
            const cards = await getMyCards(uid, sort);
            const filtered = filtering(cards, type);
            setMyCards(filtered);
        }
        if (searchUid === 'my' && user) {
            console.log('user----', user)
            loadMyCards(user.uid);
        } else {
            loadMyCards(searchUid);
        }
    }, [sort, searchUid, type]);

    return { myCards };
};

export default useLoadMyCards;

const filtering = (cards: CardModel[], type: 'all' | 'image' | 'video') => {
    if (type === 'all') {
        return cards;
    }
    return cards.filter(card => type === 'image' ? !card.contents[0].isVideo : card.contents[0].isVideo);
};