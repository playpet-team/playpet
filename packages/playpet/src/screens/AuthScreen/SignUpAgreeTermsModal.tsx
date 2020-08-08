import React, { useState, useMemo, Dispatch, SetStateAction } from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import auth from '@react-native-firebase/auth';

import { updateUserTerms, currentUser } from '../../utils';
import PlaypetDialog from '../../components/PlaypetDialog';

interface TermsModal {
    modalVisible: boolean;
    setModalVisible: Dispatch<SetStateAction<boolean>>;
};

export default function SignUpAgreeTermsModal({ modalVisible, setModalVisible }: TermsModal) {
    const [overAgeAgree, setOverAgeAgree] = useState(false);
    const [termsOfUseAgree, setTermsOfUseAgree] = useState(false);
    const [personalCollectAgree, setPersonalCollectAgree] = useState(false);
    const [marketingAgree, setMarketingAgree] = useState(false);

    const handleAllAgree = () => {
        setOverAgeAgree(true);
        setTermsOfUseAgree(true);
        setPersonalCollectAgree(true);
        setMarketingAgree(true);
    };

    const allAgreeTarms = useMemo(() => {
        return overAgeAgree && termsOfUseAgree && personalCollectAgree;
    }, [overAgeAgree, termsOfUseAgree, personalCollectAgree]);


    const hanbleSubmitAgreeTerms = async () => {
        const user = currentUser();
        if (!user) {
            return;
        }
        const uid = user.uid;
        updateUserTerms(uid, {
            overAgeAgree,
            termsOfUseAgree,
            personalCollectAgree,
            marketingAgree,
        });
        setModalVisible(false);
    };

    return (
        <PlaypetDialog
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            isHideCloseButton={true}
            isBackdropPress={false}
        >
            <Text>회원가입을 추카합니다</Text>
            <AllTermsAgree onPress={handleAllAgree}>
                <Text>{}</Text><Text>약관에 모두 동의</Text>
            </AllTermsAgree>
            <TermsAgree onPress={() => setOverAgeAgree(!overAgeAgree)}>
                <Text>{overAgeAgree ? 'checked' : 'none'}</Text><Text>만 14세 이상입니다</Text>
            </TermsAgree>
            <TermsAgree onPress={() => setTermsOfUseAgree(!termsOfUseAgree)}>
                <Text>{termsOfUseAgree ? 'checked' : 'none'}</Text><Text>서비스 이용약관에 동의</Text>
            </TermsAgree>
            <TermsAgree onPress={() => setPersonalCollectAgree(!personalCollectAgree)}>
                <Text>{personalCollectAgree ? 'checked' : 'none'}</Text><Text>개인정보 수집 이용에 동의</Text>
            </TermsAgree>
            <TermsAgree onPress={() => setMarketingAgree(!marketingAgree)}>
                <Text>{marketingAgree ? 'checked' : 'none'}</Text><Text>홍보 및 마케팅 이용에 동의</Text>
            </TermsAgree>
            <SubmitSignIn onPress={() => hanbleSubmitAgreeTerms()} disabled={!allAgreeTarms}>
                <Text>확인</Text>
            </SubmitSignIn>
        </PlaypetDialog>
    );
};

const AllTermsAgree = styled.TouchableOpacity``;
const TermsAgree = styled.TouchableOpacity``;
const SubmitSignIn = styled.TouchableOpacity`
    background-color: blue;
`;