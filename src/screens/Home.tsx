import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import Logo from '../components/Logo';
// import ProductList from '../components/ProductList';
// import useFirebaseMessage from '../hooks/useFirebaseMessage';
import useInitialDynamicLink from '../hooks/useInitialDynamicLink';
import useLanguage from '../hooks/useLanguage';
import useRollingBanner from '../hooks/useRollingBanner';
import { DividerBlock, Layout } from '../styles';

export default function Home() {
    useLanguage()
    // useFirebaseMessage()
    useInitialDynamicLink()
    const { renderBanner } = useRollingBanner()
    const navigation = useNavigation()

    return (
        <SafeAreaViewBlock>
            {/* <Payment /> */}
            <HomeBlock>
                <Logo />
                <DividerBlock marginTop={24} />
            </HomeBlock>
            <ScrollView>
                <Layout alignItems='center'>
                    {renderBanner && renderBanner()}
                </Layout>
                <DividerBlock marginTop={24} />
                {/* <ProductList /> */}
                {/* <DummyCardView /> */}
            </ScrollView>
        </SafeAreaViewBlock>
    )
}

const SafeAreaViewBlock = styled(SafeAreaView)`
    flex: 1;
`

const HomeBlock = styled.View`
    align-items: center;
`

const DummyCardView = styled.View`
    flex: 1;
    margin: 20px;
    height: 550px;
    background-color: #e9e9e9;
    border-radius: 8px;
    margin-bottom: 16px;
`
