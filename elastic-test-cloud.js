'use strict'
const { env } = require('dotenv').config()
const { Client } = require('@elastic/elasticsearch')

var client_config = {}
var cloud_id = {}
var cloud_auth = {}

// setup client_config for creating Client()
cloud_id.id = process.env.elastic_cloud_id;
cloud_auth.apiKey = process.env.elastic_api_token;
client_config.cloud = cloud_id;
client_config.auth = cloud_auth;

// instantiate Elastic Client
const client = new Client(client_config);

async function run() {
  // Let's start by indexing some data
  await client.index({
    index: 'game-of-thrones',
    document: {
      character: 'Ned Stark',
      quote: 'Winter is coming.'
    }
  })

  await client.index({
    index: 'game-of-thrones',
    document: {
      character: 'Daenerys Targaryen',
      quote: 'I am the blood of the dragon.'
    }
  })

  await client.index({
    index: 'game-of-thrones',
    document: {
      character: 'Tyrion Lannister',
      quote: 'A mind needs books like a sword needs a whetstone.'
    }
  })

  // here we are forcing an index refresh, otherwise we will not
  // get any result in the consequent search
  await client.indices.refresh({ index: 'game-of-thrones' })

  // Let's search!
  const result = await client.search({
    index: 'game-of-thrones',
    query: {
      match: { quote: 'winter' }
    }
  })

  console.log(result.hits.hits)
}

run().catch(console.log)
