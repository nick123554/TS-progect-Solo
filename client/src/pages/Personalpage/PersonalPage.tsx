import  { useEffect, useState, type JSX } from 'react'
import { UserApi } from '../../entities/users/api/UserApi';
import type { UserStateT } from '../../entities/users/types/UserTypes';


export default function PersonalPage(): JSX.Element {
    const [user, setUser] = useState<UserStateT>({ status: "loging", data: null });
      console.log(user);
    
      useEffect(() => {
        const getUser = async (): Promise<void> => {
          try {
            const data = await UserApi.refresh();
            console.log(data);
            setUser({ status: "logged", data: data.data.user });
          } catch (error) {
            console.log(error);
          }
        };
    
        
        getUser();
      }, []);
    
  return (
    <div>{user.data?.name}</div>
  )
}
