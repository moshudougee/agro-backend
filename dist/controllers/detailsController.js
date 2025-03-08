import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const addDetails = async (req, res) => {
    try {
        const { name, phone, address, city, userId } = req.body;
        const details = await prisma.farmerDetails.create({
            data: {
                name,
                phone,
                address,
                city,
                farmer: { connect: { id: userId } },
            }
        });
        res.status(201).json({ message: "Details added", details });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Details adding failed" });
    }
};
export const getDetails = async (req, res) => {
    try {
        const { userId } = req.params;
        const details = await prisma.farmerDetails.findUnique({
            where: { farmerId: userId }
        });
        //console.log(details)
        if (!details) {
            res.status(200).json(null);
            return;
        }
        res.status(200).json(details);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Details fetching failed" });
    }
};
export const getDetailsById = async (req, res) => {
    try {
        const { detailsId } = req.params;
        const details = await prisma.farmerDetails.findUnique({
            where: { id: detailsId }
        });
        if (!details) {
            res.status(404).json({ error: "Details not found" });
            return;
        }
        res.status(200).json(details);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Details fetching failed" });
    }
};
export const updateDetails = async (req, res) => {
    try {
        const { name, phone, address, city, userId } = req.body;
        const updatedDetails = await prisma.farmerDetails.update({
            where: { farmerId: userId },
            data: {
                name,
                phone,
                address,
                city,
            }
        });
        if (!updatedDetails) {
            res.status(404).json({ error: "Details not found" });
            return;
        }
        res.status(200).json({ message: "Details updated", updatedDetails });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Details updating failed" });
    }
};
export const deleteDetails = async (req, res) => {
    try {
        const { userId } = req.params;
        const deletedDetails = await prisma.farmerDetails.delete({
            where: { farmerId: userId }
        });
        if (!deletedDetails) {
            res.status(404).json({ error: "Details not found" });
            return;
        }
        res.status(200).json({ message: "Details deleted" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Details deleting failed" });
    }
};
