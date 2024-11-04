import jwt from "jsonwebtoken";

type UserPayload = {
  id: string;
};
export function generateJWT(payload: UserPayload) {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
}
