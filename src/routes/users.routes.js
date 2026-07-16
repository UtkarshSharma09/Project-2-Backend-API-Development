/**
 * src/routes/users.routes.js
 * -----------------------------------------------------------------------
 * PURE WIRING. This file answers exactly one question per line:
 * "which HTTP verb + path maps to which middleware chain?"
 *
 * Notice the naming (Requirement #2): every path here is a NOUN
 * (`/`, `/:id`) mounted under `/users` in routes/index.js. There is
 * NO `/getUsers` or `/createUser` anywhere — the HTTP verb itself
 * (GET, POST) already tells us the action. The URL only ever
 * identifies the RESOURCE.
 *
 * The order of middleware in the POST chain matters:
 *   validate(schema)  ->  controller
 *   (Gatekeeper Stage 1)   (calls service, which does Gatekeeper Stage 2)
 * -----------------------------------------------------------------------
 */

const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const validate = require('../middlewares/validate');
const { createUserSchema } = require('../validators/user.validator');

// GET /api/v1/users — list everyone
router.get('/', userController.getAllUsers);

// GET /api/v1/users/:id — fetch one user
router.get('/:id', userController.getUserById);

// POST /api/v1/users — create a new user
// `validate(createUserSchema)` runs FIRST and blocks the request with
// a 400 before the controller/service ever sees malformed data.
router.post('/', validate(createUserSchema), userController.createUser);

module.exports = router;
