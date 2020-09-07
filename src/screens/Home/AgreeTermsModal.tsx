import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import SignUpAgreeTermsModal from '../AuthScreen/SignUpAgreeTermsModal'
import { Text, DividerBlock } from '../../styles'
import { currentUser } from '../../utils'
import PlaypetModal from '../../components/PlaypetModal'
import useTerms from '../../hooks/useTerms'


export default function AgreeTermsModal() {
    const [completeTerm, setCompleteTerm] = useState(false)
    const { existDoc } = useTerms({ completeTerm })
    const user = currentUser()

    return (
        <PlaypetModal
            modalVisible={!existDoc}
            isHideCloseButton={true}
        >
            <AppLoginAgreeTermsBlock>
                <Text size={18} bold>회원가입을 추카합니다</Text>
                <DividerBlock marginBottom={4} />
                <Text size={16}>{user?.email}</Text>
                <DividerBlock marginBottom={16} />
                <SignUpAgreeTermsModal setCompleteTerm={setCompleteTerm} />
            </AppLoginAgreeTermsBlock>
        </PlaypetModal>
    )
}

const AppLoginAgreeTermsBlock = styled(SafeAreaView)`
    /* flex: 1; */
    padding: 24px;
`
