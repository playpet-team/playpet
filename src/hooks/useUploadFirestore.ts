import { RootState } from '../store/rootReducers';
import { firebaseNow } from "../utils"
import { firebase } from '@react-native-firebase/storage'
import { useSelector } from "react-redux"
import { useState } from 'react';

export function useUploadFirestore() {
    const { uid } = useSelector((state: RootState) => state.auth)
    // const [downloadUrl, setDownloadUrl] = useState<null | string>(null)

    const upload = async ({ uri, path }: { uri: string; path: string; }) => {
        if (!path) {
            path = `playground/${uid}_${firebaseNow().seconds}`
        }
        const reference = firebase.storage().ref(path)
        await reference.putFile(uri)
        return await reference.getDownloadURL()
        // setDownloadUrl()
    }

    return { upload }
}
