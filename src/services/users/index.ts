import { api } from "../api";
import { IUpdateUser } from "../../model/interface/IUpdateUser";

export const updateuser = (data: IUpdateUser) =>
  api.put("/users/updateuser",data);
