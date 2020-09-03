import * as Updates from 'expo-updates';
import { useEffect, useState } from 'react';
import { UpdateEventType } from 'expo-updates';

export default function useUpdater(forceUpdate = true) {
    const [available, setAvailable] = useState(false)
    const [listener, setListener] = useState<any>(null)

    useEffect(() => {
        return () => typeof listener === 'function' && listener()
    }, [])

    useEffect(() => {
        const responseListener = updateListener(setAvailable)
        setListener(responseListener)

        fetchUpdate()
        async function fetchUpdate() {
            if (!available) {
                return
            }
            await Updates.fetchUpdateAsync();
            if (forceUpdate) {
                reloadUpdatedApp()
            }
        }
    }, [available])

    return {
        available,
    }
}

const updateListener = (setAvailable: React.Dispatch<React.SetStateAction<boolean>>) => {
    return Updates.addListener(({ type }) => setAvailable(type === UpdateEventType.UPDATE_AVAILABLE))
}

const reloadUpdatedApp = () => Updates.reloadAsync()
