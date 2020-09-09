import { signInWithCustomToken, signOut, getUserAuthToken, currentUser } from './../utils/auth/index';
import { AsyncStorageCustomToken, putAsyncStorage } from './../utils/auth/initializeSignIn';
import AsyncStorage from '@react-native-community/async-storage';
import { useState, useEffect } from 'react';
import { Api } from '../api';

/*
    1. AsyncStorage 에서 customToken 을 꺼낸다.
    2. 서버에서 마지막으로 업데이트 했던 customToken 을 꺼낸다
    3. 두 토큰을 비교해서 동일한 토큰이면 서버에서 새로운 customToken 을 생성하고 서버에 업데이트 해준다
    4. 앱에서는 customToken을 AsyncStorage에 저장한다
    5. 새로운 customToken 으로 로그인을 시킨다.

    이들중 하나라도 옳지 않은경우 로그인이 풀림
*/
export default function useAutoLogin() {
    const [isLoadingComplete, setLoadingComplete] = useState(false)

    useEffect(() => {
        if (isLoadingComplete) {
            return
        }
        checkCustomToken()
        async function checkCustomToken() {
            try {
                const storageCustomToken = await AsyncStorage.getItem('customToken')
                if (storageCustomToken === null) {
                    signOutUser()
                    return
                }

                const getStorage: AsyncStorageCustomToken = JSON.parse(storageCustomToken);
                
                const user = currentUser()
                if (!user || !getStorage) {
                    signOutUser()
                    return
                }
                
                const userData = await getUserAuthToken(user.uid)
                if (!userData || (userData.customToken !== getStorage.customToken)) {
                    signOutUser()
                    return
                }
                
                const { data: { customToken } }: { data: { customToken: string }} = await Api.post('/auth/refreshtoken', { uid: user.uid })
                
                putAsyncStorage('customToken', {
                    email: getStorage.email,
                    provider: getStorage.provider,
                    customToken,
                })
                
                await signInWithCustomToken(customToken)
            } catch (e) {
                signOutUser()
            } finally {
                setLoadingComplete(true)
            }
        }
    }, [])

    return isLoadingComplete
}

const signOutUser = async () => {
    AsyncStorage.removeItem('customToken')
    await signOut()
}