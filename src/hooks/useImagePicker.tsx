import { cardImage } from '../screens/CardFormScreen';
import * as ImagePicker from 'expo-image-picker';
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
    const openPicker = useCallback(async () => {
        await getPermissionAsync();
        const response: ImagePicker.ImagePickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            // videoExportPreset: ImagePicker.VideoExportPreset.MediumQuality,
            allowsEditing: true,
            quality: 1,
        });
        addCardImage(response);
    }, []);

    const addCardImage = async (response: any) => {
        if (response.cancelled === true) {
            return;
        }

        setLoading(true);
        const tempId = `${uid}_${firebaseNow().seconds}`;
        let videoThumbnails = '';
        try {
            // 빠른반응을 위해 업로드전 우선 preview 시켜준다
            if (isVideoType(response.type)) {
                if (!response.uri) {
                    return;
                }
                const { uri } = await VideoThumbnails.getThumbnailAsync(
                    response.uri,
                    {
                        time: 1500,
                    }
                );
                videoThumbnails = uri;
            }
            setForm({
                ...form,
                cardImages: [
                    ...form.cardImages,
                    {
                        id: tempId,
                        isVideo: isVideoType(response.type),
                        url: '',
                        videoThumbnails,
                        uri: response.uri,
                        width: response.width,
                        height: response.height,
                    }
                ],
            });
            console.log('videoThumbnails', response, videoThumbnails);
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
