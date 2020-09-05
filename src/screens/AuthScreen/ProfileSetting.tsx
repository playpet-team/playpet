import React, { useState, useEffect } from 'react'
import styled from 'styled-components/native'

import { ScrollView } from 'react-native-gesture-handler'
import { Icon, Input, Avatar } from 'react-native-elements'
import { Layout, Text, DividerBlock } from '../../styles'
import ListItem from '../../components/ListItem'
import i18n from 'i18n-js'
import { Alert } from 'react-native'
import { leave, appReload, signOut, firebaseNow, updateUserProfilePhoto, currentUser } from '../../utils'
import useLoadingIndicator from '../../hooks/useLoadingIndicator'
import AsyncStorage from '@react-native-community/async-storage'
import { SignType } from '../../models'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store/rootReducers'
import useImagePicker from '../../hooks/useImagePicker'
import { useUploadFirestore } from '../CardFormScreen/useUploadFirestore'
import { authActions } from '../../store/authReducer'

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
    const uploadCallback = (form: ProfileForm) => setForm(form)
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
                dispatch(authActions.setUserProfilePhoto(downloadUrl))
            } catch (e) {
                console.error(e)
            } finally {
                setLoading(false)
            }
        }

    }, [form])

    const { openPicker } = useImagePicker({
        updateType: 'photo',
        setLoading,
        form,
        uploadCallback,
    })

    return (
        <ProfileSettingBlock>
            {loading && <Indicator />}
            <Layout
                marginBottom={16}
                alignItems="center"
            >
                <Avatar
                    onPress={openPicker}
                    size="large"
                    rounded
                    source={{
                        uri: profilePhoto,
                    }}
                />
            </Layout>
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
                    value={username}
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

export interface ProfileForm {
    uri: string
}
const ProfileSettingBlock = styled.ScrollView`
    padding: 16px;
`
