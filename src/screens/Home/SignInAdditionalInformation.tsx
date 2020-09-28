import { useTheme } from "@react-navigation/native"
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from "react-hook-form"
import { Icon } from "react-native-elements"
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import styled, { css } from 'styled-components/native'
import PlaypetModal from '../../components/PlaypetModal'
import Toast, { ToastParams } from "../../components/Toast"
import useLoadingIndicator from '../../hooks/useLoadingIndicator'
import { authActions } from '../../store/authReducer'
import { DividerBlock, Text } from "../../styles"
import { currentUser, deviceSize, updateUserPets } from '../../utils'
import { PetTypes } from "../../utils/product"
import PetAdditionalType from './SignInAdditionalInformation/PetAdditionalType'
import PetFavorite from "./SignInAdditionalInformation/PetFavorite"
import PetKind from "./SignInAdditionalInformation/PetKind"
import PetName from "./SignInAdditionalInformation/PetName"
import PetType from "./SignInAdditionalInformation/PetType"
import WelcomeSign from "./SignInAdditionalInformation/WelcomeSign"

export interface Terms {
    overAgeAgree: boolean;
    termsOfUseAgree: boolean;
    personalCollectAgree: boolean;
    marketingAgree: boolean;
}

export type PetItems = '' | 'PetName' | 'PetType' | 'PetKind' | 'PetAdditionalType' | 'PetFavorite'

const DEVICE_WIDTH = deviceSize().width
// const DEVICE_HEIGHT = deviceSize().height

