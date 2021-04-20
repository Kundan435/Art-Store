import express from 'express'
const router = express.Router()
import {
  addOrderItems,
  getOrderById,
  updateOrdertoPaid,
  updateOrdertStatus,
  getMyOrders,
  getOrders,
} from '../controllers/orderController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrdertoPaid)
router.route('/:id/status').put(protect, admin, updateOrdertStatus)
export default router
