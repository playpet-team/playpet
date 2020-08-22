import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import SignUpAgreeTermsModal from './AuthScreen/SignUpAgreeTermsModal';
import { getUserTerms, currentUser } from '../utils';
import { DividerBlock } from '../styles';
import useFirebaseMessage from '../hooks/useFirebaseMessage';
import useRollingBanner from '../hooks/useRollingBanner';
import { ScrollView } from 'react-native-gesture-handler';
import { Layout } from '../styles';
import Logo from '../components/Logo';
import ProductList from '../components/ProductList';
import useLanguage from '../hooks/useLanguage';

export default function Home() {
    useLanguage();
    const [modalVisible, setModalVisible] = useState(false);
    const { renderBanner } = useRollingBanner();
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
        <SafeAreaViewBlock>
            <HomeBlock>
                <Logo />
                <DividerBlock marginTop={24} />
            </HomeBlock>
            <ScrollView>
                <Layout alignItems='center'>
                    {renderBanner && renderBanner()}
                </Layout>
                <DividerBlock marginTop={24} />
                <ProductList />
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
