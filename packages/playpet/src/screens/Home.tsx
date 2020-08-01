import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from '@emotion/native';
import { useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { authActions } from '../store/authReducer';
import PlaypetDialog from '../components/PlaypetDialog';
import { TouchableOpacity } from 'react-native-gesture-handler';

const HomeBlock = styled.View`
    display: flex;
`;

export default function Home() {
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);
    function onAuthStateChanged(user: any) {
        if (user) {
            dispatch(authActions.signIn());
        } else {
            dispatch(authActions.signOut());
        }
    }

    // const { profileImage, isLogged } = useSelector((state: RootState) => state.auth);
    return (
        <SafeAreaView>
            <HomeBlock>
                <Text>홈</Text>
                <PlaypetDialog
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                >
                    <Text>내child용</Text>
                </PlaypetDialog>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Text>aoeutnh</Text>
                </TouchableOpacity>
            </HomeBlock>
        </SafeAreaView>
    );
};
