import { AxiosResponse } from 'axios';
import { Posts, IPostRequest } from 'interfaces/Posts';
import api from './api';

export default class PostService {
    static async GetAll(): Promise<Posts[]> {
        const response: AxiosResponse<Posts[]> = await api.get('/posts/getAll');

        return response.data;
    }

    static async CreatePost(data: IPostRequest): Promise<Posts> {
        const formData = new FormData();

        formData.append('style', data.style);
        formData.append('title', data.title);
        formData.append('text', data.text);
        formData.append('link', data.link);

        // Se houver uma imagem, adiciona ao FormData
        if (data.image) {
            formData.append('image', data.image);
        }

        const response: AxiosResponse<Posts> = await api.post(
            '/posts/create',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
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
        const formData = new FormData();
        formData.append('style', data.style);
        formData.append('title', data.title);
        formData.append('text', data.text);
        formData.append('link', data.link);

        if (data.image) {
            formData.append('image', data.image);
        }

        const response: AxiosResponse<Posts> = await api.patch(
            `/posts/update/${postId}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );

        return response.data;
    }
}
