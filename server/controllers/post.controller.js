import prisma from "../config/prisma.js";

export const index = async (req, res) => {
  try {
    const userId = req.query.userId ? Number(req.query.userId) : null;
    const { id: currentUserId } = req.user;

    const data = await prisma.post.findMany({
      where: userId
        ? {
            userId: userId,
          }
        : {
            OR: [
              {
                user: {
                  followers: {
                    some: {
                      followerUserId: currentUserId,
                    },
                  },
                },
              },
              {
                userId: currentUserId,
              },
            ],
          },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            profilePic: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const store = async (req, res) => {
  try {
    const { id } = req.user;
    const { description, img } = req.body;
    const data = await prisma.post.create({
      data: {
        description,
        img,
        userId: id,
      },
    });
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const destroy = async (req, res) => {
  try {
    const { id } = req.user;
    const postId = parseInt(req.params.id, 10);
    const data = await prisma.post.delete({
      where: {
        userId: id,
        id: postId
      }
    });
    res.status(200).json({ message: "Delete post success"});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
