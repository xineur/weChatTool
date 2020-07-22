import HttpRequest from "./axios";
import { AxiosRequestConfig } from "axios";
import config from "@/config"

export const axios = new HttpRequest(config.baseUrl)

export function get<T>(url: string, data: T, params: AxiosRequestConfig = {}) {
  return axios.request(Object.assign({
      url,
      params: data,
      method: 'get'
    },
    params
  ))
}

export function post<T>(url: string, data: T, params: AxiosRequestConfig = {}) {
  return axios.request(Object.assign({
      url,
      data,
      method: 'post'
    },
    params
  ))
}

export function put<T>(url: string, data: T, params: AxiosRequestConfig = {}) {
  return axios.request(Object.assign({
      url,
      data,
      method: 'put'
    },
    params
  ))
}

export function del<T>(url: string, data: T, params: AxiosRequestConfig = {}) {
  return axios.request(Object.assign({
      url,
      params: data,
      method: 'delete'
    },
    params
  ))
}

export const url = 'http://127.0.0.1:5555';
