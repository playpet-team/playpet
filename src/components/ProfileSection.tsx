import React from 'react'
import styled from 'styled-components/native'
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
        isLogged,
    } = useSelector((state: RootState) => state.auth)

    const navigation = useNavigation()

    if (!isLogged) {
        return (
            <AppLoginSection onPress={() => navigation.navigate('AppLogin')}>
                <Text
                    bold
                    size={20}
                >
                    {i18n.t('common.loginWithSignUp')}
                </Text>
                <Icon name="keyboard-arrow-right" />
            </AppLoginSection>
        )
    }

    return (
        <ProfileSectionBlock>
            <ProfileBlock>
                <AvatarBlock>
                    <Avatar
                        size="large"
                        rounded
                        source={{
                            uri: profilePhoto,
                        }}
                    />
                </AvatarBlock>
                <FollowBlock>
                    <Text>폴로워 0</Text>
                    <Text>팔로잉 0</Text>
                </FollowBlock>
            </ProfileBlock>
            <ProfileInfoBlock>
                <ProfileName>
                    <Text>{username}</Text>
                    <Text>{email}</Text>
                </ProfileName>
                <Button onPress={() => navigation.navigate('ProfileSetting')} title="프로필 설정" />
            </ProfileInfoBlock>
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
    flex: 1;
`

const FollowBlock = styled.View`
    flex: 1;
`

const ProfileInfoBlock = styled.View`
    flex-direction: row;
`

const ProfileName = styled.View`
    margin-left: 16px;
    flex-direction: column;
    flex: 1;
`

const AppLoginSection = styled.TouchableOpacity`
    flex: 1;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 16px;
`

// const ProfileText = styled(Text)`
//     font-size: 16px;
// `