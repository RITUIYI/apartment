import { baseURL } from './config'
import axios from 'axios'
//设置多基地址
//主链接
export const host = axios.create({
    baseURL
})