import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import {
  collection,
  getDocs,
  getFirestore,
  doc,
  getDoc,
  query,
  where
} from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);
const vansRef = collection(db, 'vans');
export let userId = null;


export async function getVans() {
  const querySnapshot = await getDocs(vansRef);
  const dataArray = querySnapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id
  }))
  return dataArray;
}

export async function getVan(id) {
  const docRef = doc(db, 'vans', id);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}

export async function getHostVans() {
  const q = query((vansRef), where('hostId', '==', userId));
  const querySnapshot = await getDocs(q);
  const dataArray = querySnapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id
  }))
  return dataArray;
}

export async function loginUser(creds) {
  await signInWithEmailAndPassword(auth, creds.email, creds.password)
    .then((userCred) => {
      userId = userCred.user.uid;
    })
    .catch((error) => {
      throw {
        message: error.message,
        code: error.code,
      };
    });
}

export async function logoutUser() {
  await signOut(auth)
    .then(() => {
      userId = null;
    })
    .catch((error) => {
      throw {
        message: error.message,
        code: error.code,
      };
    });
}