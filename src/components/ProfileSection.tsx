import React from 'react';
import styled from 'styled-components/native';
import { Avatar } from 'react-native-elements';
import { Text, Button, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/rootReducers';

function ProfileSection() {
    const {
        profilePhoto,
        username,
        email,
    } = useSelector((state: RootState) => state.auth);
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
                <Button onPress={() => { }} title="프로필 설정" />
            </ProfileInfoBlock>
        </ProfileSectionBlock>
    );
};

export default ProfileSection;

const ProfileSectionBlock = styled.View`
    padding: 16px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;

const ProfileBlock = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const AvatarBlock = styled.View`
    align-items: center;
    justify-content: center;
    flex: 1;
`;

const FollowBlock = styled.View`
    flex: 1;
`;

const ProfileInfoBlock = styled.View`
    flex-direction: row;
`;

const ProfileName = styled.View`
    margin-left: 16px;
    flex-direction: column;
    flex: 1;
`;

// const ProfileText = styled(Text)`
//     font-size: 16px;
// `;