const express = require("express");
const router = express.Router();

router.post('/register', async (req, res) => {
    res.json("Sign up!");
})

router.post('/login', async (req, res) => {
    res.json("Sign in!");
})

router.post('/logout', async (req, res) => {
    res.json("Sign out!");
})

module.exports = router;