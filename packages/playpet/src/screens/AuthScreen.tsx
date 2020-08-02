import React, { useState, useCallback, useMemo } from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from '@emotion/native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/rootReducers';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { authActions } from '../store/authReducer';
import { GoogleSigninButton } from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';

import { AppleButton } from '@invertase/react-native-apple-authentication';

import { signOut, checkIsExistUser, isExistsUserType, updateUserTerms } from '../utils';
import useInitializeSignIn from '../hooks/useSignIn';
import { signEnum } from '../models';
import { createUserCollection } from '../callable';
import SignUpAgreeTermsModal from './AuthScreen/SignUpAgreeTermsModal';
import SocialSignIn from './AuthScreen/SocialSignIn';
import ProfileSection from '../components/ProfileSection';

const currentUser = () => auth().currentUser;

export default function AuthScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const user = useSelector((state: RootState) => state.auth);
    const { getUidByThirdPartySignIn } = useInitializeSignIn();
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const handleSignIn = async (method: signEnum) => {
        await getUidByThirdPartySignIn(method);
        const user = currentUser();
        if (!user) {
            return;
        }
        const uid = user.uid;
        const result: isExistsUserType = await checkIsExistUser(uid);
        switch (result) {
            case isExistsUserType.empty: {
                createUserCollection({
                    uid,
                    method,
                });
                setModalVisible(true);
                break;
            }
            default:
            case isExistsUserType.exists: {
                dispatch(authActions.signIn());
                break;
            }
        }
    };

    return (
        <>
            <ProfileSection />
            <TouchableOpacity
                onPress={() => navigation.push('AuthSettings')}
            >
                <Text>oeuth</Text>
            </TouchableOpacity>
            <Text>로그인여부: {user.isLogged ? 'yes' : 'no'}</Text>
            <Text>네임: {user.username}</Text>

            {user.isLogged ?
                <TouchableOpacity
                    onPress={() => signOut(signEnum.GOOGLE)}
                >
                    <Text>로그아웃</Text>
                </TouchableOpacity>
                :
                <SocialSignIn setModalVisible={setModalVisible} />
            }

            <SignUpAgreeTermsModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
        </>
    );
};

const AuthBlock = styled.View`
`;