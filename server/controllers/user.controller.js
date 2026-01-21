import prisma from "../config/prisma.js"

export const getUser = async (req, res) => {
    try {
        const id = parseInt(req.params.userId, 10);
        const data = await prisma.user.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                email: true,
                username: true,
                name: true,
                city: true,
                website: true,
                profilePic: true,
                coverPic: true
            }
        })
        res.status(200).json({data});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

export const updateUser = async (req, res) => {
    try {
        const id = parseInt(req.user.id);
        const {username, email, city, website, coverPic, profilePic} = req.body;
        const data = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                email,
                username,
                city,
                website,
                profilePic,
                coverPic
            }
        })
        res.status(200).json({message: "Update successfully",data});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}