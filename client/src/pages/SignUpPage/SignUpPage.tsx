import { type JSX } from 'react'
import RegForm from '../../features/RegForm/RegForm'
import type { UserStateT } from '../../entities/users/types/UserTypes'

 type SignUpPagePropsT = {
  setUser: (user: UserStateT) => void
}

export default function SignUpPage({setUser}:SignUpPagePropsT): JSX.Element {
  return (
    <>
    
    <RegForm setUser={setUser}/>
    
    
    </>
  )
}
