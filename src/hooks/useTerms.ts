import { authActions, initialState } from './../store/authReducer';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { currentUser, getUserTerms } from '../utils';

function useTerms({ completeTerm }: { completeTerm: boolean }) {
    const dispatch = useDispatch()
    const [existDoc, setExistDoc] = useState(true)
    // const [terms, setTerms] = useState<any>(null)

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
                        existDoc: true,
                        ...termsData,
                    }))
                }
            }
        }
    }, [completeTerm])

    return { existDoc }
}

export default useTerms