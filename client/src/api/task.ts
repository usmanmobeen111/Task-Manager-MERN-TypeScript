import axios from "axios";
import type {  AxiosResponse } from "axios";
import type { Task } from "../types";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getTasks = async (params = {}): Promise<AxiosResponse> => {
  return await axios.get(BASE_URL, { params });
};


export const getTask = async(id: string):Promise<AxiosResponse>=>{
    return await axios.get(`${BASE_URL}/${id}`)
}

export const createTask = async(data:Task):Promise<AxiosResponse>=>{
    return await axios.post(`${BASE_URL}/create`,data)
}

export const updateTask = async(id: string, data:Task):Promise<AxiosResponse>=>{
    return await axios.put(`${BASE_URL}/${id}`,data)
}

export const deleteTask = async(id: string):Promise<AxiosResponse>=>{
    return await axios.delete(`${BASE_URL}/delete/${id}`)
}

export const updateTaskStatus = async(id: string, status:string):Promise<AxiosResponse>=>{
    return await axios.put(`${BASE_URL}/status/${id}`,{status})
}