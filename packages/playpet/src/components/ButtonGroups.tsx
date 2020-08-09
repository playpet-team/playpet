import React, { useState, useEffect } from 'react';
import { ButtonGroup, ElementObject } from 'react-native-elements';

interface Groups {
    buttons: string[] | ElementObject[];
    textStyle?: object;
    selectedButtonStyle?: object;
    selectedTextStyle?: object;
}
export default function ButtonGroups({
    buttons,
    textStyle,
    selectedButtonStyle,
    selectedTextStyle,
}: Groups) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        // TODO
    }, [selectedIndex]);

    return (
        <ButtonGroup
            onPress={index => setSelectedIndex(index)}
            selectedIndex={selectedIndex}
            buttons={buttons}
            textStyle={{
                color: '#999',
                ...textStyle,
            }}
            containerStyle={{
                width: 130,
                borderWidth: 0,
            }}
            innerBorderStyle={{
                width: 0,
            }}
            selectedButtonStyle={{
                backgroundColor: '#fff',
                borderBottomWidth: 2,
                borderBottomColor: '#000',
                ...selectedButtonStyle,
            }}
            selectedTextStyle={{
                color: '#000',
                ...selectedTextStyle,
            }}
        />
    )
};
