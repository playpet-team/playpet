import React, { useState } from 'react';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from 'react-native-elements';
import SocialSignIn from '../screens/AuthScreen/SocialSignIn';
import SignUpAgreeTermsModal from '../screens/AuthScreen/SignUpAgreeTermsModal';
import { CustomStackScreenProp } from '../navigation';

export default function AppLogin({ navigation }: CustomStackScreenProp<'AppLogin'>) {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <AppLoginBlock>
            <LinearGradient
                colors={['#F52053', '#FF5A5A']}
                start={[0, 0]}
                end={[1, 1]}
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    height: '100%'
                }}
            />
            <MainTitle><Text style={{ color: '#fff' }}>누구든 반려동물을 사랑할수 있습니다</Text></MainTitle>
            <SocialSignIn setModalVisible={setModalVisible} />
            <SignUpAgreeTermsModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
        </AppLoginBlock>
    )
};

const AppLoginBlock = styled.View`
    flex: 1;
`;

const MainTitle = styled.View`
    align-items: center;
    justify-content: center;
    flex: 1.2;
`;