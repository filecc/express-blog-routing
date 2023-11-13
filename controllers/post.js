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
            <p style='font-weoght: bold;'>${post.title}</p>
            <img style="max-width: 200px" src='${post.image}' />
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

module.exports = {
    index
  }