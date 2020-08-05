import { askPermission, permissionType } from './../utils/system/permission';
import auth from '@react-native-firebase/auth';
import { authActions } from '../store/authReducer';
import { getUser, updateUserLastLogin } from '../utils/auth';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

function useAuthStateChanged() {
    const [isLogged, setIsLogged] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const onAuthStateChanged = async (user: any) => {
            if (user) {
                dispatch(authActions.setUser(await getUser(user.uid)));
                updateUserLastLogin(user.uid);
                dispatch(authActions.signIn());
                setIsLogged(true);
            } else {
                dispatch(authActions.signOut());
            }
        }
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    useEffect(() => {
        if (isLogged) {
            askPermission(permissionType.NOTIFICATIONS);
        }
    }, [isLogged]);

    return { isLogged };
}

export default useAuthStateChanged;
