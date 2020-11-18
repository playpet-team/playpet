import React, { useEffect, useState } from 'react';
import * as RootToast from 'react-native-root-toast';

export interface ToastParams {
    visible: boolean;
    title: string;
    description?: string;
    image?: string;
}

function Toast({
    visible,
    title,
    description = '',
    image = '',
}: ToastParams) {
    return (
        <RootToast.ToastContainer
            visible={visible}
            position={-100}
            shadow={false}
            animation={true}
            hideOnPress={true}
        >
            {title}
        </RootToast.ToastContainer>

    );
};

export default Toast;

