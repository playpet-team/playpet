import analytics from '@react-native-firebase/analytics'
import * as Sentry from "@sentry/react-native"
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Button } from 'react-native'
import { Avatar, BottomSheet, Icon, Input, ListItem } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux'
import styled, { useTheme } from 'styled-components/native'
import Toast, { ToastParams } from '../../components/Toast'
import useImagePicker from '../../hooks/useImagePicker'
import useLoadingIndicator from '../../hooks/useLoadingIndicator'
import useMyPet from '../../hooks/useMyPet'
import { authActions } from '../../store/authReducer'
import { RootState } from '../../store/rootReducers'
import { DividerBlock, Layout, Text } from '../../styles'
import { currentUser, firebaseNow, updatePetInformation, updateUserProfilePhoto } from '../../utils'
import { useUploadFirestore } from '../../hooks/useUploadFirestore'
import { ageNameMap, DefaultPetAges, PetAge } from '../ManageProducts/RegistrationPet/PetAgeSection'
import { sizeNameMap } from '../ManageProducts/RegistrationPet/PetSizeSection'
import { useNavigation } from '@react-navigation/native'

const MAX_USERNAME_LENGTH = 16
const MIN_USERNAME_LENGTH = 2
const updateUserProfile = (key: 'displayName' | 'photoURL', value: string) => {
    const user = currentUser()
    if (!user) {
        return
    }
    user.updateProfile({
        [key]: value
    })
}

export default function ProfileSetting() {
    const { loading, setLoading, Indicator } = useLoadingIndicator()
    const [form, setForm] = useState<ProfileForm>({ uri: '' })
    const {
        profilePhoto,
        email,
        uid,
    } = useSelector((state: RootState) => state.auth)
    const { myPets, loading: petLoading  } = useMyPet()
    const weightRef = useRef<Input | null>(null)
    const [editMode, setEditMode] = useState(false)
    const [inputAge, setInputAge] = useState<PetAge>(myPets?.petAge || '')
    const [visibleBottomSheet, setVisibleBottomSheet] = useState(false)
    const [inputWeight, setInputWeight] = useState<string>(myPets?.petWeight || '')

    const { upload } = useUploadFirestore()
    const dispatch = useDispatch()
    const theme = useTheme()

    const navigation = useNavigation()
    navigation.setOptions({
        headerRight: () => (
          <Button
            onPress={() => editMode ? submit() : setEditMode(true)}
            title={editMode ? '완료' : '수정'}
        />
        )
    })

    const [toastContent, setToastContent] = useState<ToastParams>({
        visible: false,
        title: '',
        description: '',
        image: '',
    })

    const submit = async () => {
        setEditMode(false)
        if (!myPets) {
            return
        }
        if (
            myPets.petWeight !== inputWeight
            || myPets.petAge !== inputAge
        ) {
            const activePetDocId = await updatePetInformation(uid, {
                ...myPets,
                petWeight: inputWeight,
                petAge: inputAge,
            })
            if (!activePetDocId) {
                return
            }
            dispatch(authActions.setActivePetDocId(activePetDocId))
            console.log("변한게 생겼다")
            setToastContent({
                visible: true,
                title: '수정 되었습니다',
            })
        }
    }

    useEffect(() => {
        if (myPets?.petWeight) {
            setInputWeight(myPets.petWeight)
        }
    }, [myPets])
    
    useEffect(() => {
        if (editMode && weightRef.current) {
            weightRef.current?.focus()
        }
    }, [editMode])

    // 프로필 변경용
    const uploadCallback = (form: ProfileForm) => setForm(form)
    const { openPicker } = useImagePicker({
        updateType: 'photo',
        setLoading,
        uploadCallback,
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

    const list = useMemo(() => ([
        { title: ageNameMap[DefaultPetAges[0]].description, onPress: () => {
            setInputAge('BABY')
            setVisibleBottomSheet(false)
        }},
        { title: ageNameMap[DefaultPetAges[1]].description, onPress: () => {
            setInputAge('ADULT')
            setVisibleBottomSheet(false)
        }},
        { title: ageNameMap[DefaultPetAges[2]].description, onPress: () => {
            setInputAge('OLD')
            setVisibleBottomSheet(false)
        }},
        {
          title: '취소',
          onPress: () => setVisibleBottomSheet(false)
        },
    ]), [])

    return (
        <ProfileSettingBlock>
            <ChangePhotoProfileArea onPress={openPicker}>
                <Avatar
                    size="large"
                    rounded
                    source={{
                        uri: profilePhoto,
                    }}
                />
                <DividerBlock height={8} />
            </ChangePhotoProfileArea>
            <Layout>
                <Input
                    label="이메일"
                    value={email}
                    disabled
                    inputContainerStyle={{
                        marginBottom: 12,
                    }}
                    errorStyle={{ display: 'none' }}
                />
            </Layout>
            <Layout>
                {!myPets ?
                    <Text>아직 반려동물 등록이 안되었어요</Text>
                    :
                    <>
                        <Input
                            inputContainerStyle={{
                                marginBottom: 12,
                            }}
                            errorStyle={{ display: 'none' }}
                            label="반려종"
                            value={myPets.petType === 'DOG' ? '강아지' : '고양이'}
                            disabled
                        />
                        <Input
                            inputContainerStyle={{
                                marginBottom: 12,
                            }}
                            errorStyle={{ display: 'none' }}
                            label="아이 이름"
                            value={myPets.petName}
                            disabled
                        />
                        <Input
                            ref={weightRef}
                            inputContainerStyle={{
                                marginBottom: 12,
                            }}
                            errorStyle={{ display: 'none' }}
                            label="체중 (kg)"
                            value={inputWeight}
                            onChangeText={(text: string) => setInputWeight(text)}
                            disabled={!editMode}
                        />
                        <Input
                            inputContainerStyle={{
                                width: '100%',
                                marginBottom: 12,
                            }}
                            errorStyle={{ display: 'none' }}
                            label="나이"
                            value={ageNameMap[inputAge].description}
                            disabled
                            rightIcon={editMode && <Icon
                                name='edit'
                                onPress={() => setVisibleBottomSheet(true)}
                            />}
                        />
                        <Input
                            inputContainerStyle={{
                                marginBottom: 12,
                            }}
                            errorStyle={{ display: 'none' }}
                            label="사이즈"
                            value={sizeNameMap[myPets.petKind.size].title}
                            disabled
                        />
                    </>
                }
            </Layout>
            <BottomSheet isVisible={visibleBottomSheet} modalProps={{}}>
                {list.map((l, i) => (
                    <ListItem key={i}>
                    <ListItem.Content>
                        <ListItem.Title onPress={l.onPress}>{l.title}</ListItem.Title>
                    </ListItem.Content>
                    </ListItem>
                ))}
            </BottomSheet>
            {(loading && petLoading) && <Indicator />}
            <Toast
                visible={toastContent.visible}
                title={toastContent.title}
            />
        </ProfileSettingBlock>
    )
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

const Submit = styled.TouchableOpacity`
    flex: 1;
    padding: 12px;
    align-items: center;
    justify-content: center;
`
