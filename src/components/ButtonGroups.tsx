import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ButtonGroup, ElementObject } from 'react-native-elements';

interface Groups {
    buttons: string[] | ElementObject[];
    textStyle?: object;
    containerStyle?: object;
    selectedButtonStyle?: object;
    selectedTextStyle?: object;
    onSelect?: React.Dispatch<React.SetStateAction<any>>;
}
export default function ButtonGroups({
    buttons,
    textStyle,
    containerStyle,
    selectedButtonStyle,
    selectedTextStyle,
    onSelect,
}: Groups) {
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const themes = useTheme();

    useEffect(() => {
        // TODO
    }, [selectedIndex]);

    return (
        <ButtonGroup
            onPress={index => {
                setSelectedIndex(index);
                onSelect!(buttons[index]);
            }}
            selectedIndex={selectedIndex}
            buttons={buttons}
            textStyle={{
                color: themes.colors.border,
                fontSize: 16,
                ...textStyle,
            }}
            containerStyle={{
                width: 130,
                borderWidth: 0,
                ...containerStyle,
            }}
            innerBorderStyle={{
                width: 0,
            }}
            selectedButtonStyle={{
                backgroundColor: themes.colors.background,
                borderBottomWidth: 2,
                borderBottomColor: themes.colors.border,
                ...selectedButtonStyle,
            }}
            selectedTextStyle={{
                color: themes.colors.text,
                ...selectedTextStyle,
            }}
        />
    )
};
