import { CardImage } from "../CardFormScreen"
import React, { useState } from "react"
import { CardModel, submitCard, firebaseNow } from "../../utils"
import { firebase } from '@react-native-firebase/storage'
import { Button } from 'react-native-elements'
import { RootState } from "../../store/rootReducers"
import { useSelector } from "react-redux"
import { Alert } from "react-native"
import * as Sentry from "@sentry/react-native";

interface Submit {
    cardImages: CardImage[]
    title: string
    description: string
    tags: string[]
    onSubmitCallback: Function
    containerStyle?: object
    buttonStyle?: object
    loading: boolean
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}
function SubmitButton({
    cardImages,
    title,
    description,
    tags,
    containerStyle = {},
    buttonStyle = {},
    onSubmitCallback,
    loading,
    setLoading,

}: Submit) {
    const { uid, username } = useSelector((state: RootState) => state.auth)

    const formSubmit = async () => {
        setLoading(true)
        const downloadUrls = await startUploadStorage()
        if (!downloadUrls) {
            setLoading(false)
            Alert.alert('포스팅에 실패했습니다. 잠시 후 다시 시도해주세요')
            return
        }
        try {
            const formData: CardModel = {
                id: '',
                likes: 0,
                status: 'active',
                title,
                description,
                tags,
                uid,
                username,
                contents: cardImages.map((image, index) => ({
                    url: downloadUrls[index].url,
                    videoThumbnail: downloadUrls[index].thumbnail,
                    isVideo: image.isVideo,
                    width: image.width,
                    height: image.height,
                })),
                createdAt: firebaseNow(),
                updatedAt: firebaseNow(),
            }
            await submitCard(formData)
        } catch (e) {
            Sentry.captureException(e)
            console.error(e)
        } finally {
            setLoading(false)
        }
        onSubmitCallback()
    }

    const startUploadStorage = async () => {
        try {
            return await Promise.all(
                cardImages.map(async (image) => {
                    const urls = {
                        url: '',
                        thumbnail: '',
                    }
                    const reference = firebase.storage().ref(`playground/${uid}_${firebaseNow().seconds}`)
                    await reference.putFile(image.uri)
                    urls.url = await reference.getDownloadURL()
                    if (image.videoThumbnail) {
                        const reference = firebase.storage().ref(`playground/${uid}_${firebaseNow().seconds}_thumbnail.jpg`)
                        await reference.putFile(image.videoThumbnail)
                        urls.thumbnail = await reference.getDownloadURL()
                    }
                    return urls
                })
            )
        } catch (e) {
            Sentry.captureException(e)
            console.error(e)
        }
    }

    return (
        <Button
            title="자랑하기"
            disabled={loading}
            onPress={formSubmit}
            style={{
            }}
            containerStyle={containerStyle}
            buttonStyle={{
                padding: 16,
            }}
            titleStyle={{
                fontWeight: '800',
            }}
        />
    )
}

export default SubmitButton