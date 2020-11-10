import firestore from '@react-native-firebase/firestore'
import { Collections } from '../../models'

export const loadProduct = async (PID: string) => {
    return (await firestore()
        .collection(Collections.Products)
        .doc(PID)
        .get()).data() as ProductItem
}

export const loadProductList = async (type = 'DOG') => {
    const productList = await firestore()
        .collection(Collections.Products)
        .where('status', '==', 'active')
        .where('type', '==', type)
        .orderBy('desc')
        .get()

    return productList.docs.map((product: any) => {
        return {
            ...product.data() as ProductItem,
            id: product.id as string,
        }
    })
}
export type PetTypes = "" | "DOG" | "CAT"
type Pet = PetTypes[]
type Breed = [
    "SMALL",
    "MEDIUM",
    "LARGE"
]
export interface ProductItem {
    id: string;
    pet: Pet
    breed: Breed
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