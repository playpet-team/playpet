import React, { useEffect, useState } from 'react'
import styled, { useTheme } from 'styled-components/native'
import { Avatar } from 'react-native-elements'
import { useSelector } from 'react-redux'
import { ageNameMap } from '../screens/ManageProducts/RegistrationPet/PetAgeSection'
import { sizeNameMap } from '../screens/ManageProducts/RegistrationPet/PetSizeSection'
import { RootState } from '../store/rootReducers'
import useLoadingIndicator from '../hooks/useLoadingIndicator'
import { DividerBlock, Text } from '../styles'
import { getPetDoc } from '../utils'
import { MyPet } from '../models'
import * as Sentry from "@sentry/react-native";
import { ActivityIndicator } from 'react-native'
import useMyPet from '../hooks/useMyPet'

function ProfileSection() {
    const {
        uid,
        profilePhoto,
        email,
    } = useSelector((state: RootState) => state.auth)
    const themes = useTheme()
    const { myPets, loading } = useMyPet()

    if (!uid) {
        return null
    }

    return (
        <ProfileSectionBlock>
            <ProfileBlock>
                <AvatarBlock>
                    {Boolean(profilePhoto) ?
                        <Avatar
                            size="medium"
                            rounded
                            source={{
                                uri: profilePhoto,
                            }}
                            containerStyle={{
                                marginRight: 8,
                            }}
                        />
                    : <ActivityIndicator />}
                </AvatarBlock>
                <UserInfoBlock>
                    {myPets && <>
                        <InfoHeader>
                            <Text size={18} bold>{myPets.petName || email}</Text>
                            {myPets.petType && <Text padding="0 0 0 8px" color={themes.colors.placeholder}>
                                {myPets.petType === 'DOG' ? '반려견' : '반려묘'}
                            </Text>}
                        </InfoHeader>
                        <DividerBlock height={8} />
                        {myPets && <Text color={themes.colors.placeholder}>
                            {ageNameMap[myPets.petAge].title} | {sizeNameMap[myPets.petKind.size].title}
                        </Text>}
                    </>}
                    {!myPets &&
                        <InfoHeader>
                            <Text size={18} bold>{email}</Text>
                        </InfoHeader>
                    }
                    {loading && <ActivityIndicator />}
                </UserInfoBlock>
                {/* <MoreActions>
                    <MoreButton onPress={() => navigation.navigate('ManageProducts')}>
                        <Text
                            color={themes.colors.primary}
                            size={14}
                            align="center"
                        >
                            더 보기
                        </Text>
                    </MoreButton>
                </MoreActions> */}
            </ProfileBlock>
        </ProfileSectionBlock>
    )
}

export default ProfileSection

const ProfileSectionBlock = styled.View`
    padding: 16px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`

const ProfileBlock = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

const InfoHeader = styled.View`
    flex-direction: row;
    align-items: center;
`

const AvatarBlock = styled.View`
    align-items: center;
    justify-content: center;
`

const UserInfoBlock = styled.View`
    margin-left: 8px;
    flex: 1;
`
const MoreActions = styled.View`
`
const MoreButton = styled.TouchableOpacity`
    padding: 10px 16px;
    border-color: ${(props) => props.theme.colors.primary};
    border-width: 1px;
    border-radius: 6px;
`



// const ProfileText = styled(Text)`
//     font-size: 16px;
// `