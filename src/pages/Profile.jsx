import React, { useState } from 'react'
import { EditProfileForm, NavBar } from '../components'
import { useAuth } from '../context/authContext'

export const Profile = () => {
  const [showEditProfileForm, setShowEditProfileForm] = useState(false);
  const auth = useAuth()

  const handleClick = () => {
    showEditProfileForm ? setShowEditProfileForm(false) : setShowEditProfileForm(true)
  }

  const userInfo = {
    displayName: auth.user.displayName,
    email: auth.user.email,
    photoURL: auth.user.photoURL,
    uid: auth.user.uid,
    createdAt: auth.user.metadata.createdAt,
    lastLoginAt: auth.user.metadata.lastLoginAt
  }

  return (
    <>
      <NavBar />
      <div className='container d-flex  div-container' >
        <div className='div-profile'>
          <h2>Este es tu perfil</h2>
          <p>Tu nombre: <span>{userInfo.displayName ? userInfo.displayName : `usuario${userInfo.createdAt}`}</span> </p>
          <p>Tu email: <span>{userInfo.email}</span></p>
          <p>Cuenta creada: <span>{new Date(parseInt(userInfo.createdAt)).toLocaleString()}</span></p>
          <button className='button-custom' onClick={handleClick} >Editar perfil</button>
        </div>
        <div className='div-profile'>
          {
            showEditProfileForm && <EditProfileForm />
          }
        </div>
      </div>
    </>
  )
}
