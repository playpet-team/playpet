import firestore from '@react-native-firebase/firestore';
import { firebaseTimeStampToStringStamp } from './../system/index';
import { collections } from '../../models';

export const loadBanner = async (): Promise<BannerProp[] | []> => {
    const banners = await firestore().collection(collections.Banners).where('status', '==', 'active').get();
    return banners.docs.map(banner => {
        const bannerData = banner.data();
        return {
            ...bannerData,
            id: bannerData.id,
            status: bannerData.status,
            title: bannerData.title,
            description: bannerData.description,
            image: bannerData.image,
            link: bannerData.link,
            type: bannerData.type,
            backgroundColor: bannerData.backgroundColor,
            createdAt: firebaseTimeStampToStringStamp(bannerData.createdAt),
            updatedAt: firebaseTimeStampToStringStamp(bannerData.updatedAt),
            expiredAt: firebaseTimeStampToStringStamp(bannerData.updatedAt),
        };
    });
};

export interface BannerProp {
    id: string;
    status: 'active' | 'deactive';
    title: string;
    description: string;
    image: string;
    link: string;
    type: 'event';
    backgroundColor: string;
    createdAt: string | null;
    updatedAt: string | null;
    expiredAt: string | null;
}