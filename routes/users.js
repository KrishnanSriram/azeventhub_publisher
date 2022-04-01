'use strict';

const express = require('express');
const { add_user, list_users, list_user_events } = require('../service/user_service');
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  const users = list_users();
  res.json({ users, count: users.length }).status(200);
});
/* ADD a new user */
router.post('/', async (req, res) => {
  const { firstName, lastName, email } = req.body;
  try {
    const user = await add_user(firstName, lastName, email);
    return res.json(user).status(200);
  } catch (error) {
    console.error('Failed to post USER add event!');
    throw error;
  }
  // return res.json({ message: 'Something may have went wrong' }).status(500);
});
module.exports = router;