export default function SignInAdditionalInformation() {
    const { loading, Indicator } = useLoadingIndicator()
    const [visible, setVisible] = useState(true)

    const methods = useForm();

    const [openItem, setOpenItem] = useState<PetItems>('')

    const themes = useTheme()
    const dispatch = useDispatch()

    const [toastContent, setToastContent] = useState<ToastParams>({
        visible: false,
        title: '',
        description: '',
        image: '',
    })

    useEffect(() => {
        if (methods.getValues('petType') === '' && ['PetKind', 'PetAdditionalType'].includes(openItem)) {
            setToastContent({
                title: '반려동물을 먼저 선택해주세요',
                visible: true,
            })
            setOpenItem('')
        }
    }, [openItem])

    const handleLater = () => {
        setVisible(false)
    }

    const handleStep = async (data: any) => {
        console.log('data------', data)
        return
        await handleUpdatePet(data)
        setVisible(false)
    }
    
    const handleUpdatePet = async ({ petName, petType, petKind, size, favorite }: {
        petName: string; petType: string; petKind: string; size: string; favorite: string
    }) => {
        const user = currentUser()
        if (!user) {
            return
        }
        const activePetDocId = await updateUserPets(user.uid, {
            petName,
            petType,
            petKind,
            size,
            favorite,
        })

        if (activePetDocId) {
            dispatch(authActions.setActivePetDocId(activePetDocId))
        }
    }

    const getInformationStatus = (type: PetItems) => {
        let status: '' | 'invalid' | 'complete' | 'disabled' = ''
        // const getValue = methods.getValues(type)
        // const getError = methods.errors[type]
        // methods.errors
        switch (type) {
            case 'PetName': {
                status = methods.errors['petName'] ? 'invalid' : 'complete'
                break
            }
            case 'PetType': {
                // if (!petType.length) {
                //     break
                // }
                // status = valid.includes('petType') ? 'invalid' : 'complete'
                status = methods.errors['petType'] ? 'invalid' : 'complete'
                break
            }
            case 'PetKind': {
                if (['NOT_YET', 'ETC'].includes(methods.getValues('petType'))) {
                    status = 'disabled'
                    break
                }
                // if (!PetKind.length) {
                //     break
                // }
                // status = valid.includes('petType') ? 'invalid' : 'complete'
                status = methods.errors['petKind'] ? 'invalid' : 'complete'
                break
            }
            case 'PetAdditionalType': {
                if (!methods.getValues('size') && !methods.getValues('age')) {
                    break
                }
                // status = valid.includes('size') || valid.includes('age') ? 'invalid' : 'complete'
                status = methods.errors['size'] || methods.errors['age'] ? 'invalid' : 'complete'
                break
            }
            case 'PetFavorite': {
                if (!methods.getValues('favorite')) {
                    break
                }
                // status = valid.includes('favorite') ? 'invalid' : 'complete'
                status = methods.errors['favorite'] ? 'invalid' : 'complete'
                break
            }
            default: {
                break
            }
        }
        return status
    }

    const handleSetOpenItem = (item: PetItems) => {
        setOpenItem(openItem === item ? '' : item)
    }

    return (
        <PlaypetModal
            modalVisible={visible}
            isHideCloseButton={true}
            modalJustify="flex-end"
            containerStyle={{
                width: DEVICE_WIDTH,
                borderRadius: 16,
            }}
        >
            {loading && <Indicator />}
            {toastContent.visible && <Toast
                title={toastContent.title}
                setToastContent={setToastContent}
            />}
            
            <SignInAdditionalInformationBlock>
                <ScrollView>
                    <FormProvider {...methods} >
                        <WelcomeSign />
                        <DividerBlock marginTop={44} />

                        <HandleInformationItem
                            onPress={() => handleSetOpenItem('PetName')}
                            colors={{
                                border: themes.colors.border,
                                primary: themes.colors.primary
                            }}
                            status={getInformationStatus('PetName')}
                        >
                            <Text>{openItem !== 'PetName' && methods.getValues('petName') || '아이 이름을 알려주세요'}</Text>
                        </HandleInformationItem>
                        <PetName
                            control={methods.control}
                            errors={methods.errors}
                            openItem={openItem}
                        />

                        <DividerBlock marginBottom={8} />

                        <HandleInformationItem
                            onPress={() => handleSetOpenItem('PetType')}
                            colors={{
                                border: themes.colors.border,
                                primary: themes.colors.primary
                            }}
                            status={getInformationStatus('PetType')}
                        >
                            <Text>{openItem !== 'PetType' && methods.getValues('petType') || '어떤 반려동물 인가요?'}</Text>
                        </HandleInformationItem>
                        <PetType
                            control={methods.control}
                            openItem={openItem}
                        />

                        <DividerBlock marginBottom={8} />

                        <HandleInformationItem
                            onPress={() => handleSetOpenItem('PetKind')}
                            disabled={['NOT_YET', 'ETC'].includes(methods.getValues('petType'))}
                            colors={{
                                border: themes.colors.border,
                                primary: themes.colors.primary,
                            }}
                            status={getInformationStatus('PetKind')}
                        >
                            <Text>품종을 선택해주세요</Text>
                        </HandleInformationItem>
                        <PetKind
                            openItem={openItem}
                            control={methods.control}
                            petType={methods.getValues('petType') as PetTypes}
                        />

                        <DividerBlock marginBottom={8} />

                        <HandleInformationItem
                            onPress={() => handleSetOpenItem('PetAdditionalType')}
                            colors={{
                                border: themes.colors.border,
                                primary: themes.colors.primary
                            }}
                            status={getInformationStatus('PetAdditionalType')}
                        >
                            <Text>아이 사이즈와 나이를 알려주세요</Text>
                        </HandleInformationItem>
                        <PetAdditionalType
                            openItem={openItem}
                            control={methods.control}
                            petType={methods.getValues('petType') as PetTypes}
                        />
                        <DividerBlock marginBottom={8} />
                        <HandleInformationItem
                            onPress={() => handleSetOpenItem('PetFavorite')}
                            colors={{
                                border: themes.colors.border,
                                primary: themes.colors.primary
                            }}
                            status={getInformationStatus('PetFavorite')}
                        >
                            <Text>관심분야를 알려주세요</Text>
                        </HandleInformationItem>
                        <PetFavorite
                            openItem={openItem}
                            control={methods.control}
                        />
                        <BottomNavigation>
                            <InputLater onPress={handleLater}>
                                <Text>나중에 하기</Text>
                            </InputLater>
                            <SubmitButton onPress={methods.handleSubmit(handleStep)}>
                                <Icon
                                    name="keyboard-arrow-right"
                                    size={38}
                                    color={themes.colors.primary}
                                />
                            </SubmitButton>
                        </BottomNavigation>
                    </FormProvider>
                </ScrollView>
            </SignInAdditionalInformationBlock>
        </PlaypetModal>
    )
}

const BottomNavigation = styled.TouchableOpacity`
    margin-top: 32px;
    flex-direction: row;
    justify-content: space-between;
`

const InputLater = styled.TouchableOpacity`
    justify-content: flex-start;
`

const SubmitButton = styled.TouchableOpacity`
    justify-content: flex-end;
`

interface InformationItem {
    colors: {
        border: string
        primary: string
        background?: string
    }
    status: '' | 'invalid' | 'complete' | 'disabled'
}
const getBorderColorByStatus = ({ colors, status }: InformationItem) => {
    let color = colors.border
    switch (status) {
        case 'invalid': {
            color = '#ff0000'
            break
        }
        case 'complete': {
            color = colors.primary
            break
        }
        case 'disabled': {
            color = 'transparent'
            break
        }
        default: {
            color = colors.border
        }
    }
    return color
}

const HandleInformationItem = styled.TouchableOpacity<InformationItem>`
    border-radius: 8px;
    border-width: 1px;
    padding: 16px;
    border-color: ${({ colors, status }) => getBorderColorByStatus({ colors, status })};
    ${({ status }) => status === 'disabled' && css`
        background-color: #e3e3e3;
    `}
    
`

const SignInAdditionalInformationBlock = styled(SafeAreaView)`
    padding-vertical: 40px;
    flex-direction: column;
`

export const ItemBlock = styled.View<{ display: boolean }>`
    display: ${({ display }) => display ? 'flex' : 'none'};
`