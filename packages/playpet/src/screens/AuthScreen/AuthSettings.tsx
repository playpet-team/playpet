import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from '@emotion/native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducers';

const AuthSettingsBlock = styled.View`
    display: flex;
`;

export default function AuthSettings() {
    const { profileImage } = useSelector((state: RootState) => state.auth);
    return (
        <SafeAreaView>
            <AuthSettingsBlock>
                <Text>우리 가족</Text>
            </AuthSettingsBlock>
        </SafeAreaView>
    );
};
