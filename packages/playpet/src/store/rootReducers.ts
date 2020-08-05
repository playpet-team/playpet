import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './authReducer';
import cards from './cardsReducer';
import { useDispatch } from 'react-redux';

const rootReducer = combineReducers({
    auth,
    cards,
});

export const store = configureStore({
    reducer: rootReducer,
    devTools: __DEV__,
})
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>() // Export a hook that can be reused to resolve types