import { useEffect, useState } from 'react';
import * as Permissions from 'expo-permissions';
import { get } from 'lodash';

export enum permissionType {
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
export default function usePermission({ type }: { type: permissionType }) {
    const [allowPermission, setIsAllowPermission] = useState(false);
    useEffect(() => {
        const getPermission = async () => {
            const { status } = await Permissions.askAsync(Permissions[type]);
            status === Permissions.PermissionStatus.GRANTED && setIsAllowPermission(true);
            // switch (type) {
            //     case permissionType.NOTIFICATIONS: {
            //         setIsAllowPermission(
            //             (get(permissions, 'notifications.allowsAlert', true) === false
            //             && get(permissions, 'notifications.allowsBadge', true) === false
            //             && get(permissions, 'notifications.allowsSound', true) === false)
            //         )
            //         break;
            //     }
            // }
            // let isPermissions = true;
            // if (permissionsType === 'notification') {
            //     isPermissions = (
            //         get(permissions, 'notifications.allowsAlert', true) === false
            //         && get(permissions, 'notifications.allowsBadge', true) === false
            //         && get(permissions, 'notifications.allowsSound', true) === false
            //     );
            // } else if (permissionsType === 'camera' || permissionsType === 'cameraRoll') {
            //     isPermissions = get(permissions, 'cameraRoll.status', 'granted') !== 'granted';
            // } else if (permissionsType === 'location') {
            //     isPermissions = get(permissions, 'location.status', 'granted') !== 'granted';
            // }
            // if (status !== 'granted' || isPermissions) {
            //     isAllowPermissions = false;
            // }
            // this[permissionStoreInfo[permissionsType]] = isAllowPermissions;
            // return isAllowPermissions;
        }
        getPermission();
    }, []);

    return [allowPermission];
}
