import { initializeApp, getApps, getApp} from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAbv5MKrv6HG8o9FQzcLyMQnjD9kE4Mbx4",
    authDomain: "instagram-clone-86dda.firebaseapp.com",
    projectId: "instagram-clone-86dda",
    storageBucket: "instagram-clone-86dda.appspot.com",
    messagingSenderId: "1044599796696",
    appId: "1:1044599796696:web:911d8f86512db1f7d3f8ad"
};


const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);

export { app,  db, storage };
