// export interface IUser {
//   id?: number,
//   login?: string,
//   mail?: string,
//   password?: string,
//   createdAt?: string,
//   updatedAt?: string
// }

// export interface IRegisterInputs {
//   login?: string,
//   mail?: string,
//   password?: string,
// }

// export interface ITokenAndUser {
//   accessToken: string,
//   user: IUser
// }

export type UserT = {
  id?: number,
  name?: string,
  email?: string,
  password?: string,
  createdAt?: string,
  updatedAt?: string

}

export type TokenAndUserT = {
  accessToken: string,
  user: UserT
}

export type LoginT = {
  email: string,
  password: string,  
}

export type RegisterT = LoginT & {
  name: string,
 }

 export type AppUserT = {
  status: 'Guest' | 'Auth';
  data: UserT | null;
};