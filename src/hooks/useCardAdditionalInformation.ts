import { playgroundActions } from './../store/playgroundReducer';
import { RootState } from '../store/rootReducers'
import { useSelector, useDispatch } from 'react-redux'
import { addListenerCardLikes } from '../utils/cards'
import { useState, useEffect } from 'react'

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
                })
            } catch (e) {
                console.error('loadLikes-e-', e)
            }
        }
        if (snapshotListener) {
            return snapshotListener
        }
        
    }, [])

    return { myLikes }
}

export default useCardAdditionalInformation
