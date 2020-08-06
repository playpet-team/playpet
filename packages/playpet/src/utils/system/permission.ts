import * as Permissions from 'expo-permissions';

export enum PermissionsList {
    NOTIFICATIONS = 'NOTIFICATIONS',
    USER_FACING_NOTIFICATIONS = 'USER_FACING_NOTIFICATIONS',
    LOCATION = 'LOCATION',
    CAMERA = 'CAMERA',
    AUDIO_RECORDING = 'AUDIO_RECORDING',
    CONTACTS = 'CONTACTS',
    CAMERA_ROLL = 'CAMERA_ROLL',
    CALENDAR = 'CALENDAR',
    REMINDERS = 'REMINDERS',
};
export const askPermission = async (type: PermissionsList) => {
    const { status } = await Permissions.askAsync(Permissions[type]);
    return {
        status,
        type,
    };
};
