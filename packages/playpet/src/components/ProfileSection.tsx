import React from 'react';
import styled from 'styled-components/native';
import { Avatar } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { RootState } from '../store/rootReducers';


export default function ProfileSection() {
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
        </ProfileSectionBlock>
    );
};

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

const Text = styled.Text`
    font-size: 16px;
`;