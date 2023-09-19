import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Logout() {

    const navigate = useNavigate()
    const logout = async () =>{


        localStorage.removeItem('userId')
        localStorage.setItem('authStatus', false)
        localStorage.removeItem('accessToken')
        navigate('/login')
    }

    useEffect(()=>{
        logout()
    },[])
  return (
    <div>Loging Out...</div>
  )
}

export default Logout
