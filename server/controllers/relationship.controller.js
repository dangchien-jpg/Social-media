import prisma from "../config/prisma.js";

export const index = async (req, res) => {
    try {
        const followedUserId = parseInt(req.query.followedUserId, 10);
        const data = await prisma.relationship.findMany({
            where: {
                followedUserId: followedUserId
            },
            select: {
                followerUserId: true
            }
        });
        res.status(200).json(data.map(relationship => relationship.followerUserId));
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

export const store = async (req, res) => {
    try {
        const { id } = req.user;
        const { userId } = req.body;
        const parseUserId = parseInt(userId, 10);
        const data = await prisma.relationship.create({
            data: {
                followerUserId: id,
                followedUserId: parseUserId
            }
        })
        res.status(200).json({data: data})
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

export const destroy = async (req, res) => {
    try {
        const {id} = req.user;
        const userId = parseInt(req.query.userId, 10);
        await prisma.relationship.deleteMany({
            where: {
                followerUserId: id,
                followedUserId: userId
            }
        })
        res.status(200).json({message: "Unfollow    "});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}