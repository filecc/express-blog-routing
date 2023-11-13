const express = require("express");
const fs = require("fs");
const path = require("path");
const env = require("dotenv").config();

const port = process.env.PORT
const host = process.env.HOST
/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

function index (req, res) {
    const posts = JSON.parse(fs.readFileSync(path.resolve("./db/posts.json"), "utf8"))
    const html = ['<ul>']

    html.push(posts.map(
          (post) => 
          `<li>
            <a href="/posts/${post.id}" style='font-weoght: bold; display: block; padding: 1rem 0;'>${post.title}</a>
            <img style="max-width: 200px" src='/images${post.image}' />
            <p>${post.body}</p>
            <span>${post.tags.join(", ")}</span>
        </li>
        `
        )
        .join("")
    );

    
    html.push('</ul>')
    html.push('<a href="/">Torna alla home</a>')
    
    res.format({
        text: () => {
            res.send(html.join(''))
        },
        html: () => {
           res.send(html.join(''))
        },
        json: () => {
            res.send(posts)
        }
    })
   
}

/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

function show (req, res) {
    const posts = JSON.parse(fs.readFileSync(path.resolve("./db/posts.json"), "utf8"))
    const post = posts.find(post => post.id === req.params.id)
    if (!post) {
        res.status(404)
        res.send("Not found")
        return
    }
    /* const html = `<h1>${post.title}</h1>
    <img style="max-width: 200px" src='/images${post.image}' />
            <p>${post.body}</p>
            <span>${post.tags.join(", ")}</span>
            <a  style='font-weoght: bold; display: block; padding: 1rem 0;' href="/posts">Torna alla lista dei post</a>`

    res.send(html) */
    const imgPath = (`http://${host}:${port}/images${post.image}`)
    const downloadLink= (`http://localhost:3000/posts/${post.slug}/download`)
    res.json({...post, image_url: `${imgPath}`, download_link: `${downloadLink}`})
}

/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

function create (req, res) {
    res.format({
        html: () => {
            res.send(`<h1>Creazione nuovo post</h1>`)
        },
        default: () => {
            res.status(406).send("Not Acceptable")
        }
    }
    )
    
}

/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

function download (req, res) {
    const posts = JSON.parse(fs.readFileSync(path.resolve("./db/posts.json"), "utf8"))
    const slug = req.params.slug
    const image = posts.find(post => post.slug === slug).image
    res.download(`./public/images${image}`)
}


module.exports = {
    index,
    show,
    create,
    download
  }