import { useNavigation } from "@react-navigation/native"
import React, { useCallback, useEffect, useMemo, useState } from 'react'
// import { FormProvider, useForm } from "react-hook-form"
// import { Icon } from "react-native-elements"
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import styled, { css, useTheme } from 'styled-components/native'
// import PlaypetModal from '../../components/PlaypetModal'
// import Toast, { ToastParams } from "../../components/Toast"
import useLoadingIndicator from '../../hooks/useLoadingIndicator'
import { authActions } from '../../store/authReducer'
import { Text } from "../../styles"
import { currentUser, updateUserPets } from '../../utils'
import { PetTypes } from "../../utils/product"
import { BackButton, NavigateBlock, NextButton } from "./RegistFeedBoard"
import PetAdditionalType, { PetSize, PetAge } from './RegistrationPet/PetAdditionalType'
// import PetFavorite from "./SignInAdditionalInformation/PetFavorite"
// import PetKind from "./RegistrationPet/PetKind"
import PetName from "./RegistrationPet/PetName"
import PetType from "./RegistrationPet/PetType"
import WelcomeSign from "./RegistrationPet/WelcomeSign"

export interface Terms {
    overAgeAgree: boolean
    termsOfUseAgree: boolean
    personalCollectAgree: boolean
    marketingAgree: boolean
}

interface PetInformationData {
    petName: string
    petType: string
    petKind: string
    size: string
    age: string
    favorite: string
}

type RegistPetStep = 'PET_TYPE' | 'PET_NAME' | 'PET_SIZE' | 'PET_AGE'
const PET_STEPS: ['PET_TYPE', 'PET_NAME', 'PET_SIZE', 'PET_AGE'] = [
    'PET_TYPE',
    'PET_NAME',
    'PET_SIZE',
    'PET_AGE',
]
export default function RegistrationPet() {
    const { loading, Indicator } = useLoadingIndicator()
    const [step, setStep] = useState<RegistPetStep>(PET_STEPS[0])
    const [petName, setPetName] = useState<string>('')
    const [petType, setPetType] = useState<PetTypes>('')
    const [petSize, setPetSize] = useState<PetSize>('')
    const [petAge, setPetAge] = useState<PetAge>('')

    // const methods = useForm()
    const themes = useTheme()
    const dispatch = useDispatch()

    // const [toastContent, setToastContent] = useState<ToastParams>({
    //     visible: false,
    //     title: '',
    //     description: '',
    //     image: '',
    // })

    const navigation = useNavigation()

    // const handleLater = () => navigation.goBack()

    // const handleSubmit = async (data: PetInformationData) => {
    //     await handleUpdatePet(data)
    //     handleLater()
    // }
    
    const handleUpdatePet = useCallback(async ({ petName, petType, petKind, size, age, favorite }: PetInformationData) => {
        const user = currentUser()
        if (!user) {
            return
        }
        const activePetDocId = await updateUserPets(user.uid, {
            petName,
            petType,
            // petKind,
            size,
            age,
            // favorite,
        })

        if (activePetDocId) {
            dispatch(authActions.setActivePetDocId(activePetDocId))
        }
    }, [dispatch])

    const findCurrentStepIndex = useMemo(() => {
        return PET_STEPS.findIndex(registStep => step === registStep) || 0
    }, [step])

    const nextSteps = useCallback(() => {
        const nextStepIndex = findCurrentStepIndex + 1
        console.log("nextStepIndex", nextStepIndex)
        if (PET_STEPS[nextStepIndex]) {
            setStep(PET_STEPS[nextStepIndex])
            return
        }
        setStep(PET_STEPS[0])
        return
    }, [step])

    const prevSteps = useCallback(() => {
        const nextStepIndex = findCurrentStepIndex - 1
        if (PET_STEPS[nextStepIndex]) {
            setStep(PET_STEPS[nextStepIndex])
            return
        }
        setStep(PET_STEPS[0])
        return
    }, [step])

    const findLastStepName: RegistPetStep = useMemo(() => PET_STEPS[PET_STEPS.length - 1], [])

    return (
        <RegistrationPetBlock>
            {loading && <Indicator />}
            <ScrollView>
                {step === 'PET_TYPE' && <PetType
                    petType={petType}
                    setPetType={setPetType}
                />}
                {step === 'PET_NAME' && <PetName
                    petName={petName}
                    setPetName={setPetName}
                />}
                {step === 'PET_SIZE' && <PetAdditionalType
                    petType={petType}
                    petSize={petSize}
                    setPetSize={setPetSize}
                    petAge={petAge}
                    setPetAge={setPetAge}
                />}
            </ScrollView>
            <NavigateBlock>
                <BackButton onPress={prevSteps}>
                    <Text
                        color={themes.colors.border}
                        size={16}
                        bold
                    >
                        이전
                    </Text>
                </BackButton>
                <NextButton onPress={nextSteps}>
                    <Text
                        color={themes.colors.background}
                        size={16}
                        bold
                    >
                        {step === findLastStepName ? '등록' : '다음'}
                    </Text>
                </NextButton>
            </NavigateBlock>
        </RegistrationPetBlock>
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
    margin-top: 8px;
    border-radius: 8px;
    border-width: 1px;
    padding: 16px;
    border-color: ${({ colors, status }) => getBorderColorByStatus({ colors, status })};
    ${({ status }) => status === 'disabled' && css`
        background-color: #e3e3e3;
    `}
    
`

const RegistrationPetBlock = styled(SafeAreaView)`
    height: 100%;
    padding-vertical: 20px;
    flex-direction: column;
`

const StepNavigator = styled.View`
    justify-content: space-between;
    padding: 16px;
    flex-direction: row;
`

export const ItemBlock = styled.View``