import { AxiosResponse } from 'axios';
import { Posts, IPostRequest } from 'interfaces/Posts';
import api from './api';

export default class PostService {
    static async GetAll(): Promise<Posts[]> {
        const response: AxiosResponse<Posts[]> = await api.get('/posts/getAll');

        return response.data;
    }

    static async CreatePost(data: IPostRequest): Promise<Posts> {
        const response: AxiosResponse<Posts> = await api.post(
            '/posts/create',
            data
        );
        return response.data;
    }

    static async deletePost(id: string) {
        const response = await api.delete(`/posts/delete/${id}`);
        return response.data;
    }

    static async updatePost(
        postId: string,
        data: IPostRequest
    ): Promise<Posts> {
        const response: AxiosResponse<Posts> = await api.patch(
            `/posts/update/${postId}`,
            data
        );
        return response.data;
    }
}
