import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../context/authContext'
import { useNavigate } from 'react-router-dom'
import { CustomBackdrop } from '../CustomBackdrop'

export const FogotPasswordForm = () => {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState } = useForm()
  const auth = useAuth()
  const navigate = useNavigate()

  const submitForm = async (data) => {
    setLoading(true)
    await auth.resetPassword(data.email)
    setLoading(false)
    navigate('/tu-diario')
  }

  return (
    <div className='container centered centered-center  p-2' >
      <div className='centered div-form-container ' >
        <h2>Recuperar tu contraseña</h2>
        <form onSubmit={handleSubmit(submitForm)} className='centered form-container ' >
          <div className='form-input-div m-4' >
            <label>Email</label>
            <input type='email' {...register('email', {
              required: true
            })} />
            {formState.errors.email?.type === 'required' && <p className='text-danger'>Por favor, ingresa un correo</p>}
          </div>
          <input className='submit-form' type='submit' value='Enviar' />
        </form>
      </div>
      <CustomBackdrop open={loading} />
    </div>
  )
}
