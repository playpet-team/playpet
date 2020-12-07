import AsyncStorage from '@react-native-community/async-storage'
import { PetSize } from './../../screens/ManageProducts/RegistrationPet/PetSizeSection';
import { Api } from './../../api/index';
import firestore from '@react-native-firebase/firestore'
import { Collections } from '../../models'
import * as Sentry from "@sentry/react-native";

export const getProductItem = async (PID: string) => {
    return (await firestore()
        .collection<ProductItem>(Collections.Products)
        .doc(PID)
        .get()).data()
}

export const getProductList = async () => {
    try {
        const feedSheet = await AsyncStorage.getItem('feedSheet')
        if (feedSheet) {
            console.log('storage sheet')
            return JSON.parse(feedSheet) as ProductItem[]
        }
        const { data: { feeds, status  } }:
            { data: {
                feeds: ProductItem[]
                status: string
            }}
            = await Api.post('/get-sheet')
        if (feeds) {
            await AsyncStorage.setItem('feedSheet', JSON.stringify(feeds))
        }
        return feeds
    } catch (e) {
        Sentry.captureException(e)
    }
}

export type PetTypes = "" | "DOG" | "CAT"
// type Pet = PetTypes[]
type Size =
    | "SMALL"
    | "MEDIUM"
    | "LARGE"
export interface ProductItem {
    id: string;
    pet: PetTypes
    size: Size
    brand: string
    feedName: string
    feedKind: string
    packingUnit: string[]
    ageGroup: string
    rawMaterial: string[]
    particleSize: string
    individualPacking: boolean
    allergic: boolean
    function: string[]
    expirationDate: string
    manufacturer: string
    countryOfOrigin: string
    image: string
    description: string
}