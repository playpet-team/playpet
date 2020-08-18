import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components/native';
import { useDispatch } from 'react-redux';
import { signInCredential } from '../../utils';
import { checkIsExistUser, CheckUser, currentUser } from '../../utils';
import initializeSignIn from '../../utils/auth/initializeSignIn';
import { SignType } from '../../models';
import { createUserCall } from '../../callable';
import { authActions } from '../../store/authReducer';
import Constants from 'expo-constants';
import useLoadingIndicator from '../../hooks/useLoadingIndicator';
import Toast, { ToastParams } from '../../components/Toast';
import { useNavigation } from '@react-navigation/native';

export default function SocialSignIn() {
    const { loading, setLoading, Indicator } = useLoadingIndicator();
    const [method, setMethod] = useState(SignType.None);
    const [signInSuccess, setSignInSuccess] = useState(false);
    const [toastContent, setToastContent] = useState<ToastParams>({
        visible: false,
        title: '',
        description: '',
        image: '',
    });
    const { credential, getUidByThirdPartySignIn } = initializeSignIn({ toastContent, setToastContent });
    const dispatch = useDispatch();
    const navigation = useNavigation();

    useEffect(() => {
        if (signInSuccess) {
            navigation.navigate('AppLoginAgreeTerms');
        }
    }, [signInSuccess]);

    useEffect(() => {
        async function signIn() {
            if (!credential) {
                return;
            }
            try {
                await signInCredential(credential);
                await checkUser();
                setSignInSuccess(true);

            } catch (error) {
                if (error.code != "auth/account-exists-with-different-credential") {
                    setToastContent({
                        ...toastContent,
                        visible: true,
                        title: '인증 정보를 받아오는 작업을 실패했습니다',
                    });
                } else {
                    setToastContent({
                        ...toastContent,
                        visible: true,
                        title: '다른 로그인 방법으로 회원가입을 완료한 계정이 있습니다.',
                    });
                }
            }
        }
        signIn();
    }, [credential]);

    const checkUser = async () => {
        const user = currentUser();
        if (!user) {
            setToastContent({
                ...toastContent,
                visible: true,
                title: '인증 정보를 받아오는 작업을 실패했습니다',
            });
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
    };

    const handleSignIn = useCallback(async (method: SignType) => {
        try {
            setLoading(true);
            setMethod(method);
            await getUidByThirdPartySignIn(method);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, [dispatch]);

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