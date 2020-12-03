import React, { useEffect, useState } from 'react'
import styled, { useTheme } from 'styled-components/native'
import { Avatar } from 'react-native-elements'
import { useSelector } from 'react-redux'
import { ageNameMap } from '../screens/ManageProducts/RegistrationPet/PetAgeSection'
import { sizeNameMap } from '../screens/ManageProducts/RegistrationPet/PetSizeSection'
import { RootState } from '../store/rootReducers'
import { useNavigation } from '@react-navigation/native'
import { DividerBlock, Text } from '../styles'
import { getPetDoc } from '../utils'
import { MyPet } from '../models'

function ProfileSection() {
    const {
        uid,
        profilePhoto,
        isLogged,
        activePetDocId,
    } = useSelector((state: RootState) => state.auth)
    const [myPets, setMyPets] = useState<MyPet>()
    const navigation = useNavigation()
    const themes = useTheme()

    useEffect(() => {
        loadMyPet()
        async function loadMyPet() {
            if (!activePetDocId || !uid) {
                return
            }
            const pet = await getPetDoc(uid, activePetDocId)
            if (pet) {
                setMyPets(pet)
            }
        }
    }, [activePetDocId, uid])

    if (!uid) {
        return null
    }
    
    return (
        <ProfileSectionBlock>
            <ProfileBlock>
                <AvatarBlock>
                    {Boolean(profilePhoto) &&
                        <Avatar
                            size="medium"
                            rounded
                            source={{
                                uri: profilePhoto,
                            }}
                            containerStyle={{
                                marginRight: 8,
                            }}
                        />
                    }
                </AvatarBlock>
                {myPets &&
                    <UserInfoBlock>
                        <InfoHeader>
                            <Text size={20} bold>{myPets.petName || '이름을 설정해주세요'}</Text>
                            <Text padding="0 0 0 8px" color={themes.colors.placeholder}>
                                {myPets.petType === 'DOG' ? '반려견' : '반려묘'}
                            </Text>
                        </InfoHeader>
                        <DividerBlock height={8} />
                        <Text color={themes.colors.placeholder}>
                            {ageNameMap[myPets.petAge].title} | {sizeNameMap[myPets.petSize].title}
                        </Text>
                    </UserInfoBlock>
                }
                <MoreActions>
                    <MoreButton onPress={() => navigation.navigate('ManageProducts')}>
                        <Text
                            color={themes.colors.primary}
                            size={14}
                            align="center"
                        >
                            더 보기
                        </Text>
                    </MoreButton>
                </MoreActions>
            </ProfileBlock>
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

const InfoHeader = styled.View`
    flex-direction: row;
    align-items: center;
`

const AvatarBlock = styled.View`
    align-items: center;
    justify-content: center;
`

const UserInfoBlock = styled.View`
    margin-left: 8px;
    flex: 1;
`
const MoreActions = styled.View`
`
const MoreButton = styled.TouchableOpacity`
    padding: 10px 16px;
    border-color: ${(props) => props.theme.colors.primary};
    border-width: 1px;
    border-radius: 6px;
`



// const ProfileText = styled(Text)`
//     font-size: 16px;
// `