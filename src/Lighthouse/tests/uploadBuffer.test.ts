import axios from 'axios'
import { ethers } from 'ethers'
import lighthouse from '..'
import { lighthouseConfig } from '../../lighthouse.config'
describe('uploadBuffer', () => {
  test('upload Buffer Main Case File', async () => {
    const image =
      'iVBORw0KGgoAAAANSUhEUgAAAA8AAAAMCAYAAAC9QufkAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADCSURBVChTrZJRCoMwDIaTtM56hsEeRNjDELz/yeas7ZLYMBWEOfZBiH+axKSK7bXNcJKcpSQDpZTgrEmx1NPS6zf+VIwsCAHZ9khczJAcjRUNiAjOu02SQY70zJAc0djdukxYenCdXEaak0rnSoH1s+9SNPb3PnvvYY4zxBiXaKEOtfrxOaqvLhW/lWB6TXrrJOMq7OTZTJKMdXyjh8eQ2em4dvgtvPqn2yEH/yD51S0KMm7TBKjrZV9l1/fCu4cmwBsXPlBp+IIIrQAAAABJRU5ErkJggg=='
    const publicKey = '0x5129B1153f4f9f321F41CbA831899336CB4134c7' // wallet 7
    const verificationMessage = (
      await axios.get(
        lighthouseConfig.lighthouseAPI +
          `/api/auth/get_message?publicKey=${publicKey}`
      )
    ).data
    const signer = new ethers.Wallet(
      '0xace7b85099ef79e3ddea94bd44f6c42fe75e447388af464cc7d4467965f09322'
    )
    const signedMessage = await signer.signMessage(verificationMessage)
    const apiKey = await lighthouse.getApiKey(publicKey, signedMessage)

    const deployResponse = (
      await lighthouse.uploadBuffer(image, apiKey.data.apiKey)
    ).data

    expect(deployResponse).toHaveProperty('Name')
    expect(typeof deployResponse['Name']).toBe('string')

    expect(deployResponse).toHaveProperty('Hash')
    expect(typeof deployResponse['Hash']).toBe('string')

    expect(deployResponse).toHaveProperty('Size')
    expect(typeof deployResponse['Size']).toBe('string')
  }, 60000)
})
