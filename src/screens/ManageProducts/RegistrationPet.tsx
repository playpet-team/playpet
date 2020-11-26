import { useNavigation } from "@react-navigation/native"
import React, { useCallback, useMemo, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import styled, { css, useTheme } from 'styled-components/native'
import useLoadingIndicator from '../../hooks/useLoadingIndicator'
import { authActions } from '../../store/authReducer'
import { Text } from "../../styles"
import { currentUser, updateUserPets } from '../../utils'
import { PetTypes } from "../../utils/product"
import { BackButton, NavigateBlock, NextButton } from "./RegistFeedBoard"
import PetNameSection from "./RegistrationPet/PetNameSection"
import PetTypeSection, { DefaultPetTypes } from "./RegistrationPet/PetTypeSection"
import PetAgeSection, { PetAge, DefaultPetAges } from './RegistrationPet/PetAgeSection'
import PetSizeSection, { PetSize, DefaultPetSizes } from './RegistrationPet/PetSizeSection'

export interface Terms {
    overAgeAgree: boolean
    termsOfUseAgree: boolean
    personalCollectAgree: boolean
    marketingAgree: boolean
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
    const [isErrorValidation, setErrorValidation] = useState(false)
    const [petName, setPetName] = useState<string>('')
    const [petType, setPetType] = useState<PetTypes>('')
    const [petKind, setPetKind] = useState<string>('')
    const [petSize, setPetSize] = useState<PetSize>('')
    const [petAge, setPetAge] = useState<PetAge>('')

    const themes = useTheme()
    const dispatch = useDispatch()

    const navigation = useNavigation()

    const handleUpdatePet = async () => {
        const user = currentUser()
        if (!user) {
            return
        }
        const activePetDocId = await updateUserPets(user.uid, {
            petName,
            petType,
            petKind,
            petSize,
            petAge,
        })

        if (activePetDocId) {
            dispatch(authActions.setActivePetDocId(activePetDocId))
        }
        navigation.goBack()
    }

    const findCurrentStepIndex = useMemo(() => {
        return PET_STEPS.findIndex(registStep => step === registStep) || 0
    }, [step])

    const findNextStepIndex = (handleType: 'NEXT' | 'PREV' = 'NEXT') => {
        const newIndex = handleType === 'NEXT' ? 1 : -1
        const nextStepIndex = findCurrentStepIndex + newIndex

        if (PET_STEPS[nextStepIndex] === 'PET_SIZE' && petType === 'CAT') {
            // 한번더 가 / 감 
            return nextStepIndex + newIndex
        }
        return nextStepIndex
    }

    const checkIsErrorValidation = () => {
        switch (step) {
            case 'PET_TYPE': {
                return petType === '' || !DefaultPetTypes.includes(petType)
            }
            case 'PET_NAME': {
                return petName === '' || petName.length > 16
            }
            case 'PET_AGE': {
                return petAge === '' || !DefaultPetAges .includes(petAge)
            }
            case 'PET_SIZE': {
                return petSize === '' || !DefaultPetSizes .includes(petSize)
            }
        }
    }

    const nextSteps = () => {
        const nextStepIndex = findNextStepIndex()
        const stepName = PET_STEPS[nextStepIndex]
        const isError = checkIsErrorValidation()

        setErrorValidation(isError)

        if (isError) {
            return
        }
        if (findLastStepName === PET_STEPS[findCurrentStepIndex]) {
            handleUpdatePet()
            return
        }

        if (stepName) {
            setStep(PET_STEPS[nextStepIndex])
            return
        }
        setStep(PET_STEPS[0])
        return
    }

    const prevSteps = useCallback(() => {
        const prevStepIndex = findNextStepIndex('PREV')
        if (prevStepIndex === -1) {
            navigation.goBack()
        }

        if (PET_STEPS[prevStepIndex]) {
            setStep(PET_STEPS[prevStepIndex])
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
                {step === 'PET_TYPE' && <PetTypeSection
                    isError={isErrorValidation}
                    petType={petType}
                    setPetType={setPetType}
                />}
                {step === 'PET_NAME' && <PetNameSection
                    isError={isErrorValidation}
                    petName={petName}
                    petType={petType}
                    setPetName={setPetName}
                    petKind={petKind}
                    setPetKind={setPetKind}
                />}
                {(step === 'PET_SIZE' && petType === 'DOG') && <PetSizeSection
                    isError={isErrorValidation}
                    petSize={petSize}
                    setPetSize={setPetSize}
                />}
                {step === 'PET_AGE' && <PetAgeSection
                    isError={isErrorValidation}
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

const RegistrationPetBlock = styled(SafeAreaView)`
    height: 100%;
    padding-vertical: 20px;
    flex-direction: column;
`

export const ItemBlock = styled.View``

export const ItemWrapper = styled.View`
    padding-horizontal: 30px;
    width: 100%;
    flex-direction: column;
    justify-content: center;
`

export const TypeItem = styled.TouchableOpacity<{ isActive: boolean; primary: string; }>`
    height: 100px;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    margin-top: 8px;
    border-width: 1px;
    border-color: ${({ theme }) => theme.colors.border};

    ${({ isActive }) => isActive && css`
        border-width: 2px;
        border-color: ${({ theme }) => theme.colors.primary};
        background-color: rgba(5, 89, 209, 0.1);
    `}
`
