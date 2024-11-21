import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()
type UserPayload = {
  id: string;
};
export function generateJWT(payload: UserPayload) {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
}
