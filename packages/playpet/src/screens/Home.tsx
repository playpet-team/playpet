import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import SignUpAgreeTermsModal from './AuthScreen/SignUpAgreeTermsModal';
import { getUserTerms, currentUser } from '../utils';
import useFirebaseMessage from '../hooks/useFirebaseMessage';

export default function Home() {
    const [modalVisible, setModalVisible] = useState(false);
    useFirebaseMessage();

    useEffect(() => {
        loadTerms();

        async function loadTerms() {
            const user = currentUser();
            if (user && user.uid) {
                setModalVisible(!await getUserTerms(user.uid));
            }
        }
    }, []);

    return (
        <SafeAreaView>
            <HomeBlock>
                <Text>aoeu홈</Text>
            </HomeBlock>
            <SignUpAgreeTermsModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
        </SafeAreaView>
    );
};

const HomeBlock = styled.View``;