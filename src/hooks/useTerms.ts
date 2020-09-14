import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { currentUser, getUserTerms } from '../utils';
import { authActions, initialState } from './../store/authReducer';

function useTerms() {
    const dispatch = useDispatch()
    const [existDoc, setExistDoc] = useState(true)

    useEffect(() => {
        loadTerms()
        async function loadTerms() {
            const user = currentUser()
            if (user && user.uid) {
                const termsData = await getUserTerms(user.uid)
                setExistDoc(Boolean(termsData))
                if (!termsData) {
                    dispatch(authActions.setTerms(initialState.terms))
                } else {
                    dispatch(authActions.setTerms({
                        ...termsData,
                        existDoc: true,
                    }))
                }
            }
        }
    }, [])

    return { existDoc }
}

export default useTerms