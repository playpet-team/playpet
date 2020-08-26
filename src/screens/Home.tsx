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

export default function Home() {
    const navigation = useNavigation()
    useLanguage()
    const { renderBanner } = useRollingBanner()
    useFirebaseMessage()

    useEffect(() => {
        loadTerms()
        async function loadTerms() {
            const user = currentUser()
            if (user && user.uid) {
                const hasTerms = await getUserTerms(user.uid)
                if (hasTerms) {
                    navigation.navigate('AppLoginAgreeTerms')
                }
            }
        }
    }, [])

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
                <DummyCardView />
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
