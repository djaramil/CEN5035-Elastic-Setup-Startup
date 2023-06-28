'use strict'
const { env } = require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser');

const fs = require('fs')

const { Client } = require('@elastic/elasticsearch');
const { debug } = require('console');
const client = new Client({
    node: process.env.elastic_server,
    auth: {
        username: process.env.elastic_userid,
        password: process.env.elastic_password
    },
    tls: {
        ca: fs.readFileSync('./http_ca.crt'),
        rejectUnauthorized: false
    }
})

var app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', async function (req, res) {
    let result = '<html><body>'
    result += '<h1>Game of Thrones Quotes</h1>'
    result += '/query?quote=<br/>'
    result += '/query?character=<br/>'
    result += '</body></html>'
    res.status(200).send(result)
})

// Serve static files
app.use(express.static('public'));

app.get('/query', async function (req, res) {
    let quote = req.query.quote
    let character = req.query.character

    console.log("quote=", quote)
    console.log("character=", character)
    let query_str = {}

    if (quote != undefined && character != undefined) {
        query_str = {
            index: 'game-of-thrones', // Replace with the name of your Elasticsearch index
            body: {
                query: {
                    bool: {
                        must: [
                            { match: { "character.keyword": character } },
                            { match: { "quote.keyword": quote } }
                        ]
                    }
                }
            }
        }
    }
    else if (quote != undefined) {
        query_str = {
            index: 'game-of-thrones',
            query: {
                match: {
                    quote: quote
                }
            }
        }

    }
    else if (character != undefined) {
        query_str = {
            index: 'game-of-thrones',
            query: {
                match: {
                    character: character
                }
            }
        }

    }

    const results = await client.search(query_str)
    console.dir(results.hits.hits)
    res.status(200).send(JSON.stringify(results.hits.hits, null, 4))
})

const server = app.listen(5678); //start the server
console.log('Server is running...');
console.log('http://localhost:' + server.address().port)
