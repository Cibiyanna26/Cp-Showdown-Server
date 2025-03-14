const express = require("express");
const axios = require("axios");
const router = express.Router();
const contexts = require('./context/cerdentails.js')
const { OAuth2Client } = require("google-auth-library");

const CLIENT_ID = contexts.client_id;
const CLIENT_SECRET = contexts.client_secret;
const REDIRECT_URI = contexts.redirect_uri;


const client = new OAuth2Client(CLIENT_ID);

// Callback URL for handling the Google Login response
router.post("/verify-token", async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });

    const payload = ticket.getPayload();
    return res.json({ valid: true, user: payload });
  } catch (error) {
    return res.status(401).json({ valid: false, message: "Invalid token" });
  }
});

// Logout route
router.get("/logout", (req, res) => {
  // Code to handle user logout
  res.redirect("/login");
});

module.exports = router;
