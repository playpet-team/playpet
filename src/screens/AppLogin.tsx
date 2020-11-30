import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import SocialSignIn from './AuthScreen/SocialSignIn';
import { useSelector } from 'react-redux';
import { RootState } from '../store/rootReducers';
import { useNavigation } from '@react-navigation/native';
import analytics from '@react-native-firebase/analytics';
import { Video } from 'expo-av';
import { deviceSize } from '../utils';
import { Text } from '../styles';
import Logo from '../components/Logo';

const DEVICE_WIDTH = deviceSize().width
const DEVICE_HEIGHT = deviceSize().height
const videoUrl = 'https://firebasestorage.googleapis.com/v0/b/playpet-production.appspot.com/o/assets%2Fvideos%2Fapp_login_c.mp4?alt=media&token=b9aad0b6-9001-433d-98f1-e93085a6d0bf'
export default function AppLogin() {
    const {
        completeLoginType,
        method,
    } = useSelector((state: RootState) => state.signIn)
    const navigation = useNavigation()

    useEffect(() => {
        if (completeLoginType === '') {
            return
        }

        if (completeLoginType === 'signUp') {
            analytics().logSignUp({ method })
        }
        navigation.navigate('Home')
        
    }, [completeLoginType])

    return (
        <AppLoginBlock>
            {/* <LinearGradientBlock
                colors={['#F52053', '#FF5A5A']}
                start={[0, 0]}
                end={[1, 1]}
            /> */}
            <BackgroundVideo>
                <Video
                    isMuted
                    shouldPlay
                    source={{ uri: videoUrl }}
                    isLooping={true}
                    resizeMode={Video.RESIZE_MODE_COVER}
                    style={{
                        width: DEVICE_WIDTH,
                        height: '100%',
                    }}
                />
                <AnimatedOverlayBackground />
            </BackgroundVideo>
            <MainSection>
                <MainTitleBlock>
                    {/* <Logo /> */}
                    <Text
                        color="#fff"
                        bold
                        size={24}
                    >
                        반려동물 사료관리 필수앱
                    </Text>
                </MainTitleBlock>
                <SigninBlock>
                    <SocialSignIn />
                </SigninBlock>
            </MainSection>
            
        </AppLoginBlock>
    )
};

const AppLoginBlock = styled.View`
    flex: 1;
`;

const MainSection = styled.View`
    position: absolute;
    z-index: 3;
    display: flex;
    width: 100%;
    height: 100%;
`

const BackgroundVideo = styled.View`
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
`

const AnimatedOverlayBackground = styled.View`
    position: absolute;
    top: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
`

const MainTitleBlock = styled.View`
    align-items: center;
    justify-content: center;
    flex: 3;
`;

const SigninBlock = styled.View`
    flex: 1;
`;
