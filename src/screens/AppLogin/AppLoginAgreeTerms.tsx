import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native'
import { useRoute, RouteProp } from '@react-navigation/native'
import SignUpAgreeTermsModal from '../AuthScreen/SignUpAgreeTermsModal'
import { AppLoginParamList } from '../../navigation'
import { Text } from '../../styles'

export default function AppLoginAgreeTerms() {
    // const navigation = useNavigation()
    const { params } = useRoute<RouteProp<AppLoginParamList, 'AppLoginAgreeTerms'>>()
    console.log("params", params);

    return (
        <AppLoginAgreeTermsBlock>
            <Text>email: {params.email} 맞습니까?</Text>
            <SignUpAgreeTermsModal />
        </AppLoginAgreeTermsBlock>
    )
}

const AppLoginAgreeTermsBlock = styled(SafeAreaView)`
    flex: 1;
`
