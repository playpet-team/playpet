import React from 'react';
import styled from 'styled-components/native';
import { Avatar } from 'react-native-elements';
import { Text } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/rootReducers';
import MyCards from './MyCards';

function ProfileSection() {
    const {
        profilePhoto,
        username,
        email,
    } = useSelector((state: RootState) => state.auth);
    return (
        <ProfileSectionBlock>
            <Avatar
                size="large"
                rounded
                source={{
                    uri: profilePhoto,
                }}
            />
            <ProfileInfo>
                <Text>{username}</Text>
                <Text>{email}</Text>
            </ProfileInfo>
            <MyCards />
        </ProfileSectionBlock>
    );
};

export default ProfileSection;

const ProfileSectionBlock = styled.View`
    padding: 16px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;

const ProfileInfo = styled.View`
    margin-left: 16px;
    flex-direction: column;
`;

// const ProfileText = styled(Text)`
//     font-size: 16px;
// `;