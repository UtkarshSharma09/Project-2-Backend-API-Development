/**
 * src/utils/AppError.js
 * -----------------------------------------------------------------------
 * A custom Error class that carries an HTTP status code alongside the
 * message. This is how our services/controllers communicate "semantic"
 * failures (404, 400, 409...) up to the global errorHandler.
 *
 * Example usage in a service:
 *   throw new AppError('User not found', 404);
 *
 * The errorHandler.js middleware then reads `err.statusCode` to decide
 * which HTTP status to send back — instead of everything defaulting
 * to a generic 500.
 * -----------------------------------------------------------------------
 */

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    // Distinguishes "expected" operational errors (bad input, not found)
    // from genuine bugs/crashes — useful if you later want to log
    // differently or alert on true 500s only.
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
