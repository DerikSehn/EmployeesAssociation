import { createContext } from 'react';

const API_BASE_URL = 'https://wsafu.unimedvaledocai.com.br:8443/afu'; /* 'http://172.16.61.43:80/afu' */
const GET_API_TOKEN = () => localStorage.getItem('lgTkn') ?? '';

export { API_BASE_URL, GET_API_TOKEN };

export const TasksContext = createContext(null);
export const TasksDispatchContext = createContext(null);
