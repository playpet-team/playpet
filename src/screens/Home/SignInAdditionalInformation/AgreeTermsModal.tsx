import React, { useCallback } from 'react';
import styled from 'styled-components/native';
import { Text } from '../../../styles';
import { Step, TERMS } from '../SignInAdditionalInformation';


export default function AgreeTermsModal({ terms, setTerms, handleSingleTerm, setCompleteTerm, currentStep, valid }: {
    terms: TERMS
    setTerms: React.Dispatch<React.SetStateAction<TERMS>>
    handleSingleTerm: (k: string, v: boolean) => void
    setCompleteTerm: React.Dispatch<React.SetStateAction<boolean>>
    currentStep: Step
    valid: boolean
}) {
    if (currentStep !== Step.TERMS) {
        return null
    }
    const { overAgeAgree, termsOfUseAgree, personalCollectAgree, marketingAgree } = terms

    const handleAllAgree = useCallback(() => {
        const isAllTerms = overAgeAgree && termsOfUseAgree && personalCollectAgree && marketingAgree
        setTerms({
            overAgeAgree: !isAllTerms,
            termsOfUseAgree: !isAllTerms,
            personalCollectAgree: !isAllTerms,
            marketingAgree: !isAllTerms,
        })
    }, [])

    const isAllRequiredAgreeTerms = () => overAgeAgree && termsOfUseAgree && personalCollectAgree

    return (
        <>
            <AllTermsAgree onPress={handleAllAgree}>
                <Text>약관에 모두 동의</Text>
            </AllTermsAgree>
            <TermsAgree onPress={() => handleSingleTerm('overAgeAgree', !overAgeAgree)}>
                <Text>{overAgeAgree ? 'checked' : 'none'}</Text><Text>만 14세 이상입니다</Text>
            </TermsAgree>
            <TermsAgree onPress={() => handleSingleTerm('termsOfUseAgree', !termsOfUseAgree)}>
                <Text>{termsOfUseAgree ? 'checked' : 'none'}</Text><Text>서비스 이용약관에 동의</Text>
            </TermsAgree>
            <TermsAgree onPress={() => handleSingleTerm('personalCollectAgree', !personalCollectAgree)}>
                <Text>{personalCollectAgree ? 'checked' : 'none'}</Text><Text>개인정보 수집 이용에 동의</Text>
            </TermsAgree>
            <TermsAgree onPress={() => handleSingleTerm('marketingAgree', !marketingAgree)}>
                <Text>{marketingAgree ? 'checked' : 'none'}</Text><Text>홍보 및 마케팅 이용에 동의</Text>
            </TermsAgree>
            <SubmitSignIn onPress={() => setCompleteTerm(true)} disabled={!isAllRequiredAgreeTerms}>
                <Text>확인</Text>
            </SubmitSignIn>
        </>
    )
}

const AllTermsAgree = styled.TouchableOpacity``
const TermsAgree = styled.TouchableOpacity``
const SubmitSignIn = styled.TouchableOpacity`
    background-color: blue;
`