import React from 'react'
import styled, { useTheme } from 'styled-components/native'
import { Avatar, Icon } from 'react-native-elements'
import { Button, View } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../store/rootReducers'
import i18n from 'i18n-js'
import { useNavigation } from '@react-navigation/native'
import { Text } from '../styles'

function ProfileSection() {
    const {
        profilePhoto,
        username,
        email,
    } = useSelector((state: RootState) => state.auth)

    const themes = useTheme();
    
    return (
        <ProfileSectionBlock>
            <ProfileBlock>
                <AvatarBlock>
                    {Boolean(profilePhoto) && <Avatar
                        size="large"
                        rounded
                        source={{
                            uri: profilePhoto,
                        }}
                    />}
                </AvatarBlock>
                <UserInfoBlock>
                    <Text>{username || '이름을 설정해주세요'}</Text>
                    <Text>플레이펫 멤버쉽</Text>
                </UserInfoBlock>
                <MoreActions>
                    <MoreButton>
                        <Text
                            color={themes.colors.white}
                            bold
                        >
                            더 보기
                        </Text>
                    </MoreButton>
                </MoreActions>
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
    padding: 16px;
    background-color: ${(props) => props.theme.colors.primary};
    border-radius: 4px;
`



// const ProfileText = styled(Text)`
//     font-size: 16px;
// `