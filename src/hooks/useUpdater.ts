import { authActions } from './../store/authReducer'
import { useDispatch } from 'react-redux'
import { AppState, AppStateStatus } from 'react-native'
import * as Updates from 'expo-updates'
import { useEffect } from 'react'

let beforeAppState = ''
export default function useUpdater() {
    const dispatch = useDispatch()

    useEffect(() => {
        AppState.addEventListener('change', changeAppState)
        return () => {}
    }, [])

    const checkUpdateAsync = async () => {
        if (__DEV__) {
            return false
        }
        const update = await Updates.checkForUpdateAsync()
        await Updates.fetchUpdateAsync()
        dispatch(authActions.setAvailableUpdates(update.isAvailable))
    }

    const changeAppState = async (nextAppState: AppStateStatus) => {
        if (beforeAppState.match(/inactive|background/) && nextAppState === 'active') {
            await checkUpdateAsync()
        }
        beforeAppState = nextAppState
    }
}
