import { App } from '@slack/bolt'

const PORT = process.env.PORT || 5000

const app = new App({
	signingSecret: process.env.SLACK_SIGNING_SECRET,
	token: process.env.SLACK_TOKEN
})

app.message(async ({ event, say }) => {
	console.log(JSON.stringify(event))
	
	if (!event.files)
		return
	
	await say({
		channel: event.channel,
		thread_ts: event.ts,
		text: 'Success'
	})
})

app.error(async error => {
	console.error(error)
})

app.start(PORT).then(() => {
	console.log(`Listening on port ${PORT}`)
})
