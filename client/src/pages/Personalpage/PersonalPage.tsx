import React, { useEffect, useState } from 'react'
import { UserApi } from '../../entities/users/UserApi';

export default function PersonalPage() {
    const [user, setUser] = useState({ status: "loging", data: null });
      console.log(user);
    
      useEffect(() => {
        const getUser = async () => {
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
