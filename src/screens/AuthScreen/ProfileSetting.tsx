import React, { useState, useEffect } from 'react'
import styled from 'styled-components/native'
import { Icon, Input, Avatar } from 'react-native-elements'
import { Layout, Text, DividerBlock } from '../../styles'
import { firebaseNow, updateUserProfilePhoto, updateUsername, currentUser } from '../../utils'
import useLoadingIndicator from '../../hooks/useLoadingIndicator'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store/rootReducers'
import useImagePicker from '../../hooks/useImagePicker'
import { useUploadFirestore } from '../CardFormScreen/useUploadFirestore'
import { authActions } from '../../store/authReducer'
import Toast, { ToastParams } from '../../components/Toast'

// isLogged: false,
// uid: '',
// method: SignType.None,
// email: '',
// isLeave: false,
// leaveAt: '',
// username: '',
// gender: '',
// birthDate: '',
// phoneNumber: '',
// profilePhoto: '',
// lastLogin: null,
// createdAt: null,
// updatedAt: null,
// terms: {
//     existDoc: true,
//     overAgeAgree: false,
//     termsOfUseAgree: false,
//     personalCollectAgree: false,
//     marketingAgree: false,
// }
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
    const [newUsername, setNewUsername] = useState(username)
    const [editUsername, setEditUsername] = useState(false)
    const uploadCallback = (form: ProfileForm) => setForm(form)
    const [toastContent, setToastContent] = useState<ToastParams>({
        visible: false,
        title: '',
        description: '',
        image: '',
    })
    const { upload } = useUploadFirestore()
    const dispatch = useDispatch()

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
                console.error(e)
            } finally {
                setLoading(false)
            }
        }

    }, [form])

    const updateUserProfile = (key: 'displayName' | 'photoURL', value: string) => {
        const user = currentUser()
        if (!user) {
            return
        }
        user.updateProfile({
            [key]: value
        })
    }

    const { openPicker } = useImagePicker({
        updateType: 'photo',
        setLoading,
        form,
        uploadCallback,
    })

    const handleEditUsername = () => {
        if (!editUsername) {
            return setEditUsername(true)
        }
        const isOK = validator(newUsername, 'username')
        if (!isOK) {
            return setToastContent({
                title: `닉네임은 ${MIN_USERNAME_LENGTH}자이상 ${MAX_USERNAME_LENGTH}자 이하여야 합니다`,
                visible: true
            })
        }
        updateUsername(uid, newUsername)
        updateUserProfile('displayName', newUsername)
        setEditUsername(false)
        return setToastContent({
            title: '닉네임 변경 완료!',
            visible: true
        })
    }

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
                    label="닉네임"
                    value={newUsername}
                    onChangeText={(text: string) => setNewUsername(text)}
                    disabled={!editUsername}
                    rightIcon={<Icon
                        name={editUsername ? 'check' : 'edit'}
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