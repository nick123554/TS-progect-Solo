import React from 'react'
// import type { IUser } from '../../entities/users/types/UserTypes';
import Container from 'react-bootstrap/esm/Container';

import { Outlet, useNavigate } from 'react-router';

import { UserApi } from '../../entities/users/api/UserApi';
import { setAccessToken } from '../../shared/lib/axiosInstance';
import NavBar from '../NavBar/Navbar';
import type { AppUserT } from '../../entities/users/types/UserTypes';
;


type UserProps = {
  user: AppUserT;
  setUser: (user: AppUserT) => void;
};

// type UserProps = {
//     user: IUser;
//     setUser: (user: IUser) => void
// }
export default function Layout({user, setUser}:UserProps):React.JSX.Element { 
    const navigate = useNavigate()

   const logautHendler = async ():Promise<void> => {
    await UserApi.logout()
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
