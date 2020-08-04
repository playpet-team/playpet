import React, { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from '@emotion/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import useAuthStateChanged from '../hooks/useAuthStateChanged';
import { useSelector } from 'react-redux';
import { RootState } from '../store/rootReducers';
import AppLogin from '../components/AppLogin';

export default function Home({ navigation }: StackScreenProps<RootStackParamList, 'Home'>) {
    useAuthStateChanged();
    const { isLogged } = useSelector((state: RootState) => state.auth);
    if (!isLogged) {
        navigation.setOptions({
            headerTitle: '회원가입',
        })
        return (<AppLogin />);
    }

    return (
        <SafeAreaView>
            <HomeBlock>
                <Text>홈</Text>
            </HomeBlock>
        </SafeAreaView>
    );
};

const HomeBlock = styled.View``;