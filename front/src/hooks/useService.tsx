import axios, { AxiosError, AxiosResponse } from "axios"
import { IProduct, IProductPaginated } from "../models/ProductInterface"
import { ICategory } from "../models/CategoryInterface"
import { InventoryRequest, InventoryResponse } from "../models/InventoryInterface"

export const useService = () => {
    const baseUrl = 'http://localhost:3000'
    const authorization = { Authorization: `Bearer ${localStorage.getItem('token')}` }
    const getHeaders = (_headers) => _headers ? { ..._headers, authorization } : authorization

    const get = (route, _headers?) => {
        return axios.get(`${baseUrl}/${route}`, { headers: getHeaders(_headers) })
            .then((res: AxiosResponse) => res.data)
            .catch((err: AxiosError) => _checkRefreshToken(err))
    }

    const post = (route, body, _headers?) => {
        return axios.post(`${baseUrl}/${route}`, body, { headers: getHeaders(_headers) })
            .then((res: AxiosResponse) => res.data)
    }

    const auth = {
        login: async (email: string, password: string) => await post(`auth`, { email, password })
    }

    const product = {
        findAll: async (page: number): Promise<IProductPaginated> => {
            return await get(`products?page=${page}`).then(res => res)
        },
        create: async (name: string, productCategory: number): Promise<IProduct> => {
            return await post(`products`, { name, category_id: productCategory })
        },
    }

    const category = {
        findAll: async (): Promise<ICategory[]> => await get(`categories`),
        create: async (name: string): Promise<ICategory> => await post(`categories`, { name })
    }

    const inventory = {
        add: async (body: InventoryRequest): Promise<InventoryResponse> => post(`inventory/add`, body),
        sub: async (body: InventoryRequest): Promise<InventoryResponse> => post(`inventory/sub`, body)
    }

    const _checkRefreshToken = (err: AxiosError) => {
        const refreshToken = localStorage.getItem('refresh_token')

        if (err?.response?.status === 401 && localStorage.getItem('refresh_token')) {
            return axios.post(`${baseUrl}/auth/refresh-token`, {}, { headers: { Authorization: `Bearer ${refreshToken}` } })
                .then(({ data }: AxiosResponse) => {
                    console.log('refresh token atualizado com sucesso...');
                    localStorage.setItem('token', data.access_token)
                    localStorage.setItem('refresh_token', data.refresh_token)
                })
                .catch(() => {
                    console.log('Não foi possível validar o refresh token...');
                    throw err;
                })
        } else {
            throw err;
        }
    }

    return {
        auth,
        product,
        category,
        inventory
    }
}