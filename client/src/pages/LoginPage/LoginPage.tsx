import { type JSX } from 'react'
import LogForm from '../../features/LoginForm/LoginForm'
import type { UserStateT } from '../../entities/users/types/UserTypes'

 type LoginPagePropsT = {
  setUser: (user: UserStateT) => void
}
export default function LoginPage({setUser}: LoginPagePropsT):JSX.Element {
  return (
    <>
    <LogForm setUser={setUser}/>
    </>
  )
}
