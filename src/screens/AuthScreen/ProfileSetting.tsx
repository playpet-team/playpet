import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components/native'
import { Icon, Input, Avatar } from 'react-native-elements'
import { Layout, Text } from '../../styles'
import { firebaseNow, updateUserProfilePhoto, updateUsername, currentUser } from '../../utils'
import useLoadingIndicator from '../../hooks/useLoadingIndicator'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store/rootReducers'
import useImagePicker from '../../hooks/useImagePicker'
import { useUploadFirestore } from '../CardFormScreen/useUploadFirestore'
import { authActions } from '../../store/authReducer'
import Toast, { ToastParams } from '../../components/Toast'
import * as Sentry from "@sentry/react-native";

const MAX_USERNAME_LENGTH = 16
const MIN_USERNAME_LENGTH = 2

export default function ProfileSetting() {
    const { loading, setLoading, Indicator } = useLoadingIndicator()
    const {
        profilePhoto,
        username,
        email,
        method,
        uid,
    } = useSelector((state: RootState) => state.auth)
    const [form, setForm] = useState<ProfileForm>({ uri: '' });

    // input username
    const usernameRef = useRef<Input | null>(null)
    const [value, setValue] = useState(username)
    const [editMode, setEditMode] = useState(false)

    useEffect(() => {
        if (editMode && usernameRef.current) {
            usernameRef.current?.focus()
        }
    }, [editMode])

    const { upload } = useUploadFirestore()
    const dispatch = useDispatch()

    // 프로필 변경용
    const uploadCallback = (form: ProfileForm) => setForm(form)
    const { openPicker } = useImagePicker({
        updateType: 'photo',
        setLoading,
        uploadCallback,
    })

    const handleEditUsername = () => {
        if (!editMode) {
            setEditMode(true)
            return
        }
        const isOK = validator(value, 'username')
        if (!isOK) {
            return setToastContent({
                title: `닉네임은 ${MIN_USERNAME_LENGTH}자이상 ${MAX_USERNAME_LENGTH}자 이하여야 합니다`,
                visible: true
            })
        }
        updateUsername(uid, value)
        updateUserProfile('displayName', value)
        dispatch(authActions.setUsername(value))
        setEditMode(false)
        return setToastContent({
            title: '닉네임 변경 완료!',
            visible: true
        })
    }



    const [toastContent, setToastContent] = useState<ToastParams>({
        visible: false,
        title: '',
        description: '',
        image: '',
    })

    useEffect(() => {
        if (!form.uri) {
            return
        }
        setUpload()
        async function setUpload() {
            try {
                setLoading(true)
                const downloadUrl = await upload({
                    uri: form.uri,
                    path: `profile/${uid}_${firebaseNow().seconds}`
                })
                await updateUserProfilePhoto(uid, downloadUrl)
                updateUserProfile('photoURL', downloadUrl)
                dispatch(authActions.setUserProfilePhoto(downloadUrl))
            } catch (e) {
                Sentry.captureException(e)
            } finally {
                setLoading(false)
            }
        }

    }, [form])

    return (
        <ProfileSettingBlock>
            {loading && <Indicator />}
            {toastContent.visible &&
                <Toast
                    title={toastContent.title}
                    setToastContent={setToastContent}
                />
            }
            <ChangePhotoProfileArea onPress={openPicker}>
                <Avatar
                    size="large"
                    rounded
                    source={{
                        uri: profilePhoto,
                    }}
                />
                <Text padding="8px 0">프로필 사진 변경</Text>
            </ChangePhotoProfileArea>
            <Layout>
                <Input
                    label="이메일"
                    value={email}
                    disabled
                />
            </Layout>
            <Layout>
                <Input
                    ref={usernameRef}
                    label="닉네임"
                    value={value}
                    onChangeText={(text: string) => setValue(text)}
                    disabled={!editMode}
                    rightIcon={<Icon
                        name={editMode ? 'check' : 'edit'}
                        onPress={handleEditUsername}
                    />}
                />
            </Layout>
            <Layout>
                <Input
                    label="로그인방법"
                    value={method}
                    disabled
                />
            </Layout>
        </ProfileSettingBlock>
    )
}

const updateUserProfile = (key: 'displayName' | 'photoURL', value: string) => {
    const user = currentUser()
    if (!user) {
        return
    }
    user.updateProfile({
        [key]: value
    })
}

const validator = (value: string, type: 'username') => {
    let isOK = false
    switch (type) {
        case 'username': {
            isOK = MAX_USERNAME_LENGTH > value.length && MIN_USERNAME_LENGTH < value.length
            break
        }
            defalut: {

            }
    }
    return isOK
}

export interface ProfileForm {
    uri: string
}
const ProfileSettingBlock = styled.ScrollView`
    padding: 16px;
`

const ChangePhotoProfileArea = styled.TouchableOpacity`
    flex-direction: column;
    align-items: center;
    margin-bottom: 16px;
`