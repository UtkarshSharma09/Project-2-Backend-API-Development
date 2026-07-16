/**
 * src/utils/asyncHandler.js
 * -----------------------------------------------------------------------
 * PROBLEM: Express does NOT automatically catch errors thrown inside
 * `async` controller functions. If you `await` something that throws
 * inside a plain async route handler, your server will hang or crash
 * instead of gracefully returning a 500.
 *
 * SOLUTION: Wrap every async controller with this helper. It runs the
 * function, and if it rejects/throws, automatically forwards the error
 * to `next(err)` — which routes it straight to our global errorHandler.
 *
 * Without this, every single controller would need a repetitive:
 *   try { ... } catch (err) { next(err); }
 * -----------------------------------------------------------------------
 */

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
