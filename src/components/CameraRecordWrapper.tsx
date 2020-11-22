import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import React, { useEffect, useRef, useState } from "react";
import { Modal, View } from 'react-native';
import { Icon } from "react-native-elements";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled, { css } from "styled-components/native";
import { Text } from "../styles";
import { askPermission, PermissionsList } from "../utils";


const RECORD_PROPERTY = {
    quality: 0.6,
    maxDuration: 30,
}
const TOAST_TITLE = '길게 눌러 활영을 시작해보세요'
const TOAST_VALIDATION = '최소 1초 이상, 30초 이하 영상을 올려주세요'
function CameraRecordWrapper({ setVideoUri, setCameraOn, openPicker }: {
    setVideoUri: React.Dispatch<React.SetStateAction<string>>
    setCameraOn: React.Dispatch<React.SetStateAction<boolean>>
    openPicker: () => Promise<void>
}) {
    const [toastTitle, setToastTitle] = useState(TOAST_TITLE)
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [hasPermission, setHasPermission] = useState<null | boolean>(null);
    const [recordStatus, setRecordStatus] = useState<'' | 'in' | 'out'>('');
    const [duration, setDuration] = useState<null | number>(null)
    const camRef = useRef<Camera>(null)
    const { top, bottom } = useSafeAreaInsets();

    useEffect(() => {
        loadPermission()
        async function loadPermission() {
            const cameraRollStatus = await askPermission(PermissionsList.CAMERA_ROLL)
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted' && cameraRollStatus.status === 'granted');
        }
    }, [])

    const saveVideo = async (uri: string) => {
        if (!uri) {
            return
        }
        const asset = await MediaLibrary.createAssetAsync(uri);
        if (asset) {

            // setVideoUri('')
            return
        }
    }

    const startRecord = async () => {
        setDuration(0)
        setRecordStatus('in')

        const recordVideo = await camRef.current?.recordAsync(RECORD_PROPERTY)
        if (!recordVideo) {
            return
        }
        saveVideo(recordVideo.uri)
        setVideoUri(recordVideo.uri)
    }

    const stopRecord = () => {
        camRef.current?.stopRecording()
        setRecordStatus('out')
    }

    useEffect(() => {
        if (typeof duration === 'number' && recordStatus === 'in') {
            setTimeout(() => {
                const newDuration = duration + 50
                setDuration(newDuration)
            }, 50)
        } else {
            if (duration === null) {
                return
            }
            if (duration && duration < 1000) {
                // setToastTitle(TOAST_VALIDATION)
            } else {
                setToastTitle(TOAST_TITLE)
            }
            setDuration(null)
        }
    }, [duration, recordStatus])

    // const getDuration = () => {
    //     if (duration) {
    //         const newDuration = Math.floor(duration / 1000)
    //         return newDuration
    //     }
    //     return 0
    // }

    const handleReverseCameraType = () => {
        setType(
            type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
        );
    }

    const recordProgress = () => {
        return (duration || 0) / 150
    }

    if (hasPermission === null) {
        return <View />
    }

    if (hasPermission === false) {
        return <Text>카메라 권한이 필요합니다</Text>
    }

    return (
        <Modal
            transparent={true}
            visible={true}
            animated={true}
            animationType="fade"
        >
            <CameraRecordWrapperBlock>
                <Camera
                    ref={camRef}
                    style={{ flex: 1 }}
                    type={type}
                >
                    <CloseCameraIcon top={top}>
                        <Icon
                            name='clear'
                            color="#fff"
                            size={32}
                            onPress={() => setCameraOn(false)}
                        />
                    </CloseCameraIcon>
                    <CameraBottomWrapper>
                        <ProgressBar  progress={recordProgress()} />
                        <CameraButton bottomPadding={bottom}>
                            <Icon
                                onPress={openPicker}
                                name="photo-library"
                                size={32}
                                color="#fff"
                            />
                        </CameraButton>
                        <CameraButton bottomPadding={bottom}>
                            {recordStatus === 'out' && (
                                <Toast>
                                    <Text color="#fff">{toastTitle}</Text>
                                </Toast>
                            )}
                            <TouchableOpacity
                                onPressIn={startRecord}
                                onPressOut={stopRecord}
                            >
                                <Icon
                                    name="radio-button-checked"
                                    size={90}
                                    style={{ padding: 8 }}
                                    color={recordStatus === 'in' ? '#ff0000' : '#fff'}
                                />
                                {/* <ProgressCircle
                                    containerStyle={{
                                        width: 40,
                                        height: 40,
                                    }}
                                    outerCircleStyle={{
                                        width: 70,
                                        height: 70,
                                    }}
                                    percent={recordProgress()}
                                    radius={35}
                                    borderWidth={16}
                                    color="#ff0000"
                                    shadowColor="#333"
                                    bgColor="#fff"
                                > */}
                                {/* </ProgressCircle> */}
                            </TouchableOpacity>
                        </CameraButton>
                        <CameraButton bottomPadding={bottom}>
                            <Icon
                                name='loop'
                                size={32}
                                onPress={handleReverseCameraType}
                                color="#fff"
                            />
                        </CameraButton>
                    </CameraBottomWrapper>
                </Camera>
            </CameraRecordWrapperBlock>
        </Modal>
    )
}


export default CameraRecordWrapper

const CameraRecordWrapperBlock = styled.View`
    flex: 1;
`

const DurationSection = styled.View<{ recordStatus: 'in' | 'out' | '' }>`
    z-index: 5;
    position: absolute;
    width: 100%;
    height: 16px;
    top: 16px;
    left: 0;
    background-color: #ff0000;
    display: ${({ recordStatus }) => recordStatus === 'in' ? 'flex' : 'none'};
`

const CloseCameraIcon = styled.View<{ top: number; }>`
    position: absolute;
    z-index: 999;
    top: ${({ top }) => top + 8}px;
    left: 16px;
    padding: 8px;
`

const CameraBottomWrapper = styled.View`
    position: absolute;
    bottom: 0;
    align-items: flex-end;
    justify-content: center;
    flex-direction: row;
    
`

const ProgressBar = styled.View<{ progress: number; }>`
    position: absolute;
    top: 0;
    left: 0;
    ${({ progress }) => progress && progress > 0 && css`
        height: 4px;
        background-color: #ff0000;
        width: ${progress}%;
    `}
`

const CameraButton = styled.View<{ bottomPadding: number }>`
    height: ${({ bottomPadding }) => bottomPadding + 110}px;
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 8px;
    padding-bottom: ${({ bottomPadding }) => bottomPadding}px;
    background-color: rgba(0, 0, 0, 0.1);
`

const Toast = styled.View`
    position: absolute;
    z-index: 99;
    top: -42px;
    padding: 8px;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 8px;
    width: 200px;
`