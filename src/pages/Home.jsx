import React from 'react'
import { Link } from 'react-router-dom'
import homeImage from '../assets/homeImage.png'
import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import GitHubIcon from '@mui/icons-material/GitHub'

export const Home = () => {
  return (
    <>
      <div className='container div-container' >
        <div className='home-div ' >
          <div className='centered' >
            <img src={homeImage} width='90%' />
          </div>
          <div className='centered'>
            <h1>TU DIARIO</h1>
            <p>Registrate ahora y comienza tu viaje de reflexión en tu propio diario virtual personalizado. </p>
            <div className='d-flex'>
              <Link to='/login' className='login nav-link button-custom' >INICIAR SESION</Link>
              <Link to='/register' className='register nav-link button-custom' >REGISTRARSE</Link>
            </div>
          </div>
        </div>
      </div>
      <footer className=" container centered  footer-custom ">
        <div className="social-media ">
          <a href="https://www.instagram.com/" target="_blank">
            <InstagramIcon />
          </a>
          <a href="https://www.twitter.com/" target="_blank">
            <TwitterIcon />
          </a>

          <a href="https://www.whatsapp.com/" target="_blank">
            <WhatsAppIcon />
          </a>
          <a href="https://github.com/nicolas-arquiel" target="_blank">
            <GitHubIcon />
          </a>
        </div>
        <div class="copyright">
          <small>© 2023 Tu Diario <br /> <small>Todos los derechos reservados.</small></small>
        </div>
      </footer>
    </>
  )
}
