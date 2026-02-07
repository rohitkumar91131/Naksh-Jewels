const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const isAuthenticated = require('../middleware/authMiddleware'); // Your middleware

// 🔒 All routes require the user to be logged in
router.use(isAuthenticated);

router.get('/', cartController.getCart);      // Gets cart for CURRENT user
router.post('/add', cartController.addToCart); // Adds item for CURRENT user
router.post('/remove', cartController.removeFromCart); // Removes item

module.exports = router;