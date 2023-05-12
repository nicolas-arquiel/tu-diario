import React from 'react'
import { BookDetails, NavBar } from '../components'

export const BookDetailPage = () => {
  return (
    <>
      <NavBar />
      <div className='container div-container'>
        <BookDetails />
      </div>

    </>
  )
}
