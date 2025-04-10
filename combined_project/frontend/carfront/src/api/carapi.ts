import { CarResponse } from "../types";
import { Car } from "../types";
import axios from "axios";

export const getCars = async (): Promise<CarResponse[]> => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/cars`);
    
  return response.data._embedded.cars;
}

export const deleteCar = async (link: string): Promise<CarResponse> => {
  const response = await axios.delete(link);
  return response.data
}
// 1개라서 link

export const addCar = async (car: Car): Promise<CarResponse> => {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/cars`, car ,{  // api.cars에 car 객체를 추가할겁니다.
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.data;
} 