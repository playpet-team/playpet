import React from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import { signOut } from '../../utils';
import { ListItem } from 'react-native-elements';
import { signEnum } from '../../models';

enum Handle {
    Link,
    Navigate,
    Function,
}
interface List {
    icon: string;
    label: string;
    onPress: Function;
    type: Handle;
}
const linkProvision = () => { };
const linkCustomerCenter = () => { };
const handleLogout = () => {
    Alert.alert('정말로 로그아웃하시게요?', '', [
        {
            text: '취소',
        },
        {
            text: '로그아웃',
            onPress: () => signOut(signEnum.Google),
        },
    ]);
};
const list: List[] = [
    {
        icon: 'assignment',
        label: '서비스 약관',
        onPress: linkProvision,
        type: Handle.Link,
    },
    {
        icon: 'contacts',
        label: '고객센터',
        onPress: linkCustomerCenter,
        type: Handle.Link,
    },
    {
        icon: 'exit-to-app',
        label: '로그아웃',
        onPress: handleLogout,
        type: Handle.Function,
    },
    {
        icon: 'exit-to-app',
        label: '서비스 탈퇴',
        onPress: handleLeave,
        type: Handle.Function,
    },
];
export default function AuthSettings() {

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
