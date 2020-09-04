import React, { useState, useCallback, useEffect } from 'react'
import styled from 'styled-components/native'
import { useDispatch } from 'react-redux'
import initializeSignIn from '../../utils/auth/initializeSignIn'
import { SignType } from '../../models'
import Constants from 'expo-constants'
import useLoadingIndicator from '../../hooks/useLoadingIndicator'
import Toast, { ToastParams } from '../../components/Toast'

export default function SocialSignIn() {
    const [toastContent, setToastContent] = useState<ToastParams>({
        visible: false,
        title: '',
        description: '',
        image: '',
    })
    const { loading, setLoading, Indicator } = useLoadingIndicator()
    const { getUidByThirdPartySignIn } = initializeSignIn({ toastContent, setToastContent })
    const dispatch = useDispatch()

    const handleSignIn = useCallback(async (method: SignType) => {
        console.log('-1')
        try {
            setLoading(true)
            await getUidByThirdPartySignIn(method)
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }, [dispatch])

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
            {/* <SigninButton onPress={() => handleSignIn(SignType.Naver)}>
                <SigninText>네이버로 시작하기</SigninText>
            </SigninButton> */}
            <SigninButton onPress={() => handleSignIn(SignType.Kakao)}>
                <SigninText>카카오로 시작하기</SigninText>
            </SigninButton>
            <SigninButton onPress={() => handleSignIn(SignType.Google)}>
                <SigninText>구글로 시작하기</SigninText>
            </SigninButton>
        </SigninButtonGroups>
    )
}

const SigninButtonGroups = styled.View`
    flex-direction: column;
    width: 100%;
    padding-horizontal: 16px;
`
const SigninButton = styled.TouchableOpacity`
    margin-top: 8px;
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.2);
    padding: 16px;
`

const SigninText = styled.Text`
    margin-left: 16px;
    color: #fff;
`