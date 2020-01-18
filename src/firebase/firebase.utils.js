import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCg_rlOEvQhKBnHwwFY8JrxPT7p4ZFM4ig",
    authDomain: "crwn-db-affb3.firebaseapp.com",
    databaseURL: "https://crwn-db-affb3.firebaseio.com",
    projectId: "crwn-db-affb3",
    storageBucket: "crwn-db-affb3.appspot.com",
    messagingSenderId: "376496575487",
    appId: "1:376496575487:web:d16dc04acd0534b5940dca",
    measurementId: "G-XFW07CJKYM"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error){
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

