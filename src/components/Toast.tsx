import React, { useEffect, useState } from 'react';
import * as RootToast from 'react-native-root-toast';

const resetParams = {
    visible: false,
    title: '',
    description: '',
    image: '',
};

export interface ToastParams {
    visible?: boolean;
    title: string;
    description?: string;
    image?: string;
}

interface ToastProps extends ToastParams {
    setToastContent: React.Dispatch<React.SetStateAction<ToastParams>>;
}
function Toast({
    title,
    description = '',
    image = '',
    setToastContent,
}: ToastProps) {
    return (
        <RootToast.ToastContainer
            visible={true}
            position={-100}
            shadow={false}
            animation={true}
            hideOnPress={true}
            onHidden={() => setToastContent(resetParams)}
        >
            {title}
        </RootToast.ToastContainer>

    );
};

export default Toast;

