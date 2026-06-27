import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

// ─── Firebase Config (Development) ───────────────────────────
const firebaseConfig = {
  apiKey:            'AIzaSyDemoKeyForFrameUpDevelopment123456789',
  authDomain:        'frameup-demo.firebaseapp.com',
  projectId:         'frameup-demo',
  storageBucket:     'frameup-demo.appspot.com',
  messagingSenderId: '123456789012',
  appId:             '1:123456789012:android:abcdef1234567890abcdef',
};
// ────────────────────────────────────────────────────────────

export const isFirebaseConfigured = (): boolean =>
  !!firebaseConfig.apiKey && !!firebaseConfig.projectId;

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;

if (isFirebaseConfigured()) {
  app     = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  auth    = getAuth(app);
  db      = getFirestore(app);
  storage = getStorage(app);
}

export { auth, db, storage };
