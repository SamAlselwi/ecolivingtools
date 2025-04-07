import axios from 'axios';
import { CategoryItem } from '../interfaces';

axios.interceptors.response.use(
  (response) => response.data,
  (error) =>
    error.response
      ? Promise.reject({
          ...error.response.data,
          status: error.response.status,
        })
      : Promise.reject(error)
);

export function getRequest<T, N>(url: string, params = {}) {
  return axios.get<T, N>(`/api${url}`, { params: params });
}


let categories: CategoryItem[] = [];
export function getCachedRequest<T, N>(url: string, params = {}) {
  if(Array.isArray(categories) && categories.length){
    return Promise.resolve({data: categories});
  }
  return axios.get<T, N>(`/api${url}`, { params: params });
}

export const limit: number = process.env.NEXT_PUBLIC_LIMIT ? parseInt(process.env.NEXT_PUBLIC_LIMIT) : 48;

export const setItems = (items: CategoryItem[]) => {
  categories = items;
}

export const getItems = () => {
  return categories;
}