import { getPetDoc } from './../utils/auth/index';
import { MyPet } from './../models/src/user';
import { RootState } from './../store/rootReducers';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import * as Sentry from "@sentry/react-native";

function useMyPet() {
    // product type 정해야함
    const [myPets, setMyPets] = useState<MyPet>()
    const [loading, setLoading] = useState(false);

    const {
        uid,
        activePetDocId,
    } = useSelector((state: RootState) => state.auth)

    useEffect(() => {
        loadMyPet()
        async function loadMyPet() {
            if (!activePetDocId || !uid) {
                return
            }
            setLoading(true)
            try {
                const pet = await getPetDoc(uid, activePetDocId)
                if (pet) {
                    setMyPets(pet)
                }
            } catch (e) {
                Sentry.captureException(e)
            } finally {
                setLoading(false)
            }
        }
    }, [activePetDocId, uid])

    return {
        myPets,
        loading,
    }
};

export default useMyPet;
