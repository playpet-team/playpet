import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import SignUpAgreeTermsModal from './AuthScreen/SignUpAgreeTermsModal';
import { getUserTerms, currentUser } from '../utils';
import { DividerBlock } from '../styles';
import useFirebaseMessage from '../hooks/useFirebaseMessage';
import useRollingBanner from '../hooks/useRollingBanner';
import ButtonGroups from '../components/ButtonGroups';
import { ScrollView } from 'react-native-gesture-handler';
import { Layout } from '../styles';
import Logo from '../components/Logo';
// import { videoTest } from '../callable';

export default function Home() {
    const [modalVisible, setModalVisible] = useState(false);
    const { RenderBanner } = useRollingBanner();
    useFirebaseMessage();

    useEffect(() => {
        loadTerms();
        async function loadTerms() {
            // try {
            //     // const response = await videoTest('https://firebasestorage.googleapis.com/v0/b/playpet-5b432.appspot.com/o/playground%2FO0KOlgCRnLcWsr1uJkBj0TAoa4Q2_1596606722?alt=media&token=ab02c79c-94ca-4340-85a4-c22e94b37125');
            //     // console.log('oentuhoenthuoe-haha---', hahaha);
            // } catch (e) {
            //     console.log('e------e-------', e);
            // }
            const user = currentUser();
            if (user && user.uid) {
                setModalVisible(!await getUserTerms(user.uid));
            }
        }
    }, []);

    return (
        <SafeAreaViewBlock>
            <HomeBlock>
                <Logo />
                <DividerBlock marginTop={24} />
                {RenderBanner && RenderBanner}
            </HomeBlock>
            <ScrollView>
                <Layout alignItems='center'>
                    <ButtonGroups buttons={['인기', '최신']} />
                </Layout>
                <DummyCardView />
                <DummyCardView />
                <DummyCardView />
                <DummyCardView />
            </ScrollView>
            <SignUpAgreeTermsModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
        </SafeAreaViewBlock>
    );
};

const SafeAreaViewBlock = styled(SafeAreaView)`
    flex: 1;
`;

const HomeBlock = styled.View`
    align-items: center;
`;

const DummyCardView = styled.View`
    flex: 1;
    margin: 20px;
    height: 550px;
    background-color: #e9e9e9;
    border-radius: 8px;
    margin-bottom: 16px;
`;
