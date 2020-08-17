import React, { useMemo } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import { signOut, leave, appReload } from '../../utils';
import { ListItem } from 'react-native-elements';
import { SignType } from '../../models';
import useLoadingIndicator from '../../hooks/useLoadingIndicator';
import { DividerBlock } from '../../styles';
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
    const list = getList(setLoading);
    return (
        <AuthSettingsBlock>
            {loading && <Indicator />}
            {list.length && list.map(item => (
                <ListItem
                    key={item.label}
                    title={item.label}
                    onPress={() => item.onPress()}
                />
            ))}
            <DividerBlock
                backgroundColor="#ccc"
                marginTop={16}
                marginBottom={16}
                height={1}
            />
            <DangerText>플레이펫은 상품에 직접 관여하지 않으며 상품 주문, 배송 및 환불의 의무와 책임은 각 판매업체에 있습니다.</DangerText>
        </AuthSettingsBlock>
    );
};

const linkProvision = () => { };
const linkCustomerCenter = () => { };

const getList = (setLoading: React.Dispatch<React.SetStateAction<boolean>>): List[] => {
    return [
        {
            icon: 'assignment',
            label: '공지사항',
            onPress: linkProvision,
            type: Handle.Link,
        },
        {
            icon: 'assignment',
            label: '자주묻는 질문',
            onPress: linkProvision,
            type: Handle.Link,
        },
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
            onPress: () => handleLogout(setLoading),
            type: Handle.Function,
        },
        {
            icon: 'exit-to-app',
            label: '서비스 탈퇴',
            onPress: () => handleLeave(setLoading),
            type: Handle.Function,
        },
    ]
};

const handleLogout = (setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    Alert.alert('정말로 로그아웃하시게요?', '', [
        {
            text: '취소',
        },
        {
            text: '로그아웃',
            onPress: async () => {
                try {
                    setLoading(true);
                    await signOut(SignType.Google);
                    appReload();
                } catch (e) {
                    alert('로그아웃에 실패하였습니다. 잠시후 다시 시도해 주세요');
                } finally {
                    // setLoading(false);
                }
            },
        },
    ]);
};

const handleLeave = (setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
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

const AuthSettingsBlock = styled.View`
    padding-horizontal: 16px;
`;

const DangerText = styled.Text`
    font-size: 12px;
    padding: 8px;
`;