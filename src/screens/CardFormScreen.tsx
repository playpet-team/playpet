import React, { useState, useCallback, useMemo } from 'react';
import styled from 'styled-components/native';
import { Input, Icon, Image } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { RootState } from '../store/rootReducers';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SubmitButton from './CardFormScreen/SubmitButton';
import useLoadingIndicator from '../hooks/useLoadingIndicator';
import useImagePicker from '../hooks/useImagePicker';
import { placeholderColor, tintColorBackground } from '../constants/Colors';

export default function CardFormScreen() {
    const { loading, setLoading, Indicator } = useLoadingIndicator();
    const { uid } = useSelector((state: RootState) => state.auth);
    const [form, setForm] = useState<Form>(initialForm);
    const { openPicker } = useImagePicker({
        setLoading,
        form,
        setForm,
        uid,
    });

    const onReset = useCallback(() => setForm(initialForm), []);

    const uploadedImage = useCallback(() => {
        return form.cardImages.map(card => (
            <Image
                key={card.id}
                resizeMode='cover'
                source={{ uri: card.videoThumbnails }}
                style={{ width: '100%', height: '100%' }}
            />
        ));
    }, [form]);

    const completeUpload = useMemo(() => !loading && !form.cardImages.length, [loading, form])

    const removeUpload = () => {
        setForm({
            ...form,
            cardImages: [],
        })
    }

    return (
        <>

            <CardBlock>
                {loading && <Indicator />}
                <InputTextGroup>
                    <Input
                        containerStyle={{
                            // flex: 1.5,
                        }}
                        placeholderTextColor={placeholderColor}
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
                        {completeUpload ?
                            <UploadImage onPress={openPicker}>
                                <Icon name="get-app" />
                            </UploadImage>
                            : uploadedImage()}
                        {!completeUpload &&
                            <Icon
                                name="close"
                                containerStyle={{
                                    backgroundColor: tintColorBackground,
                                    borderRadius: 16,
                                    padding: 2,
                                    position: 'absolute',
                                    right: 6,
                                    top: 6,
                                }}
                                onPress={removeUpload}
                            />
                        }
                    </UploadImageBlock>
                </InputTextGroup>
                {loading && <Text>loading...</Text>}
            </CardBlock>
            <SubmitButton
                {...form}
                uid={uid}
                onSubmitCallback={onReset}
            />
        </>
    );
};

export interface cardImage {
    id: string;
    uri: string;
    url: string;
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

const initialForm: Form = {
    title: '',
    description: '',
    tags: [],
    tagField: '',
    cardImages: [],
};

const DisplayTagsBlock = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
`;

const CardBlock = styled.ScrollView`
    flex: 1;
    padding: 16px;
`;

const InputTextGroup = styled.View`
    flex-direction: column;
    flex: 1;
    height: 400px;
`;

const UploadImageBlock = styled.View`
    flex: 1;
    background-color: #efefef;
`;

const UploadImage = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`;
