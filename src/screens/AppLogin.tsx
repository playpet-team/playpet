import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, Button } from 'react-native-elements';
import SocialSignIn from './AuthScreen/SocialSignIn';
import { View, } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function AppLogin() {
    const navigation = useNavigation();

    return (
        <AppLoginBlock>
            <LinearGradientBlock
                colors={['#F52053', '#FF5A5A']}
                start={[0, 0]}
                end={[1, 1]}
            />
            <MainTitleBlock><Text>누구든 반려동물을 사랑할수 있습니다</Text></MainTitleBlock>
            <SigninBlock>
                <SocialSignIn />
                <LookAround>
                    <Button
                        title="돌아가기"
                        onPress={() => navigation.goBack()}
                        buttonStyle={{
                            backgroundColor: 'transparent',
                            justifyContent: 'flex-end',
                        }}
                        titleStyle={{
                            color: '#fff',
                            fontSize: 15,
                        }}
                    />
                </LookAround>
            </SigninBlock>
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

const MainTitleBlock = styled.View`
    align-items: center;
    justify-content: center;
    flex: 1.2;
`;

const SigninBlock = styled.View`
    flex: 1;
`;

const LookAround = styled.View`
    padding: 16px;
    margin: 16px;
`;