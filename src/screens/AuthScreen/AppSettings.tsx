import AsyncStorage from '@react-native-community/async-storage'
import { useNavigation } from '@react-navigation/native'
import * as Sentry from "@sentry/react-native"
import * as Updates from 'expo-updates'
import i18n from 'i18n-js'
import React from 'react'
import { Alert, NativeModules } from 'react-native'
import { Icon } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/native'
import ListItem from '../../components/ListItem'
import useLoadingIndicator from '../../hooks/useLoadingIndicator'
import { SignType } from '../../models'
import { RootState } from '../../store/rootReducers'
import { leave, signOut } from '../../utils'

export default function AppSettings() {
    const { loading, setLoading, Indicator } = useLoadingIndicator()
    const { isLogged } = useSelector((state: RootState) => state.auth)
    // const dispatch = useDispatch()
    const navigation = useNavigation()

    const handleLogout = () => {
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
                        // NativeModules.DevSettings.reload()
                        await AsyncStorage.clear()
                        await Updates.reloadAsync()
                        // navigation.navigate('AppLogin', { screen: 'AppLogin' })
                    } catch (e) {
                        Sentry.captureException(e)
                        alert('로그아웃에 실패하였습니다. 잠시후 다시 시도해 주세요')
                    } finally {
                        setLoading(false)
                    }
                },
            },
        ])
    }

    const handleLeave = () => {
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
                        // NativeModules.DevSettings.reload()
                        await AsyncStorage.clear()
                        await Updates.reloadAsync()
                        // navigation.navigate('AppLogin', { screen: 'AppLogin' })
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

    return (
        <ScrollView>
            {loading && <Indicator />}
            <ListItem
                title={i18n.t('settings.settingPush')}
                onPress={() => { }}
                rightIcon={<Icon
                    name="keyboard-arrow-right"
                />}
            />
            {/* <ListItem
                title='캐시 데이터 지우기'
                onPress={() => { }}
            />
            <ListItem
                title='동영상 자동재생'
                onPress={() => { }}
            /> */}
            {isLogged &&
                <>
                    <ListItem
                        title={i18n.t('common.logout')}
                        onPress={handleLogout}
                    />
                    <ListItem
                        title={i18n.t('common.leave')}
                        onPress={handleLeave}
                    />
                </>
            }
            <ListItem
                title={`앱버전 v${Updates.manifest.version}`}
                onPress={() => { }}
            />
        </ScrollView>
    )
}



const Section = styled.View`
    margin-top: 16px;
`