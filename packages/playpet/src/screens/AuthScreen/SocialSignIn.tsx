import React, { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components/native';
import { useDispatch } from 'react-redux';

import { checkIsExistUser, CheckUser, currentUser } from '../../utils';
import useInitializeSignIn from '../../hooks/useInitializeSignIn';
import { SignType } from '../../models';
import { createUserCall } from '../../callable';
import { authActions } from '../../store/authReducer';
import Constants from 'expo-constants';
import useLoadingIndicator from '../../hooks/useLoadingIndicator';
import Toast, { ToastParams } from '../../components/Toast';


export default function SocialSignIn() {
    const { loading, setLoading, Indicator } = useLoadingIndicator();
    const { getUidByThirdPartySignIn } = useInitializeSignIn();
    const [toastContent, setToastContent] = useState<ToastParams>({
        visible: false,
        title: '',
        description: '',
        image: '',
    });
    const dispatch = useDispatch();

    const handleSignIn = async (method: SignType) => {
        try {
            setLoading(true);
            await getUidByThirdPartySignIn(method, {
                toastContent,
                setToastContent
            });

            const user = currentUser();
            if (!user) {
                return;
            }
            const uid = user.uid;
            const result: CheckUser = await checkIsExistUser(uid);
            switch (result) {
                case CheckUser.Empty: {
                    createUserCall({
                        uid,
                        method,
                    });
                    break;
                }
                default:
                case CheckUser.Exists: {
                    dispatch(authActions.signIn());
                    break;
                }
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SigninButtonGroups>
            {loading && <Indicator />}
            {toastContent.visible &&
                <Toast
                    title={toastContent.title}
                    setToastContent={setToastContent}
                />
            }
            {Constants.platform?.ios &&
                <SigninButton onPress={() => handleSignIn(SignType.Apple)}>
                    <SigninText>애플로 시작하기</SigninText>
                </SigninButton>
            }
            <SigninButton onPress={() => handleSignIn(SignType.Facebook)}>
                <SigninText>페이스북으로 시작하기</SigninText>
            </SigninButton>
            <SigninButton onPress={() => handleSignIn(SignType.Kakao)}>
                <SigninText>카카오로 시작하기</SigninText>
            </SigninButton>
            <SigninButton onPress={() => handleSignIn(SignType.Google)}>
                <SigninText>구글로 시작하기</SigninText>
            </SigninButton>
        </SigninButtonGroups>
    );
};

const SigninButtonGroups = styled.View`
    flex: 1;
    flex-direction: column;
    width: 100%;
    padding-horizontal: 16px;
`;
const SigninButton = styled.TouchableOpacity`
    margin-top: 8px;
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.2);
    padding: 16px;
`;

const SigninText = styled.Text`
    margin-left: 16px;
    color: #fff;
`;