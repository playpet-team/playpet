import { AppleButton } from '@invertase/react-native-apple-authentication'
import * as Sentry from "@sentry/react-native"
import Constants from 'expo-constants'
import React, { useCallback, useState } from 'react'
import { Image } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
// import { useDispatch } from 'react-redux'
import styled from 'styled-components/native'
import PlaypetModal from '../../components/PlaypetModal'
import Toast, { ToastParams } from '../../components/Toast'
import { SignType } from '../../models'
import initializeSignIn from '../../utils/auth/initializeSignIn'
import AgreeTermsModal from '../Home/SignInAdditionalInformation/AgreeTermsModal'

export default function SocialSignIn() {
    const [showOtherMethods, setShowOtherMethods] = useState(false)
    const [toastContent, setToastContent] = useState<ToastParams>({
        visible: false,
        title: '',
        description: '',
        image: '',
    })
    const { getUidByThirdPartySignIn, isSignUp, loading, Indicator } = initializeSignIn({ toastContent, setToastContent })
    // const dispatch = useDispatch()

    const handleSignIn = useCallback(async (method: SignType) => {
        try {
            // setLoading(true)
            await getUidByThirdPartySignIn(method)
        } catch (e) {
            Sentry.captureException(e)
        } finally {
            // setLoading(false)
        }
    }, [])

    const handleEmailSignIn = useCallback(() => {
        console.log('email');
    }, [])

    console.log("---------isSignUps---------", isSignUp)

    const SigninWrapper = useCallback(({ modal }: { modal?: boolean }) => {
        return (
            <>
                <SigninButton onPress={() => handleSignIn(SignType.Kakao)}>
                    <Image
                        source={require('../../../assets/icons/kakao_icon.png')}
                        style={{
                            width: 20,
                            height: 20,
                        }}
                    />
                    <SigninText>
                        Kakao로 시작하기
                    </SigninText>
                </SigninButton>
                <SigninButton onPress={() => handleSignIn(SignType.Google)}>
                    <Image
                        source={require('../../../assets/icons/google_icon.png')}
                        style={{
                            width: 20,
                            height: 20,
                        }}
                    />
                    <SigninText>
                        Google로 계속하기
                    </SigninText>
                </SigninButton>
                {modal &&
                    <SigninButtonInModal onPress={() => handleSignIn(SignType.Facebook)}>
                        <Image
                            source={require('../../../assets/icons/facebook_icon.png')}
                            containerStyle={{
                                backgroundColor: '#4267B2',
                                borderRadius: 4,
                                marginRight: 2,
                            }}
                            style={{
                                width: 20,
                                height: 20,
                            }}
                        />
                        <SigninText>
                            Facebook으로 계속하기
                        </SigninText>
                    </SigninButtonInModal>
                }
                <SigninButton onPress={() => handleEmailSignIn(SignType.EMAIL)}>
                    <Image
                        source={require('../../../assets/icons/kakao_icon.png')}
                        style={{
                            width: 20,
                            height: 20,
                        }}
                    />
                    <SigninText>
                        이메일로 시작하기
                    </SigninText>
                </SigninButton>
                {modal && Constants.platform?.ios &&
                    <AppleButton
                        buttonStyle={AppleButton.Style.WHITE}
                        buttonType={AppleButton.Type.CONTINUE}
                        onPress={() => handleSignIn(SignType.Apple)}
                        style={{
                            marginTop: 8,
                            width: '100%', // You must specify a width
                            height: 48, // You must specify a height
                        }}
                    />
                }

            </>
        )
    }, [])

    return (
        <SigninButtonGroups>
            {loading && <Indicator />}
            {toastContent.visible &&
                <Toast
                    title={toastContent.title}
                    setToastContent={setToastContent}
                />
            }
            {Boolean(isSignUp) && <AgreeTermsModal />}
            <SigninWrapper />
            <TouchableOpacity onPress={() => setShowOtherMethods(!showOtherMethods)}>
                <SigninOtherMethodsText>다른 방법으로 로그인 하기</SigninOtherMethodsText>
            </TouchableOpacity>
            <PlaypetModal
                modalVisible={showOtherMethods}
                setModalVisible={() => setShowOtherMethods(false)}
            >
                <SigninWrapper modal={true} />
            </PlaypetModal>
            {/* <SigninButton onPress={() => handleSignIn(SignType.Naver)}>
                <SigninText>네이버로 시작하기</SigninText>
            </SigninButton> */}

        </SigninButtonGroups>
    )
}

const SigninButtonGroups = styled.View`
    flex-direction: column;
    width: 100%;
    padding-horizontal: 16px;
`
const SigninButton = styled.TouchableOpacity`
    flex-direction: row;
    margin-top: 8px;
    border-radius: 8px;
    background-color: #fff;
    padding: 16px;
    align-items: center;
    justify-content: center;
`

const SigninButtonInModal = styled(SigninButton)`
    margin-top: 0;
`

const SigninOtherMethodsText = styled.Text`
    margin-top: 16px;
    color: #fff;
    text-align: center;
`

const SigninText = styled.Text`
    font-size: 18px;
    font-weight: 600;
    margin-left: 4px;
    color: #000;
`
