import { ethers } from 'ethers'
import { useEffect, useState, useRef, createContext, useContext } from 'react'
import { ChainId } from '@biconomy/core-types'
import SocialLogin from '@biconomy/web3-auth'
import SmartAccount from '@biconomy/smart-account'

export const AuthContext = createContext(null)
export const useAuthCtx = () => useContext(AuthContext)

export const AuthContextProvider = ({children}) => {
  const [smartAccount, setSmartAccount] = useState(null)
  const [flag, setFlag] = useState(false)
  const sdkRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const websiteUrl = "https://jia-test.vercel.app" || "http://localhost:3000/" || "https://nftmarket-27787f.spheron.app";

  useEffect(() => {
    let configureLogin
    if (flag) {
      configureLogin = setInterval(() => {
        if (!!sdkRef?.current?.provider) {
          setupSmartAccount()
          clearInterval(configureLogin)
        }
      }, 1000)
    }
  }, [flag]);

  async function login() {
    console.log('before current')
    if (!sdkRef?.current) {
      const socialLogin = new SocialLogin();
      const signature1 = await socialLogin.whitelistUrl(websiteUrl);
      await socialLogin.init({
        chainId: ethers.utils.hexValue(5001),
        whitelistUrls: {
          websiteUrl: signature1,
        }
      });
      sdkRef.current = socialLogin;
    }
    if (!sdkRef?.current?.provider) {
      sdkRef.current.showWallet();
      setFlag(true);
    } else {
      setupSmartAccount();
    }
  }

  async function setupSmartAccount() {
    if (!sdkRef?.current?.web3auth?.provider) return
    sdkRef.current.hideWallet();
    setLoading(true);
    const web3Provider = new ethers.providers.Web3Provider(sdkRef?.current?.web3auth?.provider);
    const accounts = await web3Provider.listAccounts();
    console.log({accounts})
    try {
      const smartAccount = new SmartAccount(web3Provider, {
        activeNetworkId: 5001,
        supportedNetworksIds: [5001],
      });
      await smartAccount.init();
      setSmartAccount(smartAccount);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  const logout = async () => {
    if (!sdkRef.current) {
      console.error('Not authorized.')
      return
    }
    await sdkRef.current.logout();
    sdkRef.current.hideWallet();
    setSmartAccount(null);
    setFlag(false);
  }

  const providerValue = {
    smartAccount,
    loading,
    login,
    logout
  }
  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  )
}
