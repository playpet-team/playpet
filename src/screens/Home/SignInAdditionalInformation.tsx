import { useTheme } from '@react-navigation/native'
import * as Sentry from "@sentry/react-native"
import React, { useState } from 'react'
import { Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import styled from 'styled-components/native'
import PlaypetModal from '../../components/PlaypetModal'
import useLoadingIndicator from '../../hooks/useLoadingIndicator'
import { authActions } from '../../store/authReducer'
import { currentUser, deviceSize, updateUserPets, updateUserTerms } from '../../utils'
import AgreeTermsModal from './SignInAdditionalInformation/AgreeTermsModal'
import CheckMyInformation from './SignInAdditionalInformation/CheckMyInformation'
import PetFavorite from './SignInAdditionalInformation/PetFavorite'
import PetName from './SignInAdditionalInformation/PetName'
import PetType, { DefaultSize, PET_TYPE } from './SignInAdditionalInformation/PetType'

// export const Step = {
//     PET_NAME: 0,
//     PET_TYPE: 1,
//     PET_FAVORITE: 2,
//     TERMS: 3,
// }
export type StepName = 'PET_NAME' | 'PET_TYPE' | 'PET_FAVORITE' | 'TERMS'
export enum Step {
    PET_NAME,
    PET_TYPE,
    PET_FAVORITE,
    CHECK_MY_INFORMATION,
    TERMS,
}
export interface TERMS {
    overAgeAgree: boolean;
    termsOfUseAgree: boolean;
    personalCollectAgree: boolean;
    marketingAgree: boolean;
}
const DEVICE_WIDTH = deviceSize().width
const DEVICE_HEIGHT = deviceSize().height
export default function SignInAdditionalInformation() {
    const { loading, setLoading, Indicator } = useLoadingIndicator()
    const [currentStep, setStep] = useState<Step>(Step.PET_NAME)
    const [valid, setValid] = useState(false)
    const [petName, setPetname] = useState('')
    const [petType, setPetType] = useState<string>(PET_TYPE.DOG)
    const [searchPetType, setSearchPetType] = useState('')
    const [size, setSize] = useState(DefaultSize[0])
    const [favorite, setFavorite] = useState('')
    const [terms, setTerms] = useState<TERMS>({
        overAgeAgree: false,
        termsOfUseAgree: false,
        personalCollectAgree: false,
        marketingAgree: false,
    })
    // const [completeTerm, setCompleteTerm] = useState(false)
    const themes = useTheme();
    const dispatch = useDispatch()

    const handleSingleTerm = (k: string, v: boolean) => setTerms({
        ...terms,
        [k]: v,
    })

    const handleStep = (type: 'back' | 'front') => {
        if (type === 'back') {
            if (currentStep === Step.PET_NAME) {
                return
            }
            setStep(currentStep - 1)
            return
        }
        
        const isValid = checkValid()
        setValid(isValid)
        if (!isValid) {
            setValid(true)
            return
        }
        
        if (type === 'front') {
            if (currentStep === Step.TERMS) {
                hanbleSubmitAgreeTerms()
                return
            }
            setStep(currentStep + 1)
        }
    }
    
    const checkValid = () => {
        switch (currentStep) {
            case Step.PET_NAME: {
                return Boolean(petName.length)
            }
            case Step.PET_TYPE: {
                return Boolean(petType && searchPetType.length && size)
            }
            case Step.PET_FAVORITE: {
                return Boolean(favorite.length)
            }
            case Step.CHECK_MY_INFORMATION: {
                return true
            }
            case Step.TERMS: {
                const { overAgeAgree, termsOfUseAgree, personalCollectAgree } = terms
                return Boolean(overAgeAgree && termsOfUseAgree && personalCollectAgree)
            }
            default: {
                return false
            }
        }
    }

    const hanbleSubmitAgreeTerms = async () => {
        const user = currentUser()
        if (!user) {
            return
        }
        const uid = user.uid
        const { overAgeAgree, termsOfUseAgree, personalCollectAgree, marketingAgree } = terms
        try {
            setLoading(true)
            await updateUserTerms(uid, {
                overAgeAgree,
                termsOfUseAgree,
                personalCollectAgree,
                marketingAgree,
            })
            
            const activePetDocId = await updateUserPets(uid, {
                petName,
                petType,
                searchPetType,
                size,
                favorite,
            })
            if (activePetDocId) {
                dispatch(authActions.setTerms({
                    overAgeAgree,
                    termsOfUseAgree,
                    personalCollectAgree,
                    marketingAgree,
                }))
                dispatch(authActions.setActivePetDocId(activePetDocId))
            }
        } catch (e) {
            Sentry.captureException(e)
        } finally {
            setLoading(false)
        }

    }


    return (
        <PlaypetModal
            modalVisible={true}
            isHideCloseButton={true}
            containerStyle={{
                height: DEVICE_HEIGHT,
                width: DEVICE_WIDTH,
            }}
        >
            {loading && <Indicator />}
            <SignInAdditionalInformationBlock>
                <PetName
                    currentStep={currentStep}
                    valid={valid}
                    petName={petName}
                    setPetname={setPetname}
                />
                <PetType
                    currentStep={currentStep}
                    valid={valid}
                    petType={petType}
                    setPetType={setPetType}
                    searchPetType={searchPetType}
                    setSearchPetType={setSearchPetType}
                    size={size}
                    setSize={setSize}
                />
                <PetFavorite
                    currentStep={currentStep}
                    valid={valid}
                    favorite={favorite}
                    setFavorite={setFavorite}
                />
                <CheckMyInformation
                    currentStep={currentStep}
                    petName={petName}
                    petType={petType}
                    searchPetType={searchPetType}
                    size={size}
                    favorite={favorite}
                />
                <AgreeTermsModal
                    terms={terms}
                    setTerms={setTerms}
                    handleSingleTerm={handleSingleTerm}
                    currentStep={currentStep}
                    valid={valid}
                />
                <StepNavigatorSection>
                    <TouchableOpacity
                        onPress={() => handleStep('back')}
                        disabled={currentStep === Step.PET_NAME}
                    >
                        <Icon
                            name="keyboard-arrow-left"
                            size={38}
                            color={currentStep === Step.PET_NAME ? '#e9e9e9' : themes.colors.primary}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleStep('front')}>
                        <Icon
                            name="keyboard-arrow-right"
                            size={38}
                            color={themes.colors.primary}
                        />
                    </TouchableOpacity>
                </StepNavigatorSection>
            </SignInAdditionalInformationBlock>
        </PlaypetModal>
    )
}

const StepNavigatorSection = styled.View`
    position: absolute;
    bottom: 12px;
    /* right: 12px; */
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
`

const SignInAdditionalInformationBlock = styled(SafeAreaView)`
    /* flex: 1; */
    height: 100%;
    padding-vertical: 40px;
    flex-direction: column;
`

