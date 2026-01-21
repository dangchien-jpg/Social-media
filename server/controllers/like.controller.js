import prisma from "../config/prisma.js";

export const index = async (req, res) => {
    try {
        const postId = parseInt(req.query.postId, 10);
        const data = await prisma.like.findMany({
            where: {
                postId: postId
            },
            select: {
                userId: true
            }
        })
        res.status(200).json(data.map(like => like.userId));
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

export const store = async (req, res) => {
    try {
        const { id } = req.user;
        const { postId } = req.body;
        const parsePostId = parseInt(postId, 10);
        const data = await prisma.like.create({
            data: {
                postId: parsePostId,
                userId: id
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
        const postId = parseInt(req.query.postId, 10);
        await prisma.like.deleteMany({
            where: {
                userId: id,
                postId: postId
            }
        })
        res.status(200).json({message: " Delete success "});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}