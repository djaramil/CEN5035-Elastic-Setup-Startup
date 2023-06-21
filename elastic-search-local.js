'use strict'

env = require('dotenv').config()

console.log(process.env)

const { Client } = require('@elastic/elasticsearch')
const client = new Client({
  cloud: { id: '>my_elastic:my-elastic-cloudid>' },
  auth: { apiKey: '<elastic-api-key>' }
})


async function run() {

  // Let's search!
  const result = await client.search({
    index: 'game-of-thrones',
    query: {
      match: { character: 'Stark' }
    },
    "size": 1
  })

  console.log(result.hits.hits)
}

run().catch(console.log)
