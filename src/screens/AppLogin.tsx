import React, { useEffect, useRef } from 'react';
import styled from 'styled-components/native';
import SocialSignIn from './AuthScreen/SocialSignIn';
import { useSelector } from 'react-redux';
import { RootState } from '../store/rootReducers';
import { useNavigation } from '@react-navigation/native';
import analytics from '@react-native-firebase/analytics';
import Video from 'react-native-video';
import { deviceSize } from '../utils';
import { Text } from '../styles';
import Animated, { Easing, interpolate, Value } from 'react-native-reanimated'
import Transition from '../components/Transition';

const DEVICE_WIDTH = deviceSize().width
const videoUrl = 'https://firebasestorage.googleapis.com/v0/b/playpet-production.appspot.com/o/assets%2Fvideos%2Fapp_login_c.mp4?alt=media&token=b9aad0b6-9001-433d-98f1-e93085a6d0bf'
export default function AppLogin() {
    const {
        completeLoginType,
        method,
    } = useSelector((state: RootState) => state.signIn)
    const navigation = useNavigation()
    const bounceValue = useRef(new Value(0)).current
    const videoRef = useRef<any>(null)
    
    useEffect(() => {
            Animated.timing(
                bounceValue,
                {
                    toValue: 1,
                    duration: 750,
                    easing: Easing.inOut(Easing.ease)
                }
            ).start()
    }, [])

    useEffect(() => {
        if (completeLoginType === '') {
            return
        }
        
        if (completeLoginType === 'signUp') {
            analytics().logSignUp({ method })
        }
        console.log('home-----???????????---------', completeLoginType)
        navigation.navigate('Home')
    }, [completeLoginType])

    return (
        <AppLoginBlock>
            <BackgroundVideo
                style={{
                    opacity: interpolate(bounceValue, {
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                    }),
                }}
            >
                <Video
                    ref={videoRef}
                    source={{ uri: videoUrl }}
                    repeat
                    resizeMode="cover"
                    style={{
                        width: DEVICE_WIDTH,
                        height: '100%',
                    }}
                />
            </BackgroundVideo>
            <MainSection>
                <MainTitleBlock>
                    <Transition
                        type="fade-top"
                        duration={600}
                    >
                        <Text
                            color="#fff"
                            bold
                            size={24}
                        >
                            반려동물 사료관리 필수앱
                        </Text>
                    </Transition>
                </MainTitleBlock>
                <SigninBlock>
                    <Transition
                        type="fade-top"
                        duration={1150}
                    >
                        <SocialSignIn />
                    </Transition>
                </SigninBlock>
            </MainSection>
        </AppLoginBlock>
    )
};

const AppLoginBlock = styled.View`
    flex: 1;
    background-color: #111;
`;

const MainSection = styled.View`
    position: absolute;
    z-index: 3;
    display: flex;
    width: 100%;
    height: 100%;
`

const BackgroundVideo = styled(Animated.View)`
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: absolute;
    z-index: 1;
`

const AnimatedOverlayBackground = styled.View`
    position: absolute;
    top: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.35);
`

const MainTitleBlock = styled.View`
    align-items: center;
    justify-content: center;
    flex: 3;
`;

const SigninBlock = styled.View`
    flex: 1;
`;
