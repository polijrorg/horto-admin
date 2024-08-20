import { AxiosResponse } from 'axios';
import { parseCookies } from 'nookies';
import { Company } from 'interfaces/Companies';
import api from './api';

export default class CompanyService {
    static async GetAll(): Promise<Company[]> {
        const cookies = parseCookies();
        const token = cookies['@app:token'];
        const response: AxiosResponse<Company[]> = await api.get(
            '/companies/getAll',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return response.data;
    }

    // static async CreatePost(data: IPostRequest): Promise<Posts> {
    //     const cookies = parseCookies();
    //     const token = cookies['@app:token'];
    //     const response: AxiosResponse<Posts> = await api.post(
    //         '/posts/create',
    //         data,
    //         {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         }
    //     );
    //     return response.data;
    // }

    static async deleteCompany(id: string) {
        const cookies = parseCookies();
        const token = cookies['@app:token'];
        const response = await api.delete(`/companies/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    }
}
