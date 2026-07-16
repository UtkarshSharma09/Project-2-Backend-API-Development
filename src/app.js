/**
 * src/app.js
 * -----------------------------------------------------------------------
 * This file builds and configures the Express application itself:
 * global middleware, route mounting, and error handling.
 *
 * It does NOT start the server (that's server.js's job) — this keeps
 * the app "importable" for future automated testing (e.g. supertest),
 * since tests can import `app` without actually opening a network port.
 * -----------------------------------------------------------------------
 */

const express = require('express');
const cors = require('cors');

const apiRoutes = require('./routes');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// ------------------------------------------------------------------
// GLOBAL MIDDLEWARE (runs on EVERY request, in this exact order)
// ------------------------------------------------------------------

// 1. CORS — Since our frontend (running on a browser, likely a different
//    origin/port like localhost:3000) needs to call this API
//    (running on e.g. localhost:5000), the browser will block the
//    request by default due to the Same-Origin Policy.
//    `cors()` adds the necessary `Access-Control-Allow-Origin` headers
//    so the browser permits the cross-origin request.
//
//    NOTE: `cors()` with no arguments = allow ALL origins ("*").
//    This is fine for a mock/dev API. In production, you would lock
//    this down to your specific frontend domain, e.g.:
//    cors({ origin: 'https://your-genz-app.com' })
app.use(cors());

// 2. JSON Body Parser — Requirement #3 says we exchange JSON exclusively.
//    This middleware parses incoming JSON request bodies and makes them
//    available on `req.body`. Without this, `req.body` is undefined.
app.use(express.json());

// ------------------------------------------------------------------
// ROUTES
// ------------------------------------------------------------------
// All API routes are mounted under /api/v1 — versioning the API from
// day one is a professional habit. It means we can introduce a
// breaking /api/v2 later without destroying existing frontend clients.
app.use('/api/v1', apiRoutes);

// A friendly root route — purely a sanity check, not part of the
// "real" API surface, so it's fine to leave un-versioned.
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'GenZ FinTrack API is alive. See /api/v1 for resources.',
  });
});

// ------------------------------------------------------------------
// FALLBACK / ERROR MIDDLEWARE (order matters — these go LAST)
// ------------------------------------------------------------------

// Catches any request that didn't match a route above → 404
app.use(notFound);

// Catches any error passed via next(err) anywhere in the app → 500
// (or a specific status if the error explicitly sets one)
app.use(errorHandler);

module.exports = app;
