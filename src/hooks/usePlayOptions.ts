import AsyncStorage from '@react-native-community/async-storage'
import { useState, useEffect } from 'react'
import * as Sentry from "@sentry/react-native";

function usePlayOptions() {
    const [isLoading, setIsLoading] = useState(false)
    const [isPlaySound, setIsPlaySound] = useState(true)
    const [isAutoPlay, setIsAutoPlay] = useState(true)

    useEffect(() => {
        async function loadPlaySound() {
            try {
                setIsLoading(true)
                const response = await AsyncStorage.getItem('playSound')
                if (response) {
                    const { value } = JSON.parse(response)
                    setIsPlaySound(Boolean(value) !== false)
                }
            } catch (e) {
                Sentry.captureException(e)
            } finally {
                setIsLoading(false)
            }
        }
        if (isLoading) {
            return
        }
        loadPlaySound()
    }, [])

    useEffect(() => {
        async function loadAutoPlay() {
            try {
                const response = await AsyncStorage.getItem('autoPlay')
                if (response) {
                    const { value } = JSON.parse(response)
                    setIsAutoPlay(Boolean(value) !== false)
                }
            } catch (e) {
                Sentry.captureException(e)
            }
        }
        loadAutoPlay()
    }, [])

    const toggleIsAutoPlay = async () => {
        try {
            setIsAutoPlay(!isAutoPlay)
            await AsyncStorage.setItem('autoPlay', JSON.stringify({
                value: !isAutoPlay,
            }))
        } catch (e) {
            Sentry.captureException(e)
        }
    }
    
    const toggleIsPlaySound = async () => {
        try {
            setIsPlaySound(!isPlaySound)
            await AsyncStorage.setItem('playSound', JSON.stringify({
                value: !isPlaySound,
            }))
        } catch (e) {
            Sentry.captureException(e)
        }
    }

    return { isPlaySound, isAutoPlay, toggleIsAutoPlay, toggleIsPlaySound }
}

export default usePlayOptions

