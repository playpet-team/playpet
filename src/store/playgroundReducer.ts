import { CardModel } from '../utils/cards/index';
import { createSlice } from "@reduxjs/toolkit";

export interface Cards {
    cards: CardModel[]
    myLikes: string[]
    myFollowing: string[]
    selectedProfileId: string
};
export const initialState: Cards = {
    cards: [],
    myLikes: [],
    myFollowing: [],
    selectedProfileId: '',
};

const slice = createSlice({
    name: 'playground',
    initialState,
    reducers: {
        setCards(state, { payload }) {
            state.cards = payload;
        },
        setMyLikes(state, { payload }) {
            state.myLikes = payload;
        },
        setMyFollowing(state, { payload }) {
            state.myFollowing = payload;
        },
        setSelectedProfileId(state, { payload }) {
            state.selectedProfileId = payload;
        }
    },
});

export const playgroundActions = slice.actions;
export default slice.reducer;