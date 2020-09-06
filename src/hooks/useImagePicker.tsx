import { CardImage } from '../screens/CardFormScreen'
import ImagePicker, { ImagePickerResponse } from 'react-native-image-picker'
// import * as ImagePicker from 'expo-image-picker'
// expo-image-picker 를 사용하지 않은 이유: upload 된 video 가 아이폰의경우 quicktime 용으로로만 올라가기 때문에 기타 장비에서는 재생이 불가능 (크롬, 안드로이드 등)
// 하지만 react-native-image-picker의 경우 mp4로 convert 시키는 기능이 있음
import * as VideoThumbnails from 'expo-video-thumbnails'
import React, { useCallback } from 'react'
import Constants from 'expo-constants'
import { askPermission, firebaseNow, PermissionsList } from '../utils'
import { useSelector } from 'react-redux'
import { RootState } from '../store/rootReducers'
import * as Sentry from "@sentry/react-native";

function useImagePicker({ setLoading, uploadCallback, form, updateType = 'video' }: {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    uploadCallback: Function
    form: object
    updateType?: 'video' | 'photo',
}) {
    // react-native-image-picker
    const { uid } = useSelector((state: RootState) => state.auth)

    const openPicker = useCallback(async () => {
        await getPermissionAsync()
        await ImagePicker.launchImageLibrary({
            mediaType: updateType,
            allowsEditing: true,
            videoQuality: updateType === 'video' ? 'medium' : 'high',
            durationLimit: 30,
            noData: true,
            storageOptions: {
                cameraRoll: true,
                waitUntilSaved: true,
            }
        }, addCardImage)
    }, [])

    const getThumbnail = useCallback(async (path: string | undefined, fileUri: string) => {
        try {
            // android 의 경우 uri 가 content:// 로 오기 때문에 file read 를 할수가 없다. path를 받아서 file:// 로 변환해야 인식됨
            const uploadedPath = path ? `file://${path}` : fileUri
            const { uri, width, height } = await VideoThumbnails.getThumbnailAsync(
                uploadedPath,
                {
                    quality: 0.5,
                    time: 1000,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                }
            )
            return {
                videoThumbnail: uri,
                width, height,
                isError: false,
            }
        } catch (e) {
            Sentry.captureException(e)
            return {
                isError: true,
            }
        }
    }, [])

    const addCardImage = useCallback(async (response: ImagePickerResponse) => {
        if (response.didCancel || response.error || !response.uri) {
            return
        }
        const { path, uri } = response
        setLoading(true)
        const tempId = `${uid}_${firebaseNow().seconds}`
        if (updateType === 'video') {
            const { videoThumbnail = '', width = 0, height = 0, isError = false } = await getThumbnail(path, uri)
            if (isError === true) {
                return alert('업로드에 실패했습니다')
            }
            uploadCallback({
                id: tempId,
                isVideo: true,
                url: '',
                videoThumbnail,
                uri,
                width,
                height,
            })
        } else if (updateType === 'photo') {
            uploadCallback({
                uri,
            })
        }
        setLoading(false)
    }, [])

    return {
        openPicker,
    }
}

export default useImagePicker

const getPermissionAsync = async () => {
    if (Constants.platform?.ios) {
        await askPermission(PermissionsList.CAMERA_ROLL)
    }
}

// expo-image-picker
// const openPicker = useCallback(async () => {
//     await getPermissionAsync()
//     const response: ImagePicker.ImagePickerResult = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Videos,
//         // videoExportPreset: ImagePicker.VideoExportPreset.MediumQuality,
//         allowsEditing: true,
//         quality: 1,
//     })
//     addCardImage(response)
// }, [])