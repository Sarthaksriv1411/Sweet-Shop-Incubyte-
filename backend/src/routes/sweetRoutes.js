const express = require('express');
const { body } = require('express-validator');
const {
  getAllSweets,
  searchSweets,
  getSweet,
  createSweet,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet
} = require('../controllers/sweetController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getAllSweets);
router.get('/search', searchSweets);
router.get('/:id', getSweet);

// Protected routes - require authentication
router.post('/:id/purchase', protect, purchaseSweet);

// Admin only routes
router.post(
  '/',
  protect,
  authorize('admin'),
  [
    body('name').trim().notEmpty().withMessage('Sweet name is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('category').isIn(['traditional', 'chocolate', 'cookies', 'cakes', 'candies', 'other']).withMessage('Invalid category'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('quantity').isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer')
  ],
  createSweet
);

router.put('/:id', protect, authorize('admin'), updateSweet);
router.delete('/:id', protect, authorize('admin'), deleteSweet);
router.post('/:id/restock', protect, authorize('admin'), restockSweet);

module.exports = router;
