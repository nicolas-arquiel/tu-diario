import React from 'react'
import { useNavigate } from 'react-router-dom'

export const UserNotLogin = () => {
  const navigate = useNavigate()

  const handleClick = (path) => {
    navigate(path)
  }

  return (
    <div className='container'>
      <div className='centered centered-center'>
        <h2>ERROR</h2>
        <h3>Para poder ver esta pagina primero debes iniciar sesion</h3>
        <div>
          <button className='button-custom' onClick={() => handleClick('/tu-diario')}>GO HOME</button>
          <button className='button-custom' onClick={() => handleClick('/login')}>GO LOGIN</button>
        </div>
      </div>
    </div>
  )
}
