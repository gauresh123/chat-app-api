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

export const addMessage = async (req, res) => {
  const { receiverId, senderId, message } = req.body;

  try {
    const [result] = await sequelize.query(
      `select * from public.insert_message(:senderId,:receiverId,:message)`,
      {
        replacements: {
          senderId: senderId,
          receiverId: receiverId,
          message: JSON.stringify(message),
        },
      }
    );
    return res.json({ data: "success" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
