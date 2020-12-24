import fetch from 'node-fetch'

import File from './file'

const AUTHORIZATION = `Bearer ${process.env.SLACK_TOKEN}`

const getData = async (file: File) => {
	const response = await fetch(file.url_private, {
		headers: { Authorization: AUTHORIZATION }
	})
	
	if (!response.ok)
		throw new Error('An error occurred when loading the file')
	
	const data = await response.buffer()
	console.log(`DATA IS BUFFER: ${Buffer.isBuffer(data)}`)
	return data
}

export default getData
