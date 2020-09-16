import { useEffect, useState } from 'react';
import { currentUser, getUserShippingDestination } from '../utils';
import { FirebaseTimeStamp } from './../utils/system/index';

export interface ShippingInformation {
    shippingLocation: string
    shippingAdditionalAddress: string
    shippingPhonenumber: string
    shippingUsername: string
    uid: string
    createdAt: string | FirebaseTimeStamp | null
    updatedAt: string | FirebaseTimeStamp | null
}
function useShippingDestination() {
    const [shippingData, setShippingData] = useState<null | ShippingInformation[]>(null)

    useEffect(() => {
        loadShippingDestination()
        async function loadShippingDestination() {
            const user = currentUser()
            if (user) {
                const shippingData = await getUserShippingDestination(user.uid)
                setShippingData(shippingData)
                // setShippingData(await getUserShippingDestination(user.uid))
            }
        }
    }, [])

    return { shippingData }
}

export default useShippingDestination