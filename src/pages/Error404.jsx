import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Error404 = () => {
  const navigate = useNavigate()
  return (
    <div>
      <h2>404 ERROR</h2>
      <h3>No se encontro la pagina</h3>
      <button onClick={() => navigate('/tu-diario')}> GO HOME </button>
    </div>
  )
}
