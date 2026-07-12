import { initializeApp, getApps, getApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDPxbQ6pLzrXYd9LoXulY3RZZT2EwianA8",
  authDomain: "dyscalculiaapp-104c4.firebaseapp.com",
  projectId: "dyscalculiaapp-104c4",
  storageBucket: "dyscalculiaapp-104c4.appspot.com",
  messagingSenderId: "48465264244",
  appId: "1:48465264244:web:5e49ed6a078b4746f29b21",
  measurementId: "G-R838VW6KL8",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

let _auth;
try {
  _auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch {
  _auth = getAuth(app);
}

const firestore = getFirestore(app);

const db = {
  collection: (collectionName) => ({
    add: (data) => addDoc(collection(firestore, collectionName), data),
    get: () => getDocs(collection(firestore, collectionName)),
    doc: (docId) => ({
      update: (data) => updateDoc(doc(firestore, collectionName, docId), data),
    }),
  }),
};

const auth = {
  get currentUser() { return _auth.currentUser; },
  signInWithEmailAndPassword: (email, password) => signInWithEmailAndPassword(_auth, email, password),
  createUserWithEmailAndPassword: (email, password) => createUserWithEmailAndPassword(_auth, email, password),
  sendPasswordResetEmail: (email) => sendPasswordResetEmail(_auth, email),
  signOut: () => signOut(_auth),
};

const incrementGamesCompleted = async (uid) => {
  const snap = await getDocs(collection(firestore, "userdata"));
  snap.forEach((d) => {
    if (d.data().id === uid) {
      updateDoc(doc(firestore, "userdata", d.id), {
        gamesCompleted: increment(1),
      });
    }
  });
};

export { db, auth, increment, incrementGamesCompleted, firestore };
