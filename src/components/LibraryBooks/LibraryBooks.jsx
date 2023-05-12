import React, { useState, useRef } from 'react'
import { Book } from '../Book/Book'
import { deleteBook } from '../../firebase/firebase'
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp'
import { CustomBackdrop } from '../CustomBackdrop'
import './LibraryBooks.css'

export const LibraryBooks = ({ books, userId, updateBooks }) => {
	const [bookList, setBookList] = useState(books)
	const [loading, setLoading] = useState(false)

	const [scrollAmount, setScrollAmount] = useState(0)
	const booksContainerRef = useRef(null)

	const handleDeleteBook = async (bookId) => {
		try {
			setLoading(true)
			await deleteBook(userId, bookId)
			const updatedBooks = bookList.filter((book) => book.book.id !== bookId)
			setBookList(updatedBooks)
			updateBooks()
			setLoading(false)
			console.log('el libro se removio', bookId)
		} catch (error) {
			console.log('error: ', error)
		}
	}

	const handleScrollLeft = () => {
		if (booksContainerRef.current) {
			const booksContainer = booksContainerRef.current
			const scrollStep = 150
			booksContainer.scrollBy({
				left: -scrollStep,
				behavior: 'smooth'
			})
			setScrollAmount(scrollAmount - scrollStep)
		}
	}

	const handleScrollRight = () => {
		if (booksContainerRef.current) {
			const booksContainer = booksContainerRef.current
			const scrollStep = 150
			booksContainer.scrollBy({
				left: scrollStep,
				behavior: 'smooth'
			})
			setScrollAmount(scrollAmount + scrollStep)
		}
	}

	return (
		<>
			<h4>Total: {books.length} </h4>
			<div className='books-container' ref={booksContainerRef}>
				{books.map((bookObj) => {
					const book = bookObj.book
					return (
						<div key={book.id}>
							<Book
								key={book.id}
								bookId={book.id}
								bookModel={book.model}
								bookTitle={book.title}
								onDelete={() => handleDeleteBook(book.id)}
							/>
						</div>
					)
				})}
			</div>
			<div className='books-navigation'>
				<button onClick={handleScrollLeft} disabled={scrollAmount <= 0}>
					<ArrowCircleUpIcon className='left' sx={{ fontSize: '40px', transform: 'rotate(-90deg)' }} />
				</button>
				<button onClick={handleScrollRight}>
					<ArrowCircleUpIcon className='right' sx={{ fontSize: '40px', transform: 'rotate(90deg)' }} />
				</button>
			</div>
			<CustomBackdrop open={loading} />
		</>
	)
}
