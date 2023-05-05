import { ethers } from 'ethers'
import { useEffect, useState, useRef } from 'react'
import { ChainId } from '@biconomy/core-types'
import SocialLogin from '@biconomy/web3-auth'
import SmartAccount from '@biconomy/smart-account'

export const useSocialAuth = () => {
  const [smartAccount, setSmartAccount] = useState(null)
  const [flag, setFlag] = useState(false)
  const sdkRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const websiteUrl = "https://vercel.app";

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
    if (!sdkRef?.current) {
      const socialLogin = new SocialLogin();
      const signature1 = await socialLogin.whitelistUrl(websiteUrl);
      await socialLogin.init({
        chainId: ethers.utils.hexValue(ChainId.MAINNET),
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
    if (!sdkRef?.current?.provider) return
    sdkRef.current.hideWallet();
    setLoading(true);
    const web3Provider = new ethers.providers.Web3Provider(sdkRef.current.provider);
    try {
      const smartAccount = new SmartAccount(web3Provider, {
        activeNetworkId: ChainId.MAINNET,
        supportedNetworksIds: [ChainId.MAINNET],
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

  return {
    smartAccount,
    loading,
    login,
    logout
  }
}
