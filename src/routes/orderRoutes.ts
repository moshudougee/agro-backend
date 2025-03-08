import express from "express";
import { deleteOrder, getAllOrders, getMyOrders, getOrderById, placeOrder, updateOrder } from "../controllers/orderController";
import { authenticate, authenticateAdmin } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/create",  placeOrder);
router.get("/getAllOrders",   getAllOrders);
router.get("/getOrder/:orderId",  getOrderById);
router.get("/getMyOrders/:userId",  getMyOrders);
router.put("/updateOrder/:orderId",  updateOrder);
router.delete("/deleteOrder/:orderId",   deleteOrder);

export default router;
