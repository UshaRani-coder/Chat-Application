import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase"
export const AuthContext = createContext();
const AuthContextProvider = ({children}) =>{
const [currentUser,setCurrentUser] = useState({})
useEffect(()=>{
    const unsub = onAuthStateChanged(auth,(user)=>{
        setCurrentUser(user)
        console.log(user)
    })

    return ()=>{
        // This will unsubscribe(stops listening to) the onAuthStateChanged listener
        unsub();
}
},[])
return (
    <AuthContext.Provider value={{currentUser}}>
        {children}
    </AuthContext.Provider>
)
}
export default AuthContextProvider;