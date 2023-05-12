import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/authContext'
import { LogoutButton } from '../LogoutButton'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import PersonIcon from '@mui/icons-material/Person'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import './NavBar.css'

export const NavBar = ({ userName }) => {
	const { user } = useAuth()
	const [anchorEl, setAnchorEl] = React.useState(null)
	const open = Boolean(anchorEl)
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}

	const navigate = useNavigate()

	const handleGoBack = () => {
		navigate(-1)
	}

	return (
		<div className='container navbar-custom' >
			{
				userName ? 
				<div>
					<h2>BIENVENIDO {userName}</h2>
				</div> 
				: 
				<div className='go-back-div' onClick={handleGoBack} >
					<ArrowBackIcon/>
					<h4>REGRESAR</h4>
				</div>
			}

			<div >

				<Button
					id="basic-button"
					aria-controls={open ? 'basic-menu' : undefined}
					aria-haspopup="true"
					aria-expanded={open ? 'true' : undefined}
					onClick={handleClick}
				>
					<PersonIcon />
				</Button>
				<Menu
					id="basic-menu"
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
					MenuListProps={{
						'aria-labelledby': 'basic-button',
					}}
					PaperProps={{
						sx: {
							backgroundColor: '#ECF2FF',
							borderRadius: 2,

						},

					}}
				>
					{
						user ? (
							[
								<div key='loggedInMenu' >
									<Link to='/tu-diario' replace className='nav-link link-custom' >
										<MenuItem onClick={handleClose} >Inicio</MenuItem>
									</Link>

									<Link to={`/dashboard/${user.uid}/profile`} className='nav-link link-custom' >
										<MenuItem onClick={handleClose} >Tu perfil</MenuItem>
									</Link>

									<Link to={`/dashboard/${user.uid}`} className='nav-link link-custom' >
										<MenuItem onClick={handleClose}  >Tus libros</MenuItem>
									</Link>

									<LogoutButton />


								</div>
							]
						) : (
							[
								<div key='loggedOutMenu'>
									<MenuItem onClick={handleClose}>
										<Link to='/login' className='nav-link' >Iniciar sesion</Link>
									</MenuItem>
									<MenuItem onClick={handleClose}>
										<Link to='/register' className='nav-link' >Registrarse</Link>
									</MenuItem>
								</div>
							]

						)
					}

				</Menu>
			</div>
		</div>
	)
}

