import React, { useState } from 'react';
import { Text } from 'react-native';
import styled from '@emotion/native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/rootReducers';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { signOut } from '../utils';
import { signEnum } from '../models';
import SignUpAgreeTermsModal from './AuthScreen/SignUpAgreeTermsModal';
import SocialSignIn from './AuthScreen/SocialSignIn';
import ProfileSection from '../components/ProfileSection';

export default function AuthScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const user = useSelector((state: RootState) => state.auth);

    return (
        <>
            <ProfileSection />
            <Text>로그인여부: {user.isLogged ? 'yes' : 'no'}</Text>
            <Text>네임: {user.username}</Text>

            {user.isLogged ?
                <TouchableOpacity
                    onPress={() => signOut(signEnum.GOOGLE)}
                >
                    <Text>로그아웃</Text>
                </TouchableOpacity>
                :
                <SocialSignIn setModalVisible={setModalVisible} />
            }

            <SignUpAgreeTermsModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
        </>
    );
};

const AuthBlock = styled.View`
`;