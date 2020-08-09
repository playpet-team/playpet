import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import SignUpAgreeTermsModal from './AuthScreen/SignUpAgreeTermsModal';
import { getUserTerms, currentUser } from '../utils';
import useFirebaseMessage from '../hooks/useFirebaseMessage';
// import { haha } from '../callable';

export default function Home() {
    const [modalVisible, setModalVisible] = useState(false);
    useFirebaseMessage();

    useEffect(() => {
        loadTerms();
        async function loadTerms() {
            try {
                // const hahaha = await haha('https://firebasestorage.googleapis.com/v0/b/playpet-5b432.appspot.com/o/playground%2FO0KOlgCRnLcWsr1uJkBj0TAoa4Q2_1596606722?alt=media&token=ab02c79c-94ca-4340-85a4-c22e94b37125');
                // console.log('oentuhoenthuoe-haha---', hahaha);
            } catch (e) {
                console.log('e------e-------', e);
            }
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