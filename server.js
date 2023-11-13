const dotenv = require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT

const homeController = require('./controllers/home')
const postsRouter = require('./routers/posts')

app.use(express.static('public'))

app.get('/', homeController.index)

app.use('/posts', postsRouter)

app.listen(port ?? 3000, () => {
  console.log(`Server running at http://localhost:${port}`)
})