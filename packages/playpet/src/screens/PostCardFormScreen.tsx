import React, { useState } from 'react';
import styled from '@emotion/native';
import { Input, Text, Icon } from 'react-native-elements';
import FitImage from 'react-native-fit-image';
import * as ImagePicker from 'expo-image-picker';
// import ImagePicker, { ImagePickerResponse } from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/storage';
import { useSelector } from 'react-redux';
import { RootState } from '../store/rootReducers';
import Constants from 'expo-constants';
import { askPermission, permissionType } from '../utils';

const options = {
    title: '우리아이 사진을 공유 해보세요',
    quality: 0.5,
    mediaType: 'mixed',
    videoQuality: 'medium',
    durationLimit: 50,
    // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

interface postImage {
    id: string;
    uri: string;
    width: number;
    height: number;
}
export default function PostCardFormScreen() {
    const { uid } = useSelector((state: RootState) => state.auth);
    // const [postImages, setPostImages] = useState<postImage[]>([]);
    const [postImages, setPostImages] = useState<postImage[]>([]);
    const [uploading, setUploading] = useState(false);

    const getPermissionAsync = async () => {
        if (Constants.platform?.ios) {
            await askPermission(permissionType.CAMERA_ROLL);
        }
    };

    // const openPicker = () => ImagePicker.showImagePicker(options, onReadFile);
    const openPicker = async () => {
        await getPermissionAsync();
        const response: ImagePicker.ImagePickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 0.6,
        });
        startUploadStorage(response);
    };

    const startUploadStorage = async (response: ImagePicker.ImagePickerResult) => {
        setUploading(true);
        if (response.cancelled) {
            return;
        }
        const tempId = `${uid}_${firestore.Timestamp.now().seconds}`;
        try {
            // 빠른반응을 위해 업로드전 우선 preview 시켜준다
            setPostImages([
                ...postImages,
                {
                    id: tempId,
                    uri: response.uri,
                    width: response.width,
                    height: response.height,
                }
            ]);

            const reference = firebase.storage().ref(`playground/${uid}_${firestore.Timestamp.now().seconds}`);
            await reference.putFile(response.uri);
        } catch (e) {
            removeUploadImage(tempId);
            console.error(e);
        } finally {
            setUploading(false);
        }
    };

    const removeUploadImage = (tempId: string) => {
        const newPostImages = [...postImages];
        newPostImages.splice(postImages.findIndex(({ id }) => id === tempId), 1);
        setPostImages(newPostImages);
    }
    return (
        <PostCardBlock>
            <Text>Post</Text>
            <InputTextGroup>
                <Input
                    placeholder='Title 필수'
                />
                <Input
                    placeholder='Description 선택?'
                    multiline
                    inputStyle={{
                        minHeight: 100,
                    }}
                />
            </InputTextGroup>
            <UploadImageBlock>
                {!uploading && !postImages.length &&
                    <UploadImage onPress={openPicker}>
                        <Icon name="get-app" />
                    </UploadImage>
                }
            </UploadImageBlock>
            {uploading && <Text>uploading...</Text>}
            <UploadedImageBlock>
                {postImages.map(post => (
                    <FitImageBlock
                        key={post.id}
                        uploading={uploading}
                        resizeMode='cover'
                        source={{ uri: post.uri }}
                        originalWidth={post.width}
                        originalHeight={post.height}
                    />
                ))}
            </UploadedImageBlock>
        </PostCardBlock>
    );
};

const PostCardBlock = styled.ScrollView`
    flex: 1;
`;

const InputTextGroup = styled.View`
    flex-direction: column;
`;

const UploadImageBlock = styled.View`
    align-items: center;
    justify-content: center;
`;

const FitImageBlock = styled(FitImage)`
`;

const UploadedImageBlock = styled.View`
    flex: 1;
`;

const UploadImage = styled.TouchableOpacity`
    border-width: 1px;
    border-style: solid;
    border-color: #999;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 200px;
`;
