import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/authContext'

export const LogoutButton = () => {
	const auth = useAuth()
	const navigate = useNavigate()

	const handleLogout = ()=>{
		auth.logout()
		navigate('/tu-diario')
	}

  return (
	<div>
		<button className='button-custom' onClick={handleLogout} >logout</button>
	</div>
  )
}
