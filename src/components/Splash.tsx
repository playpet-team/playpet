import React from 'react';
import styled from 'styled-components/native';

export default function Splash() {
    return (
        <SplashBlock>
            {/* <ImageBlock source={require('../../assets/splash/splash.png')} /> */}
        </SplashBlock>
    );
};

const SplashBlock = styled.View`
    flex: 1;
`;
