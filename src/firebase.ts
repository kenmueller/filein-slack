import firebase from 'firebase-admin'

if (!firebase.apps.length)
	firebase.initializeApp({
		credential: firebase.credential.cert(
			JSON.parse(Buffer.from(process.env.FIREBASE_KEY!, 'base64').toString())
		),
		databaseURL: process.env.FIREBASE_DATABASE_URL,
		storageBucket: process.env.FIREBASE_STORAGE_BUCKET
	})

export default firebase
