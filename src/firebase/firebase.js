import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getAuth } from "firebase/auth"
import { getStorage, ref, uploadBytes, getDownloadURL, getBytes } from "firebase/storage"
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, updateDoc, query, where, setDoc, deleteDoc, arrayUnion, arrayRemove, runTransaction } from "firebase/firestore"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_APIKEY,
  authDomain: import.meta.env.VITE_APP_AUTHDOMAIN,
  projectId: import.meta.env.VITE_APP_PROJECTID,
  storageBucket: import.meta.env.VITE_APP_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_APP_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APP_APPID,
  measurementId: import.meta.env.VITE_APP_MEASUREMENTID
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const analytics = getAnalytics(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export const findDocumentOrCreateDocument = async (uid, book) => {
  const docRef = doc(db, 'users', uid)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    // El documento de usuario existe, actualizar el array de libros existente
    const userData = docSnap.data()
    const books = userData.books || []
    const updatedBooks = [...books, book]
    await updateDoc(docRef, { books: updatedBooks })
    return updatedBooks
  } else {
    // El documento de usuario no existe, crear uno nuevo con el libro inicial
    const initialBooks = [book]
    await setDoc(docRef, { books: initialBooks })
    return initialBooks
  }
}

export const deleteBook = async (uid, bookId) => {
  const docRef = doc(db, 'users', uid)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    // El documento de usuario existe, actualizar el array de libros existente
    const userData = docSnap.data()
    const books = userData.books || []
    const updatedBooks = books.filter((bookObj) => bookObj.book.id !== bookId)
    await updateDoc(docRef, { books: updatedBooks })
    return updatedBooks
  } else {
    console.log("No se encontró la biblioteca del usuario.")
    return []
  }
}

export const updateBookContent = async (uid, bookId, newContent) => {
  const docRef = doc(db, 'users', uid)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    // El documento de usuario existe, actualizar el array de libros existente
    const userData = docSnap.data()
    const books = userData.books || []

    // Encuentra el índice del libro en el array de libros del usuario
    const bookIndex = books.findIndex((book) => book.book.id === bookId)

    if (bookIndex !== -1) {
      // Si el libro existe, actualiza su propiedad content
      const updatedBooks = [...books]
      updatedBooks[bookIndex].book.content = newContent
      await updateDoc(docRef, { books: updatedBooks })
      return updatedBooks
    } else {
      console.log("No se encontró el libro.")
      return ([])
    }
  } else {
    console.log("No se encontró la biblioteca del usuario.")
    return ([])
  }
}

export const getBooks = async (uid) => {
  const docRef = doc(db, "users", uid)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    const data = docSnap.data()
    return data.books || []
  } else {
    console.log("No se encontró la biblioteca del usuario.")
    return []
  }
}

export const userExist = async (uid) => {
  const docRef = doc(db, 'users', uid)
  const res = await getDoc(docRef)
  return res.exists()
}