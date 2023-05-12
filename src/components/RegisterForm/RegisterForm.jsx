import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../context/authContext'
import { Link } from 'react-router-dom'
import GoogleIcon from '@mui/icons-material/Google'
import { IconButton } from '@mui/material'
import { CustomBackdrop } from '../CustomBackdrop'

export const RegisterForm = () => {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState, watch } = useForm()
  const auth = useAuth()

  const submitForm = async (data) => {
    setLoading(true)
    await auth.registerEmail(data.email, data.password)
    setLoading(false)
  }

  const handleGoogle = () => {
    auth.loginWithGoogle()
  }



  return (
    <div className='container ' >
      <div className='centered centered-center'>
        <div className='centered div-form-container' >
          <h2>Register</h2>
          <IconButton onClick={handleGoogle} >
            <GoogleIcon style={{ fontSize: '30px' }} />
          </IconButton>
          <form className='centered form-container ' onSubmit={handleSubmit(submitForm)} >
            <div className='form-input-div' >
              <label>Email</label>
              <input type='email' {...register('email', {
                required: true
              })} />
              {formState.errors.email?.type === 'required' && <p className='text-danger'>El email es obligatorio</p>}
            </div>
            <div className='form-input-div' >
              <label>Password</label>
              <input type='password' {...register('password', {
                required: true,
                maxLength: 16,
                minLength: 6
              })} />
              {formState.errors.password?.type === 'required' && <p className='text-danger'>La contraseña es obligatorio</p>}
              {formState.errors.password?.type === ('minLength') && <p className='text-danger'>La contraseña debe tener 6 caracteres como minimo</p>}
              {formState.errors.password?.type === ('maxLength') && <p className='text-danger'>La contraseña debe tener 16 caracteres como maximo</p>}
            </div>
            <hr />
            <Link to='/login' className='nav-link' >Ya tienes cuenta? Inicia sesion</Link>
            <input className='submit-form' type='submit' value='Enviar' />
          </form>
          <CustomBackdrop open={loading} />
        </div>
      </div>
    </div>
  )
}
