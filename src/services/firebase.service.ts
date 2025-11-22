import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth/cordova";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Firestore, getFirestore, getDocs, collection, addDoc, type DocumentData, QuerySnapshot, DocumentReference, deleteDoc, doc, query, where } from "firebase/firestore/lite";

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

  // firebase does not accept non-pure objects.
  private toPOJO<T>(data: T): Object {
    return JSON.parse(JSON.stringify(data))
  }

  async addData<T extends DocumentData>(collectionName: string, data: T): Promise<DocumentReference> {
    try {
      return await addDoc(collection(this.db, collectionName), this.toPOJO(data))
    } catch (err) {
      console.error(err)
      throw Error('Fail to SAVE data in database.')
    }
  }

  async getAllData(collectionName: string): Promise<QuerySnapshot> {
    try {
      return await getDocs(collection(this.db, collectionName))
    } catch (err) {
      console.error(err)
      throw Error('Fail to GET all data in database.')
    }
  }

  async delData(collectionName: string, ids: number[]) {
    try {
      const colRef = collection(this.db, collectionName)

      const chunks = []
      while (ids.length) chunks.push(ids.splice(0, 10))

      const deletes: any[] = []

      for (const chunk of chunks) {
        const q = query(colRef, where("id", "in", chunk))
        const snap = await getDocs(q)

        snap.docs.forEach((d) => {
          deletes.push(deleteDoc(doc(this.db, collectionName, d.id)))
        })
      }

      await Promise.all(deletes)
    } catch (err) {
      console.error(err)
      throw Error('Fail to DELETE all data in database.')
    }
  }
}