import * as Updates from 'expo-updates';
import { useEffect, useState } from 'react';
import { UpdateEventType } from 'expo-updates';

export default function useUpdater() {
    const [available, setAvailable] = useState(false)
    const [listener, setListener] = useState<any>(null)

    useEffect(() => {
        const responseListener = updateListener(setAvailable)
        setListener(responseListener)
        check()
        async function check() {
            if (!available) {
                return
            }
            // const { isAvailable } = await Updates.checkForUpdateAsync()
            // if (isAvailable) {
            await Updates.fetchUpdateAsync();
            reloadUpdatedApp()
            // }
        }
        return () => listener?.remove()
    }, [available])
}

const updateListener = (setAvailable: React.Dispatch<React.SetStateAction<boolean>>) => {
    return Updates.addListener(({ type }) => {
        console.log("-------------", type)
        setAvailable(type === UpdateEventType.UPDATE_AVAILABLE)
    })
}

const reloadUpdatedApp = () => Updates.reloadAsync()
