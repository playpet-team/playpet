import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from '@emotion/native';
import { useSelector } from 'react-redux';
import { AuthTapParamList } from '../navigation/BottomTabNavigator';
import { RootState } from '../store/rootReducers';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const AuthBlock = styled.View`
    display: flex;
`;

export default function Auth() {
    const navigation = useNavigation();
    // const { profileImage } = useSelector((state: RootState) => state.auth);
    return (
        <SafeAreaView>
            <AuthBlock>
                <Text>우리 가족</Text>
                <TouchableOpacity
                    onPress={() => navigation.push('AuthSettings')}
                >
                    <Text>oeuth</Text>
                </TouchableOpacity>
            </AuthBlock>
        </SafeAreaView>
    );
};
