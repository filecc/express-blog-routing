const express = require("express");
const fs = require("fs");
const path = require("path");

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
    const html = `<h1>${post.title}</h1>
    <img style="max-width: 200px" src='/images${post.image}' />
            <p>${post.body}</p>
            <span>${post.tags.join(", ")}</span>
            <a  style='font-weoght: bold; display: block; padding: 1rem 0;' href="/posts">Torna alla lista dei post</a>`

    res.send(html)
}

module.exports = {
    index,
    show
  }