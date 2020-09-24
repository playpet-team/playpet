import { useTheme } from "@react-navigation/native"
import React, { useState } from 'react'
import { Icon } from "react-native-elements"
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import styled from 'styled-components/native'
import PlaypetModal from '../../components/PlaypetModal'
import useLoadingIndicator from '../../hooks/useLoadingIndicator'
import { authActions } from '../../store/authReducer'
import { DividerBlock } from "../../styles"
import { currentUser, deviceSize, updateUserPets } from '../../utils'
import PetAdditionalType, { DefaultAge, DefaultSize, PET_TYPE } from './SignInAdditionalInformation/PetAdditionalType'
import PetFavorite from './SignInAdditionalInformation/PetFavorite'
import PetName from './SignInAdditionalInformation/PetName'
import PetType from './SignInAdditionalInformation/PetType'
import WelcomeSign from "./SignInAdditionalInformation/WelcomeSign"

// export const Step = {
//     PET_NAME: 0,
//     PET_TYPE: 1,
//     PET_FAVORITE: 2,
//     TERMS: 3,
// }
export type StepName = 'PET_NAME' | 'PET_TYPE' | 'PET_ADDITIONAL_TYPE' | 'PET_FAVORITE' | 'TERMS'
export enum Step {
    PET_NAME,
    PET_TYPE,
    PET_ADDITIONAL_TYPE,
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
    const [visible, setVisible] = useState(true)
    const [currentStep, setStep] = useState<Step>(Step.PET_NAME)
    const [valid, setValid] = useState<string[]>([])
    const [petName, setPetname] = useState('')
    const [petType, setPetType] = useState<string>(PET_TYPE.DOG)
    const [searchPetType, setSearchPetType] = useState('')
    const [size, setSize] = useState(DefaultSize.S)
    const [age, setAge] = useState(DefaultAge.ADLUT)
    const [favorite, setFavorite] = useState('')
    // const [terms, setTerms] = useState<TERMS>({
    //     overAgeAgree: false,
    //     termsOfUseAgree: false,
    //     personalCollectAgree: false,
    //     marketingAgree: false,
    // })

    const themes = useTheme()
    const dispatch = useDispatch()

    const handleStep = async () => {
        const errors = checkValid()
        if (errors.length) {
            setValid(errors)
            return
        }
        setValid([])
        await handleUpdatePet()
        setVisible(false)
    }
    
    const checkValid = () => {
        const errors = []
        if (!petName.length) {
            errors.push('petName')
        }
        if (petType && !searchPetType.length) {
            errors.push('searchPetType')
        }
        if (petType && !size.length) {
            errors.push('size')
        }
        if (petType && !size.length) {
            errors.push('age')
        }
        if (petType && !favorite.length) {
            errors.push('favorite')
        }
        return errors
    }

    const handleUpdatePet = async () => {
        const user = currentUser()
        if (!user) {
            return
        }
        const activePetDocId = await updateUserPets(user.uid, {
            petName,
            petType,
            searchPetType,
            size,
            favorite,
        })

        if (activePetDocId) {
            dispatch(authActions.setActivePetDocId(activePetDocId))
        }
    }

    return (
        <PlaypetModal
            modalVisible={visible}
            isHideCloseButton={true}
            containerStyle={{
                height: DEVICE_HEIGHT,
                width: DEVICE_WIDTH,
            }}
        >
            {loading && <Indicator />}
            <SignInAdditionalInformationBlock>
                <ScrollView>
                    <WelcomeSign />
                    <DividerBlock marginTop={44} />
                    <PetName
                        currentStep={currentStep}
                        valid={valid.includes('petName')}
                        petName={petName}
                        setPetname={setPetname}
                    />
                    <DividerBlock marginBottom={36} />
                    <PetType
                        currentStep={currentStep}
                        valid={valid}
                        petType={petType}
                        setPetType={setPetType}
                        searchPetType={searchPetType}
                        setSearchPetType={setSearchPetType}
                    />
                    <DividerBlock marginBottom={36} />
                    <PetAdditionalType
                        currentStep={currentStep}
                        petType={petType}
                        valid={valid}
                        size={size}
                        setSize={setSize}
                        age={age}
                        setAge={setAge}
                    />
                    <DividerBlock marginBottom={36} />
                    <PetFavorite
                        currentStep={currentStep}
                        valid={valid.includes('favorite')}
                        favorite={favorite}
                        setFavorite={setFavorite}
                    />
                    <StepNavigatorSection>
                        <TouchableOpacity onPress={handleStep}>
                            <Icon
                                name="keyboard-arrow-right"
                                size={38}
                                color={themes.colors.primary}
                            />
                        </TouchableOpacity>
                    </StepNavigatorSection>
                </ScrollView>
            </SignInAdditionalInformationBlock>
        </PlaypetModal>
    )
}

const StepNavigatorSection = styled.View`
    flex-direction: row;
    width: 100%;
    justify-content: flex-end;
`

const SignInAdditionalInformationBlock = styled(SafeAreaView)`
    padding-vertical: 40px;
    flex-direction: column;
`

