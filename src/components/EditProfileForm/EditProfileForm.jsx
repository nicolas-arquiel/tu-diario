import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../context/authContext'
import { updateProfile, updateEmail, updatePhoneNumber, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth'
import { CustomBackdrop } from '../CustomBackdrop'

export const EditProfileForm = () => {
  const { register, handleSubmit, formState, watch } = useForm()
  const [loading, setLoading] = useState(false)

  const [formSubmitted, setFormSubmitted] = useState(false)

  const auth = useAuth()

  const userInfo = {
    displayName: auth.user.displayName,
    email: auth.user.email,
    photoURL: auth.user.photoURL,
    phoneNumber: auth.user.phoneNumber,
    uid: auth.user.uid,
    providerId: auth.user.providerData[0].providerId,
    createdAt: auth.user.metadata.createdAt,
  }

  const submitForm = async (data) => {
    const credential = EmailAuthProvider.credential(auth.user.email, data.oldPassword)
    //reautenticar usuario
    try {
      setLoading(true)
      await reauthenticateWithCredential(auth.user, credential)
      setLoading(false)
    } catch (error) {
      console.log(error.code, error.message)
    }
    //modificar perfil (nombre de usuario y foto)
    try {
      setLoading(true)
      await updateProfile(auth.user, { displayName: data.userName, photoURL: null })
      setLoading(false)
    } catch (error) {
      console.log(error.code, error.message)
    }
    //modificar email vinculado
    try {
      setLoading(true)
      await updateEmail(auth.user, data.email)
      setLoading(false)
    } catch (error) {
      console.log(error.code, error.message)
    }
    //modificar contraseña (para que funcione primero tiene que funcionar la autenticacion)
    try {
      setLoading(true)
      await updatePassword(auth.user, data.newPassword)
      setLoading(false)
    } catch (error) {
      console.log(error.code, error.message)
    }

    //si todo sale bien, se setea el true
    setFormSubmitted(true)
  }

  return (
    <div className='container ' >
      <h2>Editar tu perfil de usuario</h2>
      {formSubmitted && (<p>Usuario  actualizado correctamente.</p>)}
      <form onSubmit={handleSubmit(submitForm)} className='form-container' >
        <div className='form-input-div'>
          <label>Nombre de usuario</label>
          <input type='text' defaultValue={userInfo.displayName ? userInfo.displayName : `usuario${userInfo.createdAt}`}  {...register('userName', {
            required: true,
            maxLength: 30
          })} />
          {formState.errors.userName?.type === 'required' && <p className='text-danger'>Debes escribir un nombre</p>}
          {formState.errors.userName?.type === 'maxLength' && <p className='text-danger'>El nombre de usuario es muy largo</p>}
        </div>
        <div className='form-input-div'>
          <label>Email</label>
          <input disabled={userInfo.providerId === 'google.com' && true} type='email' defaultValue={userInfo.email} {...register('email', {
            required: (userInfo.providerId === 'google.com' ? false : true)
          })} />
          {formState.errors.email?.type === 'required' && <p className='text-danger'>Debes escribir un email</p>}
        </div>
        {
          userInfo.providerId !== 'google.com' && (

            <>
              <div className='form-input-div'>
                <h3>Cambiar contraseña</h3>
                <label>Ingrese su contraseña actual</label>
                <input type='password' {...register('oldPassword', {
                  required: false,
                  maxLength: 16,
                  minLength: 6
                })} />
                {formState.errors.oldPassword?.type === ('minLength') && <p className='text-danger'>La contraseña debe tener 6 caracteres como minimo</p>}
                {formState.errors.oldPassword?.type === ('maxLength') && <p className='text-danger'>La contraseña debe tener 16 caracteres como maximo</p>}
              </div>
              <div className='form-input-div'>
                <label>Ingrese su nueva contraseña</label>
                <input type='password' {...register('newPassword', {
                  required: false,
                  maxLength: 16,
                  minLength: 6
                })} />
                {formState.errors.newPassword?.type === ('minLength') && <p className='text-danger'>La contraseña debe tener 6 caracteres como minimo</p>}
                {formState.errors.newPassword?.type === ('maxLength') && <p className='text-danger'>La contraseña debe tener 16 caracteres como maximo</p>}
              </div>
            </>
          )
        }
        <input type='submit' className='button-custom' value='Enviar' />
      </form>
      <CustomBackdrop open={loading} />

    </div>
  )
}
