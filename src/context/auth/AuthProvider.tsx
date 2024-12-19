import React,{ useState} from "react";
import AuthContext from "./authContext";



const AuthProvider = ({children}:{children:React.ReactElement}) => {
  
    
    const [user, setuser] = 
    useState<null | {username:string,id:string}>(null);
  
  return (
    <AuthContext.Provider value={{user:user,SetUser:setuser}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider