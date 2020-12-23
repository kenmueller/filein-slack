import app from './app'

const PORT = process.env.PORT || 5000

app.start(PORT).then(() => {
	console.log(`Listening on port ${PORT}`)
})
