import analytics from '@react-native-firebase/analytics'
import * as Sentry from "@sentry/react-native"
import React, { useEffect, useRef, useState } from 'react'
import { View } from 'react-native'
import { Avatar, Icon, Input } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/native'
import Toast, { ToastParams } from '../../components/Toast'
import useImagePicker from '../../hooks/useImagePicker'
import useLoadingIndicator from '../../hooks/useLoadingIndicator'
import { authActions } from '../../store/authReducer'
import { RootState } from '../../store/rootReducers'
import { DividerBlock, Layout, Text } from '../../styles'
import { currentUser, firebaseNow, getPetDoc, resetUserActivePetDocId, updateUsername, updateUserProfilePhoto } from '../../utils'
import { useUploadFirestore } from '../CardFormScreen/useUploadFirestore'
import RegistrationPet from '../ManageProducts/RegistrationPet'

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
        activePetDocId,
        activePet,
    } = useSelector((state: RootState) => state.auth)
    const [form, setForm] = useState<ProfileForm>({ uri: '' });
    const [openAdditionalInformation, setOpenAdditionalInformation] = useState(false);

    useEffect(() => {
        loadMyPet()
        async function loadMyPet() {
            if (!activePetDocId || !uid) {
                return
            }
            console.log("load")
            setLoading(true)
            const petDoc = await getPetDoc(uid, activePetDocId)
            dispatch(authActions.setActivePet(petDoc))
            setLoading(false)
        }
    }, [activePetDocId, uid])

    const resetActivePetDocId = () => {
        resetUserActivePetDocId(uid)
        dispatch(authActions.setActivePetDocId(''))
        dispatch(authActions.setActivePet({
            petName: '',
            petType: '',
            searchPetType: '',
            size: '',
            favorite: '',
            createdAt: null,
            updatedAt: null,
        }))
        setOpenAdditionalInformation(true)
    }

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
        analytics().logEvent('change_nickname')
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
            <View>
                <DividerBlock marginTop={12} />
                <TouchableOpacity onPress={resetActivePetDocId}><Text size={16}>동물 정보 초기화하기(개발용)</Text></TouchableOpacity>
                <DividerBlock marginTop={4} marginBottom={2} />
                <Input
                    label="아이 이름"
                    value={activePet.petName}
                    disabled
                />
                <Input
                    value={activePet.petType}
                    disabled
                />
                <Input
                    label="품종"
                    value={activePet.searchPetType}
                    disabled
                />
                {Boolean(activePet.size) && <Input
                    label="품종"
                    value={activePet.size}
                    disabled
                />}
                <Input
                    label="관심사"
                    value={activePet.favorite}
                    disabled
                />
            </View>
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