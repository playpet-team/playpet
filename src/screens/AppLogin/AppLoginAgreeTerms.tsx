import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import { useRoute, RouteProp } from '@react-navigation/native'
import SignUpAgreeTermsModal from '../AuthScreen/SignUpAgreeTermsModal'
import { AppLoginParamList } from '../../navigation'
import { Text, DividerBlock } from '../../styles'
import { currentUser } from '../../utils'

export default function AppLoginAgreeTerms() {
    const user = currentUser()
    console.log("user--------", user);

    return (
        <AppLoginAgreeTermsBlock>
            <Text size={18} bold>회원가입을 추카합니다</Text>
            <DividerBlock marginBottom={4} />
            <Text size={16}>{user?.email}</Text>
            <DividerBlock marginBottom={16} />
            <SignUpAgreeTermsModal />
        </AppLoginAgreeTermsBlock>
    )
}

const AppLoginAgreeTermsBlock = styled(SafeAreaView)`
    flex: 1;
    padding: 24px;
`
