import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/native'
import Logo from '../components/Logo'
import ProfileSection from '../components/ProfileSection'
import useFirebaseMessage from '../hooks/useFirebaseMessage'
import useInitialDynamicLink from '../hooks/useInitialDynamicLink'
import useLanguage from '../hooks/useLanguage'
import useLoadingIndicator from '../hooks/useLoadingIndicator'
import useRollingBanner from '../hooks/useRollingBanner'
import { authActions } from '../store/authReducer'
import { RootState } from '../store/rootReducers'
import { DividerBlock, Layout } from '../styles'
import { getPetDoc } from '../utils'
import SignInAdditionalInformation from './Home/SignInAdditionalInformation'

export default function Home() {
    const { loading, setLoading } = useLoadingIndicator()
    useLanguage()
    // useFirebaseMessage()
    useInitialDynamicLink()
    const { renderBanner } = useRollingBanner()
    const dispatch = useDispatch()
    const {
        uid,
        activePetDocId,
        activePet,
    } = useSelector((state: RootState) => state.auth)

    useEffect(() => {
        loadMyPet()
        async function loadMyPet() {
            if (!activePetDocId || !uid) {
                return
            }
            setLoading(true)
            const pet = await getPetDoc(uid, activePetDocId)
            dispatch(authActions.setActivePet(pet))
            setLoading(false)
        }
    }, [activePetDocId, uid])

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
            </ScrollView>
            {activePetDocId === '' && <SignInAdditionalInformation />}
        </SafeAreaViewBlock>
    )
}

const SafeAreaViewBlock = styled(SafeAreaView)`
    flex: 1;
`

const HomeBlock = styled.View`
    align-items: center;
`
