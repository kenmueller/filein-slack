import { MAX_FILE_SIZE } from './constants'
import File from './file'
import firebase from './firebase'
import newId from './id'
import getData from './data'

const { FieldValue } = firebase.firestore

const firestore = firebase.firestore()
const storage = firebase.storage().bucket()

const upload = async (file: File, isPublic: boolean) => {
	try {
		const name = file.name ?? 'Untitled'
		const type = file.mimetype
		const id = newId(name, type)
		
		const data = await getData(file)
		const size = data.byteLength
		
		if (size > MAX_FILE_SIZE)
			return 'File too large, maximum is 10 GB'
		
		await storage.file(id).save(data, {
			public: true,
			gzip: true,
			metadata: {
				contentType: type,
				contentDisposition: `inline; filename=${JSON.stringify(name)}`,
				cacheControl: 'public, max-age=31536000, s-maxage=31536000',
				metadata: { name, owner: null }
			}
		})
		
		await firestore.doc(`files/${id}`).set({
			name,
			type,
			size,
			owner: null,
			comments: 0,
			uploaded: FieldValue.serverTimestamp(),
			public: isPublic
		})
		
		return `<https://filein.io/${id}|${name}> (<http://u.filein.io/${id}|source>)`
	} catch (error) {
		console.error(error)
		return error.message
	}
}

export default upload
