import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import Logo from '../components/Logo'

import ProfileSection from '../components/ProfileSection'
import useInitialDynamicLink from '../hooks/useInitialDynamicLink'
import useRollingBanner from '../hooks/useRollingBanner'
import { DividerBlock, Layout } from '../styles'
import FeedSection from './Home/FeedSection'
import AgreeTermsModal from './AgreeTermsModal'
import { useSelector } from 'react-redux'
import { RootState } from '../store/rootReducers'

export default function Home() {
    useInitialDynamicLink()
    const { renderBanner } = useRollingBanner()
    const {
        agreeTerms = true,
    } = useSelector((state: RootState) => state.auth)

    return (
        <SafeAreaViewBlock>
            {/* <Payment /> */}
            <HomeBlock>
                <Logo />
                <DividerBlock marginTop={24} />
            </HomeBlock>
            <ScrollView>
                {renderBanner &&
                    <Layout alignItems='center'>
                        {renderBanner()}
                    </Layout>
                }
                <DividerBlock marginTop={24} />
                <ProfileSection />
                <FeedSection />
            </ScrollView>
            {!agreeTerms && <AgreeTermsModal />}
        </SafeAreaViewBlock>
    )
}

const SafeAreaViewBlock = styled(SafeAreaView)`
    flex: 1;
`

const HomeBlock = styled.View`
    align-items: center;
`
