export interface ICourse {
  createdAt: string;
  description: string;
  id: number | null;
  instructorId: number;
  price: number;
  title: string;
  updatedAt: string;
}


export interface IAddCourse {
    description: string;
    instructorId: number;
    price: number;
    title: string;
  }
  
  export interface IUpdateCourse {
    description: string;
    instructorId: number;
    price: number;
    title: string;
  }