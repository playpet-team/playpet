import React, { ReactNode } from "react"
import Modal from "react-native-modal"
import styled from 'styled-components/native'
import { useTheme, Theme } from "@react-navigation/native"
import { Icon } from "react-native-elements"

interface ModalProps {
    modalVisible: boolean
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
    children: ReactNode
    isHideCloseButton?: boolean
    isBackdropPress?: boolean
    containerStyle?: {
        width?: number
        padding?: string
    }
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
                    colors={themes.colors}
                    containerStyle={containerStyle}
                >
                    {header &&
                        <PlaypetDialogHeader>
                            {!isHideCloseButton &&
                                <CloseButton onPress={handleCloseModal}>
                                    <Icon name='close' />
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

const Container = styled.View<Pick<Theme, 'colors'> & Pick<ModalProps, 'containerStyle'>>`
    flex-direction: column;
    width: ${({ containerStyle }) => containerStyle?.width ? containerStyle.width : 320}px;
    padding: ${({ containerStyle }) => containerStyle?.padding ? containerStyle.padding : 16}px;
    background-color: ${({ colors }) => colors.background};
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