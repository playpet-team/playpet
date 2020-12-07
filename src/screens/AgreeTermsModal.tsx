import * as Sentry from "@sentry/react-native";
import React, { useCallback, useMemo, useState } from 'react';
import { Icon } from "react-native-elements";
import { useDispatch } from 'react-redux';
import styled, { useTheme } from 'styled-components/native';
import PlaypetModal from "../components/PlaypetModal";
import Transition from '../components/Transition';
import useLoadingIndicator from '../hooks/useLoadingIndicator';
import { authActions } from '../store/authReducer';
import { Spacer, DividerBlock, Text } from '../styles';
import { currentUser, deviceSize, updateUserTerms } from '../utils';
import { Terms } from './ManageProducts/RegistrationPet';

export default function AgreeTermsModal() {
    const [modalVisible, setModalVisible] = useState(true)
    const { loading, setLoading, Indicator } = useLoadingIndicator()

    const [terms, setTerms] = useState<Terms>({
        overAgeAgree: false,
        termsOfUseAgree: false,
        personalCollectAgree: false,
        marketingAgree: false,
    })
    const dispatch = useDispatch()
    const { overAgeAgree, termsOfUseAgree, personalCollectAgree, marketingAgree } = useMemo(() => terms, [terms])

    const theme = useTheme()

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
                existDoc: true,
                overAgeAgree,
                termsOfUseAgree,
                personalCollectAgree,
                marketingAgree,
            }))
            setModalVisible(false)

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

    const handleAllAgree = () => {
        const isAllTerms = overAgeAgree && termsOfUseAgree && personalCollectAgree && marketingAgree
        setTerms({
            overAgeAgree: !isAllTerms,
            termsOfUseAgree: !isAllTerms,
            personalCollectAgree: !isAllTerms,
            marketingAgree: !isAllTerms,
        })
    }

    const CheckIcon = useCallback(({ term }) => (
        <Icon
            name="check"
            size={16}
            color={term ? theme.colors.white : '#e9e9e9'}
            containerStyle={{
                marginRight: 12,
                borderWidth: 1,
                borderRadius: 15,
                padding: 2,
                borderColor:term ? theme.colors.primary: '#e9e9e9',
                backgroundColor: term ? theme.colors.primary: '#fff',
            }}
        />
    ), [overAgeAgree, termsOfUseAgree, personalCollectAgree, theme])

    const ArrowIcon = useMemo(() => (
        <Icon
            name="chevron-right"
            size={22}
            color="#cacaca"
            containerStyle={{
            }}
        />
    ), [])

    const isAllRequiredAgreeTerms = overAgeAgree && termsOfUseAgree && personalCollectAgree

    return (
        <Transition type="fade-top">
            <PlaypetModal
                modalVisible={modalVisible}
                isHideCloseButton={true}
                modalJustify="flex-end"
                containerStyle={{
                    width: deviceSize().width - 40,
                    padding: 20,
                    borderRadius: 16,
                }}
            >
                <AgreeTermsModalBlock>
                    {loading && <Indicator />}
                        <TermsAgree onPress={handleAllAgree}>
                            <CheckIcon term={isAllRequiredAgreeTerms}/>
                            <Text bold size={16}>약관에 모두 동의</Text>
                        </TermsAgree>
                        <DividerBlock
                            height={1}
                            marginVertical={16}
                            backgroundColor="#E9E9E9"
                        />
                        <TermsAgree onPress={() => handleSingleTerm('overAgeAgree', !overAgeAgree)}>
                            <CheckIcon term={overAgeAgree}/>
                            <Text size={16}>만 14세 이상입니다</Text>
                            <Spacer />
                            {ArrowIcon}
                        </TermsAgree>
                        <DividerBlock height={12} />
                        <TermsAgree onPress={() => handleSingleTerm('termsOfUseAgree', !termsOfUseAgree)}>
                            <CheckIcon term={termsOfUseAgree}/>
                            <Text size={16}>서비스 이용약관에 동의</Text>
                            <Spacer />
                            {ArrowIcon}
                        </TermsAgree>
                        <DividerBlock height={12} />
                        <TermsAgree onPress={() => handleSingleTerm('personalCollectAgree', !personalCollectAgree)}>
                            <CheckIcon term={personalCollectAgree}/>
                            <Text size={16}>개인정보 수집 이용에 동의</Text>
                            <Spacer />
                            {ArrowIcon}
                        </TermsAgree>
                        <DividerBlock height={12} />
                        <TermsAgree onPress={() => handleSingleTerm('marketingAgree', !marketingAgree)}>
                            <CheckIcon term={marketingAgree}/>
                            <Text size={16}>홍보 및 마케팅 이용에 동의</Text>
                            <Spacer />
                            {ArrowIcon}
                        </TermsAgree>
                        <DividerBlock height={12} />
                        <Complete
                            onPress={hanbleSubmitAgreeTerms}
                            disabled={!isAllRequiredAgreeTerms}
                            style={{
                                backgroundColor: isAllRequiredAgreeTerms ? theme.colors.primary : '#e9e9e9'
                            }}
                        >
                            <Text
                                size={16}
                                bold={isAllRequiredAgreeTerms}
                                color={isAllRequiredAgreeTerms ? theme.colors.white : theme.colors.placeholder}
                            >
                                동의
                            </Text>
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

const TermsAgree = styled.TouchableOpacity`
    flex-direction: row;
`
const Complete = styled.TouchableOpacity`
    padding: 16px;
    border-radius: 8px;
    align-items: center;
`
