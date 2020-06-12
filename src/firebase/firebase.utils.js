import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyB4bUz6CNR9PYXRVARd1Im9GVp8QoizSAA",
    authDomain: "ecommer-56802.firebaseapp.com",
    databaseURL: "https://ecommer-56802.firebaseio.com",
    projectId: "ecommer-56802",
    storageBucket: "ecommer-56802.appspot.com",
    messagingSenderId: "533890940318",
    appId: "1:533890940318:web:91c3b4473ab9e0f4deea8f",
    measurementId: "G-TPKLF135PC"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    
    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
        await userRef.set({
            displayName,
            email,
            createdAt,
            ...additionalData
        })
        } catch (error) {
        console.log('error creating user', error.message);
        
        }
    }
    
        return userRef;
};



firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;



















