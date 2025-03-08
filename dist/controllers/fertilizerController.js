import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const createFertilizer = async (req, res) => {
    try {
        const { name } = req.body;
        const price = parseFloat(req.body.price);
        const fertilizer = await prisma.fertilizer.create({
            data: {
                name,
                price,
            },
        });
        res.status(201).json({ message: "Fertilizer created", fertilizer });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Fertilizer creation failed" });
    }
};
export const getAllFertilizers = async (_req, res) => {
    try {
        const fertilizers = await prisma.fertilizer.findMany({
            include: {
                seeds: true,
            },
        });
        res.status(200).json(fertilizers);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch fertilizers" });
    }
};
export const getFertilizerById = async (req, res) => {
    try {
        const { fertilizerId } = req.params;
        const fertilizer = await prisma.fertilizer.findUnique({
            where: { id: fertilizerId },
            include: {
                seeds: true,
            }
        });
        res.status(200).json(fertilizer);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch fertilizer" });
    }
};
export const updateFertilizer = async (req, res) => {
    try {
        const { fertilizerId } = req.params;
        const { name } = req.body;
        const price = parseFloat(req.body.price);
        const fertilizer = await prisma.fertilizer.update({
            where: { id: fertilizerId },
            data: {
                name,
                price,
            },
        });
        res.status(200).json({ message: "Fertilizer updated", fertilizer });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Fertilizer update failed" });
    }
};
export const deleteFertilizer = async (req, res) => {
    try {
        const { fertilizerId } = req.params;
        const fertilizer = await prisma.fertilizer.delete({
            where: { id: fertilizerId },
        });
        res.status(200).json({ message: "Fertilizer deleted", fertilizer });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Fertilizer deletion failed" });
    }
};
