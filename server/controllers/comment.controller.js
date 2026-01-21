import prisma from "../config/prisma.js";
export const index = async (req, res) => {
  try {
    const postId = parseInt(req.query.postId, 10);
    const data = await prisma.comment.findMany({
      where: {
        postId: postId,
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
    const { desc, postId } = req.body;
    const parsePostId = parseInt(postId, 10);
    const data = await prisma.comment.create({
      data: {
        desc,
        userId: id,
        postId: parsePostId
      },
    });
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
