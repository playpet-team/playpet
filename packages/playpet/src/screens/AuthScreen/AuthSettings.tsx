import React from 'react';
import { Alert } from 'react-native';
import styled from '@emotion/native';
import { signOut } from '../../utils';
import { ListItem } from 'react-native-elements';
import { signEnum } from '../../models';

enum linkType {
    LINK,
    NAVIGATE,
    FUNCTION,
}
interface listType {
    icon: string;
    label: string;
    onPress: Function;
    type: linkType;
}
export default function AuthSettings() {
    const linkProvision = () => { };
    const linkCustomerCenter = () => { };
    const handleLogout = () => {
        Alert.alert('정말로 로그아웃하시게요?', '', [
            {
                text: '취소',
            },
            {
                text: '로그아웃',
                onPress: () => signOut(signEnum.GOOGLE),
            },
        ]);
    };

    const list: listType[] = [
        {
            icon: 'assignment',
            label: '서비스 약관',
            onPress: linkProvision,
            type: linkType.LINK,
        },
        {
            icon: 'contacts',
            label: '고객센터',
            onPress: linkCustomerCenter,
            type: linkType.LINK,
        },
        {
            icon: 'exit-to-app',
            label: '로그아웃',
            onPress: handleLogout,
            type: linkType.FUNCTION,
        },
        {
            icon: 'exit-to-app',
            label: '서비스 탈퇴',
            onPress: () => { },
            type: linkType.FUNCTION,
        },
    ];

    return (
        <AuthSettingsBlock>
            {list.length && list.map(item => (
                <ListItem
                    key={item.label}
                    title={item.label}
                    leftIcon={{ name: item.icon }}
                    onPress={() => item.onPress()}
                />
            ))}
        </AuthSettingsBlock>
    );
};

const AuthSettingsBlock = styled.View`
`;
