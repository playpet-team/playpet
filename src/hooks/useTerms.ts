import { useEffect, useState } from 'react';
import { currentUser, getUserTerms } from '../utils';

function useTerms() {
    const [existDoc, setExistDoc] = useState(true)
    const [terms, setTerms] = useState<any>(null)

    useEffect(() => {
        loadTerms()
        async function loadTerms() {
            const user = currentUser()
            if (user && user.uid) {
                console.log('user-----', user)
                const termsDoc = await getUserTerms(user.uid)
                if (!termsDoc.exists) {
                    setExistDoc(true)
                } else {
                    setTerms(termsDoc.data())
                }
            }
        }
    }, [])

    return { existDoc, terms }
}

export default useTerms