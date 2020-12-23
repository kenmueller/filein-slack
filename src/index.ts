import { App } from '@slack/bolt'

const PORT = process.env.PORT || 5000

const app = new App({
	signingSecret: process.env.SLACK_SIGNING_SECRET,
	token: process.env.SLACK_TOKEN
})

app.event('message.channels', async ({ event }) => {
	await app.client.chat.postMessage({
		channel: event.channel,
		thread_ts: event.ts,
		text: JSON.stringify(event)
	})
})

app.start(PORT).then(() => {
	console.log(`Listening on port ${PORT}`)
})
