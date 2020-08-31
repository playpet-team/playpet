import React, { useState, useCallback } from 'react'
import styled from 'styled-components/native'
import { Text } from '../../styles'

import { updateUserTerms, currentUser } from '../../utils'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/authReducer';
import { RootState } from '../../store/rootReducers';

export default function SignUpAgreeTermsModal() {
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const { terms } = useSelector((state: RootState) => state.auth)
    // const [agreementList, setAgreementList] = useState({
    //     overAgeAgree: false,
    //     termsOfUseAgree: false,
    //     personalCollectAgree: false,
    //     marketingAgree: false,
    // })
    const { overAgeAgree, termsOfUseAgree, personalCollectAgree, marketingAgree } = terms

    const handleSingleTerm = (k: string, v: boolean) => dispatch(authActions.setTerms({
        [k]: v,
    }))

    const handleAllAgree = useCallback(() => {
        const isAllTerms = overAgeAgree && termsOfUseAgree && personalCollectAgree && marketingAgree
        dispatch(authActions.setTerms({
            overAgeAgree: !isAllTerms,
            termsOfUseAgree: !isAllTerms,
            personalCollectAgree: !isAllTerms,
            marketingAgree: !isAllTerms,
        }))
    }, [])

    const isAllRequiredAgreeTerms = () => overAgeAgree && termsOfUseAgree && personalCollectAgree

    const hanbleSubmitAgreeTerms = async () => {
        const user = currentUser()
        if (!user) {
            return
        }
        const uid = user.uid
        updateUserTerms(uid, {
            overAgeAgree,
            termsOfUseAgree,
            personalCollectAgree,
            marketingAgree,
        })
        navigation.navigate('Home');
    }

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
            <SubmitSignIn onPress={() => hanbleSubmitAgreeTerms()} disabled={!isAllRequiredAgreeTerms}>
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