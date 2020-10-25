import { useNavigation } from "@react-navigation/native";
import * as Sentry from "@sentry/react-native";
import React, { useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import PlaypetModal from "../../../components/PlaypetModal";
import Transition from '../../../components/Transition';
import useLoadingIndicator from '../../../hooks/useLoadingIndicator';
import { authActions } from '../../../store/authReducer';
import { Text } from '../../../styles';
import { currentUser, updateUserTerms } from '../../../utils';
import { Terms } from '../SignInAdditionalInformation';


export default function AgreeTermsModal() {
    const [modalVisible, setModalVisible] = useState(true)

    // if (!modalVisible) {
    //     return null
    // }
    const navigation = useNavigation()

    const { loading, setLoading, Indicator } = useLoadingIndicator()
    const [terms, setTerms] = useState<Terms>({
        overAgeAgree: false,
        termsOfUseAgree: false,
        personalCollectAgree: false,
        marketingAgree: false,
    })
    const dispatch = useDispatch()

    const { overAgeAgree, termsOfUseAgree, personalCollectAgree, marketingAgree } = useMemo(() => terms, [terms])

    const hanbleSubmitAgreeTerms = async () => {
        const user = currentUser()
        if (!user) {
            return
        }
        const uid = user.uid
        try {
            setLoading(true)
            await updateUserTerms(uid, {
                overAgeAgree,
                termsOfUseAgree,
                personalCollectAgree,
                marketingAgree,
            })

            dispatch(authActions.setTerms({
                overAgeAgree,
                termsOfUseAgree,
                personalCollectAgree,
                marketingAgree,
            }))

            setModalVisible(false)
            navigation.navigate('Home', {
                isSignUp: true,
            })

        } catch (e) {
            Sentry.captureException(e)
        } finally {
            setLoading(false)
        }

    }

    const handleSingleTerm = (k: string, v: boolean) => setTerms({
        ...terms,
        [k]: v,
    })

    const handleAllAgree = useCallback(() => {
        const isAllTerms = overAgeAgree && termsOfUseAgree && personalCollectAgree && marketingAgree
        setTerms({
            overAgeAgree: !isAllTerms,
            termsOfUseAgree: !isAllTerms,
            personalCollectAgree: !isAllTerms,
            marketingAgree: !isAllTerms,
        })
    }, [])

    const isAllRequiredAgreeTerms = () => overAgeAgree && termsOfUseAgree && personalCollectAgree

    return (
        <Transition type="fade-top">
            <PlaypetModal
                modalVisible={modalVisible}
                isHideCloseButton={true}
            >
                <AgreeTermsModalBlock>
                    {loading && <Indicator />}
                        <AllTermsAgree onPress={handleAllAgree}>
                            <Text>약관에 모두 동의</Text>
                        </AllTermsAgree>
                        <TermsAgree onPress={() => handleSingleTerm('overAgeAgree', !overAgeAgree)}>
                            <Text>{overAgeAgree ? 'checked' : 'none'}</Text><Text>만 14세 이상입니다</Text>
                        </TermsAgree>
                        <TermsAgree onPress={() => handleSingleTerm('termsOfUseAgree', !termsOfUseAgree)}>
                            <Text>{termsOfUseAgree ? 'checked' : 'none'}</Text><Text>서비스 이용약관에 동의</Text>
                        </TermsAgree>
                        <TermsAgree onPress={() => handleSingleTerm('personalCollectAgree', !personalCollectAgree)}>
                            <Text>{personalCollectAgree ? 'checked' : 'none'}</Text><Text>개인정보 수집 이용에 동의</Text>
                        </TermsAgree>
                        <TermsAgree onPress={() => handleSingleTerm('marketingAgree', !marketingAgree)}>
                            <Text>{marketingAgree ? 'checked' : 'none'}</Text><Text>홍보 및 마케팅 이용에 동의</Text>
                        </TermsAgree>
                        <Complete onPress={hanbleSubmitAgreeTerms}>
                            <Text>완료</Text>
                        </Complete>
                </AgreeTermsModalBlock>
            </PlaypetModal>
        </Transition>
    )
}

const AgreeTermsModalBlock = styled.View`
    /* position: absolute; */
    width: 100%;
    /* bottom: 0; */
    /* left: 0; */
    /* padding: 24px; */
    background-color: #fff;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
`
const AllTermsAgree = styled.TouchableOpacity``
const TermsAgree = styled.TouchableOpacity``
const Complete = styled.TouchableOpacity``
