import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth/cordova";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Firestore, getFirestore, getDocs, collection, addDoc, type DocumentData, QuerySnapshot, DocumentReference } from "firebase/firestore/lite";

export class FirebaseService {
  private readonly app: FirebaseApp
  private readonly db: Firestore
  private readonly auth: Auth;

  constructor() {
    const firebaseConfig = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MSG_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
    }

    this.app = initializeApp(firebaseConfig)
    this.db = getFirestore(this.app)
    this.auth = getAuth(this.app);
  }

  async login() {
    return await signInWithEmailAndPassword(
      this.auth,
      import.meta.env.VITE_DB_MANAGER_EMAIL,
      import.meta.env.VITE_DB_MANAGER_PASSWORD
    )
  }

  async addData<T extends DocumentData>(collectionName: string, data: T): Promise<DocumentReference> {
    try {
      return await addDoc(collection(this.db, collectionName), data)
    } catch (err) {
      console.log('err', err)
      throw Error()
    }
  }

  async getAllData(collectionName: string): Promise<QuerySnapshot> {
    try {
      return await getDocs(collection(this.db, collectionName))
    } catch (err) {
      console.log('err', err)
      throw Error()
    }
  }
}