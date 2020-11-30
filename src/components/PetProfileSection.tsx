import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styled, { useTheme } from 'styled-components/native'
import { Avatar } from 'react-native-elements'
import { useSelector } from 'react-redux'
import { RootState } from '../store/rootReducers'
import { DividerBlock, Text } from '../styles'
import { getPetDoc } from '../utils'
import { MyPet } from '../models'
import { Image } from 'react-native'

function PetProfileSection({
    thumbnail,
    feedName,
    petKind,
    unit,
}: {
    thumbnail: string
    feedName?: string
    petKind?: string
    unit?: string
}) {
    console.log('feedName--', feedName);
    const themes = useTheme()

    const getFeedImageUrl = useMemo(() => {
        console.log("thumbnail---", thumbnail)
        // if (thumbnail) {
        return {
            uri: thumbnail || 'https://firebasestorage.googleapis.com/v0/b/playpet-5b432.appspot.com/o/assets%2Ficons%2Ffeed_100.jpg?alt=media&token=74cf86b9-d323-4068-8487-4a161a73b094'
        }
        // }
        // return require('../../assets/images/dog_default_thumb.jpg')
    }, [thumbnail])
    
    return (
        <ProfileSectionBlock>
            <ProfileBlock>
                <AvatarBlock>
                    <Image
                        source={getFeedImageUrl}
                        style={{
                            width: 45,
                            height: 45,
                            resizeMode: 'contain',
                            
                        }}
                    />
                </AvatarBlock>
                <UserInfoBlock>
                    <Text size={16} bold>{feedName}</Text>
                    <DividerBlock height={8} />
                    {petKind && <Text color={themes.colors.placeholder}>
                        {petKind}
                    </Text>}
                    {unit && <Text color={themes.colors.placeholder}>
                        {unit}
                    </Text>}
                </UserInfoBlock>
            </ProfileBlock>
        </ProfileSectionBlock>
    )
}

export default PetProfileSection

const ProfileSectionBlock = styled.View`
    flex-direction: column;
    justify-content: flex-start;
`

const ProfileBlock = styled.View`
    flex-direction: row;
    align-items: center;
`

const AvatarBlock = styled.View`
    border-radius: 4px;
    border-width: 1px;
    border-color: #e9e9e9;
    margin-right: 8px;
    padding: 4px;
`

const UserInfoBlock = styled.View`
    margin-left: 8px;
`
