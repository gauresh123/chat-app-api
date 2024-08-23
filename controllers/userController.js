import sequelize from "../db.js";
import bcrypt from "bcrypt";

export const signIn = async (req, res) => {
  const { emailid, password } = req.body;

  try {
    const [user] = await sequelize.query(
      `select * from public.fn_sign_in_user(:emailid)`,
      {
        replacements: {
          emailid: emailid,
        },
      }
    );
    const passwordMatch = await bcrypt.compare(password, user[0].pass);
    if (!passwordMatch) throw Error("Invalid password");
    return res.json(user[0]);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const signUp = async (req, res) => {
  const { emailid, password, name } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const [result] = await sequelize.query(
      `select * from public.fn_signup_user(:name,:emailid,:password)`,
      {
        replacements: {
          name: name,
          emailid: emailid,
          password: hashedPassword,
        },
      }
    );
    return res.json({ success: "Signup Successfully!" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getUsers = async (req, res) => {
  const { ID } = req.params;

  try {
    const [result] = await sequelize.query(
      `select * from public.fetch_users(:id)`,
      {
        replacements: {
          id: ID,
        },
      }
    );
    return res.json({ data: result });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
