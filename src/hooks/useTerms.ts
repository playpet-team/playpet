import { authActions, initialState } from './../store/authReducer';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { currentUser, getUserTerms } from '../utils';

function useTerms() {
    const dispatch = useDispatch()
    const [existDoc, setExistDoc] = useState(true)
    // const [terms, setTerms] = useState<any>(null)

    useEffect(() => {
        loadTerms()
        async function loadTerms() {
            const user = currentUser()
            if (user && user.uid) {
                const termsData = await getUserTerms(user.uid)
                if (!termsData) {
                    setExistDoc(false)
                    dispatch(authActions.setTerms(initialState.terms))
                } else {
                    const { overAgeAgree, termsOfUseAgree, personalCollectAgree, marketingAgree }: any = termsData
                    dispatch(authActions.setTerms({
                        existDoc: true,
                        ...termsData,
                    }))
                }
            }
        }
    }, [])

    return { existDoc }
}

export default useTerms