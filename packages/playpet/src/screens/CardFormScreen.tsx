import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { Input, Icon } from 'react-native-elements';
import FitImage from 'react-native-fit-image';
import * as ImagePicker from 'expo-image-picker';
import * as VideoThumbnails from 'expo-video-thumbnails';
import { useSelector } from 'react-redux';
import { RootState } from '../store/rootReducers';
import Constants from 'expo-constants';
import { askPermission, PermissionsList, firebaseNow } from '../utils';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SubmitButton from './CardFormScreen/SubmitButton';
import useLoadingIndicator from '../hooks/useLoadingIndicator';

export default function CardFormScreen() {
    const { loading, setLoading, Indicator } = useLoadingIndicator();
    const { uid } = useSelector((state: RootState) => state.auth);
    const [form, setForm] = useState<Form>(formReset);
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <SubmitButton
                    {...form}
                    uid={uid}
                    onSubmitCallback={reset}
                />
            ),
        });
    }, [form, uid]);

    const reset = () => setForm(formReset);

    const openPicker = async () => {
        await getPermissionAsync();
        const response: any = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            // videoExportPreset: ImagePicker.VideoExportPreset.MediumQuality,
            allowsEditing: true,
            quality: 1,
        });
        addCardImage(response);
    };

    const addCardImage = async (response: any) => {
        if (response.cancelled) {
            return;
        }
        setLoading(true);
        const tempId = `${uid}_${firebaseNow().seconds}`;
        let videoThumbnails = '';
        try {
            // 빠른반응을 위해 업로드전 우선 preview 시켜준다
            if (isVideoType(response)) {
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
                        isVideo: isVideoType(response),
                        firebaseUrl: '',
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

    return (
        <CardBlock>
            {loading && <Indicator />}
            <Text>CardForm</Text>
            <InputTextGroup>
                <Input
                    placeholder='Title 필수'
                    value={form.title}
                    onChangeText={(value: string) => setForm({
                        ...form,
                        title: value,
                    })}
                />
                <Input
                    placeholder='#댕댕이'
                    value={form.tagField}
                    onChangeText={(value: string) => {
                        if (value.slice(-1) === ' ') {
                            setForm({
                                ...form,
                                tags: [...form.tags, form.tagField],
                                tagField: '',
                            })
                        } else {
                            setForm({
                                ...form,
                                tagField: value,
                            })
                        }
                    }}
                />
                <InputDescription
                    placeholder='Description 선택?'
                    multiline
                    value={form.description}
                    onChangeText={(value: string) => {
                        setForm({
                            ...form,
                            description: value,
                        });
                    }}
                />
                <DisplayTags tags={form.tags} />
            </InputTextGroup>
            <UploadImageBlock>
                {!loading && !form.cardImages.length &&
                    <UploadImage onPress={openPicker}>
                        <Icon name="get-app" />
                    </UploadImage>
                }
            </UploadImageBlock>
            {loading && <Text>loading...</Text>}
            <UploadedImageBlock>
                {form.cardImages.map(card => {
                    if (card.isVideo && card.videoThumbnails) {
                        return (
                            <FitImageBlock
                                key={card.id}
                                resizeMode='contain'
                                source={{ uri: card.videoThumbnails }}
                                style={{
                                    width: '100%',
                                }}
                                originalWidth={card.width}
                                originalHeight={card.height}
                            />
                        )
                    }
                    return (
                        <FitImageBlock
                            key={card.id}
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

const isVideoType = ({ type }: { type: string }) => type === 'video';

export interface cardImage {
    id: string;
    uri: string;
    firebaseUrl: string;
    videoThumbnails?: string;
    isVideo: boolean;
    width: number;
    height: number;
}

interface Form {
    title: string;
    description: string;
    tags: string[];
    tagField: string;
    cardImages: cardImage[];
};

const formReset: Form = {
    title: '',
    description: '',
    tags: [],
    tagField: '',
    cardImages: [],
};

const getPermissionAsync = async () => {
    if (Constants.platform?.ios) {
        await askPermission(PermissionsList.CAMERA_ROLL);
    }
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
