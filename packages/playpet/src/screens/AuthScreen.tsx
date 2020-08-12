import React, { useState } from 'react';
import styled from 'styled-components/native';
// import { useSelector } from 'react-redux';
// import { RootState } from '../store/rootReducers';

import SignUpAgreeTermsModal from './AuthScreen/SignUpAgreeTermsModal';
// import SocialSignIn from './AuthScreen/SocialSignIn';
import ProfileSection from '../components/ProfileSection';
import MyCards from '../components/MyCards';
import { ScrollView } from 'react-native-gesture-handler';

export default function AuthScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    // const user = useSelector((state: RootState) => state.auth);

    return (
        <ScrollView>
            <ProfileSection />
            <MyCards />
            <SignUpAgreeTermsModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
        </ScrollView>
    );
};

const AuthBlock = styled.View`
`;