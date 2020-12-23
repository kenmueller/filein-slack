import { nanoid } from 'nanoid'
import { getExtension } from 'mime'

const newId = (name: string, type: string) => {
	const indexOfDot = name.lastIndexOf('.')
	const extension = ~indexOfDot
		? name.slice(indexOfDot + 1)
		: getExtension(type)
	
	if (!extension)
		throw new Error('Invalid name')
	
	return `${nanoid(10)}.${extension}`
}

export default newId
