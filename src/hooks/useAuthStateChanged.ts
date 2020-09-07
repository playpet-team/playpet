import AsyncStorage from '@react-native-community/async-storage';
import { askPermission, PermissionsList } from './../utils/system/permission';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { authActions } from '../store/authReducer';
import { getUser, updateUserLastLogin } from '../utils/auth';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

function useAuthStateChanged() {
    const [isLogged, setIsLogged] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const onAuthStateChanged = async (user: FirebaseAuthTypes.User | null) => {
            if (user) {
                dispatch(authActions.setUser(await getUser(user.uid)));
                updateUserLastLogin(user.uid);
                dispatch(authActions.signIn());
                setIsLogged(true);
            } else {
                dispatch(authActions.signOut());
                await AsyncStorage.clear()
            }
        }
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    return { isLogged };
}

export default useAuthStateChanged;
