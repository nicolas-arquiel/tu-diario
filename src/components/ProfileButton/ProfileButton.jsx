import React from 'react'
import { useNavigate } from 'react-router-dom'

export const ProfileButton = () => {
	const navigate = useNavigate()

	const handleClick = () => {
		navigate('/profile')
	}

	return (
		<button onClick={handleClick} >
			Go to profile
		</button>
	)
}
