/**
 * src/middlewares/notFound.js
 * -----------------------------------------------------------------------
 * This middleware only runs if NO route above it in app.js matched the
 * incoming request. That means the client hit a URL that simply
 * doesn't exist on our API (e.g. GET /api/v1/unicorns).
 *
 * Requirement #5 (Semantic Status Codes) demands we don't silently fail —
 * we explicitly tell the client "404 Not Found" with a clear JSON body,
 * never an empty response or an HTML error page.
 * -----------------------------------------------------------------------
 */

const notFound = (req, res, next) => {
  res.status(404).json({
    status: 'error',
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
};

module.exports = notFound;
