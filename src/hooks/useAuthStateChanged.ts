import { signOut } from './../utils/auth/index'
import { NativeModules } from 'react-native'
import analytics from '@react-native-firebase/analytics'
import AsyncStorage from '@react-native-community/async-storage'
import { askPermission, PermissionsList } from './../utils/system/permission'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { authActions } from '../store/authReducer'
import { getUser, updateUserLastLogin } from '../utils/auth'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'

function useAuthStateChanged() {
    const [isLogged, setIsLogged] = useState(false)
    const dispatch = useDispatch()
    console.log('------123123123--', isLogged)

    useEffect(() => {
        const onAuthStateChanged = async (user: FirebaseAuthTypes.User | null) => {
            if (user) {
                console.log("--------user")
                const userData = await getUser(user.uid)
                if (!userData) {
                    signOut()
                    return
                }
                dispatch(authActions.setUser(userData))
                analytics().setUserId(user.uid)
                analytics().logLogin({ method: userData.method })
                updateUserLastLogin(user.uid)
                dispatch(authActions.signIn())
                setIsLogged(true)
            } else {
                console.log("--------no user")
                dispatch(authActions.signOut())
                await AsyncStorage.clear()
                // NativeModules.DevSettings.reload()
            }
        }
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
        return subscriber
    }, [isLogged])

    return { isLogged }
}

export default useAuthStateChanged
