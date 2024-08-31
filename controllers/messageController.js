import sequelize from "../db.js";

export const getMessage = async (req, res) => {
  const { receiverId, senderId } = req.body;

  try {
    const [result] = await sequelize.query(
      `select * from public.get_chats(:senderId,:receiverId)`,
      {
        replacements: {
          senderId: senderId,
          receiverId: receiverId,
        },
      }
    );
    return res.json({ data: result });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
