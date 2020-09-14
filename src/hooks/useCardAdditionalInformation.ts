import * as Sentry from "@sentry/react-native";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/rootReducers';
import { addListenerCardLikes, UserAction } from '../utils/cards';
import { playgroundActions } from './../store/playgroundReducer';

let snapshotListener: any
function useCardAdditionalInformation() {
    const dispatch = useDispatch()
    const [myLikes, setMyLikes] = useState<string[]>([])
    const { uid } = useSelector((state: RootState) => state.auth)

    useEffect(() => {
        loadLikes()
        async function loadLikes() {
            try {
                snapshotListener = await addListenerCardLikes(uid, (data: UserAction) => {
                    dispatch(playgroundActions.setMyLikes(data?.cardLikes))
                    dispatch(playgroundActions.setMyFollowing(data?.followings))
                })
            } catch (e) {
                Sentry.captureException(e)
            }
        }
        
        return () => {
            if (typeof snapshotListener === 'function') {
                snapshotListener()
            }
        }
        
    }, [])

    return { myLikes }
}

export default useCardAdditionalInformation
