import React, { useEffect, useState } from 'react'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import styled, { useTheme } from 'styled-components/native'
import Logo from '../components/Logo'
import PlaypetModal from '../components/PlaypetModal'
import ProfileSection from '../components/ProfileSection'
import useFirebaseMessage from '../hooks/useFirebaseMessage'
import useInitialDynamicLink from '../hooks/useInitialDynamicLink'
import useLanguage from '../hooks/useLanguage'
import useLoadingIndicator from '../hooks/useLoadingIndicator'
import useRollingBanner from '../hooks/useRollingBanner'
import { authActions } from '../store/authReducer'
import { RootState } from '../store/rootReducers'
import { DividerBlock, Layout, Text } from '../styles'
import { deviceSize, getPetDoc } from '../utils'
import SignInAdditionalInformation from './Home/SignInAdditionalInformation'

const DEVICE_WIDTH = deviceSize().width
const DEVICE_HEIGHT = deviceSize().height

export default function Home() {
    const [activeFeedItem, setActiveFeedItem] = useState(-1)
    const { loading, setLoading } = useLoadingIndicator()
    const [showFeedBoard, setShowFeedBoard] = useState(false)
    const theme = useTheme()
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

    const openFeedBoard = () => {
        setShowFeedBoard(true)
    }

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
            {showFeedBoard &&
                <PlaypetModal
                    modalVisible={true}
                    isHideCloseButton={true}
                    containerStyle={{
                        width: DEVICE_WIDTH,
                        height: DEVICE_HEIGHT,
                    }}
                >
                    <FeedBoardBlock>
                        <Text bold>등록하실 사료를 선택해주세요</Text>
                        <Text>사료 중에서 가장 엄선한 브랜드만 선별하였습니다</Text>
                        <GridLayout>
                            <Item>
                                <Text>1</Text>
                            </Item>
                            <Item>
                                <Text>1</Text>
                            </Item>
                            <Item>
                                <Text>1</Text>
                            </Item>
                            <Item>
                                <Text>1</Text>
                            </Item>
                            <Item>
                                <Text>1</Text>
                            </Item>
                            <Item>
                                <Text>1</Text>
                            </Item>
                            <Item>
                                <Text>1</Text>
                            </Item>
                            <Item>
                                <Text>1</Text>
                            </Item>
                            <Item>
                                <Text>1</Text>
                            </Item>
                        </GridLayout>
                        <FeedNavigateBlock>
                            <BackButton>
                                <Text
                                    color={theme.colors.border}
                                    size={16}
                                    bold
                                >
                                    이전
                                </Text>
                            </BackButton>
                            <NextButton>
                                <Text
                                    color={theme.colors.background}
                                    size={16}
                                    bold
                                >
                                    다음
                                </Text>
                            </NextButton>
                        </FeedNavigateBlock>
                    </FeedBoardBlock>
                </PlaypetModal>
            }

            <TouchableOpacity onPress={openFeedBoard}>
                <Text>벗흔</Text>
            </TouchableOpacity>
        </SafeAreaViewBlock>
    )
}

const SafeAreaViewBlock = styled(SafeAreaView)`
    flex: 1;
`

const HomeBlock = styled.View`
    align-items: center;
`

const FeedBoardBlock = styled(SafeAreaView)`
    padding-vertical: 40px;
    flex-direction: column;
    height: 100%;
`

const GridLayout = styled.View`
    flex-wrap: wrap;
    flex: 1;
    flex-direction: row;
`

const Item = styled.TouchableOpacity`
    flex: 1;
    margin: 8px 8px 0 0;
    flex-basis: 110px;
    height: 110px;
    border-width: 1px;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.grey};
`

const FeedNavigateBlock = styled.View`
    flex-direction: row;
    position: absolute;
    bottom: 0;
    width: 100%;
`

const Button = styled.TouchableOpacity`
    padding: 16px;
    background-color: ${(props) => props.theme.colors.background};
    align-items: center;
    justify-content: center;
`

const NextButton = styled(Button)`
    flex: 1;
    background-color: ${(props) => props.theme.colors.primary};
`

const BackButton = styled(Button)`
    flex-basis: 120px;
`