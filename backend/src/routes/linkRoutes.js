const express = require('express');
const router = express.Router();
const { createPublicLink, createLink, getLinks, deleteLink, getLinkStats } = require('../controllers/linkController');
const { authenticate } = require('../middleware/auth');
const { validate } = require('../middleware/validate');
const { shortenLimiter, guestShortenLimiter } = require('../middleware/rateLimiter');
const { createLinkSchema } = require('../validators/linkValidator');

// Public route (unauthenticated)
router.post('/public', guestShortenLimiter, validate(createLinkSchema), createPublicLink);

// Protected routes (require sign-in)
router.use(authenticate);

router.post('/', shortenLimiter, validate(createLinkSchema), createLink);
router.get('/', getLinks);
router.delete('/:id', deleteLink);
router.get('/:id/stats', getLinkStats);

module.exports = router;
