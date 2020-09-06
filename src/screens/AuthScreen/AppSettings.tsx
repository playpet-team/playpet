import React, { useState, useEffect } from 'react'
import styled from 'styled-components/native'

import { ScrollView } from 'react-native-gesture-handler'
import { Icon } from 'react-native-elements'
import { Layout, Text, DividerBlock } from '../../styles'
import ListItem from '../../components/ListItem'
import i18n from 'i18n-js'
import { Alert } from 'react-native'
import { leave, appReload, signOut } from '../../utils'
import useLoadingIndicator from '../../hooks/useLoadingIndicator'
import AsyncStorage from '@react-native-community/async-storage'
import { SignType } from '../../models'
import * as Sentry from "@sentry/react-native";
import * as Updates from 'expo-updates';

export default function AppSettings() {
    const { loading, setLoading, Indicator } = useLoadingIndicator()
    return (
        <ScrollView>
            {loading && <Indicator />}
            <ListItem
                title='푸시 설정'
                onPress={() => { }}
                rightIcon={<Icon
                    name="keyboard-arrow-right"
                />}
            />
            <ListItem
                title='캐시 데이터 지우기'
                onPress={() => { }}
            />
            <ListItem
                title='동영상 자동재생'
                onPress={() => { }}
            />
            <ListItem
                title={i18n.t('common.logout')}
                onPress={() => handleLogout(setLoading)}
            />
            <ListItem
                title={i18n.t('common.leave')}
                onPress={() => handleLeave(setLoading)}
            />
        </ScrollView>
    )
}

const handleLogout = (setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    Alert.alert('정말로 로그아웃하시게요?', '', [
        {
            text: '취소',
        },
        {
            text: '로그아웃',
            onPress: async () => {
                try {
                    setLoading(true)
                    await signOut(SignType.Google)
                    AsyncStorage.clear()
                    Updates.reloadAsync()
                } catch (e) {
                    Sentry.captureException(e)
                    alert('로그아웃에 실패하였습니다. 잠시후 다시 시도해 주세요')
                } finally {
                    // setLoading(false)
                }
            },
        },
    ])
}

const handleLeave = (setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    Alert.alert('정말로 탈퇴하시게요?', '', [
        {
            text: '취소',
        },
        {
            text: '탈퇴하기',
            onPress: async () => {
                try {
                    setLoading(true)
                    await leave()
                    AsyncStorage.clear()
                    Updates.reloadAsync()
                } catch (e) {
                    Sentry.captureException(e)
                    alert('회원탈퇴에 실패하였습니다. 잠시후 다시 시도해 주세요')
                } finally {
                    setLoading(false)
                }
            },
        },
    ])
}

const Section = styled.View`
    margin-top: 16px;
`