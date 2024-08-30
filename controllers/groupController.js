import sequelize from "../db.js";
import { jsArrayToPgArray } from "./utils/util.js";

export const addGroup = async (req, res) => {
  const { group_name, members, admin_id } = req.body;

  const formattedMembers = `{${members
    .map((member) => `"${member}"`)
    .join(",")}}`;

  try {
    const result = await sequelize.query(
      `SELECT * from public.fn_add_group(:group_name, :members::UUID[], :admin_id::UUID)`,
      {
        replacements: {
          group_name: group_name,
          members: formattedMembers,
          admin_id: admin_id,
        },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getGroup = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await sequelize.query(
      `SELECT * from public.get_groups_by_user(:id::UUID)`,
      {
        replacements: {
          id: id,
        },
      }
    );
    return res.json({ success: true, data: result });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
