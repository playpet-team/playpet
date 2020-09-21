import { useTheme } from "@react-navigation/native"
import * as Sentry from "@sentry/react-native"
import React, { useCallback, useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { View } from "react-native"
import Postcode, { OnCompleteParams } from 'react-native-daum-postcode'
import { Input } from "react-native-elements"
import { TouchableOpacity } from "react-native-gesture-handler"
import Modal from "react-native-modal"
import styled from "styled-components/native"
import Toast, { ToastParams } from '../../components/Toast'
import useLoadingIndicator from "../../hooks/useLoadingIndicator"
import useShippingDestination, { ShippingInformation } from "../../hooks/useShippingDestination"
import { Text } from "../../styles"
import { currentUser, updateUserShippingDestination } from "../../utils"

function ShippingDestinationSetting() {
    const theme = useTheme()
    const { Indicator, loading, setLoading } = useLoadingIndicator()
    const { shippingData } = useShippingDestination()
    const [visible, setVisible] = useState(false)
    const [address, setAddress] = useState<Omit<ShippingInformation, 'createdAt' | 'updatedAt' | 'uid'>>({
        shippingLocation: '',
        shippingAdditionalAddress: '',
        shippingPhonenumber: '',
        shippingUsername: '',
    })
    const { control, handleSubmit, errors } = useForm()
    const [toastContent, setToastContent] = useState<ToastParams>({
        visible: false,
        title: '',
        description: '',
        image: '',
    })

    const user = currentUser()
    if (!user) {
        return (
            <ShippingDestinationSettingBlock>
                <Text>로그인이 필요합니다</Text>
            </ShippingDestinationSettingBlock>
        )
    }

    useEffect(() => {
        if (shippingData === null) {
            setLoading(true)
            return
        }
        setLoading(false)
        if (shippingData.length) {
            const { shippingLocation, shippingAdditionalAddress, shippingPhonenumber, shippingUsername, } = shippingData[0]
            setAddress({
                shippingLocation, shippingAdditionalAddress, shippingPhonenumber, shippingUsername
            })
        }
    }, [shippingData])

    const onSubmit = useCallback(async (data: any) => {
        setLoading(true)
        try {
            await updateUserShippingDestination(user.uid, {
                ...data,
                shippingLocation: address.shippingLocation,
            })
        } catch (e) {
            Sentry.captureException(e)
        } finally {
            setToastContent({
                visible: true,
                title: '저장이 완료되었습니다',
            })
            setLoading(false)
        }
    }, [setLoading, setToastContent])

    const handleSelected = useCallback((data: OnCompleteParams) => {
        const { roadAddress, jibunAddress } = data
        setAddress({
            ...address,
            shippingLocation: roadAddress || jibunAddress
        })
        setVisible(false)
    }, [setAddress, setVisible])

    return (
        <ShippingDestinationSettingBlock>
            {loading && <Indicator />}
            {toastContent.visible &&
                <Toast
                    title={toastContent.title}
                    setToastContent={setToastContent}
                />
            }
            {!loading && !visible &&
                <DestinationInformation>
                    <InformationBlock>
                        <Controller
                            control={control}
                            render={({ value, onChange }) => (
                                <Input
                                    label="받는분"
                                    onChangeText={(value: string) => onChange(value)}
                                    value={value}
                                    maxLength={12}
                                    errorMessage={errors.shippingUsername ? '입력해주세요' : ''}
                                    placeholder="제품을 받아주시는 분을 입력해주세요"
                                    inputStyle={{
                                        fontSize: 14,
                                    }}
                                />
                            )}
                            name="shippingUsername"
                            rules={{ required: true, minLength: 1, maxLength: 12, }}
                            defaultValue={address.shippingUsername}
                        />
                    </InformationBlock>
                    <InformationBlock>
                        <Controller
                            control={control}
                            render={({ value, onChange }) => (
                                <Input
                                    label="연락처"
                                    onChangeText={(value: string) => onChange(value)}
                                    value={value}
                                    keyboardType="number-pad"
                                    maxLength={11}
                                    errorMessage={errors.shippingPhonenumber ? '입력해주세요' : ''}
                                    placeholder="연락 가능한 번호를 입력해주세요"
                                    inputStyle={{
                                        fontSize: 14,
                                    }}
                                />
                            )}
                            name="shippingPhonenumber"
                            rules={{ required: true, minLength: 11, maxLength: 11, }}
                            defaultValue={address.shippingPhonenumber}
                        />
                    </InformationBlock>
                    <InformationBlock>
                        <TouchableOpacity
                            onPress={() => setVisible(true)}
                        >
                            <Input
                                disabled={true}
                                defaultValue={address.shippingLocation}
                                label="주소"
                                inputStyle={{
                                    fontSize: 14,
                                }}
                            />
                        </TouchableOpacity>
                    </InformationBlock>
                    <InformationBlock>
                        <Controller
                            control={control}
                            render={({ value, onChange }) => (
                                <Input
                                    label="상세주소"
                                    onChangeText={(value: string) => onChange(value)}
                                    value={value}
                                    maxLength={24}
                                    inputStyle={{
                                        fontSize: 14,
                                    }}
                                    placeholder="아파트, 호수 등 상세주소를 입력해주세요"
                                />
                            )}
                            name="shippingAdditionalAddress"
                            rules={{ required: false }}
                            defaultValue={address.shippingAdditionalAddress}
                        />
                    </InformationBlock>
                </DestinationInformation>
            }
            {!visible &&
                <SaveDestination onPress={handleSubmit(onSubmit)} backgroundColor={theme.colors.primary}>
                    <Text bold color="#fff" size={16}>저장</Text>
                </SaveDestination>
            }
            <Modal
                isVisible={visible}
                useNativeDriver={true}
                hideModalContentWhileAnimating={true}
                backdropColor="black"
                onBackdropPress={() => setVisible(false)}
            >
                <View
                    style={{
                        height: 600,
                        maxHeight: '70%',
                    }}
                >
                    <Postcode
                        style={{ flex: 1 }}
                        onSelected={handleSelected}
                        onError={(error) => console.error('err', error)}
                    />
                </View>
            </Modal>
        </ShippingDestinationSettingBlock>
    )
}

const ShippingDestinationSettingBlock = styled.View`
    flex: 1;
    padding: 24px;
`
const DestinationInformation = styled.View`
    flex: 1;
    flex-direction: column;
`
const InformationBlock = styled.View`
    margin-top: 8px;
`

const SaveDestination = styled.TouchableOpacity<{ backgroundColor: string }>`
    padding: 16px;
    border-radius: 4px;
    align-items: center;
    justify-content: center;
    background-color: ${({ backgroundColor }) => backgroundColor};
`
export default ShippingDestinationSetting
