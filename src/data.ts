import fetch from 'node-fetch'

import File from './file'

const getData = async (file: File) => {
	const response = await fetch(file.permalink)
	return response.buffer()
}

export default getData
