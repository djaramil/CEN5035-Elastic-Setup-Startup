env = require('dotenv').config()
console.log(process.env)

client_config = {}
cloud_id = {}
cloud_auth = {}

cloud_id.id = process.env.elastic_cloud_id;
cloud_auth.apiKey = process.env.elastic_api_token;

client_config.cloud = cloud_id;
client_config.auth = cloud_auth;

console.dir(client_config)