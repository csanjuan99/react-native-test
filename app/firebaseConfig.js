import {initializeApp} from 'firebase/app';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// @ts-ignore
import {initializeAuth, getReactNativePersistence} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAhHs6Kg1qPor5FpQXsteZ60WTv1Khmse4",
    authDomain: "alternova-2b1ec.firebaseapp.com",
    projectId: "alternova-2b1ec",
    storageBucket: "alternova-2b1ec.firebasestorage.app",
    messagingSenderId: "500788501468",
    appId: "1:500788501468:web:d3c41416237611d588cd19"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
