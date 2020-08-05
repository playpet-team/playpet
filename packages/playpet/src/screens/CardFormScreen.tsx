import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { Input, Icon, Button } from 'react-native-elements';
import FitImage from 'react-native-fit-image';
// import * as ImagePicker from 'expo-image-picker';
// import ImagePicker, { ImagePickerResponse } from 'react-native-image-picker';
import ImagePicker, { Image } from 'react-native-image-crop-picker';
import { Video } from 'expo-av'
import VideoPlayer from 'expo-video-player'
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/storage';
import { useSelector } from 'react-redux';
import { RootState } from '../store/rootReducers';
import Constants from 'expo-constants';
import { askPermission, permissionType, deviceSize, submitCard, cardModel } from '../utils';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const isVideoType = (mime: string) => mime.indexOf('video') > -1;

export interface cardImage {
    id: string;
    uri: string;
    firebaseUrl: string;
    isVideo: boolean;
    width: number;
    height: number;
}
export default function CardFormScreen() {
    const { uid } = useSelector((state: RootState) => state.auth);
    const [title, setTitle] = useState('');
    // const [description, setDescription] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [tagField, setTagField] = useState('');
    const [cardImages, setCardImages] = useState<cardImage[]>([]);
    const [uploading, setUploading] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <SubmitButton
                    title={title}
                    tags={tags}
                    cardImages={cardImages}
                    uid={uid}
                />),
        });
    }, [title, tags, cardImages, uid]);

    const getPermissionAsync = async () => {
        if (Constants.platform?.ios) {
            await askPermission(permissionType.CAMERA_ROLL);
        }
    };

    const openPicker = async () => {
        await getPermissionAsync();
        const response: Image | any = await ImagePicker.openPicker({
            width: 1080,
            height: 1920,
        });
        console.log('111');
        addCardImage(response);
    };

    const addCardImage = async (response: Image | any) => {
        console.log('222');
        if (response.cancelled) {
            return;
        }
        console.log('333');
        setUploading(true);
        const tempId = `${uid}_${firestore.Timestamp.now().seconds}`;
        try {
            // 빠른반응을 위해 업로드전 우선 preview 시켜준다
            console.log('444');
            setCardImages([
                ...cardImages,
                {
                    id: tempId,
                    isVideo: isVideoType(response.mime),
                    firebaseUrl: '',
                    uri: response.path,
                    width: response.width,
                    height: response.height,
                }
            ]);
            console.log('--------', isVideoType(response.mime));
        } catch (e) {
            removeUploadImage(tempId);
            console.error(e);
        } finally {
            setUploading(false);
        }
    };

    const removeUploadImage = (tempId: string) => {
        const newCardImages = [...cardImages];
        newCardImages.splice(cardImages.findIndex(({ id }) => id === tempId), 1);
        setCardImages(newCardImages);
    };

    const handleVideoRef = (component: any) => {
        console.log('component------', component);
    };

    return (
        <CardBlock>
            <Text>CardForm</Text>
            <InputTextGroup>
                <Input
                    placeholder='Title 필수'
                    value={title}
                    onChangeText={value => setTitle(value)}
                />
                <Input
                    placeholder='#댕댕이'
                    value={tagField}
                    onChangeText={value => {
                        if (value.slice(-1) === ' ') {
                            setTagField('');
                            setTags([...tags, tagField]);
                        } else {
                            setTagField(value);
                        }

                    }}
                />
                {/* <Input
                    placeholder='Description 선택?'
                    multiline
                    value={description}
                    onChangeText={value => setDescription(value)}
                    inputStyle={{
                        minHeight: 100,
                    }}
                /> */}

                <DisplayTags
                    tags={tags}
                />
            </InputTextGroup>
            <UploadImageBlock>
                {!uploading && !cardImages.length &&
                    <UploadImage onPress={openPicker}>
                        <Icon name="get-app" />
                    </UploadImage>
                }
            </UploadImageBlock>
            {uploading && <Text>uploading...</Text>}
            <UploadedImageBlock>
                {cardImages.map(card => {
                    if (card.isVideo) {
                        <VideoPlayer
                            videoProps={{
                                resizeMode: Video.RESIZE_MODE_COVER,
                                source: { uri: card.uri },
                            }}
                        />
                    }
                    return (
                        <FitImageBlock
                            key={card.id}
                            uploading={uploading}
                            resizeMode='cover'
                            source={{ uri: card.uri }}
                            originalWidth={card.width}
                            originalHeight={card.height}
                        />
                    )
                })}
            </UploadedImageBlock>
        </CardBlock>
    );
};

interface SubmitType {
    cardImages: cardImage[];
    uid: string;
    title: string;
    tags: string[];
}
function SubmitButton({ cardImages, uid, title, tags }: SubmitType) {
    const [isSubmitLoading, setSubmitLoading] = useState(false);
    const formSubmit = async () => {
        setSubmitLoading(true);
        const downloadUrls = await startUploadStorage();
        const formData: cardModel = {
            title,
            tags,
            uid,
            uploadMedia: cardImages.map((image, index) => ({
                firebaseUrl: downloadUrls[index],
                isVideo: image.isVideo,
                width: image.width,
                height: image.height,
            })),
            createdAt: firestore.Timestamp.now(),
            updatedAt: firestore.Timestamp.now(),
        };
        const response = await submitCard(formData);
        setSubmitLoading(false);
    };
    const startUploadStorage = async () => {
        return await Promise.all(
            cardImages.map(async (image) => {
                const reference = firebase.storage().ref(`playground/${uid}_${firestore.Timestamp.now().seconds}`);
                await reference.putFile(image.uri);
                return reference.getDownloadURL();
            })
        );
    };
    return (
        <Button
            title="저장"
            disabled={isSubmitLoading}
            onPress={formSubmit}
        />
    );
};

interface Tags {
    tags: string[];
}
function DisplayTags({ tags }: Tags) {
    const { length } = tags;
    return (
        <DisplayTagsBlock>
            {tags.map((tag, i) => (
                <Tag key={i}>#{tag}</Tag>
            ))}
        </DisplayTagsBlock>
    );
};

const Tag = styled.Text`
    padding: 4px;
    color: blue;
`;

const DisplayTagsBlock = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
`;

const CardBlock = styled.ScrollView`
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
