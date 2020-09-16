import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Input } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import ButtonGroups from "../../components/ButtonGroups";
import PlaypetModal from "../../components/PlaypetModal";
import { Text } from "../../styles";

function PaymentSetting() {
    const theme = useTheme()
    const [visible, setVisible] = useState(false)
    const { control, handleSubmit, errors } = useForm();
    const onSubmit = (data: any) => {
        console.log('data------', data)
    }

    return (
        <PaymentSettingBlock>
            <Title>입력된 결제 정보가 없습니다</Title>
            <AddCardBlock>
                <AddCard onPress={() => setVisible(true)}>
                    <Text>카드 추가하기</Text>
                </AddCard>
            </AddCardBlock>
            <PlaypetModal
                modalVisible={visible}
                setModalVisible={setVisible}
                isHideCloseButton={false}
                header="카드 등록"
            >
                <InputCardType>
                    <Controller
                        control={control}
                        render={({ value, onChange }) => (
                            <ButtonGroups
                                buttons={['개인', '법인']}
                                onSelect={onChange}
                            />
                        )}
                        name="cardType"
                        rules={{ required: true }}
                        defaultValue=""
                    />
                </InputCardType>
                <Text>카드번호</Text>
                <InputCardNumber>
                    <Controller
                        control={control}
                        render={({ onChange, value }) => (
                            <Input
                                onChangeText={(value: string) => onChange(value)}
                                keyboardType="number-pad"
                                value={value}
                                maxLength={16}
                                placeholder="- 없이 16자리를 입력해주세요"
                                errorMessage={errors.cardNum ? '카드번호를 입력해주세요' : ''}
                                containerStyle={{
                                    flex: 1,
                                }}
                            />
                        )}
                        name="cardNum"
                        rules={{ required: true, minLength: 16, maxLength: 16, }}
                    />
                </InputCardNumber>
                
                <Text>유효기간</Text>
                <InputCardExpire>
                    {['MM', 'YY'].map(date => (
                        <Controller
                            key={date}
                            control={control}
                            render={({ onChange, value }) => (
                                <Input
                                    onChangeText={(value: string) => onChange(value)}
                                    keyboardType="number-pad"
                                    value={value}
                                    maxLength={2}
                                    placeholder={date}
                                    errorMessage={(errors['cardExp-MM'] || errors['cardExp-YY']) ? '2자리를 입력해주세요' : ''}
                                    containerStyle={{
                                        flex: 1,
                                    }}
                                />
                            )}
                            name={`cardExp-${date}`}
                            rules={{ required: true, maxLength: 2, minLength: 2, }}
                            defaultValue=""
                        />
                    ))}
                </InputCardExpire>
                <Text>생년월일</Text>
                <Controller
                    control={control}
                    render={({ onChange, value }) => (
                        <Input
                            onChangeText={(value: string) => onChange(value)}
                            keyboardType="number-pad"
                            value={value}
                            maxLength={6}
                            placeholder="870919"
                            errorMessage={errors.cardBirth ? '생년월일을 입력해주세요' : ''}
                            containerStyle={{
                            }}
                        />
                    )}
                    name="cardBirth"
                    rules={{ required: true }}
                    defaultValue=""
                />
                <Text>비밀번호</Text>
                <Controller
                    control={control}
                    render={({ onChange, value }) => (
                        <Input
                            onChangeText={(value: string) => onChange(value)}
                            keyboardType="number-pad"
                            value={value}
                            maxLength={2}
                            placeholder="**"
                            errorMessage={errors.cardBirth ? '앞2자리를 입력해주세요' : ''}
                            containerStyle={{
                            }}
                        />
                    )}
                    name="cardPassword"
                    rules={{ required: true }}
                    defaultValue=""
                />
                
                <TouchableOpacity onPress={handleSubmit(onSubmit)} style={{ marginBottom: 16, justifyContent: 'center', alignItems: 'center', }}>
                    <Text color={theme.colors.primary} size={16} bold>카드등록</Text>
                </TouchableOpacity>
                <Text size={12}>카드 정보는 결제 대행사 서버에 안전하게 암호화 되어 저장됩니다</Text>
            </PlaypetModal>
        </PaymentSettingBlock>
    )
}

const PaymentSettingBlock = styled.View`
  
`

const Title = styled(Text)``

const AddCardBlock = styled.View``
const AddCard = styled.TouchableOpacity``

const InputCardType = styled.View`
    flex-direction: row;
`
const InputCardNumber = styled.View`
    flex-direction: row;
`
const InputCardExpire = styled.View`
    flex-direction: row;
`

export default PaymentSetting
