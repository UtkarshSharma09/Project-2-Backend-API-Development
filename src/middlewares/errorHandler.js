/**
 * src/middlewares/errorHandler.js
 * -----------------------------------------------------------------------
 * THE SAFETY NET.
 *
 * Junior dev note: In Express, an error-handling middleware is identified
 * by having exactly FOUR arguments: (err, req, res, next).
 * Express uses this function signature internally to detect that this
 * is a special "error middleware" and route errors to it.
 *
 * How errors reach this file:
 *   - Any controller/service can call `next(err)` to forward an error here,
 *     OR throw inside an async function wrapped by our asyncHandler util.
 *   - This is the ONLY place in the whole app that should send a raw
 *     500 response. No other file should do `res.status(500)` directly —
 *     that keeps error formatting consistent everywhere.
 *
 * This satisfies Requirement #5: we NEVER let the server crash silently
 * or return a raw stack trace/HTML to the client. Every failure gets a
 * clean, predictable JSON shape.
 * -----------------------------------------------------------------------
 */

const errorHandler = (err, req, res, next) => {
  // Log the full error server-side for debugging — the client never
  // sees this raw detail (that would leak internal implementation info).
  console.error('🔥 Unhandled Error:', err);

  // If a specific part of the app already attached a status code to the
  // error (e.g. a custom AppError with statusCode = 400), respect it.
  // Otherwise, default to 500 — a truly unexpected server-side failure.
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    status: 'error',
    message: statusCode === 500
      ? 'Internal Server Error. Something went wrong on our end.'
      : err.message,
  });
};

module.exports = errorHandler;
