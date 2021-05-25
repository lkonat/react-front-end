import React, {createContext, useState} from "react";
export const AuthContext = createContext();

const AuthProvider = ({children})=>{
  const [auth, setAuth] = useState({
    authenticated:false
  });
  const updateAuth = (newAuth)=>{
      setAuth({...auth, ...newAuth});
  };
  return (
    <AuthContext.Provider value={{auth,updateAuth}}>
      {children}
    </AuthContext.Provider>
  );
};


export default AuthProvider;
