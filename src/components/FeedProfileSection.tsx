import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styled, { useTheme } from 'styled-components/native'
import { Avatar } from 'react-native-elements'
import { useSelector } from 'react-redux'
import { RootState } from '../store/rootReducers'
import { DividerBlock, Text } from '../styles'
import { getPetDoc } from '../utils'
import { MyPet } from '../models'
import { Image } from 'react-native'
import { feedImagesMap } from './ProductListItem'

function FeedProfileSection({
    image,
    feedName,
    petKind,
    unit,
}: {
    image: string
    feedName?: string
    petKind?: string
    unit?: string
}) {
    const themes = useTheme()

    return (
        <ProfileSectionBlock>
            <ProfileBlock>
                <AvatarBlock>
                    <Image
                        source={feedImagesMap[image]}
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
                    {Boolean(petKind) && <Text color={themes.colors.placeholder}>
                        {petKind}
                    </Text>}
                    {Boolean(unit) && <Text color={themes.colors.placeholder}>
                        {unit}
                    </Text>}
                </UserInfoBlock>
            </ProfileBlock>
        </ProfileSectionBlock>
    )
}

export default FeedProfileSection

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
