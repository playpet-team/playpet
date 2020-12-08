import AsyncStorage from '@react-native-community/async-storage'
import { useNavigation } from '@react-navigation/native'
import * as Sentry from "@sentry/react-native"
import * as Updates from 'expo-updates'
import React, { useCallback } from 'react'
import { Alert, NativeModules } from 'react-native'
import { Icon } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import styled, { useTheme } from 'styled-components/native'
import ListItem from '../../components/ListItem'
import useLoadingIndicator from '../../hooks/useLoadingIndicator'
// import useUpdater from '../../hooks/useUpdater'
import { SignType } from '../../models'
import { RootState } from '../../store/rootReducers'
import { Text } from '../../styles'
import { leave, signOut } from '../../utils'

const updatesReload = async () => {
    await Updates.reloadAsync()
}

export default function AppSettings() {
    const { loading, setLoading, Indicator } = useLoadingIndicator()
    const { isLogged, availableUpdates } = useSelector((state: RootState) => state.auth)
    const theme = useTheme()
    // const { available } = useUpdater()

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
            <VersionText>
                {`앱버전 v${Updates.manifest.version || ''}`}
            </VersionText>
            {availableUpdates && <ListItem
                title='최신버전으로 재실행'
                onPress={updatesReload}
                titleStyle={{
                    fontWeight: 'bold',
                    color: theme.colors.primary,
                }}
            />}
        </ScrollView>
    )
}

const VersionText = styled.Text`
    padding: 16px;
    font-size: 15px;
`