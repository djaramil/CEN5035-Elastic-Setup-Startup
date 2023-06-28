'use strict'
const { env } = require('dotenv').config()
const fs = require('fs')

const { Client } = require('@elastic/elasticsearch')
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

async function run() {

  // Let's start by deleting the index if it exists
  await client.indices.delete({
    index: 'game-of-thrones',
  }).then(function (resp) {
    console.log("Successfully deleted index!");
  }, function (err) {
    console.log("Index not present");
  });

  // Specify the path to your JSON file
  const filePath = 'game-of-thrones-quotes.json';

  try {
    // Read the contents of the JSON file
    const data = fs.readFileSync(filePath, 'utf8');

    // Parse the JSON data
    const jsonData = JSON.parse(data);

    // Loop through the JSON data
    for (const item of jsonData) {
      // Access individual properties or perform operations on each item
      console.log(item);

      await client.index({
        index: 'game-of-thrones',
        body: {
          character: item.character,
          quote: item.quote
        }
      });
    }
  } catch (err) {
    console.error('Error reading or parsing JSON data:', err);
  }

  // Here we are forcing an index refresh, otherwise we will not
  // get any result in the subsequent search
  await client.indices.refresh({ index: 'game-of-thrones' });

  // Let's search!
  const result = await client.search({
    index: 'game-of-thrones',
    body: {
      query: {
        match: { quote: 'winter' }
      }
    }
  });

  console.log(result.hits.hits);
}

run().catch(console.log);
