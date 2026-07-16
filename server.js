/**
 * server.js
 * -----------------------------------------------------------------------
 * ENTRY POINT ONLY.
 *
 * Junior dev note: This file has ONE job — start the HTTP listener.
 * It does NOT define routes, middleware, or business logic.
 * That separation means we could later swap Express for another
 * framework and only `src/app.js` would need to change.
 * -----------------------------------------------------------------------
 */

const app = require('./src/app');

// PORT is read from environment variables first (for deployment flexibility),
// falling back to 5000 for local development.
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 GenZ FinTrack API is live at http://localhost:${PORT}`);
});
