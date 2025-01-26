import { IRegister } from "@/model/interface/IRegisetr";
import { api } from "../api";
import { ILogin } from "@/model/interface/ILogin";

export const registerApi = (data: IRegister) =>
  api.post("/auth/register", data);

export const loginApi = (data: ILogin) => api.post("/auth/login", data);

export const logout = () => api.get("/auth/logout");
