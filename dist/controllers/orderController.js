import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const placeOrder = async (req, res) => {
    try {
        const { orderUnits, totalAmt, paid, userId } = req.body;
        //const userId = (req as any).user.id;
        const order = await prisma.order.create({
            data: {
                farmerId: userId,
                totalAmt,
                paid,
                orderUnit: orderUnits,
            },
        });
        res.status(201).json({ message: "Order placed", order });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Order placement failed" });
    }
};
export const getAllOrders = async (req, res) => {
    try {
        const orders = await prisma.order.findMany();
        res.status(200).json(orders);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch orders" });
    }
};
export const getOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: {
                farmer: true,
            },
        });
        if (!order) {
            res.status(404).json({ error: "Order not found" });
            return;
        }
        res.status(200).json(order);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch order" });
    }
};
export const getMyOrders = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await prisma.order.findMany({
            where: { farmerId: userId },
            include: {
                farmer: true,
            },
        });
        res.status(200).json(orders);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch orders" });
    }
};
export const updateOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const updatedOrder = await prisma.order.update({
            where: { id: orderId },
            data: req.body,
        });
        if (!updatedOrder) {
            res.status(404).json({ error: "Order not found" });
            return;
        }
        res.status(200).json({ message: 'Order updated', updatedOrder });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to update order" });
    }
};
export const deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        await prisma.order.delete({
            where: { id: orderId },
        });
        res.status(200).json({ message: 'Order deleted' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to delete order" });
    }
};
