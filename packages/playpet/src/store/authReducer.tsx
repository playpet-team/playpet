import { createSlice } from "@reduxjs/toolkit";

export interface Member {
    profileImage: string;
};

const initialState: Member = {
    profileImage: '',
};

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
    },
});

export default slice.reducer;