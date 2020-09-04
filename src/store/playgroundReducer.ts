import { CardModel } from '../utils/cards/index';
import { createSlice } from "@reduxjs/toolkit";

export interface Cards {
    cards: CardModel[]
    myLikes: string[]
};
export const initialState: Cards = {
    cards: [],
    myLikes: [],
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
        }
    },
});

export const playgroundActions = slice.actions;
export default slice.reducer;