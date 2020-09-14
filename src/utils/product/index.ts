import firestore from '@react-native-firebase/firestore';
import { Collections } from '../../models';
import { ProductItem } from './../../components/ProductListItem';

export const loadProduct = async (PID: string) => {
    return (await firestore()
        .collection(Collections.Products)
        .doc(PID)
        .get()).data() as ProductItem;
};

export const loadProductList = async () => {
    const productList = await firestore()
        .collection(Collections.Products)
        .where('status', '==', 'active')
        .get();

    return productList.docs.map((product: any) => {
        return {
            ...product.data() as ProductItem,
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
