import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
// import { useSelector } from 'react-redux';
// import { RootState } from '../store/rootReducers';

import SignUpAgreeTermsModal from './AuthScreen/SignUpAgreeTermsModal';
// import SocialSignIn from './AuthScreen/SocialSignIn';
import ProfileSection from '../components/ProfileSection';
import MyCards from '../components/MyCards';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import ButtonGroups from '../components/ButtonGroups';
import { Layout } from '../styles';

export enum ItemList {
    MEDIA,
    ITEM,
}
export default function AuthScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const [listType, setListType] = useState(ItemList.MEDIA);
    // const navigation = useNavigation();

    return (
        <ScrollView>
            <ProfileSection />
            <Layout alignItems='center'>
                <ButtonGroups
                    onSelect={setListType}
                    buttons={['영상', '아이템']}
                    containerStyle={{
                        width: '100%',
                    }}
                />
            </Layout>
            <MyCards
                listType={listType}
            />
            <SignUpAgreeTermsModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
        </ScrollView>
    );
};

const AuthBlock = styled.View`
`;

const Hamburger = styled(Icon)`
    padding: 8px;
`;