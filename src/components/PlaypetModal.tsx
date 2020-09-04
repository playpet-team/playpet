import React, { ReactChildren, ReactNode, useMemo } from "react"
import Modal from "react-native-modal"
import styled from 'styled-components/native'
import { Text } from "react-native"
import { useTheme, Theme } from "@react-navigation/native"

interface ModalProps {
    modalVisible: boolean
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
    children: ReactNode
    isHideCloseButton?: boolean
    isBackdropPress?: boolean
    containerStyle?: object
    header?: boolean
}

const PlaypetModal = ({
    modalVisible,
    setModalVisible,
    isHideCloseButton = false,
    isBackdropPress = true,
    containerStyle = {},
    children,
    header = false,
}: ModalProps) => {
    const handleCloseModal = () => setModalVisible(false)
    const themes = useTheme()
    return (
        <StyledSafeAreaView>
            <Modal
                isVisible={modalVisible}
                useNativeDriver={true}
                hideModalContentWhileAnimating={true}
                hasBackdrop={isBackdropPress}
                onBackdropPress={handleCloseModal}
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Container
                    style={containerStyle}
                    colors={themes.colors}
                >
                    {header &&
                        <PlaypetDialogHeader>
                            <Text>헤더</Text>
                            {!isHideCloseButton &&
                                <CloseButton onPress={handleCloseModal}>
                                    <Text>X</Text>
                                </CloseButton>
                            }
                        </PlaypetDialogHeader>
                    }
                    <PlaypetDialogChildren header={header}>
                        {children}
                    </PlaypetDialogChildren>
                </Container>
            </Modal>
        </StyledSafeAreaView>
    )
}

const StyledSafeAreaView = styled.SafeAreaView`
    flex: 1;
    justify-content: center;
    align-items: center;
`

const Container = styled.View<Pick<Theme, 'colors'>>`
    padding: 16px;
    flex-direction: column;
    width: 320px;
    background-color: ${(props) => props.colors.background};
    border-radius: 4px;
`

const PlaypetDialogHeader = styled.View`
    justify-content: center;
    flex-direction: row;
    width: 100%;
`

const CloseButton = styled.TouchableOpacity`
    position: absolute;
    right: 8px;
`

const PlaypetDialogChildren = styled.View<{ header: boolean }>`
    margin-top: ${({ header }) => header ? 16 : 0}px;
`

export default PlaypetModal;