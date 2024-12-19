import Header from "./components/Header/Header"
import Snippets from "./components/Snippets/Snippets"
import {Routes,Route } from "react-router-dom"
import Login from "./components/Login/Login"
import AuthContext from "./context/auth/authContext"
import { useContext } from "react"
import { useEffect } from "react"
import Coder from "./components/coder/coder"
import Write from "./components/Write/Write"
import Signup from "./components/Signup/Signup"
import "./App.css"
const App = () => {
  const authdata = useContext(AuthContext)
  useEffect(() => {
    
      // Make a request to validate the token
      fetch("http://localhost:3000/api/auth/isauth", {method:"POST",credentials:"include"}).then((response) => {
        if (response.ok) {
          return response.json().then((data) => {
            authdata.SetUser(data.user);
          });
        } else {
          console.error("Authentication failed:", response.status, response.statusText);
          authdata.SetUser(null);
        }
      })
        
       
    
  }, []);
  return (
    <>
    <Header username="Ali jatoi"/>
    
    <Routes>
    <Route path="/" element={<Snippets/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/coder/:id" element={<Coder/>}/>
    <Route path="/write" element={authdata.user==null   ? <Login/>:<Write/>}/>
    </Routes>
   
      
      
    </>
  )
}

export default App