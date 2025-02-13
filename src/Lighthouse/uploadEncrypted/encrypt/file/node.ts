import axios from 'axios'
import { lighthouseConfig } from '../../../../lighthouse.config'
import { generate, saveShards } from '@lighthouse-web3/kavach'
import { encryptFile } from '../../encryptionNode'
import { walk } from '../../../upload/files/node'
import { IFileUploadedResponse } from '../../../../types'

export default async (
  sourcePath: any,
  apiKey: string,
  publicKey: string,
  signed_message: string
): Promise<{ data: IFileUploadedResponse[] }> => {
  const FormData = eval('require')('form-data')
  const fs = eval('require')('fs-extra')
  const token = 'Bearer ' + apiKey
  const endpoint =
    lighthouseConfig.lighthouseNode + '/api/v0/add?wrap-with-directory=false'
  const stats = fs.lstatSync(sourcePath)

  if (stats.isFile()) {
    try {
      // Upload file
      const formData = new FormData()

      const { masterKey: fileEncryptionKey, keyShards } = await generate()

      const fileData = fs.readFileSync(sourcePath)
      const encryptedData = await encryptFile(fileData, fileEncryptionKey)
      formData.append(
        'file',
        Buffer.from(encryptedData),
        sourcePath.replace(/^.*[\\/]/, '')
      )

      const response = await axios.post(endpoint, formData, {
        withCredentials: true,
        maxContentLength: Infinity, //this is needed to prevent axios from erroring out with large directories
        maxBodyLength: Infinity,
        headers: {
          'Content-type': `multipart/form-data; boundary= ${formData.getBoundary()}`,
          Encryption: 'true',
          Authorization: token,
        },
      })

      const { error } = await saveShards(
        publicKey,
        response.data.Hash,
        signed_message,
        keyShards
      )
      if (error) {
        throw new Error('Error encrypting file')
      }

      return { data: [response.data] }
    } catch (error: any) {
      throw new Error(error.message)
    }
  } else {
    const files = await walk(sourcePath)
    const formData = new FormData()

    let keyMap = {} as any

    await Promise.all(
      files.map(async (file: any) => {
        // const mimeType = mime.lookup(file)
        const { masterKey: fileEncryptionKey, keyShards } = await generate()

        const fileData = fs.readFileSync(file)
        const encryptedData = await encryptFile(fileData, fileEncryptionKey)
        const filename = file.slice(sourcePath.length + 1).replaceAll('/', '-')
        await formData.append('file', Buffer.from(encryptedData), filename)
        keyMap = { ...keyMap, [filename]: keyShards }
        return [filename, keyShards]
      })
    )

    const token = 'Bearer ' + apiKey
    const endpoint =
      lighthouseConfig.lighthouseNode + '/api/v0/add?wrap-with-directory=false'
    const response = await axios.post(endpoint, formData, {
      withCredentials: true,
      maxContentLength: Infinity, //this is needed to prevent axios from erroring out with large directories
      maxBodyLength: Infinity,
      headers: {
        'Content-type': `multipart/form-data; boundary= ${formData.getBoundary()}`,
        Encryption: 'true',
        Authorization: token,
      },
    })
    const jsondata = JSON.parse(
      `[${response.data.slice(0, -1)}]`.split('\n').join(',')
    ) as IFileUploadedResponse[]

    const savedKey = await Promise.all(
      jsondata.map(async (data) => {
        return saveShards(
          publicKey,
          data.Hash,
          signed_message,
          keyMap[data.Name]
        )
      })
    )
    savedKey.forEach((_savedKey) => {
      if (!_savedKey.isSuccess) {
        throw new Error(JSON.stringify(_savedKey))
      }
    })
    return { data: jsondata }
  }
}
