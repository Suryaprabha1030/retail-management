import React, { createContext, useContext, useState } from 'react'

const StateContext=createContext({

  setUser: () => {}

})

const ContextProvider = ({children}) => {
    const[user,setUser]=useState({})

  return (

    <StateContext.Provider value={{user,setUser}}>{children}</StateContext.Provider>


  )
}


export const useStateContext=()=>useContext(StateContext);
