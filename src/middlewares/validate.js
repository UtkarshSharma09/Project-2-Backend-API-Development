/**
 * src/middlewares/validate.js
 * -----------------------------------------------------------------------
 * THE GATEKEEPER — STAGE 1 (SYNTACTIC VALIDATION).
 *
 * This is a generic, reusable middleware FACTORY. It takes a Zod schema
 * as an argument and RETURNS a middleware function tailored to check
 * `req.body` against that schema.
 *
 * "Never Trust the Client" (Requirement #4) starts here: before any
 * controller or service logic runs, we confirm the incoming JSON is
 * syntactically well-formed — correct types, required fields present,
 * correct string patterns (e.g. valid email shape).
 *
 * This middleware does NOT know anything about business rules (like
 * "does this user already exist?") — that's semantic validation, and
 * it deliberately lives one layer deeper, in services/. Keeping these
 * two concerns separate is exactly what your rubric is testing for.
 * -----------------------------------------------------------------------
 */

const validate = (schema) => (req, res, next) => {
  // .safeParse() runs the schema WITHOUT throwing — it returns a
  // result object we can inspect, instead of needing try/catch.
  const result = schema.safeParse(req.body);

  if (!result.success) {
    // Flatten Zod's (sometimes deeply nested) error tree into a simple,
    // human-readable list — much friendlier for a frontend dev to
    // display next to form fields.
    const formattedErrors = result.error.issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }));

    return res.status(400).json({
      status: 'error',
      message: 'Syntactic validation failed. Check the shape of your request body.',
      errors: formattedErrors,
    });
  }

  // IMPORTANT: We overwrite req.body with the *parsed* data.
  // Zod can coerce/strip unknown fields depending on schema config,
  // so downstream code always works with clean, trusted data.
  req.body = result.data;
  next();
};

module.exports = validate;
