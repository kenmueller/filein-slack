import { App } from '@slack/bolt'

import File from './file'
import upload from './upload'

const app = new App({
	signingSecret: process.env.SLACK_SIGNING_SECRET,
	token: process.env.SLACK_TOKEN
})

app.message(async ({ event: { channel, ts, text, files }, say }) => {
	if (!files?.length)
		return
	
	const isPublic = text?.trim().toLowerCase() === 'public'
	const urls = await Promise.all(files.map((file: File) =>
		upload(file, isPublic)
	))
	
	await say({ channel, thread_ts: ts, text: urls.join('\n') })
})

app.error(async error => {
	console.error(error)
})

export default app
