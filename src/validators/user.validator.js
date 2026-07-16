/**
 * src/validators/user.validator.js
 * -----------------------------------------------------------------------
 * SYNTACTIC RULES ONLY.
 *
 * This schema answers ONLY the question: "Is the shape/format/type of
 * this data correct?" It does NOT check the database, so it will
 * happily accept a username that's already taken — that's a semantic
 * concern, handled later in user.service.js.
 *
 * We use Zod because it's declarative, TypeScript-friendly, and gives
 * clean, structured error objects out of the box (which validate.js
 * then formats for the client).
 * -----------------------------------------------------------------------
 */

const { z } = require('zod');

const createUserSchema = z.object({
  username: z
    .string({ required_error: 'username is required' })
    .trim()
    .min(3, 'username must be at least 3 characters')
    .max(20, 'username must be at most 20 characters')
    // GenZ usernames: letters, numbers, underscores only — no spaces/symbols.
    .regex(/^[a-zA-Z0-9_]+$/, 'username can only contain letters, numbers, and underscores'),

  email: z
    .string({ required_error: 'email is required' })
    .trim()
    .toLowerCase()
    .email('email must be a valid email address'),

  // XP, level, and streak are NOT accepted from the client on creation —
  // they are system-controlled gamification values. A new user always
  // starts at 0/1/0. This is a deliberate security/integrity decision:
  // never let the client dictate values that affect game economy.
});

module.exports = {
  createUserSchema,
};
