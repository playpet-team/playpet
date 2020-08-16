import { CardModel } from '../utils/cards/index';
import { createSlice } from "@reduxjs/toolkit";

export interface Cards {
    cards: CardModel[],
};
export const initialState: Cards = {
    cards: [],
};

const slice = createSlice({
    name: 'playground',
    initialState,
    reducers: {
        setCards(state, { payload }) {
            state.cards = payload;
        },
    },
});

export const playgroundActions = slice.actions;
export default slice.reducer;