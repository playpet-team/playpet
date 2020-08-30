import { cardImage } from '../screens/CardFormScreen';
import ImagePicker, { ImagePickerResponse } from 'react-native-image-picker';
// import * as ImagePicker from 'expo-image-picker';
// expo-image-picker 를 사용하지 않은 이유: upload 된 video 가 아이폰의경우 quicktime 용으로로만 올라가기 때문에 기타 장비에서는 재생이 불가능 (크롬, 안드로이드 등)
// 하지만 react-native-image-picker의 경우 mp4로 convert 시키는 기능이 있음
import * as VideoThumbnails from 'expo-video-thumbnails';
import React, { useCallback } from 'react';
import Constants from 'expo-constants';
import { askPermission, firebaseNow, PermissionsList } from '../utils';

export interface Form {
    title: string;
    description: string;
    tags: string[];
    tagField: string;
    cardImages: cardImage[];
};

export const formReset: Form = {
    title: '',
    description: '',
    tags: [],
    tagField: '',
    cardImages: [],
};

function useImagePicker({ setLoading, setForm, form, uid }: {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setForm: React.Dispatch<React.SetStateAction<Form>>;
    form: Form;
    uid: string;
}) {
    // react-native-image-picker
    const openPicker = useCallback(async () => {
        await getPermissionAsync();
        await ImagePicker.launchImageLibrary({
            mediaType: 'video',
            allowsEditing: true,
            videoQuality: 'medium',
            durationLimit: 30,
        }, addCardImage);
    }, []);

    // expo-image-picker
    // const openPicker = useCallback(async () => {
    //     await getPermissionAsync();
    //     const response: ImagePicker.ImagePickerResult = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.Videos,
    //         // videoExportPreset: ImagePicker.VideoExportPreset.MediumQuality,
    //         allowsEditing: true,
    //         quality: 1,
    //     });
    //     addCardImage(response);
    // }, []);

    const addCardImage = async (response: ImagePickerResponse) => {
        // response.
        if (response.didCancel || response.error || !response.uri) {
            return;
        }
        const { uri, width, height, } = response;

        setLoading(true);
        // 빠른반응을 위해 업로드전 우선 preview 시켜준다

        const tempId = `${uid}_${firebaseNow().seconds}`;
        let videoThumbnail = '';
        try {
            const thumbnail = await VideoThumbnails.getThumbnailAsync(
                uri,
                {
                    time: 1500,
                }
            );
            videoThumbnail = thumbnail.uri;
        } catch (e) {

        }
        // }
        try {
            setForm({
                ...form,
                cardImages: [
                    ...form.cardImages,
                    {
                        id: tempId,
                        isVideo: true,
                        url: '',
                        videoThumbnail,
                        uri,
                        width,
                        height,
                    }
                ],
            });
            console.log('videoThumbnail', response, videoThumbnail);
        } catch (e) {
            removeUploadImage(tempId);
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const removeUploadImage = (tempId: string) => {
        setForm({
            ...form,
            cardImages: form.cardImages.filter(({ id }) => id !== tempId),
        });
    };

    return {
        openPicker,
        form,
    }
}

export default useImagePicker;

const getPermissionAsync = async () => {
    if (Constants.platform?.ios) {
        await askPermission(PermissionsList.CAMERA_ROLL);
    }
};

const isVideoType = (type: string) => type === 'video';
