require('dotenv').config();

const client_id = process.env.GOOGLE_CLIENT_ID;

const client_secret = process.env.GOOGLE_CLIENT_SECRET;

const redirect_uri = process.env.GOOGLE_REDIRECTION_URI;

const LOCALHOST_ALLOWED_ORIGIN = process.env.LOCALHOST_ALLOWED_ORIGIN;

const HOSTED_ALLOWED_ORIGIN = process.env.HOSTED_ALLOWED_ORIGIN;

module.exports = {
    client_id,client_secret, redirect_uri, LOCALHOST_ALLOWED_ORIGIN, HOSTED_ALLOWED_ORIGIN
}