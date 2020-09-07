import { playgroundActions } from './../store/playgroundReducer';
import { RootState } from '../store/rootReducers'
import { useSelector, useDispatch } from 'react-redux'
import { addListenerCardLikes } from '../utils/cards'
import { useState, useEffect } from 'react'
import * as Sentry from "@sentry/react-native";

let snapshotListener: any
function useCardAdditionalInformation() {
    const dispatch = useDispatch()
    const [myLikes, setMyLikes] = useState<string[]>([])
    const { uid } = useSelector((state: RootState) => state.auth)

    useEffect(() => {
        loadLikes()
        async function loadLikes() {
            try {
                snapshotListener = await addListenerCardLikes(uid, (data: any) => {
                    dispatch(playgroundActions.setMyLikes(data?.cardLikes))
                    dispatch(playgroundActions.setMyFollowing(data?.followings))
                })
            } catch (e) {
                Sentry.captureException(e)
            }
        }
        if (snapshotListener) {
            return snapshotListener
        }
        
    }, [])

    return { myLikes }
}

export default useCardAdditionalInformation
