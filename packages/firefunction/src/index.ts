import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
export {
    withdraw,
} from './auth';

export {
    haha,
    manageCardLikes,
} from './playground';

// admin gcp 권한 json -> 보관에 주의해야함
admin.initializeApp({
    credential: admin.credential.cert({
        "projectId": "playpet-5b432",
        "privateKey": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDjvqvDcSnPDc/v\nFAw+7d+7oFJt9ea33z/i/4XfJ6shqQmhV/w4CKVMSfVtjrgwMCkaZbXgSBSdeIGs\naFl7FtaUPM/I0q15gg5IU0Wc4rJSAWSUifSxXiN7V0bJP1w4kNHT2F3z1UBDa5Kf\nFG5sXmM9dDGOHTBa6qx/0not/ycMT3ZM1fgdYhvGyui22M0u5KCu04mtzmiDogry\nIYxLjMIWbAHMxJSEzmhuunEBU7JYpoFQfw1P8rH22SFUWC8/pEo7DGr9xm7xIItY\n4Q0ZGY20CgcwXXCb4MMQdJ0WlBr324K7H6HxKXPXU3eOV0QWHzw29ODK8H3xQCCM\nXBuRXuBpAgMBAAECggEAUW3kyyokiUBGhxSTdlKmCtd9cYyZFEhR9u9m5c2wrgXb\nCCHF8CEDPT46bxQ2/h/SKnqQZ6NOH6mtL8BVsiGN0o3Vu1e8p/Pc+HYxrzENEi4m\nUMfswhhHNnwTtrQdXKpHI+g6W4r1gcWuNIvhGYU8FYZ8i3QbTH6Y89EFV3nh88+u\nypS5kSb+3TJOZoPzQ2gSxhzjfA97Bdlh51R861LXyV8lz/oLeiSr5JPqH16RMFQq\npdLA67cSHY2X1/5Au3dF8Hs/bbFufHaAfUPvnYenEf5VSapp/axT7TH1jS1nIDG9\nYn5g/j4aJT+01JGh0OR5b3ea2WZmfR7uHdDFgH+5YwKBgQD7wFHlVWdB/u6KP9PK\nn3ldF/dROK3YU6ED+QB33w7TYRHn97V1oMNNPdTv+vWfC3z4i8orpphQiiLXExPz\nR5JPC0kFFKHIR+jT/FJ51uWcxggmuj/sfteHiy//Np+fxJK+gZu2zorb9GrEKt+x\n8AOQVFt57fL0G9Msp+pl0LFLywKBgQDnlqHdPTW7FbdIdV22ZIjimybogOTQQk9U\nU0XGLPGdtUga/Sv39+t3jyM7x3WTDdN+pBocHx0aprMeEsTJRqi94jXLcsLsyirl\nc4F2CNwwweYR0g7QlP0ykToIfCOm7pmqTXS9BP1oOOPs9zpi/w2zQpopwRRqpIEc\nuMtpYktmGwKBgQCaVZefQVERG2k/ZcvADy4GzTd4Gogw82vllJQd6KgdHAgvLiOX\nXhv80WgmSrKjcxaFBKXHRtVfop+jPHXhkcH3JVL5g2F+996bfrdNLFoNVzYOD+Y6\nZLRayxB8pA8NkiPoGGrOkiZ8m4WMh0AlxJ9arux5fk+QKTK30KUZD+xxKwKBgQCt\nNxNWIMQhbDqsLWysUUG5DAbr/AwoYJBpJ+eWNGN7a+3Ekfvi+kHaKOtXePZNyReZ\nLzCAPB1Oo8RxB+S8DueDLsDBrNJyvTucZuo72KCorz5fsdd21xkSS2E2m3MnFmtE\n364i+qp226ZOxROcm9wpafVYqZuVr/kJ/IXYCrcOZQKBgQCUc+0f2xaJKZ0/M3gm\nl5sCDiDOGd0S/auFtx9/6+TXz2PYTajAG+3orFudh5hkXbX50WR609biHQ4fFkXJ\n/OOgI04npfyvSM/pOO/HJVZ71K2d9zlqf2GKwt8xOoB55/w5kDT9lVCgLerM12Ni\nrPpAznZEzsisfJsbSQZ1BcZh1w==\n-----END PRIVATE KEY-----\n",
        "clientEmail": "firebase-adminsdk-921ca@playpet-5b432.iam.gserviceaccount.com",
    })
});

export const getCurrentTime = () => admin.firestore.FieldValue.serverTimestamp();

interface createUserParams {
    uid: string;
    method: string;
}

export const aoeuaoeu = functions.https.onCall(async ({ uid, method }: createUserParams) => {
    console.log('----------');
    return true;
});

export const createUserCollection = functions.https.onCall(async ({ uid, method }: createUserParams) => {
    try {
        const {
            email,
            displayName = '',
            phoneNumber = '',
            photoURL = '',
        } = await admin.auth().getUser(uid);

        await admin.firestore().collection('users').doc(uid).set({
            uid,
            method,
            isLeave: false,
            username: displayName,
            email,
            phoneNumber,
            profilePhoto: photoURL,
            leaveAt: '',
            gender: '',
            birthDate: '',
            lastLogin: getCurrentTime(),
            createdAt: getCurrentTime(),
            updatedAt: getCurrentTime(),
        });
        return { result: 'signUp', status: 'SUCCESS' };
    } catch (error) {
        console.error('createUserCollection--error--', error);
        return { result: 'error', status: 'SUCCESS' };
    }
});
