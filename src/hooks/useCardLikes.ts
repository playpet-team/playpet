import { RootState } from './../store/rootReducers';
import { useSelector } from 'react-redux';
import { getCardLikes } from './../utils/cards';
import { useState, useEffect } from 'react';

let snapshotListener: any;
function useCardLikes() {
    const [myLikes, setMyLikes] = useState<string[]>([]);
    const { uid } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        loadLikes();
        async function loadLikes() {
            try {
                snapshotListener = await getCardLikes(uid, (data: any) => {
                    if (myLikes.length !== (data?.cardLikes || []).length) {
                        setMyLikes(data?.cardLikes || []);
                    }
                });
            } catch (e) {
                console.error('loadLikes-e-', e);
            }
        };
        if (snapshotListener) {
            return snapshotListener;
        }
        
    }, [myLikes]);

    return { myLikes };
}

export default useCardLikes;
