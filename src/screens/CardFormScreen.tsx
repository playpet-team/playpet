import { useIsFocused } from '@react-navigation/native';
import { Camera } from 'expo-camera';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import { Icon, Image, Input } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import CameraRecordWrapper from '../components/CameraRecordWrapper';
import useImagePicker from '../hooks/useImagePicker';
import useLoadingIndicator from '../hooks/useLoadingIndicator';
import { RootState } from '../store/rootReducers';
import { Text } from '../styles';
import { placeholderColor, tintColorBackground } from '../styles/colors';
import SubmitButton from './CardFormScreen/SubmitButton';


export default function CardFormScreen() {
    const [videoUri, setVideoUri] = useState('')
    const [cameraOn, setCameraOn] = useState(true)
    const { loading, setLoading, Indicator } = useLoadingIndicator();
    const { isLogged } = useSelector((state: RootState) => state.auth);
    const [form, setForm] = useState<CardForm>(initialForm);

    const isFocused = useIsFocused()

    useEffect(() => {
        if (videoUri.length > 0) {
            addCardMedia({ uri: videoUri })
            setCameraOn(false)
            // async function loadThumbnail() {
            //     await getThumbnail(undefined, videoUri)
            // }
        }
    }, [videoUri])

    const uploadCallback = (newForm: CardImage) => {
        setCameraOn(false)
        setForm({
            ...form,
            cardImages: [
                ...form.cardImages,
                newForm,
            ],
        })
    }
    const { openPicker, addCardMedia } = useImagePicker({
        setLoading,
        uploadCallback,
    });

    const onReset = useCallback(() => setForm(initialForm), []);

    const UploadedImage = useCallback(() => {
        return (
            <>
                {form.cardImages.map(card => (
                    <View key={card.id}>
                        <Image
                            resizeMode='cover'
                            source={{ uri: card.videoThumbnail }}
                            style={{ width: '100%', height: 300 }}
                        />
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
                    </View>
                ))}
            </>
        )
    }, [form]);

    const completeUpload = useMemo(() => !loading && !form.cardImages.length, [loading, form])

    const removeUpload = () => {
        setForm({
            ...form,
            cardImages: [],
        })
    }

    if (!isLogged) {
        return (<Text>로그인 하셈</Text>)
    }

    return (
        <>
            <CardBlock>
                {loading && <Indicator />}
                {(cameraOn && isFocused) && <CameraRecordWrapper
                    setVideoUri={setVideoUri}
                    setCameraOn={setCameraOn}
                    openPicker={openPicker}
                />}
                <InputTextGroup>
                    <Input
                        containerStyle={{ minHeight: 200 }}
                        placeholderTextColor={placeholderColor}
                        inputContainerStyle={{ borderBottomWidth: 0 }}
                        placeholder='오늘은 어떤 일이 있었나요?'
                        value={form.title}
                        onChangeText={(value: string) => setForm({
                            ...form,
                            title: value,
                        })}
                    />
                    <UploadImageBlock>
                        {completeUpload ?
                            <UploadImage>
                                {false && isFocused && (
                                    <Camera
                                        style={{ flex: 1, height: 200, alignItems: 'center', justifyContent: 'center', }}
                                        type={Camera.Constants.Type.back}
                                    >
                                        <TouchableOpacity onPress={() => setCameraOn(true)} containerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                                            <Text color='#fff' bold>지금 찍기</Text>
                                        </TouchableOpacity>
                                    </Camera>
                                )}
                                <TouchableOpacity
                                    onPress={() => setCameraOn(true)}
                                    containerStyle={{
                                        marginTop: 16,
                                        flex: 1,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Icon name="party-mode" size={48} />
                                    {/* <Text>라이브러리에서 선택</Text> */}
                                    <Text>영상 업로드</Text>
                                </TouchableOpacity>
                            </UploadImage>
                            :
                            <UploadedImage />
                        }
                        {/*!completeUpload &&
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
                            */}
                    </UploadImageBlock>
                </InputTextGroup>
            </CardBlock>
            <SubmitButton
                {...form}
                onSubmitCallback={onReset}
                loading={loading}
                setLoading={setLoading}
            />
        </>
    );
};

export interface CardImage {
    id: string;
    uri: string;
    url: string;
    videoThumbnail?: string;
    isVideo: boolean;
    width: number;
    height: number;
}

export interface CardForm {
    title: string;
    description: string;
    tags: string[];
    tagField: string;
    cardImages: CardImage[];
};

const initialForm: CardForm = {
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
    /* height: 400px; */
`;

const UploadImageBlock = styled.View`
    flex: 1;
    /* height: 200px; */
    /* background-color: #efefef; */
`;

const UploadImage = styled.TouchableOpacity`
    /* align-items: center; */
/* justify-content: center; */
    flex-direction: column;
    flex: 1;
    /* align-items: center;
    justify-content: center; */
    /* width: 100%;
    height: 100%; */
`;
