import firestore from '@react-native-firebase/firestore';
import { firebaseTimeStampToStringStamp } from './../system/index';
import { collections } from '../../models';

export const loadProduct = async (PID: string) => {
    return (await firestore()
        .collection(collections.Products)
        .doc(PID)
        .get()).data();
};

export const loadProductList = async () => {
    const productList = await firestore()
        .collection(collections.Products)
        .where('status', '==', 'active')
        .get();

    return productList.docs.map((product: any) => {
        return {
            ...product.data(),
            id: product.id,
        };
    });
};

export type petType = 'dog' | 'cat';
export interface ProductForm {
    id: string;
    uid: string;
    title: string;
    status: 'active' | 'deactive';
    description: string;
    petType: petType;
    ratings: number;
    mallName: string;
    originalCategoery: string;
    tags: string[];
    category: string;
    url: string;
    image: string;
    price: number;
    discountPrice: number;
    hits: number;
    reviewCount: number;
    orderCount: number;
    profits: number;
    createdAt: any;
    updatedAt: any;
    expiredAt: any;
};
