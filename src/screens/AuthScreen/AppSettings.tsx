import AsyncStorage from '@react-native-community/async-storage'
import { useNavigation } from '@react-navigation/native'
import * as Sentry from "@sentry/react-native"
import * as Updates from 'expo-updates'
import React, { useCallback } from 'react'
import { Alert, NativeModules } from 'react-native'
import { Icon } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/native'
import ListItem from '../../components/ListItem'
import useLoadingIndicator from '../../hooks/useLoadingIndicator'
import useUpdater from '../../hooks/useUpdater'
import { SignType } from '../../models'
import { RootState } from '../../store/rootReducers'
import { leave, signOut } from '../../utils'

const updatesReload = async () => {
    await Updates.reloadAsync()
}

export default function AppSettings() {
    const { loading, setLoading, Indicator } = useLoadingIndicator()
    const { isLogged } = useSelector((state: RootState) => state.auth)
    const { available } = useUpdater()

    const handleAction = useCallback(async (method: 'logout' | 'leave') => {
        try {
            setLoading(true)
            if (method === 'logout') {
                await signOut(SignType.Google)
            } else {
                await leave()
            }
            await AsyncStorage.clear()
            await Updates.reloadAsync()
        } catch (e) {
            Sentry.captureException(e)
            if (method === 'logout') {
            } else {
            }
            alert(`${method === 'logout' ? '로그아웃' : '탈퇴'}에 실패하였습니다. 잠시후 다시 시도해 주세요`)
        } finally {
            setLoading(false)
        }
    }, [setLoading])

    const handleLogout = () => {
        Alert.alert('정말로 로그아웃하시게요?', '', [
            {
                text: '취소',
            },
            {
                text: '로그아웃',
                onPress: () => handleAction('logout'),
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
                onPress: () => handleAction('leave'),
            },
        ])
    }

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
            {isLogged &&
                <>
                    <ListItem
                        title='로그아웃'
                        onPress={handleLogout}
                    />
                    <ListItem
                        title='회원탈퇴'
                        onPress={handleLeave}
                    />
                </>
            }
            <ListItem
                title={`앱버전 v${Updates.manifest.version}`}
                onPress={() => { }}
            />
            {available && <ListItem
                title='최신버전으로 재실행'
                onPress={updatesReload}
            />}
        </ScrollView>
    )
}



const Section = styled.View`
    margin-top: 16px;
`