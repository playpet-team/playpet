import { configureStore, combineReducers } from '@reduxjs/toolkit'
// import { composeWithDevTools } from 'redux-devtools-extension';
// 왜 dev tool 이 안깔리는거야!!!!!!!!!
import auth from './authReducer';
import playground from './playgroundReducer';
import signIn from './signInReducer';
import { useDispatch } from 'react-redux';

const rootReducer = combineReducers({
    auth,
    playground,
    signIn,
});

export const store = configureStore({
    reducer: rootReducer,
    devTools: __DEV__,
})
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>() // Export a hook that can be reused to resolve types
