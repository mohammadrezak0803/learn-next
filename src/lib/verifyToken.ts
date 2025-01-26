import { IDecodeToken } from "@/model/interface/IDecodeToken";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "mysecretkey";



export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET_KEY) as IDecodeToken;
  } catch (error) {
    return null;
  }
}
