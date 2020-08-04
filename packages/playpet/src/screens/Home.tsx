import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from '@emotion/native';
import { useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { authActions } from '../store/authReducer';
import PlaypetDialog from '../components/PlaypetDialog';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { updateUserLastLogin, getUser } from '../utils';
import usePermission, { permissionType } from '../hooks/usePermission';

const HomeBlock = styled.View`
`;

export default function Home() {
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);
    const [allowPermission] = usePermission({ type: permissionType.NOTIFICATIONS });
    console.log("allowPermission------", allowPermission);
    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    const onAuthStateChanged = async (user: any) => {
        if (user) {
            dispatch(authActions.setUser(await getUser(user.uid)));
            updateUserLastLogin(user.uid);
            dispatch(authActions.signIn());
        } else {
            dispatch(authActions.signOut());
        }
    }

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
