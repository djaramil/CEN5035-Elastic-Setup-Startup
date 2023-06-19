'use strict'

const { Client } = require('@elastic/elasticsearch')
const client = new Client({
  cloud: { id: 'my_elastic:ZWFzdHVzMi5henVyZS5lbGFzdGljLWNsb3VkLmNvbTo0NDMkNGEyODQ2Y2QyMzdmNDU5YmIzMThlNzQ3MTI0NDk3MDQkNWIwYjNhNDM3Y2NlNGM1OTgwMDc5ZjcxNGQzYWQ3YzI=' },
  auth: { apiKey: 'RmZYZXRZZ0JZNFBKamlPeHNhcXo6UGk2a2VGRFRURk9TSFFyN0JBcW9RQQ==' }
})


async function run () {

  // Let's search!
  const result= await client.search({
    index: 'game-of-thrones',
    query: {
      match: { character: 'Stark' }
    },
    "size" : 1
  })

  console.log(result.hits.hits)
}

run().catch(console.log)