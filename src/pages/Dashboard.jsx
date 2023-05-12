import React, { useState, useEffect } from 'react'
import { CreateBook, LibraryBooks, NavBar } from '../components'
import { useAuth } from '../context/authContext'
import { getBooks } from '../firebase/firebase'


export const Dashboard = () => {
  const auth = useAuth()
  const userInfo = {
    displayName: auth.user.displayName,
    email: auth.user.email,
    photoURL: auth.user.photoURL,
    uid: auth.user.uid,
    createdAt: auth.user.metadata.createdAt,
  }

  const [userBooks, setUserBooks] = useState([])

  const handleBookCreated = async () => {
    const books = await getBooks(userInfo.uid)
    setUserBooks(books)
  }


  useEffect(() => {
    const fetchBooks = async () => {
      const books = await getBooks(userInfo.uid)
      setUserBooks(books)
    }
    fetchBooks()
  }, [userInfo.uid])


  return (
    <>
      <NavBar userName={userInfo.displayName ? userInfo.displayName : `usuario${userInfo.createdAt}`} />
      <div className='container div-container'>
        <div className='d-flex justify-content-between' >
          <h2>Estos son tus libros</h2>
          <CreateBook userId={userInfo.uid} updateBooks={handleBookCreated} />
        </div>
        <div className='' >
          <LibraryBooks books={userBooks} updateBooks={handleBookCreated} userId={userInfo.uid} />

        </div>
      </div>
    </>
  )
}
