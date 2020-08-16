import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import SignUpAgreeTermsModal from './AuthScreen/SignUpAgreeTermsModal';
import { getUserTerms, currentUser } from '../utils';
import { DividerBlock, ListBlock } from '../styles';
import useFirebaseMessage from '../hooks/useFirebaseMessage';
import useRollingBanner from '../hooks/useRollingBanner';
import ButtonGroups from '../components/ButtonGroups';
import { ScrollView } from 'react-native-gesture-handler';
import { Layout } from '../styles';
import Logo from '../components/Logo';
import { View, Image, Text } from 'react-native';
import ProductListItem from '../components/ProductListItem';

export default function Home() {
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
    console.log("RenderBanner------", renderBanner);

    return (
        <SafeAreaViewBlock>
            <HomeBlock>
                <Logo />
                <DividerBlock marginTop={24} />
            </HomeBlock>
            <ScrollView>
                <Layout alignItems='center'>
                    {renderBanner && renderBanner()}
                    {/* <ButtonGroups buttons={['인기', '최신']} /> */}
                </Layout>
                <DividerBlock marginTop={24} />
                <ListBlock>
                    <ProductListItem
                        image="https://harimpetfood.com/web/product/medium/20200504/1507940a7e353e62dd418c12f6b70313.jpg"
                        title="#하림푸드"
                        description="개진지 [08/24생산] 가장맛있는시간30일 그레인프리 오븐베이크드 소고기 어덜트 500g"
                        price="17,000원"
                    />
                    <ProductListItem
                        image="https://harimpetfood.com/web/product/medium/20200504/1507940a7e353e62dd418c12f6b70313.jpg"
                        title="#몰리스펫샵"
                        description="노브랜드 강아지사료 15kg"
                        price="12,000원"
                    />
                    <ProductListItem
                        image="https://harimpetfood.com/web/product/medium/20200504/1507940a7e353e62dd418c12f6b70313.jpg"
                        title="#몰리스펫샵"
                        description="노브랜드 강아지사료 15kg"
                        price="12,000원"
                    />
                    <ProductListItem
                        image="https://harimpetfood.com/web/product/medium/20200504/1507940a7e353e62dd418c12f6b70313.jpg"
                        title="#몰리스펫샵"
                        description="노브랜드 강아지사료 15kg"
                        price="12,000원"
                    />
                    <ProductListItem
                        image="https://harimpetfood.com/web/product/medium/20200504/1507940a7e353e62dd418c12f6b70313.jpg"
                        title="#몰리스펫샵"
                        description="노브랜드 강아지사료 15kg"
                        price="12,000원"
                    />
                </ListBlock>

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
