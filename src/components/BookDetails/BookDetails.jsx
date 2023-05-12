import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../context/authContext'
import { getBooks, updateBookContent } from '../../firebase/firebase'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './BookDetails.css'


export const BookDetails = () => {
	const [userBook, setUserBook] = useState({})
	const [content, setContent] = useState('')
	const { bookId } = useParams()
	const auth = useAuth()
	const userInfo = {
		displayName: auth.user.displayName,
		email: auth.user.email,
		photoURL: auth.user.photoURL,
		uid: auth.user.uid,
	}

	useEffect(() => {
		const fetchBooks = async () => {
			const books = await getBooks(userInfo.uid)
			const bookForId = books.find((book) => book.book.id === bookId)
			const bookObj = bookForId.book
			setUserBook(bookObj)
			setContent(bookObj.content)
		}
		fetchBooks()
	}, [userInfo.uid])

	const bookModel = userBook.model
	const bgColor = bookModel === 'blueBook' ? '#1F3A93' : bookModel === 'redBook' ? '#FF5733' : bookModel === 'greenBook' ? '#006400' : '#424242'

	const modules = {
		toolbar: [
			[{ 'header': [1, 2, 3] }, { 'font': [] }],
			[{ 'size': ['small', false, 'large', 'huge'] }],
			['bold', 'italic', 'underline', 'strike'],
			[{ 'list': 'ordered' }, { 'list': 'bullet' }],
			[{ 'color': [] }, { 'background': [] }],
			[{ 'align': [] }],
			['link', 'image', 'clean']
		],
		history: {
			delay: 2000,
			maxStack: 500,
			userOnly: true
		},
	}

	const formats = [
		'fontSize',
		'header',
		'bold',
		'italic',
		'underline',
		'strike',
		'blockquote',
		'list',
		'bullet',
		'indent',
		'link',
		'image',
		'size',
		'font',
		'align',
		'color',
		'background',
	]

	const handleOnSubmit = async () => {
		await updateBookContent(userInfo.uid, bookId, content)
		setUserBook({ ...userBook, content })
	}

	const handleOnContentChange = (value) => {
		setContent(value)
	}

	return (
		<div className='container ' >
			<div className='book-container' style={{ backgroundColor: bgColor, opacity: 0.7 }} >
				<h2 className='book-title' >{userBook.title}</h2>
				<div className='quill-container' >
					<ReactQuill
						className='quill'
						theme='snow'
						value={content}
						onChange={handleOnContentChange}
						onBlur={handleOnSubmit}
						modules={modules}
						formats={formats}
					/>
				</div>
			</div>
		</div>
	)
}
