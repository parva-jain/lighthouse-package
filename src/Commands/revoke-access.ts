import { yellow, white, red } from 'kleur'
import { ethers } from 'ethers'
import { config } from './utils/getNetwork'
import lighthouse from '../Lighthouse'
import { sign_auth_message } from './utils/auth'
import readInput from './utils/readInput'

export default async function (cid: string, address: string) {
  try {
    if (!config.get('LIGHTHOUSE_GLOBAL_PUBLICKEY')) {
      throw new Error('Please import wallet first!')
    }

    // Get key
    const options = {
      prompt: 'Enter your password: ',
      silent: true,
      default: '',
    }
    const password: any = await readInput(options)
    const decryptedWallet = ethers.Wallet.fromEncryptedJsonSync(
      config.get('LIGHTHOUSE_GLOBAL_WALLET') as string,
      password.trim()
    )

    if (!decryptedWallet) {
      throw new Error('Incorrect password!')
    }

    const signedMessage = await sign_auth_message(decryptedWallet.privateKey)

    const revokeResponse = await lighthouse.revokeFileAccess(
      decryptedWallet.address,
      address,
      cid,
      signedMessage
    )

    console.log(
      yellow('revokeTo: ') +
        white(revokeResponse.data.revokeTo as string) +
        '\r\n' +
        yellow('cid: ') +
        white(revokeResponse.data.cid)
    )
  } catch (error: any) {
    console.log(red(error.message))
  }
}
