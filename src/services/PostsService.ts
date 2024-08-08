import { AxiosResponse } from 'axios';
import { parseCookies } from 'nookies';
import { Posts, IPostRequest } from 'interfaces/Posts';
import api from './api';

export default class PostService {
    static async GetAll(): Promise<Posts[]> {
        const cookies = parseCookies();
        const token = cookies['@app:token'];
        const response: AxiosResponse<Posts[]> = await api.get(
            '/posts/getAll',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return response.data;
    }

    static async CreatePost(data: IPostRequest): Promise<Posts> {
        const cookies = parseCookies();
        const token = cookies['@app:token'];
        const response: AxiosResponse<Posts> = await api.post(
            '/posts/create',
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    }
}
