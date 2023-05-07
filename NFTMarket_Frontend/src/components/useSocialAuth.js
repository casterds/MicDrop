import { ethers } from 'ethers'
import { useEffect, useState, useRef, createContext, useContext } from 'react'
import { ChainId } from '@biconomy/core-types'

export const AuthContext = createContext(null)
export const useAuthCtx = () => useContext(AuthContext)

export const AuthContextProvider = ({children}) => {
  const [smartAccount, setSmartAccount] = useState(null)
  // const [flag, setFlag] = useState(false)
  // const sdkRef = useRef(null)
  // const [loading, setLoading] = useState(false)
  // const websiteUrl = "https://jia-test.vercel.app" || "http://localhost:3000/" || "https://nftmarket-27787f.spheron.app";

  // useEffect(() => {
  //   let configureLogin
  //   if (flag) {
  //     configureLogin = setInterval(() => {
  //       if (!!sdkRef?.current?.provider) {
  //         setupSmartAccount()
  //         clearInterval(configureLogin)
  //       }
  //     }, 1000)
  //   }
  // }, [flag]);

  const providerValue = {
    smartAccount,
    setSmartAccount
  }
  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  )
}
