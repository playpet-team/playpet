import { configureStore, combineReducers } from '@reduxjs/toolkit'
import auth from './authReducer';
import { useDispatch } from 'react-redux';

const rootReducer = combineReducers({
    auth,
});

export const store = configureStore({
    reducer: rootReducer,
})
export type RootState = ReturnType<typeof store.getState>;

export const selectAuth = (state: RootState) => state.auth;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>() // Export a hook that can be reused to resolve types