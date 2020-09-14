import { useTheme } from '@react-navigation/native'
import React, { useState } from 'react'
import { Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import styled from 'styled-components/native'
import PlaypetModal from '../../components/PlaypetModal'
import useTerms from '../../hooks/useTerms'
import { currentUser, deviceSize } from '../../utils'
import AgreeTermsModal from './SignInAdditionalInformation/AgreeTermsModal'
import PetFavorite from './SignInAdditionalInformation/PetFavorite'
import PetType from './SignInAdditionalInformation/PetType'
import Username from './SignInAdditionalInformation/Username'

const DEVICE_WIDTH = deviceSize().width
export const Step = {
    PET_NAME: 0,
    PET_TYPE: 1,
    PET_FAVORITE: 2,
    TERMS: 3,
}

export interface TERMS {
    overAgeAgree: boolean;
    termsOfUseAgree: boolean;
    personalCollectAgree: boolean;
    marketingAgree: boolean;
}
export default function SignInAdditionalInformation() {
    const [step, setStep] = useState<number>(Step.PET_NAME)    

    const [terms, setTerms] = useState<TERMS>({
        overAgeAgree: false,
        termsOfUseAgree: false,
        personalCollectAgree: false,
        marketingAgree: false,
    })

    const handleSingleTerm = (k: string, v: boolean) => setTerms({
        ...terms,
        [k]: v,
    })

    const hanbleSubmitAgreeTerms = async () => {
        // const { overAgeAgree, termsOfUseAgree, personalCollectAgree, marketingAgree } = terms
        // const user = currentUser()
        // if (!user) {
        //     return
        // }
        // const uid = user.uid
        // await updateUserTerms(uid, {
        //     overAgeAgree,
        //     termsOfUseAgree,
        //     personalCollectAgree,
        //     marketingAgree,
        // })
        // setCompleteTerm(true)
        // navigation.goBack()
    }

    const [completeTerm, setCompleteTerm] = useState(false)
    const { existDoc } = useTerms({ completeTerm })
    const user = currentUser()
    const themes = useTheme();
    console.log("step", step)

    return (
        <PlaypetModal
            // modalVisible={!existDoc}
            modalVisible={true}
            isHideCloseButton={true}
            containerStyle={{
                flex: 1,
                width: DEVICE_WIDTH,
            }}
        >
            <SignInAdditionalInformationBlock>
                <Username step={step} />
                <PetType step={step} />
                <PetFavorite step={step} />
                {step === Step.TERMS &&
                    <AgreeTermsModal
                        terms={terms}
                        setTerms={setTerms}
                        handleSingleTerm={handleSingleTerm}
                        setCompleteTerm={setCompleteTerm}
                        step={step}
                    />
                }
                <StepNavigatorSection>
                    <TouchableOpacity
                        onPress={() => setStep(step - 1)}
                        disabled={step === 0}
                    >
                        <Icon
                            name="keyboard-arrow-left"
                            size={38}
                            color={step === 0 ? '#e9e9e9' : themes.colors.primary}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setStep(step + 1)}
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

