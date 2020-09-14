import firestore from '@react-native-firebase/firestore';
import { Collections } from '../../models';
import { firebaseTimeStampToStringStamp } from './../system/index';

export const loadBanner = async () => {
    const banners = await firestore().collection(Collections.Banners).where('status', '==', 'active').get();
    return banners.docs.map(banner => {
        const bannerData = banner.data() as BannerProp;
        return {
            ...bannerData,
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