const dotenv = require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT

const postController = require('./controllers/post')

app.get('/', (req, res) => {
  res.send(`<h1>Benvenuto nel mio blog</h1> <a href="/posts">Vai ai post</a>`)
})

app.get('/posts', postController.index)

app.listen(port ?? 3000, () => {
  console.log(`Server running at http://localhost:${port}`)
})