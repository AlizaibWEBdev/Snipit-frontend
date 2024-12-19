import { createContext } from "react";

interface ContextProps{
  
    user:null | {
        userId:string,
        email:string,
        exp:number,
        iat:number,
    },
    SetUser:(value:any) => void
}
const AuthContext = createContext<ContextProps>({user:null,SetUser:()=>{}});

export default AuthContext