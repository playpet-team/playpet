import React, { Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import { GoogleSigninButton } from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';

import { AppleButton } from '@invertase/react-native-apple-authentication';

import { checkIsExistUser, isExistsUserType } from '../../utils';
import useInitializeSignIn from '../../hooks/useSignIn';
import { signEnum } from '../../models';
import { createUserCollection } from '../../callable';
import { authActions } from '../../store/authReducer';

const currentUser = () => auth().currentUser;

export default function SocialSignIn({ setModalVisible }: { setModalVisible: Dispatch<SetStateAction<boolean>> }) {
    const { getUidByThirdPartySignIn } = useInitializeSignIn();
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
    );
};
