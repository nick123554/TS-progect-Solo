import React from 'react'
import Container from 'react-bootstrap/esm/Container';
import NavBar from '../NavBar/Navbar';
import { Outlet, useNavigate } from 'react-router';
import { axiosInstance, setAccessToken } from '../../shared/lib/axiosInstance';
import { UserApi } from '../../entities/users/UserApi';

export default function Layout({user, setUser}):React.JSX.Element {
    const navigate = useNavigate()

   const logautHendler = async ():Promise<void> => {
    await UserApi.logout("/auth/logout")
      setUser({status: "Guest", data: null})
      setAccessToken('')
      navigate('/')
    
   }

  return (

    <Container>
        <NavBar logautHendler={logautHendler} user={user}/>
        <Outlet/>
    </Container>
  )
}
