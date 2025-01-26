import { IAddCourse } from "@/model/interface/ICourses";
import { api } from "../api";

export const getcourses = () => api.get("/courses");
export const addcourses = (data: IAddCourse) => api.post("/courses/addcourse",data);
