import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styled, { useTheme } from 'styled-components/native'
import { Avatar } from 'react-native-elements'
import { useSelector } from 'react-redux'
import { RootState } from '../store/rootReducers'
import { DividerBlock, Text } from '../styles'
import { getPetDoc } from '../utils'
import { MyPet } from '../models'

function PetProfileSection({
    thumbnail,
    feedName,
    petKind,
}: {
    thumbnail: string
    feedName?: string
    petKind: string
}) {
    console.log('feedName--', feedName);
    const themes = useTheme()

    const getFeedImageUrl = useMemo(() => {
        if (thumbnail) {
            return {
                uri: thumbnail
            }
        }
        return require('../../assets/images/dog_default_thumb.jpg')
    }, [thumbnail])
    
    return (
        <ProfileSectionBlock>
            <ProfileBlock>
                <AvatarBlock>
                    <Avatar
                        size="medium"
                        rounded
                        source={getFeedImageUrl}
                        containerStyle={{
                            marginRight: 8,
                        }}
                    />
                </AvatarBlock>
                <UserInfoBlock>
                    <Text size={16} bold>{feedName}</Text>
                    <DividerBlock height={8} />
                    <Text color={themes.colors.placeholder}>
                        {petKind}
                    </Text>
                </UserInfoBlock>
            </ProfileBlock>
        </ProfileSectionBlock>
    )
}

export default PetProfileSection

const ProfileSectionBlock = styled.View`
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`

const ProfileBlock = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

const AvatarBlock = styled.View`
    align-items: center;
    justify-content: center;
`

const UserInfoBlock = styled.View`
    margin-left: 8px;
`
