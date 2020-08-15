import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components/native';
import { Input, Icon, Image } from 'react-native-elements';
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

    const onReset = useCallback(() => setForm(formReset), []);

    const uploadedImage = useCallback(() => {
        return form.cardImages.map(card => (
            <Image
                key={card.id}
                resizeMode='cover'
                source={{ uri: card.videoThumbnails }}
                style={{ width: 200, height: 200 }}
            />
        ));
    }, [form]);

    return (
        <CardBlock>
            {loading && <Indicator />}
            <InputTextGroup>
                <Input
                    containerStyle={{
                        flex: 1.5,
                    }}
                    inputContainerStyle={{
                        borderBottomWidth: 0,
                    }}
                    placeholder='오늘은 어떤 일이 있었나요?'
                    value={form.title}
                    onChangeText={(value: string) => setForm({
                        ...form,
                        title: value,
                    })}
                />
                <UploadImageBlock>
                    {!loading && !form.cardImages.length &&
                        <UploadImage onPress={openPicker}>
                            <Icon name="get-app" />
                        </UploadImage>
                    }
                </UploadImageBlock>
                {/* <Input
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
                /> */}
                {/* <InputDescription
                    placeholder='Description 선택?'
                    multiline
                    value={form.description}
                    onChangeText={(value: string) => {
                        setForm({
                            ...form,
                            description: value,
                        });
                    }}
                /> */}
                {/* <DisplayTags tags={form.tags} /> */}
            </InputTextGroup>
            {loading && <Text>loading...</Text>}
            <UploadedImageBlock>
                {uploadedImage()}
            </UploadedImageBlock>
            {/* <SubmitBlock> */}
            <SubmitButton
                {...form}
                uid={uid}
                onSubmitCallback={onReset}
            />
            {/* </SubmitBlock> */}
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

const FormBlock = styled.View`
    flex: 1;
`;

const Tag = styled.Text`
    padding: 4px;
    color: blue;
`;

const DisplayTagsBlock = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
`;

const CardBlock = styled.View`
    flex: 1;
    height: 100%;
    padding: 16px;
`;

const InputTextGroup = styled.View`
    flex-direction: row;
    /* flex: 1; */
    height: 200px;
`;

const UploadImageBlock = styled.View`
    flex: 1;
    background-color: #efefef;
`;

const UploadedImageBlock = styled.View`
    
    flex: 1;
`;

const UploadImage = styled.TouchableOpacity`
    /* border-width: 1px; */
    /* border-style: solid; */
    /* border-color: #999; */
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`;

const SubmitBlock = styled.View`
    /* flex: 1; */
    /* justify-content: flex-end; */
`;