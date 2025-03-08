import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createSeeds = async (req: Request, res: Response) => {
    try {
        const { name, fertilizerIds } = req.body;
        const price = parseFloat(req.body.price);
        const seeds = await prisma.seeds.create({
            data: {
                name,
                price,
                fertilizers: {
                    connect: fertilizerIds.map((id: string) => ({ id })),
                }
            },
        });

        if (seeds) {
            for (const fertilizerId of fertilizerIds) {
                await prisma.fertilizer.update({
                    where: { id: fertilizerId },
                    data: {
                        seeds: {
                            connect: { id: seeds.id },
                        },
                    },
                });
            }
        } else {
            res.status(500).json({ error: "Seeds creation failed" });
        }

        res.status(201).json({ message: "Seeds created", seeds });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Seeds creation failed" });
    }
}

export const getAllSeeds = async (req: Request, res: Response) => {
    try {
        const seeds = await prisma.seeds.findMany({
            include: {
                fertilizers: true,
            },
        });
        res.status(200).json(seeds);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch seeds" });
    }
}

export const getSeedById = async (req: Request, res: Response) => {
    try {
        const { seedId } = req.params;
        const seed = await prisma.seeds.findUnique({
            where: { id: seedId },
            include: {
                fertilizers: true,
            },
        });
        res.status(200).json(seed);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch seed" });
    }
}

export const updateSeed = async (req: Request, res: Response) => {
    try {
        const { seedId } = req.params;
        const { name, fertilizerIds } = req.body;
        const price = parseFloat(req.body.price);
        const seed = await prisma.seeds.update({
            where: { id: seedId },
            data: {
                name,
                price,
                fertilizers: {
                    set: fertilizerIds.map((id: string) => ({ id })),
                },
            },
        });
        res.status(200).json({ message: "Seed updated", seed });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to update seed" });
    }
}

export const deleteSeed = async (req: Request, res: Response) => {
    try {
        const { seedId } = req.params;
        await prisma.seeds.delete({
            where: { id: seedId },
        });
        res.status(200).json({ message: "Seed deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to delete seed" });
    }
}