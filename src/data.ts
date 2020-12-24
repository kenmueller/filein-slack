import fetch from 'node-fetch'

import File from './file'

const AUTHORIZATION = `Bearer ${process.env.SLACK_TOKEN}`

const getData = async (file: File): Promise<Buffer> => {
	const response = await fetch(file.url_private, {
		headers: { Authorization: AUTHORIZATION }
	})
	
	if (!response.ok)
		throw new Error('An error occurred when loading the file')
	
	throw new Error(JSON.stringify(await response.json()))
	
	// try {
	// 	return response.buffer()
	// } catch {
	// 	throw new Error(JSON.stringify(await response.json()))
	// }
}

export default getData
