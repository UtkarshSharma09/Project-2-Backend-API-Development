/**
 * src/routes/index.js
 * -----------------------------------------------------------------------
 * The single "table of contents" for the API. Every resource gets its
 * own router file, and we mount them all here under their noun-based
 * path (Requirement #2: RESTful Naming — nouns, not verbs).
 *
 * As we build Transactions, Quests, etc. in later steps, they'll each
 * get one line added here — nothing else in the app needs to change.
 * -----------------------------------------------------------------------
 */

const express = require('express');
const router = express.Router();

const usersRouter = require('./users.routes');

// Mounted at /api/v1/users (see app.js for the /api/v1 prefix)
router.use('/users', usersRouter);

// Future resources will be added exactly like this:
// const transactionsRouter = require('./transactions.routes');
// router.use('/transactions', transactionsRouter);

module.exports = router;
