import Dialog from '@mui/material/Dialog'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import redBook from '../../assets/redBook.svg'
import blackBook from '../../assets/blackBook.svg'
import blueBook from '../../assets/blueBook.svg'
import greenBook from '../../assets/greenBook.svg'
import { findDocumentOrCreateDocument } from '../../firebase/firebase'
import { v4 as idGenerator } from 'uuid'
import { CustomBackdrop } from '../CustomBackdrop'
import './CreateBook.css'


export const CreateBook = ({ userId, updateBooks }) => {
	const [open, setOpen] = useState(false)
	const [loading, setLoading] = useState(false)

	const { register, handleSubmit, formState } = useForm()

	const submitForm = async (data) => {
		const book = {
			id: idGenerator(),
			title: data.title,
			model: data.model,
			createdAt: new Date(),
			content: ''
		}
		try {
			setLoading(true)
			await findDocumentOrCreateDocument(userId, { book })
			console.log(book)
			setOpen(false)
			setLoading(false)
			updateBooks()
		} catch (error) {
			console.log(error)
		}
	}

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	return (
		<div>
			<button className='button-custom' onClick={handleClickOpen}>
				Agregar un nuevo libro
			</button>
			<Dialog open={open} onClose={handleClose} fullWidth >
				<div className=' centered container p-3 modal-custom' >
					<h2>Crea un nuevo diario</h2>
					<form onSubmit={handleSubmit(submitForm)} className='form-container centered' >
						<div className='centered' >
							<h2>Elige un titulo para tu diario</h2>
							<label>Nombre:</label>
							<input className='input-custom' type='text' defaultValue='Nuevo diario' {...register('title', {
								required: true,
								maxLength: 20
							})} />
							{formState.errors.title?.type === 'required' && <p className='text-danger'>Debes escribir un titulo</p>}
						</div>
						<div >
							<h3>Elige un modelo</h3>
							{/* red */}
							<input className='d-none' type='radio' defaultChecked name='book' value='redBook' id='book-1' {...register('model')} />
							<label htmlFor='book-1'>
								<img width='80px' src={redBook} />
							</label>
							{/* black */}
							<input className='d-none' type='radio' name='book' value='blackBook' id='book-2' {...register('model')} />
							<label htmlFor='book-2'>
								<img width='80px' src={blackBook} />
							</label>
							{/* blue */}
							<input className='d-none' type='radio' name='book' value='blueBook' id='book-3' {...register('model')} />
							<label htmlFor='book-3'>
								<img width='80px' src={blueBook} />
							</label>
							{/* green */}
							<input className='d-none' type='radio' name='book' value='greenBook' id='book-4' {...register('model')} />
							<label htmlFor='book-4'>
								<img width='80px' src={greenBook} />
							</label>
						</div>

						<input className='submit-form' type='submit' value='Enviar' />
					</form>
					<CustomBackdrop open={loading} />
				</div>
			</Dialog>
		</div>
	)
}
