import React, { ReactChildren, ReactNode, useMemo } from "react";
import Modal from "react-native-modal";
import styled from 'styled-components/native';
import { Text } from "react-native";

interface PlaypetDialog {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    children: ReactNode;
    isHideCloseButton?: boolean;
    isBackdropPress?: boolean;
    containerStyle?: object;
};

const PlaypetDialog = ({
    modalVisible,
    setModalVisible,
    isHideCloseButton = false,
    isBackdropPress = true,
    containerStyle = {},
    children,
}: PlaypetDialog) => {
    const handleCloseModal = () => setModalVisible(false);

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
                <Container style={containerStyle}>
                    <PlaypetDialogHeader>
                        <Text>헤더</Text>
                        {!isHideCloseButton &&
                            <CloseButton onPress={handleCloseModal}>
                                <Text>X</Text>
                            </CloseButton>
                        }
                    </PlaypetDialogHeader>
                    <PlaypetDialogChildren>
                        {children}
                    </PlaypetDialogChildren>
                </Container>
            </Modal>
        </StyledSafeAreaView>
    )
};

const StyledSafeAreaView = styled.SafeAreaView`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const Container = styled.View`
    padding: 16px;
    flex-direction: column;
    width: 320px;
    background-color: #fff;
    border-radius: 4px;
`;

const PlaypetDialogHeader = styled.View`
    justify-content: center;
    flex-direction: row;
    width: 100%;
`;

const CloseButton = styled.TouchableOpacity`
    position: absolute;
    right: 8px;
`;

const PlaypetDialogChildren = styled.View`
    margin-top: 16px;
`;

export default PlaypetDialog;