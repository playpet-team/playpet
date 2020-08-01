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
import PlaypetDialog from '../components/PlaypetDialog';
import { createUserCollection } from '../callable';

const currentUser = () => auth().currentUser;

export default function AuthScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const [overAgeAgree, setOverAgeAgree] = useState(false);
    const [termsOfUseAgree, setTermsOfUseAgree] = useState(false);
    const [personalCollectAgree, setPersonalCollectAgree] = useState(false);
    const [marketingAgree, setMarketingAgree] = useState(false);

    const handleAllAgree = () => {
        setOverAgeAgree(true);
        setTermsOfUseAgree(true);
        setPersonalCollectAgree(true);
        setMarketingAgree(true);
    };

    const { isLogged } = useSelector((state: RootState) => state.auth);
    const { getUidByThirdPartySignIn } = useInitializeSignIn();

    const dispatch = useDispatch();

    const allAgreeTarms = useMemo(() => {
        return overAgeAgree && termsOfUseAgree && personalCollectAgree;
    }, [overAgeAgree, termsOfUseAgree, personalCollectAgree]);

    console.log("allAgreeTarms-----", allAgreeTarms);

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

    const hanbleSubmitAgreeTerms = async () => {
        const user = currentUser();
        if (!user) {
            return;
        }
        const uid = user.uid;
        updateUserTerms(uid, {
            overAgeAgree,
            termsOfUseAgree,
            personalCollectAgree,
            marketingAgree,
        });
        setModalVisible(false);
        // const res = await createUserCollection({
        //     uid,
        //     method,
        // });

    };

    const navigation = useNavigation();
    return (
        <SafeAreaView>
            <AuthBlock>
                <Text>우리 가족</Text>
                <TouchableOpacity
                    onPress={() => navigation.push('AuthSettings')}
                >
                    <Text>oeuth</Text>
                </TouchableOpacity>

                {isLogged ?
                    <TouchableOpacity
                        onPress={() => signOut(signEnum.GOOGLE)}
                    >
                        <Text>로그아웃</Text>
                    </TouchableOpacity>
                    :
                    <>
                        <GoogleSigninButton
                            style={{ width: 192, height: 48 }}
                            size={GoogleSigninButton.Size.Wide}
                            color={GoogleSigninButton.Color.Dark}
                            onPress={() => handleSignIn(signEnum.GOOGLE)}
                        />
                        <AppleButton
                            buttonStyle={AppleButton.Style.WHITE}
                            buttonType={AppleButton.Type.SIGN_IN}
                            style={{
                                width: 192,
                                height: 48,
                            }}
                            onPress={() => handleSignIn(signEnum.APPLE)}
                        />
                    </>
                }

            </AuthBlock>
            <PlaypetDialog
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            >
                <Text>회원가입을 추카합니다</Text>
                <AllTermsAgree onPress={handleAllAgree}>
                    <Text>{}</Text><Text>약관에 모두 동의</Text>
                </AllTermsAgree>
                <TermsAgree onPress={() => setOverAgeAgree(!overAgeAgree)}>
                    <Text>{overAgeAgree ? 'checked' : 'none'}</Text><Text>만 14세 이상입니다</Text>
                </TermsAgree>
                <TermsAgree onPress={() => setTermsOfUseAgree(!termsOfUseAgree)}>
                    <Text>{termsOfUseAgree ? 'checked' : 'none'}</Text><Text>서비스 이용약관에 동의</Text>
                </TermsAgree>
                <TermsAgree onPress={() => setPersonalCollectAgree(!personalCollectAgree)}>
                    <Text>{personalCollectAgree ? 'checked' : 'none'}</Text><Text>개인정보 수집 이용에 동의</Text>
                </TermsAgree>
                <TermsAgree onPress={() => setMarketingAgree(!marketingAgree)}>
                    <Text>{marketingAgree ? 'checked' : 'none'}</Text><Text>홍보 및 마케팅 이용에 동의</Text>
                </TermsAgree>
                <SubmitSignIn onPress={() => hanbleSubmitAgreeTerms()} disabled={!allAgreeTarms}>
                    <Text>확인</Text>
                </SubmitSignIn>
            </PlaypetDialog>
        </SafeAreaView>
    );
};

const AllTermsAgree = styled.TouchableOpacity``;

const TermsAgree = styled.TouchableOpacity`
`;

const SubmitSignIn = styled.TouchableOpacity`
    background-color: blue;
`;
const AuthBlock = styled.View`
    display: flex;
`;