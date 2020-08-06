import { cardImage } from "../CardFormScreen";
import { useState } from "react";
import { CardModel, submitCard } from "../../utils";
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/storage';
import { Button } from 'react-native-elements';

interface SubmitType {
    cardImages: cardImage[];
    uid: string;
    title: string;
    description: string;
    tags: string[];
}
function SubmitButton({ cardImages, uid, title, description, tags }: SubmitType) {
    const [isSubmitLoading, setSubmitLoading] = useState(false);
    const formSubmit = async () => {
        setSubmitLoading(true);
        const downloadUrls = await startUploadStorage();
        const formData: CardModel = {
            title,
            description,
            tags,
            uid,
            uploadMedia: cardImages.map((image, index) => ({
                firebaseUrl: downloadUrls[index],
                isVideo: image.isVideo,
                width: image.width,
                height: image.height,
            })),
            createdAt: firestore.Timestamp.now(),
            updatedAt: firestore.Timestamp.now(),
        };
        await submitCard(formData);
        setSubmitLoading(false);
    };
    const startUploadStorage = async () => {
        return await Promise.all(
            cardImages.map(async (image) => {
                const reference = firebase.storage().ref(`playground/${uid}_${firestore.Timestamp.now().seconds}`);
                await reference.putFile(image.uri);
                return reference.getDownloadURL();
            })
        );
    };
    return (
        <Button
            title="저장"
            disabled={isSubmitLoading}
            onPress={formSubmit}
        />
    );
};

export default SubmitButton;