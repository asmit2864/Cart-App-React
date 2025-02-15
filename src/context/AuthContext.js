import React, { createContext, useState } from "react";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const login = async (credentials) => {
    console.log("here")
    
    const res = await fetch("https://cart-app-3v54.onrender.com/verse/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
      credentials: "include",
    });
    
    const data = await res.json();
    if (data.user){
        localStorage.setItem("token", data.tokens.access.token);
        setUser(data.user); 

    }
    return data;
  };

  const signup = async (credentials) => {
    const res = await fetch("https://cart-app-3v54.onrender.com/verse/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
      credentials: "include",
    });
 
    const data = await res.json();
    console.alert(data)
    if (data.user){
      console.log(data.token.access.token)
      localStorage.setItem("token", data.token.access.token);
      setUser(data.user);
    } 
    return data;
  };

  const logout = async () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
