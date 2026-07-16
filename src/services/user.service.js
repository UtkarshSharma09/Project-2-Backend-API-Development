/**
 * src/services/user.service.js
 * -----------------------------------------------------------------------
 * THE GATEKEEPER — STAGE 2 (SEMANTIC VALIDATION) + BUSINESS LOGIC.
 *
 * By the time a request reaches this file, we already KNOW the data is
 * syntactically well-formed (thanks to validate.js + user.validator.js).
 * This file's job is to ask deeper, logic-based questions that require
 * looking at existing data:
 *   - "Does a user with this email already exist?" (duplicate check)
 *   - "Does a user with this id actually exist?" (existence check)
 *
 * Controllers never talk to the data array directly — they always go
 * through this service layer. That means if we swap the mock array
 * for a real database later, ONLY this file changes. Nothing in
 * controllers/ or routes/ needs to know or care.
 * -----------------------------------------------------------------------
 */

const users = require('../data/users');
const AppError = require('../utils/AppError');

/**
 * Fetch all users.
 * No semantic validation needed for a simple list operation.
 */
const getAllUsers = () => {
  return users;
};

/**
 * Fetch a single user by id.
 * SEMANTIC CHECK: does a user with this id exist?
 */
const getUserById = (id) => {
  const user = users.find((u) => u.id === id);

  if (!user) {
    // 404 — the id is syntactically fine (it's a string), but
    // semantically it points to nothing real.
    throw new AppError(`No user found with id '${id}'`, 404);
  }

  return user;
};

/**
 * Create a new user.
 * SEMANTIC CHECK: is the email already registered to another user?
 * (Two users can't share an email — that's a business rule, not a
 * format rule, so it belongs here rather than in the Zod schema.)
 */
const createUser = ({ username, email }) => {
  const emailTaken = users.some((u) => u.email === email);

  if (emailTaken) {
    // 409 Conflict — the correct semantic status code for "this
    // resource already exists / conflicts with existing state",
    // as opposed to 400 which is for malformed requests.
    throw new AppError(`Email '${email}' is already registered`, 409);
  }

  const usernameTaken = users.some(
    (u) => u.username.toLowerCase() === username.toLowerCase()
  );

  if (usernameTaken) {
    throw new AppError(`Username '${username}' is already taken`, 409);
  }

  const newUser = {
    id: `usr_${String(users.length + 1).padStart(3, '0')}`,
    username,
    email,
    // Gamification fields are system-assigned, never client-supplied.
    xp: 0,
    level: 1,
    streakDays: 0,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  return newUser;
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
};
