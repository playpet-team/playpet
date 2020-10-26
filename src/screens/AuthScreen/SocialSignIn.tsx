import { AppleButton } from '@invertase/react-native-apple-authentication'
import * as Sentry from "@sentry/react-native"
import Constants from 'expo-constants'
import React, { useCallback, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Image, Input } from 'react-native-elements'
import { Text } from "../../styles";
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useTheme } from "@react-navigation/native";
// import { useDispatch } from 'react-redux'
import styled from 'styled-components/native'
import PlaypetModal from '../../components/PlaypetModal'
import Toast, { ToastParams } from '../../components/Toast'
import { SignType } from '../../models'
import initializeSignIn from '../../utils/auth/initializeSignIn'
import AgreeTermsModal from '../Home/SignInAdditionalInformation/AgreeTermsModal'

export default function SocialSignIn() {
    const { control, handleSubmit, errors } = useForm();
    const [showOtherMethods, setShowOtherMethods] = useState(false)
    const [showEmailForm, setShowEmailForm] = useState(false)
    const [toastContent, setToastContent] = useState<ToastParams>({
        visible: false,
        title: '',
        description: '',
        image: '',
    })
    const theme = useTheme()
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
        console.log('email')
        setShowOtherMethods(false)
        setTimeout(() => {
            setShowEmailForm(true)
        }, 600)
    }, [])

    const onSubmit = async (data: any) => {
        try {
            await getUidByThirdPartySignIn(SignType.Email, {
                email: data.email,
                password: data.password,
            })
        } catch (e) {
            Sentry.captureException(e)
        }
    }

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
                {modal && <SigninButton onPress={() => handleSignIn(SignType.Google)}>
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
                </SigninButton>}
                {modal && <SigninButton onPress={handleEmailSignIn}>
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
                </SigninButton>}
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

    console.log('showEmailForm---', showEmailForm)

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
            <PlaypetModal
                modalVisible={showEmailForm}
                setModalVisible={() => setShowEmailForm(false)}
            >
                <>
                    <InputEmailForm>
                        <Controller
                            control={control}
                            render={({ onChange, value }) => (
                                <Input
                                    onChangeText={(value: string) => onChange(value)}
                                    value={value}
                                    placeholder="이메일을 입력해주세요"
                                    errorMessage={errors.email ? '올바른 이메일 주소를 입력해주세요' : ''}
                                    containerStyle={{
                                        flex: 1,
                                    }}
                                />
                            )}
                            name="email"
                            defaultValue=""
                            rules={{ required: true, minLength: 4 }}
                        />
                    </InputEmailForm>
                    <InputEmailForm>
                        <Controller
                            control={control}
                            render={({ onChange, value }) => (
                                <Input
                                    onChangeText={(value: string) => onChange(value)}
                                    value={value}
                                    placeholder="8자리 이상 비밀번호를 입력해주세요"
                                    errorMessage={errors.password ? '8자 이상의 비밀번호를 입력해주세요' : ''}
                                    containerStyle={{
                                        flex: 1,
                                    }}
                                />
                            )}
                            name="password"
                            defaultValue=""
                            rules={{ required: true, minLength: 8 }}
                        />
                    </InputEmailForm>
                    <TouchableOpacity
                        onPress={handleSubmit(onSubmit)}
                        style={{ marginBottom: 16, justifyContent: 'center', alignItems: 'center', }}
                    >
                        <Text color={theme.colors.primary} size={16} bold>시작하기</Text>
                    </TouchableOpacity>
                </>
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

const InputEmailForm = styled.View`
    flex-direction: row;
`