import jwt from "jsonwebtoken";
import env from "dotenv";
env.config();

const jwtGenerator = (user_id: string) => {
  const payload = {
    user: {
      id: user_id,
    },
  };

  return jwt.sign(payload, process.env.jwtSecret as any, { expiresIn: "1hr" });
};

export default jwtGenerator;
