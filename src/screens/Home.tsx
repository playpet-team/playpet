import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import Logo from '../components/Logo'

import ProfileSection from '../components/ProfileSection'
import useInitialDynamicLink from '../hooks/useInitialDynamicLink'
import useLanguage from '../hooks/useLanguage'
import useRollingBanner from '../hooks/useRollingBanner'
import { DividerBlock, Layout, Text } from '../styles'
// import { currentUser } from '../utils'
import FeedSection from './Home/FeedSection'



export default function Home() {
    const navigation = useNavigation();
    useLanguage()
    // useFirebaseMessage()
    useInitialDynamicLink()
    const { renderBanner } = useRollingBanner()

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
        </SafeAreaViewBlock>
    )
}

const SafeAreaViewBlock = styled(SafeAreaView)`
    flex: 1;
`

const HomeBlock = styled.View`
    align-items: center;
`
