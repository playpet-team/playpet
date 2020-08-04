import { RootState } from './../store/rootReducers';
import { askPermission, permissionType } from './../utils/system/permission';
import auth from '@react-native-firebase/auth';
import { authActions } from '../store/authReducer';
import { getUser, updateUserLastLogin } from '../utils/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

function useAuthStateChanged() {
    const dispatch = useDispatch();
    const { isLogged } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        const onAuthStateChanged = async (user: any) => {
            if (user) {
                dispatch(authActions.setUser(await getUser(user.uid)));
                updateUserLastLogin(user.uid);
                dispatch(authActions.signIn());
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

}

export default useAuthStateChanged;