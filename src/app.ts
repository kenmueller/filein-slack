import { App } from '@slack/bolt'

import upload from './upload'

const app = new App({
	signingSecret: process.env.SLACK_SIGNING_SECRET,
	token: process.env.SLACK_TOKEN
})

app.message(async ({ event: { channel, ts, files }, say }) => {
	if (!files?.length)
		return
	
	await say({
		channel,
		thread_ts: ts,
		text: (await Promise.all(files.map(upload))).join('\n')
	})
})

app.error(async error => {
	console.error(error)
})

export default app
