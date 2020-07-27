import React from 'react';
import { Image, View } from 'react-native';
import styled from '@emotion/native';

const SplashBlock = styled.View`
    flex: 1;
`;
const ImageBlock = styled.Image`
    width: 100%;
    height: 100%;
`;

export default function Splash() {
    return (
        <SplashBlock>
            <ImageBlock source={require('../../assets/splash/splash.png')} />
        </SplashBlock>
    );
};
