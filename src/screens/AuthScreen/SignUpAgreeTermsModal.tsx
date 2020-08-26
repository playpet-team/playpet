import React, { useState, useCallback } from 'react'
import styled from 'styled-components/native'
import { Text } from '../../styles'

import { updateUserTerms, currentUser } from '../../utils'

export default function SignUpAgreeTermsModal() {
    const [overAgeAgree, setOverAgeAgree] = useState(false)
    const [termsOfUseAgree, setTermsOfUseAgree] = useState(false)
    const [personalCollectAgree, setPersonalCollectAgree] = useState(false)
    const [marketingAgree, setMarketingAgree] = useState(false)

    const handleAllAgree = useCallback(() => {
        setOverAgeAgree(true)
        setTermsOfUseAgree(true)
        setPersonalCollectAgree(true)
        setMarketingAgree(true)
    }, [])

    const isAllAgreeTarms = () => overAgeAgree && termsOfUseAgree && personalCollectAgree

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
    }

    return (
        <>
            <AllTermsAgree onPress={handleAllAgree}>
                <Text>약관에 모두 동의</Text>
            </AllTermsAgree>
            <TermsAgree onPress={() => setOverAgeAgree(!overAgeAgree)}>
                <Text>{overAgeAgree ? 'checked' : 'none'}</Text><Text>만 14세 이상입니다</Text>
            </TermsAgree>
            <TermsAgree onPress={() => setTermsOfUseAgree(!termsOfUseAgree)}>
                <Text>{termsOfUseAgree ? 'checked' : 'none'}</Text><Text>서비스 이용약관에 동의</Text>
            </TermsAgree>
            <TermsAgree onPress={() => setPersonalCollectAgree(!personalCollectAgree)}>
                <Text>{personalCollectAgree ? 'checked' : 'none'}</Text><Text>개인정보 수집 이용에 동의</Text>
            </TermsAgree>
            <TermsAgree onPress={() => setMarketingAgree(!marketingAgree)}>
                <Text>{marketingAgree ? 'checked' : 'none'}</Text><Text>홍보 및 마케팅 이용에 동의</Text>
            </TermsAgree>
            <SubmitSignIn onPress={() => hanbleSubmitAgreeTerms()} disabled={!isAllAgreeTarms}>
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