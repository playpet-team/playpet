import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from '@emotion/native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/rootReducers';
import auth from '@react-native-firebase/auth';
import { authActions } from '../store/authReducer';

const HomeBlock = styled.View`
    display: flex;
`;

export default function Home() {
    const dispatch = useDispatch();

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);
    function onAuthStateChanged(user: any) {
        if (user) {
            dispatch(authActions.signIn());
        } else {
            dispatch(authActions.signOut());
        }
    }

    // const { profileImage, isLogged } = useSelector((state: RootState) => state.auth);
    return (
        <SafeAreaView>
            <HomeBlock>
                <Text>홈</Text>
            </HomeBlock>
        </SafeAreaView>
    );
};
