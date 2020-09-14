import { useTheme } from '@react-navigation/native'
import React, { useState } from 'react'
import { Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useDispatch } from 'react-redux'
import styled from 'styled-components/native'
import PlaypetModal from '../../components/PlaypetModal'
import { authActions } from '../../store/authReducer'
import { currentUser, deviceSize, updateUserPets, updateUserTerms } from '../../utils'
import AgreeTermsModal from './SignInAdditionalInformation/AgreeTermsModal'
import CheckMyInformation from './SignInAdditionalInformation/CheckMyInformation'
import PetFavorite from './SignInAdditionalInformation/PetFavorite'
import PetName from './SignInAdditionalInformation/Petname'
import PetType, { SIZE } from './SignInAdditionalInformation/PetType'
import WelcomeSign from './SignInAdditionalInformation/WelcomeSign'

// export const Step = {
//     PET_NAME: 0,
//     PET_TYPE: 1,
//     PET_FAVORITE: 2,
//     TERMS: 3,
// }
export type StepName = 'WELCOME' | 'PET_NAME' | 'PET_TYPE' | 'PET_FAVORITE' | 'TERMS'
export enum Step {
    WELCOME,
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
export default function SignInAdditionalInformation({
    modalVisible = false
}) {
    const [currentStep, setStep] = useState<Step>(Step.WELCOME)
    const [valid, setValid] = useState(false)
    const [petName, setPetname] = useState('')
    const [petType, setPetType] = useState('DOG')
    const [searchPetType, setSearchPetType] = useState('')
    const [size, setSize] = useState(SIZE[0])
    const [favorite, setFavorite] = useState('')
    const [terms, setTerms] = useState<TERMS>({
        overAgeAgree: false,
        termsOfUseAgree: false,
        personalCollectAgree: false,
        marketingAgree: false,
    })
    const [completeTerm, setCompleteTerm] = useState(false)
    const themes = useTheme();
    const dispatch = useDispatch()

    const handleSingleTerm = (k: string, v: boolean) => setTerms({
        ...terms,
        [k]: v,
    })

    const handleStep = (type: 'back' | 'front') => {
        console.log('0')
        if (type === 'back') {
            if (currentStep === Step.WELCOME) {
                return
            }
            setStep(currentStep - 1)
            return
        }
        console.log('1')
        
        const isValid = checkValid()
        console.log('2')
        setValid(isValid)
        if (!isValid) {
            setValid(true)
            return
        }
        
        console.log('3')
        if (type === 'front') {
            console.log('4')
            if (currentStep === Step.TERMS) {
                hanbleSubmitAgreeTerms()
                return
            }
            setStep(currentStep + 1)
        }
    }
    
    const checkValid = () => {
        switch (currentStep) {
            case Step.WELCOME: {
                return true
            }
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
        console.log('111')
        if (!user) {
            return
        }
        const uid = user.uid
        console.log('222')
        const { overAgeAgree, termsOfUseAgree, personalCollectAgree, marketingAgree } = terms
        await updateUserTerms(uid, {
            overAgeAgree,
            termsOfUseAgree,
            personalCollectAgree,
            marketingAgree,
        })
        console.log('333')
        
        const activePetDocId = await updateUserPets(uid, {
            petName,
            petType,
            searchPetType,
            size,
            favorite,
        })
        console.log('444')

        dispatch(authActions.setTerms({
            overAgeAgree,
            termsOfUseAgree,
            personalCollectAgree,
            marketingAgree,
        }))
        dispatch(authActions.setActivePet(activePetDocId))
    }

    console.log('modalVisible-', modalVisible)

    return (
        <PlaypetModal
            modalVisible={modalVisible}
            isHideCloseButton={true}
            containerStyle={{
                flex: 1,
                width: DEVICE_WIDTH,
            }}
        >
            <SignInAdditionalInformationBlock>
                <WelcomeSign currentStep={currentStep} />
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
                    setCompleteTerm={setCompleteTerm}
                    currentStep={currentStep}
                    valid={valid}
                />
                <StepNavigatorSection>
                    <TouchableOpacity
                        onPress={() => handleStep('back')}
                        disabled={currentStep === Step.WELCOME}
                    >
                        <Icon
                            name="keyboard-arrow-left"
                            size={38}
                            color={currentStep === Step.WELCOME ? '#e9e9e9' : themes.colors.primary}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleStep('front')}
                    >
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

const SignInAdditionalInformationBlock = styled.View`
    /* flex: 1; */
    height: 100%;
    padding-vertical: 24px;
    flex-direction: column;
`

