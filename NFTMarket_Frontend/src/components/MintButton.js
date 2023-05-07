import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { useAuthCtx } from 'src/components/useSocialAuth'
import { createToken } from 'src/lib/contractMethods';

const MintButton = ({ tokenuri }) => {
  const { smartAccount } = useAuthCtx()

  console.log({smartAccount})

  async function mintNFT(uri) {
    try {
      let tx = await createToken(uri, smartAccount.getsigner());
      showMintModal(
        true,
        'Mint submitted',
        `https://explorer.testnet.mantle.xyz/tx/${tx.hash}`,
        true,
        false,
        ''
      );
      tx = await tx.wait(1);
      showMintModal(
        true,
        'Mint Success',
        `https://explorer.testnet.mantle.xyz/tx/${tx.hash}`,
        false,
        true,
        'Done'
      );
      let event = tx.events[0];
      let value = event.args[2];
      let tokenId = value.toNumber();
      setTokenid(tokenId);
    } catch (e) {
      console.log(e);
    }
  }


  return (
    <Button
      sx={{ padding: 1, width: '35%' }}
      onClick={() => mintNFT(tokenuri)}
      variant="contained"
    >
      Mint NFT
    </Button>
  );
};

export default MintButton;
