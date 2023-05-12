import React from 'react'
import './Book.css'
import { Link } from 'react-router-dom'
import redBook from '../../assets/redBook.svg'
import blackBook from '../../assets/blackBook.svg'
import blueBook from '../../assets/blueBook.svg'
import greenBook from '../../assets/greenBook.svg'

export const Book = ({ bookId, bookModel, bookTitle, onDelete }) => {
	const bookImageUrl = bookModel === 'redBook' ? redBook : bookModel === 'blackBook' ? blackBook : bookModel === 'blueBook' ? blueBook : greenBook
	const bookUrl = `books/${bookId}`

	return (
		<>
			<Link className='text-decoration-none' to={bookUrl}>
				<div className='container book' >
					<img src={bookImageUrl} alt={bookModel} width='140px' />
					<p >{bookTitle}</p>
				</div>
			</Link>
			<button className='delete-button' onClick={() => onDelete(bookId)}>Eliminar</button>
		</>
	)
}
