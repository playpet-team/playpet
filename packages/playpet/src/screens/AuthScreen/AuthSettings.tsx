import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from '@emotion/native';

const AuthSettingsBlock = styled.View`
`;

export default function AuthSettings() {
    return (
        <SafeAreaView>
            <AuthSettingsBlock>
                <Text>우리 가족</Text>
            </AuthSettingsBlock>
        </SafeAreaView>
    );
};
