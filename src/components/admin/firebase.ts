import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDAGhmKPiQELNcJktWrRQZTZTZrrmVWPjs',
  authDomain: 'yale-outdoors-admin.firebaseapp.com',
  projectId: 'yale-outdoors-admin',
  storageBucket: 'yale-outdoors-admin.appspot.com',
  messagingSenderId: '176455258006',
  appId: '1:176455258006:web:5c00e3e00edd376fa457b7',
  measurementId: 'G-5RKCHD23DD',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);