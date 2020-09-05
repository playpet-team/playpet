import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import { getUserTerms, currentUser } from '../utils'
import { DividerBlock } from '../styles'
import useFirebaseMessage from '../hooks/useFirebaseMessage'
import useRollingBanner from '../hooks/useRollingBanner'
import { ScrollView } from 'react-native-gesture-handler'
import { Layout } from '../styles'
import Logo from '../components/Logo'
import ProductList from '../components/ProductList'
import useLanguage from '../hooks/useLanguage'
import { useNavigation } from '@react-navigation/native'
import useTerms from '../hooks/useTerms'

export default function Home() {
    useLanguage()
    useFirebaseMessage()
    const navigation = useNavigation()
    const { renderBanner } = useRollingBanner()
    const { existDoc } = useTerms()

    useEffect(() => {
        if (!existDoc) {
            navigation.navigate('AppLoginAgreeTerms')
        }
    }, [existDoc])

    return (
        <SafeAreaViewBlock>
            <HomeBlock>
                <Logo />
                <DividerBlock marginTop={24} />
            </HomeBlock>
            <ScrollView>
                <Layout alignItems='center'>
                    {renderBanner && renderBanner()}
                </Layout>
                <DividerBlock marginTop={24} />
                <ProductList />
                {/* <DummyCardView /> */}
            </ScrollView>
        </SafeAreaViewBlock>
    )
}

const SafeAreaViewBlock = styled(SafeAreaView)`
    flex: 1;
`

const HomeBlock = styled.View`
    align-items: center;
`

const DummyCardView = styled.View`
    flex: 1;
    margin: 20px;
    height: 550px;
    background-color: #e9e9e9;
    border-radius: 8px;
    margin-bottom: 16px;
`
