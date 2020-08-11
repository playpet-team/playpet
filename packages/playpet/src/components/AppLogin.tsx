import React, { useState } from 'react';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from 'react-native-elements';
import SocialSignIn from '../screens/AuthScreen/SocialSignIn';
import crashlytics from '@react-native-firebase/crashlytics';
import { Button } from 'react-native';
crashlytics().setCrashlyticsCollectionEnabled(true);
export default function AppLogin() {
    return (
        <AppLoginBlock>
            <LinearGradientBlock
                colors={['#F52053', '#FF5A5A']}
                start={[0, 0]}
                end={[1, 1]}
            />
            <MainTitle><Text style={{ color: '#fff' }}>누구든 반려동물을 사랑할수 있습니다</Text></MainTitle>
            <SocialSignIn />
            <Button
                title="oentuh"
                onPress={() => crashlytics().crash()}
            />
        </AppLoginBlock>
    )
};

const AppLoginBlock = styled.View`
    flex: 1;
`;

const LinearGradientBlock = styled(LinearGradient)`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 100%;
`;

const MainTitle = styled.View`
    align-items: center;
    justify-content: center;
    flex: 1.2;
`;