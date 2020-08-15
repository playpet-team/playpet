import React, { useState, useEffect } from 'react';
import { ButtonGroup, ElementObject } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';
import { ItemList } from '../screens/AuthScreen';

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
    const [selectedIndex, setSelectedIndex] = useState(0);
    const themes = useTheme();

    useEffect(() => {
        // TODO
    }, [selectedIndex]);

    return (
        <ButtonGroup
            onPress={index => {
                setSelectedIndex(index);
                onSelect!(index);
            }}
            selectedIndex={selectedIndex}
            buttons={buttons}
            textStyle={{
                color: themes.colors.text,
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
                color: themes.colors.primary,
                ...selectedTextStyle,
            }}
        />
    )
};
