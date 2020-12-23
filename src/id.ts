import { nanoid } from 'nanoid'
import { getExtension } from 'mime'

import File from './file'

const newId = ({ name, mimetype }: File) => {
	const indexOfDot = name.lastIndexOf('.')
	const extension = ~indexOfDot
		? name.slice(indexOfDot + 1)
		: getExtension(mimetype)
	
	if (!extension)
		throw new Error('Invalid name')
	
	return `${nanoid(10)}.${extension}`
}

export default newId
