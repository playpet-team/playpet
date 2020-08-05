import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
};

const slice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        getPlayGroundCard(state) {
        },
    },
});

export const cardsActions = slice.actions;
export default slice.reducer;