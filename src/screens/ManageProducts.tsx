import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styled, { useTheme } from 'styled-components/native'
import RegistFeedBoard from '../components/RegistFeedBoard';
import useLoadingIndicator from '../hooks/useLoadingIndicator';
import { authActions } from '../store/authReducer';
import { RootState } from '../store/rootReducers';
import { Text } from '../styles';
import { getPetDoc } from '../utils';
import SignInAdditionalInformation from './Home/SignInAdditionalInformation';

export default function ManageProducts() {
    const { loading, setLoading } = useLoadingIndicator()
    const dispatch = useDispatch()
    const [showFeedBoard, setShowFeedBoard] = useState(false);
    const [showRegistPet, setShowRegistPet] = useState(false);
    console.log("showRegistPet--", showRegistPet);
    const {
        uid,
        activePetDocId,
        activePet,
    } = useSelector((state: RootState) => state.auth)

    const theme = useTheme();

    useEffect(() => {
        loadMyPet()
        async function loadMyPet() {
            if (!activePetDocId || !uid) {
                return
            }
            setLoading(true)
            const pet = await getPetDoc(uid, activePetDocId)
            dispatch(authActions.setActivePet(pet))
            setLoading(false)
        }
    }, [activePetDocId, uid])

    const openFeedBoard = () => {
        if (!activePetDocId) {
            Alert.alert('반려동물을 먼저 등록해주세요')
        }
        setShowFeedBoard(true);
    };

    return (
        <ManageProductsBlock>
            <ItemTitle>
                <Text bold size={16}>반려 동물</Text>
                <Text onPress={() => setShowRegistPet(true)}>+ 등록하기</Text>
            </ItemTitle>
            
            <ScrollSection>
                {activePetDocId === '' &&
                    <Text
                        color={theme.colors.text}
                        onPress={() => setShowRegistPet(true)}
                    >
                        등록된 반려동물이 없습니다
                    </Text>
                }
                {activePet &&
                    <Pet>
                        <Text>{activePet.petName}</Text>
                        <Text>{activePet.petType}</Text>
                        <Text>{activePet.size}</Text>
                    </Pet>
                }
            </ScrollSection>
            <ItemTitle>
                <Text bold size={16}>사료</Text>
                <Text onPress={openFeedBoard}>+ 등록하기</Text>
            </ItemTitle>
            <ScrollSection>
                <AddPetButton onPress={openFeedBoard}>
                    <Text
                        color={theme.colors.text}
                        bold
                    >
                        반려동물을 먼저 등록해주세요
                    </Text>
                </AddPetButton>
            </ScrollSection>
            {showRegistPet && <SignInAdditionalInformation setShowRegistPet={setShowRegistPet} />}
            {showFeedBoard && <RegistFeedBoard setShowFeedBoard={setShowFeedBoard} />}
        </ManageProductsBlock>
    );
}

const ManageProductsBlock = styled(SafeAreaView)`
    padding: 16px;
`

const ItemTitle = styled.View`
    flex-direction: row;
    justify-content: space-between;
`

const AddPetButton = styled.TouchableOpacity`
    padding: 16px;
    align-items: center;
    border-radius: 8px;
    border-width: 1px;
    border-color: ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.primary};
    /* justify-content: center; */
`

const Pet = styled.View`
    padding: 16px;
`

const ScrollSection = styled.ScrollView`
    min-height: 200px;
    padding: 16px 0;
`