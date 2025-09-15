// interfaces/Posts.ts

/* eslint-disable camelcase */
export interface Posts {
    id: string;
    style: string;
    title: string;
    text: string;
    link?: string;
    linkImage?: string;
    created_at: string;
}

export interface IPostRequest {
    id?: string;
    style: string;
    title: string;
    text: string;
    link: string;
    image: null | File;
}

export type PostStyleKey = 'noticia' | 'carrousel' | 'coluna';

export interface PostStyleConfig {
    key: PostStyleKey;
    label: string;
    fields: Array<'text' | 'link' | 'image'>;
}

// Aqui você define as opções e o que cada uma deve renderizar
export const POST_STYLES: PostStyleConfig[] = [
    {
        key: 'home',
        label: 'Home',
        fields: ['link', 'image']
    },
    {
        key: 'noticia',
        label: 'Notícia',
        fields: ['link', 'image']
    },
    {
        key: 'carrousel',
        label: 'Carrossel',
        fields: ['link']
    },
    {
        key: 'coluna',
        label: 'Coluna',
        fields: ['text', 'image']
    }
];
