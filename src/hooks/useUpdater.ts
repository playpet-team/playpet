import { authActions } from './../store/authReducer';
import { useDispatch } from 'react-redux';
import { Alert, AppState, AppStateStatus } from 'react-native';
import * as Updates from 'expo-updates'
import { useCallback, useEffect, useState } from 'react'
import { UpdateEventType } from 'expo-updates'

let beforeAppState = ''
export default function useUpdater(forceUpdate = false) {
    const dispatch = useDispatch()

    useEffect(() => {
        AppState.addEventListener('change', changeAppState);
        return () => {}
    }, [])
    
    // useEffect(() => {
    //     if (!available) {
    //         return
    //     }
    //     fetchUpdate()
    //     async function fetchUpdate() {
    //         await Updates.fetchUpdateAsync()
    //         if (forceUpdate) {
    //             reloadUpdatedApp()
    //         }
    //         // else {
    //         //     Alert.alert('새로운 업데이트가 있습니다', '지금 바로 업데이트하세요!', [
    //         //         {
    //         //             text: '업데이트',
    //         //             onPress: reloadUpdatedApp,
    //         //         },
    //         //     ])
    //         // }
    //     }
    // }, [available, forceUpdate])

    const checkUpdateAsync = async () => {
        if (__DEV__) {
            return false
        }
        const update = await Updates.checkForUpdateAsync();
        dispatch(authActions.setAvailableUpdates(update.isAvailable))
        // setAvailable(update.isAvailable)
    }

    const changeAppState = async (nextAppState: AppStateStatus) => {
        if (beforeAppState.match(/inactive|background/) && nextAppState === 'active') {
            await checkUpdateAsync()
        }
        beforeAppState = nextAppState
    }
}

// const updateListener = (setAvailable: React.Dispatch<React.SetStateAction<boolean>>) => {
//     return Updates.addListener(async ({ type }) => setAvailable(type === UpdateEventType.UPDATE_AVAILABLE))
// }

const reloadUpdatedApp = () => Updates.reloadAsync()
