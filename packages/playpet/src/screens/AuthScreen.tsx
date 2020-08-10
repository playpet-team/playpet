import React, { useState } from 'react';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/rootReducers';

import SignUpAgreeTermsModal from './Home/SignUpAgreeTermsModal';
import SocialSignIn from './AppLogin/SocialSignIn';
import ProfileSection from '../components/ProfileSection';

export default function AuthScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const user = useSelector((state: RootState) => state.auth);

    return (
        <>

            {user.isLogged ?
                <ProfileSection />
                :
                <SocialSignIn />
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