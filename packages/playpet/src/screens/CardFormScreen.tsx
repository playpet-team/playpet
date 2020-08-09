import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { Input, Icon } from 'react-native-elements';
import FitImage from 'react-native-fit-image';
import ImagePicker, { Image } from 'react-native-image-crop-picker';
import { Video } from 'expo-av'
import VideoPlayer from 'expo-video-player'
import * as VideoThumbnails from 'expo-video-thumbnails';
import { useSelector } from 'react-redux';
import { RootState } from '../store/rootReducers';
import Constants from 'expo-constants';
import { askPermission, PermissionsList, deviceSize, submitCard, CardModel, firebaseNow } from '../utils';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SubmitButton from './CardFormScreen/SubmitButton';

const isVideoType = (mime: string) => mime.indexOf('video') > -1;

export interface cardImage {
    id: string;
    uri: string;
    firebaseUrl: string;
    videoThumbnails?: string;
    isVideo: boolean;
    width: number;
    height: number;
}
const getPermissionAsync = async () => {
    if (Constants.platform?.ios) {
        await askPermission(PermissionsList.CAMERA_ROLL);
    }
};

export default function CardFormScreen() {
    const { uid } = useSelector((state: RootState) => state.auth);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
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
                    description={description}
                    cardImages={cardImages}
                    uid={uid}
                />
            ),
        });
    }, [title, tags, description, cardImages, uid]);

    const openPicker = async () => {
        await getPermissionAsync();
        const response: Image | any = await ImagePicker.openPicker({
            mediaType: 'video',
            loadingLabelText: '동영상을 업로드 중입니다',
            // cropping: true,
            // width: 1080,
            // height: 1920,
        });
        addCardImage(response);
    };

    const addCardImage = async (response: Image | any) => {
        if (response.cancelled) {
            return;
        }
        console.log('response-------', response);
        setUploading(true);
        const tempId = `${uid}_${firebaseNow().seconds}`;
        let videoThumbnails = '';
        try {
            // 빠른반응을 위해 업로드전 우선 preview 시켜준다
            if (isVideoType(response.mime)) {
                const { uri } = await VideoThumbnails.getThumbnailAsync(
                    response.path,
                    {
                        time: 1500,
                    }
                );
                videoThumbnails = uri;
                console.log("uri------", uri);
            }
            setCardImages([
                ...cardImages,
                {
                    id: tempId,
                    isVideo: isVideoType(response.mime),
                    firebaseUrl: '',
                    videoThumbnails,
                    uri: response.path,
                    width: response.width,
                    height: response.height,
                }
            ]);
        } catch (e) {
            removeUploadImage(tempId);
            console.error(e);
        } finally {
            setUploading(false);
        }
    };

    const removeUploadImage = (tempId: string) => setCardImages(cardImages.filter(({ id }) => id !== tempId));

    return (
        <CardBlock>
            <Text>CardForm</Text>
            <InputTextGroup>
                <Input
                    placeholder='Title 필수'
                    value={title}
                    onChangeText={(value: string) => setTitle(value)}
                />
                <Input
                    placeholder='#댕댕이'
                    value={tagField}
                    onChangeText={(value: string) => {
                        if (value.slice(-1) === ' ') {
                            setTagField('');
                            setTags([...tags, tagField]);
                        } else {
                            setTagField(value);
                        }

                    }}
                />
                <InputDescription
                    placeholder='Description 선택?'
                    multiline
                    value={description}
                    onChangeText={(value: string) => setDescription(value)}
                />

                <DisplayTags tags={tags} />
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
                        <FitImageBlock
                            key={card.id}
                            uploading={uploading}
                            resizeMode='contain'
                            source={{ uri: card.videoThumbnails }}
                            originalWidth={card.width}
                            originalHeight={card.height}
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

interface Tags {
    tags: string[];
}
function DisplayTags({ tags }: Tags) {
    return (
        <DisplayTagsBlock>
            {tags.map((tag, i) => (
                <Tag key={i}>#{tag}</Tag>
            ))}
        </DisplayTagsBlock>
    );
};

const InputDescription = styled(Input)`
    min-height: 100px;
`;

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
