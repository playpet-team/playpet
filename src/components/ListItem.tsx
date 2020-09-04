import React, { ReactNode } from 'react';
import { ListItem as List, Icon } from 'react-native-elements';
import styled, { css } from 'styled-components/native';

export default function ListItem({ title, onPress, titleStyle, containerStyle, rightIcon }: {
    title: string;
    onPress: () => void;
    titleStyle?: object;
    containerStyle?: object;
    rightIcon?: React.ReactElement;
}) {
    return (
        <List
            onPress={onPress}
            style={{
                // padding: 16,
                ...containerStyle
            }}
        >
            <List.Content>
                <List.Title style={{
                    fontSize: 16,
                    ...titleStyle,
                }}>{title}</List.Title>
            </List.Content>
            {rightIcon && rightIcon}
        </List>
    );
};
