/**
 * src/controllers/user.controller.js
 * -----------------------------------------------------------------------
 * THE TRANSLATOR.
 *
 * Controllers are the ONLY layer that touches `req` and `res` directly.
 * Their job is narrow and mechanical:
 *   1. Pull whatever's needed out of the request (params, body, query).
 *   2. Call the service layer to do the actual work.
 *   3. Translate the result into the correct HTTP status code + JSON body.
 *
 * Notice there is NO business logic here, and NO data-shape validation
 * here — both of those already happened before this code even runs
 * (validate.js middleware, then user.service.js). This keeps the
 * controller thin, readable, and easy to test.
 *
 * Every function is wrapped in `asyncHandler` so that if the service
 * throws an AppError (or any error), it's automatically forwarded to
 * our global errorHandler instead of crashing the process.
 * -----------------------------------------------------------------------
 */

const userService = require('../services/user.service');
const asyncHandler = require('../utils/asyncHandler');

/**
 * GET /api/v1/users
 * Safe + idempotent retrieval of the full user list (Requirement #1).
 */
const getAllUsers = asyncHandler(async (req, res) => {
  const allUsers = userService.getAllUsers();

  res.status(200).json({
    status: 'success',
    results: allUsers.length,
    data: allUsers,
  });
});

/**
 * GET /api/v1/users/:id
 * Returns a single user, or a 404 (thrown from the service and caught
 * by asyncHandler -> errorHandler) if the id doesn't exist.
 */
const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = userService.getUserById(id);

  res.status(200).json({
    status: 'success',
    data: user,
  });
});

/**
 * POST /api/v1/users
 * Creates a new user. By the time this function runs, req.body has
 * ALREADY passed syntactic validation (validate.js middleware ran
 * first, in the routes file). This function just hands clean data
 * to the service, which applies semantic checks and creates the record.
 */
const createUser = asyncHandler(async (req, res) => {
  const newUser = userService.createUser(req.body);

  // 201 Created — NOT 200. Requirement #5 demands we're precise:
  // 201 specifically communicates "a new resource now exists".
  res.status(201).json({
    status: 'success',
    data: newUser,
  });
});

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
};
