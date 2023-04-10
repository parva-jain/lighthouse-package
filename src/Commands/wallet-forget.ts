import chalk from 'chalk'
import { config } from './utils/getNetwork'

export default async function () {
  config.delete('LIGHTHOUSE_GLOBAL_WALLET')
  config.delete('LIGHTHOUSE_GLOBAL_PUBLICKEY')
  console.log(chalk.green('Wallet Removed!'))
}
