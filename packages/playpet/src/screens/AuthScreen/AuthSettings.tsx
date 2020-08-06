import React, { useMemo } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import { signOut, leave, appReload } from '../../utils';
import { ListItem } from 'react-native-elements';
import { signEnum } from '../../models';
import useLoadingIndicator from '../../hooks/useLoadingIndicator';

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
export default function AuthSettings() {
    const { loading, setLoading, Indicator } = useLoadingIndicator();

    const linkProvision = () => { };
    const linkCustomerCenter = () => { };
    const handleLogout = () => {
        Alert.alert('정말로 로그아웃하시게요?', '', [
            {
                text: '취소',
            },
            {
                text: '로그아웃',
                onPress: async () => {
                    try {
                        setLoading(true);
                        // await signOut(signEnum.Google);
                        // appReload();
                    } catch (e) {
                        alert('로그아웃에 실패하였습니다. 잠시후 다시 시도해 주세요');
                    } finally {
                        // setLoading(false);
                    }
                },
            },
        ]);
    };

    const handleLeave = () => {
        Alert.alert('정말로 탈퇴하시게요?', '', [
            {
                text: '취소',
            },
            {
                text: '탈퇴하기',
                onPress: async () => {
                    try {
                        setLoading(true);
                        await leave();
                        appReload();
                    } catch (e) {
                        alert('회원탈퇴에 실패하였습니다. 잠시후 다시 시도해 주세요');
                    } finally {
                        setLoading(false);
                    }
                },
            },
        ]);
    };

    const list = useMemo((): List[] => {
        return [
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
        ]
    }, []);

    return (
        <AuthSettingsBlock>
            {loading && <Indicator />}
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
