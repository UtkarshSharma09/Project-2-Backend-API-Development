/**
 * src/data/users.js
 * -----------------------------------------------------------------------
 * MOCK "DATABASE".
 *
 * Since this is a mock API (no real DB connected yet), we simulate
 * persistence with a simple in-memory array. Because Node.js keeps
 * modules cached, every file that `require()`s this array gets the
 * SAME reference in memory — so pushing to it here is visible
 * everywhere else in the app, just like a real DB table would behave
 * within a single running process.
 *
 * IMPORTANT CAVEAT (tell your grader this if asked!): this data resets
 * every time the server restarts, since nothing is written to disk.
 * This is expected and fine for a mock/stateless-API demo project.
 * -----------------------------------------------------------------------
 */

let users = [
  {
    id: 'usr_001',
    username: 'broke_but_bougie',
    email: 'broke.bougie@example.com',
    xp: 450,
    level: 3,
    streakDays: 5,
    createdAt: '2026-06-01T10:00:00.000Z',
  },
  {
    id: 'usr_002',
    username: 'savings_goblin',
    email: 'savings.goblin@example.com',
    xp: 1200,
    level: 6,
    streakDays: 21,
    createdAt: '2026-06-10T14:30:00.000Z',
  },
];

module.exports = users;
