import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components/native';
import { Input, Icon } from 'react-native-elements';
import FitImage from 'react-native-fit-image';
import { useSelector } from 'react-redux';
import { RootState } from '../store/rootReducers';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SubmitButton from './CardFormScreen/SubmitButton';
import useLoadingIndicator from '../hooks/useLoadingIndicator';
import useImagePicker from '../hooks/useImagePicker';

export default function CardFormScreen() {
    const { loading, setLoading, Indicator } = useLoadingIndicator();
    const { uid } = useSelector((state: RootState) => state.auth);
    const [form, setForm] = useState<Form>(formReset);
    const navigation = useNavigation();
    const { openPicker } = useImagePicker({
        setLoading,
        form,
        setForm,
        uid,
    });

    useEffect(() => {
        const reset = () => setForm(formReset);
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

    const uploadedImage = useCallback(() => {
        return form.cardImages.map(card => (
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
        ))
    }, [form]);

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
                {uploadedImage()}
            </UploadedImageBlock>
        </CardBlock>
    );
};

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
